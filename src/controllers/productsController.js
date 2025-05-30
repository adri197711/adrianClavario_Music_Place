const { validationResult } = require('express-validator');
const { Product, Category, Section, Brand, Image } = require("../database/models");
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { toThousand, paginator } = require('../utils/index');
const upload = require('../middlewares/uploadFile');
const product = require('../database/models/product');

module.exports = {

  list: async (req, res) => {
    try {

      const { page = 1, limit = 10 } = req.query;
      const products = await Product.findAll({
        include: [
          { model: Brand, as: 'brand' },
          { model: Category, as: 'category' },
          { model: Section, as: 'section' },
          { model: Image, as: 'images' }
        ],
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true

      });

      const totalPages = Math.ceil(products.count / limit);
      const currentPage = parseInt(page);


      return res.render('products/products', {
        products,
        pagination: {
          totalItems: products.count,
          currentPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
          nextPage: currentPage + 1,
          previousPage: currentPage - 1
        },
        toThousand
      });

    } catch (error) {
      return res.status(500).render('error', {
        message: error.message,
      })
    }
  },

  detail: async (req, res) => {
    const { Product, Category, Section, Brand, Image } = require("../database/models");
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id, {
        include: [
          { model: Brand, as: 'brand' },
          { model: Category, as: 'category' },
          { model: Section, as: 'section' },
          { model: Image, as: 'images' }
        ]
      });

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      return res.render("products/detail", {
        title: "Detalle del Producto",
        product,
        // admin: req.query.admin,
        toThousand
      });
    } catch (error) {
      return res.status(500).render('error', {
        message: error.message,
      })
    }
  },

  add: async (req, res) => {
    try {
      const [sections, brands, categories] = await Promise.all

        ([
          Section.findAll({
            order: [['name']]
          }),

          Brand.findAll({
            order: [['name']]
          }),
          Category.findAll({
            order: [['name']]
          })
        ]);

      return res.render('products/productAdd', {
        old: {},
        errors: {},
        sections,
        brands,
        categories
      })
    } catch (error) {
      console.error("Error al cargar el formulario de creación:", error);
      return res.status(500).send("Error al cargar el formulario");
    }
  },

  create: async (req, res) => {

    const errors = validationResult(req);
    const { Product, Category, Section, Brand, Image } = require("../database/models");

    const { name, price, discount = 0, description, brandId, categoryId, sectionId } = req.body;

    if (!errors.isEmpty()) {
      const [sections, brands, categories] = await Promise.all([
        Section.findAll({ order: [['name']] }),
        Brand.findAll({ order: [['name']] }),
        Category.findAll({ order: [['name']] })
      ]);
      return res.render('products/productAdd', {
        errors: errors.mapped(),
        old: req.body,
        sections,
        categories,
        brands
      });
    } else {

      try {

        const newProduct = await Product.create({
          name: name.trim(),
          price: +price,
          discount: +discount,
          description: description.trim(),
          sectionId,
          categoryId,
          brandId,
        });

        if (req.file) {
          try {
            const image = await Image.create({
              productId: newProduct.id,
              file: req.file.filename
            });
            console.log("Imagen guardada correctamente:", image);
          } catch (imageError) {
            console.error("Error al guardar la imagen:", imageError);
            return res.status(500).send("Error al guardar la imagen");
          }
        }
        console.log('NEWPRODUCT: ', newProduct)
        return res.redirect('/admin');

      } catch (error) {
        console.error("Error al crear el producto:", error);
        return res.status(500).render(error, { message: "Error al crear el producto" });
      }
    }
  },

  edit: async (req, res) => {
    const { Product, Category, Section, Brand, Image } = require('../database/models');

    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { association: 'category' },
          { association: 'section' },
          { association: 'brand' },
          { association: 'images' }
        ],
      })

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      const [categories, sections, brands] = await Promise.all([
        Category.findAll(),
        Section.findAll(),
        Brand.findAll()
      ]);

      return res.render('products/productEdit', {
        product,
        categories,
        sections,
        brands,
        old: req.body,
        errors: {}
      });

    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al cargar el producto');
    }
  },

  update: async (req, res) => {

    const errors = validationResult(req);
    const { name, price, discount, description, categoryId, sectionId, brandId } = req.body;
    console.log('reqBODY: ', req.body)

    if (!errors.isEmpty()) {
      const [brands, categories, sections] = await Promise.all([
        Brand.findAll({ order: [['name']] }),
        Category.findAll({ order: [['name']] }),
        Section.findAll({ order: [['name']] })
      ]);

      return res.render('products/productEdit', {
        product: { ...req.body, id: req.params.id },
        errors: errors.mapped(),
        old: req.body,
        categories,
        brands,
        sections,
      });
    }

    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).render('error', { message: 'ID inválido' });
    }
    console.log("ID recibido:", id);
    const [product, brands, categories, sections] = await Promise.all([
      Product.findByPk(id, {
        include: [{ association: 'images' }]
      }),
      Brand.findAll({ order: [['name']] }),
      Category.findAll({ order: [['name']] }),
      Section.findAll({ order: [['name']] })
    ]);

    if (!product) {
      return res.status(404).render('error', {
        message: 'Producto no encontrado'
      });
    }
    try {
      product.set({
        name: name.trim(),
        description: description.trim(),
        price: +price,
        discount: +discount,
        categoryId,
        sectionId,
        brandId
      });

      await product.save();

      if (req.file) {
        let oldImage = null;

        if (product.images.length) {
          oldImage = product.images[0];

          if (oldImage.file !== 'default.webp') {
            const pathFile = path.join(__dirname, '../../public/images/products', oldImage.file);
            if (fs.existsSync(pathFile)) {
              fs.unlinkSync(pathFile);
            }
          }

          await oldImage.destroy();
        }

        await Image.create({
          productId: product.id,
          file: req.file.filename
        });
      }
      return res.redirect('/admin');

    } catch (error) {
      console.error(error);
      return res.status(500).render('error', {
        message: error.message
      });
    }
  },

  remove: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { association: 'images' }
        ]
      })
      if (product.images.length) {
        const pathFile = path.join(__dirname, '../../public/images/products', product.images[0].file)
        fs.existsSync(pathFile) && fs.unlinkSync(pathFile)
        await Image.destroy({
          where: {
            productId: product.id
          }
        });
      }
      await product.destroy();

      return res.redirect('/admin')
    } catch (error) {
      return res.status(500).render('error', {
        message: error.message,
      })
    }
  },

  // cart: async (req, res) => {
  //   const cartProductIds = [1, 2, 3]; // IDs simulados del carrito

  //   try {
  //     const products = await Product.findAll({
  //       where: {
  //         id: cartProductIds
  //       },
  //       include: ['images']
  //     });

  //     return res.render('products/cart', { products });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send('Error al cargar el carrito');
  //   }
  // },
  // cart: async (req, res) => {
  //   const cartProductIds = [1, 2, 3]; // IDs simulados del carrito

  //   try {
  //     const products = await Product.findAll({
  //       where: {
  //         id: cartProductIds
  //       },
  //       include: ['images'] // Asegúrate de incluir las imágenes si tu modelo lo permite
  //     });

  //     return res.render('products/cart', { products });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send('Error al cargar el carrito');
  //   }
  // },


  // cartDetail: (req, res) => {
  //   res.send(req.session.cart)
  // },

  search: async (req, res) => {
    try {
      const query = req.query.query || '';
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`
          }
        },
        include: [
          { model: Brand, as: 'brand' },
          { model: Category, as: 'category' },
          { model: Section, as: 'section' },
          { model: Image, as: 'images' }
        ]
      });

      return res.render('products/products', {
        products, toThousand,
        searchTerm: query
      });
    } catch (error) {
      console.error('Error en búsqueda:', error);
      return res.status(500).send('Error al buscar productos');
    }

  }
}

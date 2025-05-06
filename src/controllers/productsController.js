const { Product, Category, Section, Brand, Image } = require("../database/models");
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
        admin: req.query.admin,
        toThousand
      });
    } catch (error) {
      return res.status(500).render('error', {
        // message: error.message,
      })
    }
  },

  add: async (req, res) => {
    try {
      const [sections, brands, categories] = await Promise.all([
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
        sections,
        brands,
        categories
      })
    } catch (error) {
      console.log(error)
    }
  },

  create: async (req, res) => {
    console.log("BODY:", req.body);
    const { Product, Category, Section, Brand, Image } = require("../database/models");
    const { name, price, discount, description, brand, category, section } = req.body; 
    try {
      const newProduct = await Product.create({
        name: name.trim(),
        price: +price,
        discount: +discount,
        description: description.trim(),
        brandId: brand,  
        categoryId:category,
        sectionId:section,  
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
      return res.redirect('/admin');

    } catch (error) {
      console.error("Error al crear el producto:", error);
      return res.status(500).send("Error al crear el producto");
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
        brands
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al cargar el producto');
    }
  },
  
  update: async (req, res) => {
    try {

      const { id } = req.params;
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


      const { name, price, discount, description, categoryId, sectionId, brandId } = req.body;
console.log('reqBODY: ' , req.body)
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
        if (product.images.length) {
          const pathFile = path.join(__dirname, '../../public/images/products', product.images[0].file);
          fs.existsSync(pathFile) && fs.unlinkSync(pathFile);
          await Image.update({
            file: req.file.filename
          }, {
            where: {
              productId: product.id
            }
          });
        } else {
          await Image.create({
            productId: product.id,
            file: req.file.filename
          });
        }
      }

      return res.redirect('/admin');

    } catch (error) {
      console.error(error);
      return res.status(500).render('error', {
        message: error.message,
      });
    }
  },

  remove: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          { association: 'images' }
        ]
      })
      if (product.images.length) {
        const pathFile = path.join(__dirname, '../../public/images/products', product.images[0].file)
        fs.existsSync(pathFile) && fs.unlinkSync(pathFile)
        await db.Image.destroy({
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


  cart: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    return res.render('products/cart', { product });
  },

  cartDetail: (req, res) => {
    res.send(req.session.cart)
  },


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

      return res.render('products/products', { products, toThousand });
    } catch (error) {
      console.error('Error en búsqueda:', error);
      return res.status(500).send('Error al buscar productos');
    }

  }
}

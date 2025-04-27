const { Product, Category, Section, Brand } = require("../database/models");
const fs = require('fs');
const path = require('path');
const { toThousand, paginator } = require('../utils/index');
const upload = require('../middlewares/uploadFile');
const product = require('../database/models/product');

module.exports = {

  list: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: db.Brand, 
            as: 'brand'    
          }  
        ]
 
      });
  
      return res.render('products/products', {
        products,
        toThousand
      });
  
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return res.status(500).send('Hubo un error al cargar los productos');
    }
  },
  
  detail: async (req, res) => {
    const { Product, Category, Section, Brand } = require("../database/models");
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id,{
        include: [
          { model: Brand, as: 'brand' },
          { model: Category, as: 'category' },
          { model: Section, as: 'section' }
        ]
      });

      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }

      return res.render("products/detail", {
        title: "Detalle del Producto",
        product
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  },


  add: async (req, res) => {
    try {
      const [categories, sections, brands] = await Promise.all([
        Category.findAll(),
        Section.findAll(),
        Brand.findAll(),
      ]);

      return res.render('products/productAdd', {
        title: "Agregar Producto",
        categories,
        sections,
        brands
      });
    }catch (error) {
      console.log(error)
    }
  },
    
    create: async (req, res) => {
      try {
        const { name, price, discount = 0, description, brandId, categoryId, sectionId } = req.body;
        const image = req.file ? "/images/products/" + req.file.filename : null;
        await Product.create({
          name,
          price,
          discount,
          description,
          brandId,
          sectionId,
          categoryId,
          image: image,
        });
        res.redirect('/admin')
      } catch (error) {
      }
    },

      edit: async (req, res) => {
        try {
          const { Product } = require('../database/models');
          const id = req.params.id;
          const [categories, sections, brands, product] = await Promise.all([
            Category.findAll(),
            Section.findAll(),
            Brand.findAll(),
            Product.findByPk(id),
          ]);
            
          return res.render('products/productEdit', {
            product: product.get({ plain: true }),
        categories,
        sections,
        brands,
       });

        } catch (error) {
          console.error(error);
        }
      },

      update: async (req, res) => {
        const fs = require('fs');
const path = require('path');
        const { Product } = require('../database/models');
        const { id } = req.params;
        const { name, price, discount = 0, description, brandId, sectionId, categoryId } = req.body;
        console.log('REQ.FILE:', req.file);
       
        try {
          const existingProduct = await Product.findByPk(id);
          if (!existingProduct) {
            return res.status(404).send('Producto no encontrado');
          }
      
          let image = existingProduct.image;
        
          if (req.file) {
           const oldImagePath = "/images/products/" + existingProduct.image;
          //  const oldImagePath = path.join(__dirname, '..', '..', 'public', 'images', 'products', existingProduct.image);
      

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
    
          image = "/images/products/" + req.file.filename;
        }
    
          await Product.update({
            name: name.trim(),
            price: +price,
            discount: +discount,
            description: description.trim(),
            image,
            brandId,
            sectionId,
            categoryId
          }, {
            where: { id }
          });
      
          return res.redirect('/admin');
        } catch (error) {
          console.error('ERROR EN PRODUCT UPDATE:', error);
          return res.status(500).send('Internal Server Error');
        }
      },
      
          remove: async (req, res) => {
            const { Product } = require('../database/models');
            const { id } = req.params;

            try {
              const product = await Product.findByPk(id);

              if (!product) {
                return res.status(404).send('Producto no encontrado');
              }

              const imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'products', product.image);

              if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
              }
          

              await product.destroy();
              return res.redirect('/admin');
            } catch (error) {
              console.error('ERROR EN PRODUCT REMOVE:', error);
              return res.status(500).send('Internal Server Error');
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


                search: (req, res) => {
                  return res.render('products/products')
                }
  }
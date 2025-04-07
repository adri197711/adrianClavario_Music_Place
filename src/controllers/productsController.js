const {Product} =  require('../database/models')
const fs = require('fs');
const {readJson, saveJson} = require('../utils/filesystem')
const path = require('path')
const { toThousand, paginator } = require('../utils/index');

const upload = require('../middlewares/uploadFile');
const product = require('../database/models/product');
module.exports = {

  list:async (req, res) => {
    const products = await Product.findAll()
  //  return res.send(products)
    return res.render('products/products',{
  
  products,
  toThousand})
},

detail: async(req,res) => {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).send('Producto no encontrado');
      }
  
      return res.render('products/detail', {
        title: 'Detalle del Producto',
        product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  },
  
 
 add: (req,res) => {
 
  return res.render('products/productAdd'),{title:'Agregar Producto'}


},
create: async (req, res) => {
  try {
      const { name, price, discount, description, categoryId,sectionId } = req.body; 
      const image = req.file ? req.file.filename : null; 
      const newProduct = await Product.create({
          name,
          price,
          discount,
          description,
          categoryId:1,
          sectionId:1,
          image,
      });
      
res.redirect('/admin')
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  },
  
  edit: async (req, res) => {
    try {
      const { Product } = require('../database/models');
    const id = req.params.id;

    
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).render('errors/404', { message: 'Product not found' });
    }

    console.log(product);

    res.render('products/productEdit', { product });

  } catch (error) {
    console.error(error);
   
    res.status(500).render('errors/500', { message: 'Internal Server Error' });
  }
},




update: async(req, res) => {
  const {Product} =  require('../database/models')
  const { id } = req.params;
  const { name, price, discount, description, image } = req.body;
try{
const productModify = await Product.update({
      name: name.trim(),
      price: +price,
      discount:  +discount,
      image: image.trim(), 
      description: description.trim()
    },
  { where: { id } });
  console.log(productModify)
  return res.redirect('/admin')
  }catch (error){
    return res.status(500).send('Internal Server Error');
     }
},

remove: async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    await product.destroy();
    return res.redirect('/admin');
  } catch (error) {
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


cartDetail: (req,res) =>  {
  res.send(req.session.cart)
},


 search: (req,res) => {
  return res.render('products/products')
 }
}
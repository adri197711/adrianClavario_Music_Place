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
  try{
const {Product} =  require('../database/models')
const id = req.params.id

const product = await Product.findByPk(id)
  console.log(product)
res.send(product)
 
} catch (error) {
  console.error(error);
}
},
 
 add: (req,res) => {
 
  return res.render('products/productAdd'),{title:'Agregar Producto'}


},

 create: async (req, res) => {
  try {
    
    const filename = req.file.filename;

   
    const { Product } = require('../database/models');

    
    const { name, price, description, discount, categoryId, sectionId, brandId } = req.body;

     const newProduct = await Product.create({
      name: name.trim(),
      price: parseFloat(price) ,
      description: description.trim(),
      discount:parseFloat(discount) ,
      categoryId: parseInt(categoryId, 10), 
      sectionId: parseInt(sectionId, 10), 
      brandId: parseInt(brandId, 10), 
      image: filename, 
    });

    return res.redirect(`/products/detail/${newProduct.id}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error ocurrió creando el producto.' });
  }
},

edit: (req, res) => {

  const { id } = req.params
  const products = readJson('../db/products.json')
  const categories = readJson('../db/categories.json')

  const product = products.find(product => product.id === +id)

  return res.render('products/productEdit', {
    categories,
    ...product
  })
},

update: (req, res) => {
  const products = readJson('../db/products.json')


  const { name, price, discount, description, category,image,brand,color,model } = req.body
  

  const productsModify = products.map(product => {
    if (product.id === +req.params.id) {
      product.name = name.trim();
      product.brand = brand.trim();
      product.model = model.trim();
      product.color = color.trim();
      product.price = +price;
      product.discount = +discount;
      product.image = image; 
      product.description = description.trim();
      product.category = category;
    }
    return product
  })

  saveJson('../db/products.json', productsModify)
  return res.redirect('/admin')
},


remove: (req, res) => {
  const products = readJson('../db/products.json')
  const { id } = req.params;

  const productsModify = products.filter(product => product.id !== +id)

  saveJson('../db/products.json',productsModify)

  return res.redirect('/admin')

},

cart: (req, res) => {
  const products = readJson('../db/products.json')

  const product = products.find(product => product.id === +req.params.id)

  return res.render('products/cart',{
    ...product
  })

 },

cartDetail: (req,res) =>  {
  res.send(req.session.cart)
},


 search: (req,res) => {
  return res.render('products/products')
 }
}
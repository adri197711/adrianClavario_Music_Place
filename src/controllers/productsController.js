const { readJson, saveJson } = require('../utils/filesystem');
const fs = require('fs');
const path = require('path')
const { toThousand, paginator } = require('../utils/index');
const { start } = require('repl');
const categories = readJson('../db/categories.json')
const upload = require('../middlewares/uploadFile')
module.exports = {

  list:(req, res) => {
    const products = readJson('../db/products.json')
  
return res.render('products/products',{
  products,
  toThousand})
},

detail: (req,res) => {
  const products = readJson('../db/products.json')

  const product = products.find(product => product.id === +req.params.id)

  return res.render('products/detail',{
    ...product
  })
 },

 add: (req,res) => {
 
  return res.render('products/productAdd',{
    categories
  })
 },

 create: (req,res) => {

  const filename = req.file.filename;
console.log('IMAGEN: ', filename)

  const products = readJson('../db/products.json');

   const {name, brand, model, color, image, price, discount,category,description} = req.body

   const newProduct = {
    id : products[products.length -1].id +1,        
    name : name.trim(),
    brand : brand.trim(),
    model : model.trim(),
    color : color.trim(),
    price : +price,
    discount : +discount,
    image : req.file.filename,
    description : description.trim(),
    category 
  }
  products.push(newProduct)

  saveJson('../db/products.json',products)

  return res.redirect('/products/detail/' + newProduct.id)
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
      image : "logo_music_place.png";
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

cart: (req,res) => {

  const products = readJson('../db/products.json')

   const product = products.find(product => product.id === +req.params.id)

  return res.redirect('products/cart',{
    ...product
  })
},

 search: (req,res) => {
  return res.render('products/products')
 }
}
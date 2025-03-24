const { readJson } = require('../utils/filesystem');
const path = require('path')
const db = require('../database/models')
const { toThousand, paginator } = require('../utils/index');

module.exports = {
  index: async (req, res) => {
    const db = require('../database/models')
    try {
      const products = await db.Product.findAll();
      console.log('PRODUCTS PRODUCT: ', products)
      return res.render('index',
        {
          products,
        });
        
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).send('Something went wrong');
    }

  },
  usersAdmin: (req, res) => {
    let products = readJson('../db/products.json')
    const categories = readJson('../db/categories.json')

    const { page, perPage, category, search } = req.query

    if (category) {
      products = products.filter(product => product.category === category)
    }

    if (search) {
      products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase().trim()))
    }

    const { items, total } = paginator(products, page, perPage)

    return res.render('usersAdmin', {
      products: items,
      currentPage: page || 1,
      totalPages: total,
      categories,
      products,
      toThousand
    })
  },

  admin: (req, res) => {
    let products = require('../db/products.json')
    const categories = require('../db/categories.json')

    const { page, perPage, category, search } = req.query

    if (category) {
      products = products.filter(product => product.category === category)
    }

    if (search) {
      products = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase().trim()))
    }

    const { items, total } = paginator(products, page, perPage)

    return res.render('admin', {
      products,
      products: items,
      currentPage: page || 1,
      totalPages: total,
      categories,
      filterCategory: category,
      search,
      toThousand
    })
  },

  users: (req, res) => {
    let users = readJson('../db/users.json')
    const roles = readJson('../db/roles.json')

    const { page, perPage, rol, search } = req.query

    if (rol) {
      users = users.filter(user => user.rol === rol)
    }

    if (search) {
      users = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase().trim()))
    }

    const { items, total } = paginator(users, page, perPage)

    return res.render('user', {
      users,
      users: items,
      currentPage: page || 1,
      totalPages: total,
      roles,
      filterrol: rol,
      search,
      toThousand
    })
  },

  adminUsers: (req, res) => {
    const users = require('../db/users.json')

    const { page, perPage } = req.query

    const { items, total } = paginator(users, page, perPage)

    return res.render('users/usersAdmin', {
      users: items,
      currentPage: page || 1,
      totalPages: total,
    })
  }

}




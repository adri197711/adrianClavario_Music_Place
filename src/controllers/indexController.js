const { readJson } = require('../utils/filesystem');
const path = require('path')
const db = require('../database/models')
const { toThousand, paginator } = require('../utils/index.js');

module.exports = {
  index: async (req, res) => {
    const db = require('../database/models')
    try {
      const products = await db.Product.findAll();
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

  admin: async (req, res) => {
    const db = require('../database/models');
    try {
      let products = await db.Product.findAll();
      
      const { page, perPage, category, search } = req.query;
      const categories = await db.Category.findAll(); 
  
      if (category) {
        products = products.filter(product => product.categoryId === parseInt(category));
      }
  
      if (search) {
        products = products.filter(product =>
          product.name.toLowerCase().includes(search.toLowerCase().trim())
        );
      }
  
      const { items, total } = paginator(products, page, perPage);
  
      return res.render('admin', {
        products: items,
        currentPage: page || 1,
        totalPages: total,
        categories,
        filterCategory: category,
        search,
        toThousand, 
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).send('An error occurred while fetching products');
    }
  },
  
  users: async(req, res) => {

    const { User, Rol} = require('../database/models'); 
    const { page, perPage, rolId, search } = req.query;

    let whereCondition = {};

    if (rolId) {
      whereCondition.rolId = rolId;
    }

    if (search) {
     whereCondition.name = {
        [Sequelize.Op.Like]: `%${search.toLowerCase().trim()}%`
     };
    }

    const { items, total } = paginator(User, page, perPage)

    return res.render('User', {
      User,
      User: items,
      currentPage: page || 1,
      totalPages: total,
      filterrol: rolId,
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




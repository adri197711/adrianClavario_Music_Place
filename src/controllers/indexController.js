const db = require('../database/models')
const { toThousand, paginator } = require('../utils/index.js')
const { Op } = require('sequelize');

module.exports = {
  index: async (req, res) => {
    // const db = require('../database/models')
    try {
      const products = await db.Product.findAll(
        {
          attributes: ['id', 'name', 'price','discount', 'description'],
          include: [
            {
              model: db.Brand,
              as: 'brand',
              attributes: ['id', 'name']
            },
            {
              model: db.Category,
              as: 'category',
              attributes: ['id', 'name']
            },
            {
              model: db.Section,
              as: 'section',
              attributes: ['id', 'name']
            },
            {
              model: db.Image, 
              as: 'images', 
              attributes: ['file'] 
            }
          ]
        });
  
      
      return res.render('index',
        {
        products
        });
        
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).send('Something went wrong')
    }

  },

  usersAdmin: async (req, res) => {
    try {
      const { page, perPage, category, search } = req.query

      let options


      const [products, categories] =  await Promise.all([
        db.Product.findAll(options),
        db.Category.findAll(),
        db.Brand.findAll(),
        db.Section.findAll()
,      ]) 


      const { items, total } = paginator(products, page, perPage)
      return res.render('usersAdmin', {
        products: items,
        currentPage: page || 1,
        totalPages: total,
        categories,
        products,
        toThousand
      })
    } catch (error) {
      console.log(error);
    } 
  },
  
  admin: async (req, res) => {
    const db = require('../database/models')
    try {
      const { page = 1, perPage = 10, category, brand, section, search } = req.query
  
      const where = {}
  
      if (brand) where.brandId = brand.name
      if (section) where.sectionId = +section
      if (category) where.categoryId = +category
      if (search) where.name = { [db.Sequelize.Op.like]: `%${search.trim()}%` }
  
      const products = await db.Product.findAll({
        where,
        include: ['brand', 'section', 'category']
      })
  
      const categories = await db.Category.findAll()
      const brands = await db.Brand.findAll()
      const sections = await db.Section.findAll()
  
      const { items, total } = paginator(products, page, perPage)
  
      return res.render('admin', {
        products: items,
        currentPage: page,
        totalPages: total,
        brands,
        sections,
        categories,
        filterCategory: category,
        search,
        toThousand
      })
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).send('An error occurred while fetching products')
    }
  },
  
  users: async(req, res) => {
      const db = require('../database/models')
      try {
        let users = await db.User.findAll()
        
        const { page, perPage, rol, search } = req.query
        const rols = await db.Rol.findAll() 
    
        if (rol) {
          users = users.filter(user => user.rolId === parseInt(rol))
        }
    
        if (search) {
          users = users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase().trim())
          )
        }
    
        const { items, total } = paginator(users, page, perPage);
    
        return res.render('user', {
          users: items,
          currentPage: page || 1,
          totalPages: total,
          rols,
          filterCategory: rol,
          search,
          toThousand, 
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send('An error occurred while fetching users');
      }
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




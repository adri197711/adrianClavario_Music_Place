const db = require('../database/models')
const { toThousand, paginator } = require('../utils/index.js')
const { Op } = require('sequelize');

module.exports = {
  index: async (req, res) => {
    // const db = require('../database/models')
    try {
      const products = await db.Product.findAll(
        {
          attributes: ['id', 'name', 'price', 'discount', 'description'],
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


      const [products, categories] = await Promise.all([
        db.Product.findAll(options),
        db.Category.findAll(),
        db.Brand.findAll(),
        db.Section.findAll()
        ,])


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

      if (brand) where.brandId = +brand;
      if (section) where.sectionId = +section;
      if (category) where.categoryId = +category;
      if (search) where.name = {
        [db.Sequelize.Op.like]: `%${search.trim().toLowerCase()}%`
      };

      
      const { count, rows } = await db.Product.findAndCountAll({
        where,
        limit: +perPage,
        offset: (+page - 1) * +perPage,

        include: [
          { model: db.Brand, as: 'brand' },
          { model: db.Section, as: 'section' },
          { model: db.Category, as: 'category' },
          { model: db.Image, as: 'images' }
        ],

      })

      const categories = await db.Category.findAll()
      const brands = await db.Brand.findAll()
      const sections = await db.Section.findAll()

      const totalPages = Math.ceil(count / perPage);

      return res.render('admin', {
        products: rows,
        currentPage: +page,
        totalPages,
        brands,
        sections,
        categories,
        filterCategory: brand,
        search,
        toThousand
      })
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).send('An error occurred while fetching products')
    }
  },


  users: async (req, res) => {
    const db = require('../database/models');
    try {
      const { page = 1, perPage = 10, rol, search } = req.query;

      const where = {};

      if (rol) where.rolId = +rol;

      if (search) {
        where.name = {
          [db.Sequelize.Op.like]: `%${search.trim().toLowerCase()}%`
        };

      }
      const { count, rows: users  } = await db.User.findAndCountAll({
        where,
        limit: +perPage,
        offset: (+page - 1) * +perPage,
        include: 
        ['rol'],

      });


      const rols = await db.Rol.findAll();
console.log('ROLS EN ADMIN USERS:', rols.name);
      const totalPages = Math.ceil(count / perPage);

      return res.render('user', {
        users,
        currentPage: +page,
        totalPages,
        rols,
           filterCategory: rol,
        search,
        toThousand,
      })

    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).send('An error occurred while fetching users');
    }
  }
}




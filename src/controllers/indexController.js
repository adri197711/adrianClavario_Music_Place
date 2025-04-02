const db = require('../database/models')
const { toThousand, paginator } = require('../utils/index')

module.exports = {
  index: async (req, res) => {
    try {
      const products = await db.Product.findAll()
      return res.render('index',
        {
          products
        })
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).send('Something went wrong')
    }
  },
  usersAdmin: async (req, res) => {
    try {
      const { page, perPage, category, search } = req.query

      let options

      if (category) {
        options = {
          where : {
            categoryId : category
          }
        }
      }
      const [products, categories] =  await Promise.all([
        db.Product.findAll(options),
        db.Category.findAll()
      ]) 


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
     
      const [products, categories] =  await Promise.all([
        db.Product.findAll({
          include : ['category','section', 'brand']
        }),
        db.Category.findAll()
      ]) 

      return res.render('admin', {
        products,
        toThousand
      })
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).send('An error occurred while fetching products')
    }
  },

  users: async (req, res) => {

    const { User, Rol } = require('../database/models')
    const { page, perPage, rol, search } = req.query

    let whereCondition = {}

    if (rol) {
      whereCondition.rol = rol
    }

    if (search) {
      whereCondition.name = {
        [Sequelize.Op.iLike]: `%${search.toLowerCase().trim()}%`
      }
    }

    const { items, total } = paginator(User, page, perPage)

    return res.render('user', {
      User,
      User: items,
      currentPage: page || 1,
      totalPages: total,
      Rols,
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




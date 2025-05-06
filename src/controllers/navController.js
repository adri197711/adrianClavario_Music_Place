
const { toThousand, paginator } = require('../utils/index');
const upload = require('../middlewares/uploadFile');
const product = require('../database/models/product');

const db = require('../database/models')
module.exports = {
 guitarras: async (req, res) => {
  const db = require('../database/models');
  try {
    const products = await db.Product.findAll({
      attributes: ['id', 'name', 'price', 'discount',  'description'],
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
          attributes: ['id', 'name'],
          where: { name: 'Guitarras' } 
        },
        {
          model: db.Image,
          as: 'images',
          attributes: ['id', 'file'],
       
         association: 'images', attributes: ['file'] },
      ]
    });

    return res.render('nav/guitarras', { products });
      
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).send('Algo salió mal');
  }
},
  baterias: async (req, res) => {
  const db = require('../database/models')
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
            attributes: ['id', 'name'],
            where: { name: 'Baterias' } 
          },
          {
            model: db.Image,
            as: 'images',
            attributes: ['id', 'file'],
         
           association: 'images', attributes: ['file'] }
        ]
      });

    
    return res.render('nav/baterias',
      {
      products
      });
      
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).send('Something went wrong')
  }

},
  amplis: async (req, res) => {
  const db = require('../database/models')
  try {
    const products = await db.Product.findAll(
      {
        attributes: ['id', 'name', 'price','discount','description'],
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
            attributes: ['id', 'name'],
            where: { name: 'Amplificadores' } 
          },
          {
            model: db.Image,
            as: 'images',
            attributes: ['id', 'file'],
         
           association: 'images', attributes: ['file'] }
        ]
      });

    
    return res.render('nav/amplis',
      {
      products
      });
      
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).send('Something went wrong')
  }

},
  bajos: async (req, res) => {
  const db = require('../database/models')
  try {
    const products = await db.Product.findAll(
      {
        attributes: ['id', 'name', 'price','discount','description'],
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
            attributes: ['id', 'name'],
            where: { name: 'Bajos' } 
          },
          {
            model: db.Image,
            as: 'images',
            attributes: ['id', 'file'],
         
           association: 'images', attributes: ['file'] }
        ]
      });

    
    return res.render('nav/bajos',
      {
      products
      });
      
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).send('Something went wrong')
  }

},
  teclados: async (req, res) => {
  const db = require('../database/models')
  try {
    const products = await db.Product.findAll(
      {
        attributes: ['id', 'name', 'price','discount','description'],
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
            attributes: ['id', 'name'],
            where: { name: 'Teclados' } 
          },
          {
            model: db.Image,
            as: 'images',
            attributes: ['id', 'file'],
         
           association: 'images', attributes: ['file'] }
        ]
      });

    
    return res.render('nav/teclados',
      {
      products
      });
      
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).send('Something went wrong')
  }

  },
  audio: async (req, res) => {
  const db = require('../database/models')
  try {
    const products = await db.Product.findAll(
      {
        attributes: ['id', 'name', 'price','discount','description'],
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
            attributes: ['id', 'name'],
            where: { name: 'Audio' } 
          },
          {
            model: db.Image,
            as: 'images',
            attributes: ['id', 'file'],
         
           association: 'images', attributes: ['file'] }
        ]
      });

    
    return res.render('nav/audio',
      {
      products
      });
      
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).send('Something went wrong')
  }

  },
  accesorios: async (req, res) => {
    const db = require('../database/models');
    try {
      const sectionName = req.query.section;
      const products = await db.Product.findAll({
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
            attributes: ['id', 'name'],
            where: { name: 'Accesorios' }
           } ,
            {
              model: db.Image,
              as: 'images',
              attributes: ['id', 'file'],
           
             association: 'images', attributes: ['file'] }
        ]
      });
  
      return res.render('nav/accesorios', { products });
        
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).send('Something went wrong');
    }
  }
  
}
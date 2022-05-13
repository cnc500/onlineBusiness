const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Finds all categories with its associated Products
  try {
    const category = await Category.findAll({
      include:[
        {
         model: Product,
         attributes:['product_name'] 
        }
      ]
    })
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // Finds one category by its `id` value with its associated Products
  try {
    const category = await Category.findOne({
      where: {id: req.params.id},
      include:[
        {
         model: Product,
         attributes:['product_name'] 
        }
      ]
    })
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  // Creates a new category
  try {
    const category = await Category.create({
      category_name : req.body.category_name
    })
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // Updates a category by its `id` value
  try {
    const category = await Category.update(req.body,{
      where: {id: req.params.id},
    }) 
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // Deletes a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {id: req.params.id},
    })
    res.status(200).json("Category has been deleted") 
  } catch (error) {
    res.status(400).json(error);
  }  
});

module.exports = router;

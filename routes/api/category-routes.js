const router = require('express').Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {

    // Fetch all categories including associated products
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    // Handle errors with a 500 Internal Server Error response
    res.status(500).json(err);
  }
});

// GET a category by ID
router.get('/:id', async (req, res) => {
  try {

    // Find a category by its primary key (ID) including associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If no category is found with the given ID, return a 404 Not Found response
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// POST a new category
router.post('/', async (req, res) => {
  try {

    // Create a new category using the request body
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a category with the given ID using the request body
    const updatedCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no category was updated, return a 404 Not Found response
    if (!updatedCategoryData[0]) {
      res.status(404).json({ message: 'No updated category with this id!' });
      return;
    }
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {

    // Delete a category with the given ID
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in other parts of the application
module.exports = router;

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
    res.status(500).json(err);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
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


module.exports = router;

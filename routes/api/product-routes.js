const router = require("express").Router();
const { Router } = require("express");
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint
// GET all products
router.get("/", async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a product by ID
router.get("/:id", async (req, res) => {
  try {
    // Find a product by its primary key (ID) and include associated Category and Tag data
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new product
router.post("/", async (req, res) => {
  try {
    // Create a new product using 'Product.create()' method
    const product = await Product.create(req.body);

    // If there are product tags, create pairings to bulk create in the 'ProductTag' model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
      // Send the newly created 'productTagIds'
      res.status(200).json(product);
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT (update) a product by ID
router.put("/:id", async (req, res) => {
  // Update a product with the given ID using the request body
  const product = await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (req.body.tagIds && req.body.tagIds.length) {
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

    // Calculate product tags to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
    // run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  }

  return res.json(product);
});



router.delete("/:id", (req, res) => {
});

module.exports = router;

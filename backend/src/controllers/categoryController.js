const categoryService = require("../services/categoryService");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const createdCategory = await categoryService.createCategory(req.body);

      res.status(200).json({
        message: "Categoria criada com sucesso!",
        createdCategory,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = categoryController;

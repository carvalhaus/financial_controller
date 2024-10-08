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

  getCategories: async (req, res) => {
    const { userId } = req.params;
    try {
      const categories = await categoryService.getCategories(userId);

      res.status(200).json({
        message: "Categorias recebidas com sucesso!",
        categories,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await categoryService.getCategory(id);

      res.status(200).json({
        message: "Categoria recebida com sucesso!",
        category,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await categoryService.updateCategory(req.body);

      res.status(200).json({
        message: "Categoria atualizada com sucesso!",
        updatedCategory,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await categoryService.deleteCategory(id);

      res.status(200).json({
        message: "Categoria deletada com sucesso!",
        category,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = categoryController;

import Category from "../Model/CategoryModal.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({
      name: name,
    });
    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

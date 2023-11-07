const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
}, {
    timestamps: true,
})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
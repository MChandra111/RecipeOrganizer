const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const ingredients = req.body.ingredients;
    const steps = req.body.steps;

    const newRecipe = new Recipe({
        name,
        description,
        ingredients,
        steps,
    });
    
    newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get( async (req, res) => {
    const searchTerm = req.query.term;
    const results = await Recipe.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { ingredients: { $in: [searchTerm] }}
        ],
      });
    res.json(results);
});

router.route('/sort').get( async (req, res) => {
    const sortBy = req.query.sortBy;
    const results = await YourModel.find().sort(sortBy);
    res.json(results);
});

module.exports = router;
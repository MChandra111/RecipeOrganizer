const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
    }
);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})

const recipesRouter = require('./routes/recipes');

app.use('/recipes', recipesRouter);

app.listen(PORT, () => {
    console.log(`Server is runnin on Port ${PORT}`);
})

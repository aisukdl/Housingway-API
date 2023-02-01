require('dotenv').config();
const express = require('express');
const {sequelize} = require('./models');
const app = express();
// sequelize.sync({force:true});
const port = process.env.PORT || 8000;
app.listen(port, () =>
    console.log(`server running on port : ${port}`)
)
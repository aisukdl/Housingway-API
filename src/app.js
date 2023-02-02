require('dotenv').config();
const express = require('express');
const {sequelize} = require('./models');
const authRoute = require('./routes/auth-route')

const app = express();
// sequelize.sync({force:true});

app.use(express.json())

app.use('/auth',authRoute)



const port = process.env.PORT || 8000;
app.listen(port, () =>
    console.log(`server running on port : ${port}`)
)
require('dotenv').config();
const express = require('express');
const {sequelize} = require('./models');
const cors = require('cors')
const authRoute = require('./routes/auth-route')
const orderRoute = require('./routes/order-route')
const rateLimit = require('express-rate-limit')
const authenticateMiddleware = require('./middlewares/authenticate');
const queueRoute = require('./routes/queue-route')
const utilRoute = require('./routes/util-route')

const app = express();
// sequelize.sync({alter:true});


app.use(
    rateLimit({
      windowMs: 1000 * 60 * 15,
      max: 1000,
      message: { message: 'too many requests, please try again later' }
    })
  );
app.use(cors());
app.use(express.json())

app.use('/auth',authRoute)
app.use('/order',authenticateMiddleware,orderRoute)
app.use('/',queueRoute)
app.use('/util',utilRoute)



const port = process.env.PORT || 8000;
app.listen(port, () =>
    console.log(`server running on port : ${port}`)
)
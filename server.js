//MongoDB
require('./config/db');

//Express
const express = require('express');
const app = express();
app.use(express.json());

const port = 3000 || process.env.PORT ;

const UserRouter = require('./routes/User');
const quoteRouter = require('./routes/Quotes');

app.use('/users', UserRouter);
app.use('/quotes', quoteRouter);

app.listen(port, () => {
 console.log('server running at port ' + port);
})

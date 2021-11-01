//MongoDB
require('./config/db');

//Express
const express = require('express');
const app = express();
app.use(express.json());


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

const UserRouter = require('./routes/User');
const quoteRouter = require('./routes/Quotes');

app.use('/users', UserRouter);
app.use('/quotes', quoteRouter);

app.listen(port, () => {
 console.log('server running at port ' + port);
})

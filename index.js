const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const adminRoutes = require('./routes/admin');

app.set('views', 'views'); // general config
app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const errorController = require('./controllers/error');

app.use('/admin', adminRoutes);

app.use(errorController.get404);

app.listen(3000);


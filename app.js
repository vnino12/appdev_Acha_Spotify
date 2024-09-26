const express = require('express');
const app = express();
const routes = require('./routes/router');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); 
app.set('view engine', 'ejs');


app.use('/', routes);

app.listen(2321, () => {
    console.log('Server is running on http://localhost:2321');
});

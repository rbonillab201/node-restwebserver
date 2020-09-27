require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const e = require('express');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index'));
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, resp) => {
    console.log(process.env.URLDB);
    if (err) throw err;

    console.log(`Se la logrado conectar con exito ${resp}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto  ${process.env.PORT} `);
});
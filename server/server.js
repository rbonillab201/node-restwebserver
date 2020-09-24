require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/usuario', function(req, res) {
    res.json('Hola Mundo');
});

app.post('/usuario', function(req, res) {
    let datos = req.body;

    if (datos.nombre === undefined) {
        res.status(400).json({
            mensaje: 'El nombre es obligatorio',
            ok: false
        });
    } else {
        res.json({
            persona: datos
        });
    }

});

app.put('/usuario/:id', function(req, res) {

    let clave = req.params.id;

    res.json(clave);
});


app.get('/', function(req, res) {
    res.json('Hola Mundo');
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto  ${process.env.PORT} `);
});
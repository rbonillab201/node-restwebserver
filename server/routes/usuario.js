const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { validaToken, validaRoleAdmin } = require('../middleware/autentication');
app = express();

app.get('/usuario', validaToken, (req, res) => {

    /* validando el valor que se ha pasado desde el validaToken
    return res.json({
        usuario: req.usuario
    }) */

    let limite = req.query.limite || 5;
    let salto = req.query.salto || 5;
    limite = Number(limite);
    salto = Number(salto);

    let estadoActivo = {
        estado: true
    };

    Usuario.find(estadoActivo, 'nombre email role google estado')
        .skip(salto)
        .limit(limite)
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments(estadoActivo, (err, conteo) => {
                return res.json({
                    ok: true,
                    registros: conteo,
                    usuario
                });
            });

        });

});

app.post('/usuario', [validaToken, validaRoleAdmin], (req, res) => {
    let datos = req.body;

    let usuario = new Usuario({
        nombre: datos.nombre,
        email: datos.email,
        password: bcrypt.hashSync(datos.password, 10),
        role: datos.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', [validaToken, validaRoleAdmin], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    //  res.json(`Se ha actualizado el usuario de código ${id}`);
});

app.delete('/usuarioU/:id', [validaToken, validaRoleAdmin], (req, res) => {
    let id = req.params.id;
    //  let body = _.pick(req.body, ['estado']); esta es una forma
    let estadoFalse = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, estadoFalse, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioDB === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se ha encontrado'
                }
            });
        }
        console.log(usuarioDB);

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', validaToken, (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe este código ${id} de usuario`
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado,
            message: `Registro ${id} borrado satisfactoriamente`
        });
    });
    //  res.json(`Se ha borrado el usuario de código ${id}`);
});

/*
app.get('/', function(req, res) {
    res.json('Hola Mundo desde el /');
});*/

module.exports = app;
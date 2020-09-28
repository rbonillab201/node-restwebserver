const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();


app.post('/login', (req, resp) => {

    let email = req.body.email;
    let password = req.body.password;

    Usuario.findOne({ email: email }, (err, usuarioDB) => {

        if (err) {
            return resp.status(500).json({
                ok: false,
                url: process.env.URLDB,
                err
            });
        }

        if (!usuarioDB) {
            return resp.status(400).json({

                ok: false,
                url: process.env.URLDB,
                err: {
                    message: '(Usuario) y contraseña no son válidos'
                }
            });
        } else {
            if (!bcrypt.compareSync(password, usuarioDB.password)) {

                return resp.status(400).json({
                    ok: false,
                    url: process.env.URLDB,
                    err: {
                        message: 'Usuario y (contraseña) no son válidos'
                    }
                });
            }
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.TOKEN_CADUCA });

        resp.json({
            ok: true,
            url: process.env.URLDB,
            usuario: usuarioDB,
            token
        });
    });
});

module.exports = app;
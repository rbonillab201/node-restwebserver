//=========================
// validacion de token
//=========================

const jwt = require('jsonwebtoken');

let validaToken = (req, resp, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
        if (err) {
            return resp.status(401).json({
                ok: false,
                err
            });
        }
        console.log(decoded.usuario);
        req.usuario = decoded.usuario;
        next();
    });
};

let validaRoleAdmin = (req, resp, next) => {
    console.log(' -->  ' + req.usuario);

    if (req.usuario.role !== 'ADMIN_ROLE') {
        return resp.status(401).json({
            ok: false,
            err: 'No tiene un rol adecuado para ejecutar esta acción'
        });
    }
    if (!req.usuario.estado) {
        return resp.status(401).json({

            ok: false,
            err: 'Usuario no está activo'
        });
    }
    next();
};

module.exports = {
    validaToken,
    validaRoleAdmin
};
// ==========================
// Configuración
// ==========================

process.env.PORT = process.env.PORT || 3000;

// ==========================
// Environment
// ==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==========================
// DataBase
// ==========================

let urlString;

if (process.env.NODE_ENV === 'dev') {
    urlString = 'mongodb://localhost:27017/cafe';
} else {
    urlString = process.env.DBURI; // DBURI es una variable configurada a nivel de Heroku mediante heroku config:set DBURI="VALOR"
}

process.env.URLDB = urlString;
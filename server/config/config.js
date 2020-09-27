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
    urlString = process.env.BDURI; // BDURI es una variable configurada a nivel de Heroku mediante heroku config:set DBURI="VALOR"
}
process.env.URLDB = urlString;

// ==========================
// Caducidad Token
// ==========================
// 30 segundos, 30 minutos, 24 horas, 30 días

process.env.TOKEN_CADUCA = 30 * 30 * 24 * 30;

// ==========================
// seed Token
// ==========================
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'esta-es-una-prueba-%^&';
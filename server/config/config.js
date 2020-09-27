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
    urlString = 'mongodb+srv://renatio:zNLOC8hmcIv2eoV6@cluster0.epper.mongodb.net/cafe';
}

process.env.URLDB = urlString;
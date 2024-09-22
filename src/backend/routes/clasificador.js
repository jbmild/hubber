const { handleTraerClasificacion } = require("../handlers/clasificacionHandler");

module.exports = function (app){
    app.get('/clasificador',
    handleTraerClasificacion
    );
}
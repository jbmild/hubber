const { handleTraerPosiciones } = require("../handlers/posicionesHandler");

module.exports = function (app){
    app.get('/mercados',
    handleTraerPosiciones
    );
}
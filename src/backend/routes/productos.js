const { handleTraerProductos } = require("../handlers/normativasHandler");

module.exports = function (app){
    app.get('/productos',
        handleTraerProductos
    )    
}
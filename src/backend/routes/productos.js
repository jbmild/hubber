const { handleTraerProductos } = require("../handlers/productosHandler");

module.exports = function (app){
    app.get('/productos',
        handleTraerProductos
    )    
}
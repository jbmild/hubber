const { handleTraerNormativas } = require("../handlers/normativasHandler");

module.exports = function (app){
    app.get('/normativas',
    handleTraerNormativas
    );
}
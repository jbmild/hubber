const { handleTraerPaises } = require("../handlers/normativasHandler");


module.exports = function (app) {
    app.get(
        '/paises',
        handleTraerPaises
    );
}

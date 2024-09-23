const { handleTraerHijos, handleTraerSecciones } = require("../handlers/arbolPosicionesHandler");

module.exports = function (app){
    app.get(
        '/arbol/hijos',
        handleTraerHijos
    );

    app.get(
        '/arbol/secciones',
        handleTraerSecciones
    );
}
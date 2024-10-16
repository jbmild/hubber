const express = require('express');

const Productos = require('../models/productos');

exports.handleTraerProductos = async (req, res) => {
    const productos = await Productos.find( { producto: { $regex: req.query.search, $options: 'i' } }, { _id: 0 }).exec();

    res.status(200).json(productos.map(p => (p.producto)));
}

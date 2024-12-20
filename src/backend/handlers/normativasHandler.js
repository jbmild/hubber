const express = require('express');

const Normativa = require('../models/normativas');
const Users = require('../models/users');

exports.handleTraerPaises = async (req, res) => {
  const paises = await Normativa.aggregate([
    {
      $group: {
          _id: "$pais"
      }
    },
    {
      $project: {
          _id: 0,
          pais: "$_id"
      }
    },
    {
      $match: {
        pais: { $ne: "Argentina" }
      }
    }
    
  ])

  res.status(200).json(paises);
}

exports.handleTraerNormativas = async (req, res) => {
  try{
    const prod = req.query.producto;
    const listaCodigos = [prod, prod.substr(0,2), prod.substr(0,4)];
    const filters = {
      $and:[
        {$or: [
          { codigos: { $in:  listaCodigos } },
          { etiquetas: { $in: req.query.producto } }
        ]},
        { pais: req.query.pais }
      ] 
    }

    const result = await traerNormativasPaginado(req.query.page, req.query.limit, filters, req.user._id);

    res.status(200).json(result);

  }catch(err){
    console.error('Error:', err);
    res.status(500);
  }
}

async function traerNormativasPaginado(page, limit, filters, idUsuario) {
  const skip = page * limit;

  const normativas = await Normativa.find(filters, { etiquetas: 0, codigos: 0}).
    skip(skip).limit(limit).exec();

  const totalItems = await Normativa.countDocuments(filters).exec();

  return {
    items: normativas,
    page,
    limit,
    totalItems
  };
}

async function traerNormativasPorPais(pais) {
  return normativas = await Normativa.find({ pais: pais}, { _id: 0, codigos: 0 }).exec();
}

exports.traerNormativasPorPais = traerNormativasPorPais;
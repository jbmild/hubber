const express = require('express');

const Normativa = require('../models/normativas');

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
    }
  ])

  res.status(200).json(paises);
}

exports.handleTraerNormativas = async (req, res) => {
  try{
    console.log(req.query);
    const filters = {
      $and:[
        { 
          $or: [
            { codigos: { $in:  req.query.producto } },
            { etiquetas: { $in:  req.query.producto } }
          ]
        },
        { pais: req.query.pais }
      ] 
    }

    const result = await traerNormativasPaginado(req.query.page, req.query.limit, filters);

    res.status(200).json(result);

  }catch(err){
    console.error('Error:', err);
    res.status(500);
  }
}

async function traerNormativasPaginado(page, limit, filters) {
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
  return normativas = await Normativa.find({ pais: pais}, { _id: 0 }).exec();
}

exports.traerNormativasPorPais = traerNormativasPorPais;
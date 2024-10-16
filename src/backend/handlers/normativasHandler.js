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
    }
  ])

  res.status(200).json(paises);
}

exports.handleTraerNormativas = async (req, res) => {
  try{
    const filters = {
      $and:[
        {$or: [
          { codigos: { $in:  req.query.producto } },
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
  
  const userInfo = await Users.findById(idUsuario).populate('normativasUsuario.idNormativa');

  const normativas = await Normativa.find(filters, { etiquetas: 0, codigos: 0}).
    skip(skip).limit(limit).exec();

  const totalItems = await Normativa.countDocuments(filters).exec();

  const normativasConInfoUsuario = normativas.map(normativa => {
    const info = userInfo ? userInfo.normativasUsuario.find(n => n.idNormativa._id.equals(normativa._id)) : null;

    return {
      ...normativa.toObject(), // Convertir a objeto simple
      fechaAprobacion: info ? info.fechaAprobacion : null,
      status: info ? info.status : null
    };
  });

  return {
    items: normativasConInfoUsuario,
    page,
    limit,
    totalItems
  };
}

async function traerNormativasPorPais(pais) {
  return normativas = await Normativa.find({ pais: pais}, { _id: 0 }).exec();
}

exports.traerNormativasPorPais = traerNormativasPorPais;
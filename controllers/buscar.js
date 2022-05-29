const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'

];

const buscarUsuarios = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //true
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: [usuario]
        });
    }

    const regexp = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regexp }, { correo: regexp }]
    });

    res.json({
        results: usuarios
    })


}

const buscarProductos = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //true
    if (esMongoID) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: [producto]
        });
    }

    const regexp = new RegExp(termino, 'i');

    const productos = await Producto.find({
        nombre: regexp

    });

    res.json({
        results: productos
    })


}

const buscarCategoria = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //true
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: [categoria]
        });
    }

    const regexp = new RegExp(termino, 'i');

    const categorias = await Categoria.find({
        nombre: regexp

    });

    res.json({
        results: categorias
    })


}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las Colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);

            break;
        case 'categoria':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: "No se pudo hacer la búsqueda"
            });
    }





}

module.exports = {
    buscar
}
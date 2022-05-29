const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');


const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const esEmailValido = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD`)
    }
}

const existeUsuarioPorId = async(id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
}

const existeCategoriaPorID = async(id) => {
    //Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
}

const existeProductoPorID = async(id) => {
    //Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ${id} no existe en la BD`)
    }
}


module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId,
    existeCategoriaPorID,
    existeProductoPorID
}
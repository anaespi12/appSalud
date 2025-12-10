const pool = require('../db/mysql');
const Paciente = require('../models/paciente');


const listar = async () => {
    // Ejecutamos la consulta SQL para obtener todos los pacientes
    const [results] = await pool.query('SELECT * FROM pacientes');

    // Convertimos cada registro en una instancia del modelo Paciente
    const pacientes = results.map(p => new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        p.fechaDeNacimiento
    ));

    // Devolvemos el listado de pacientes
    return pacientes;
    
};


module.exports = {
    listar
};
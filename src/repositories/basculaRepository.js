const pool = require('../db/mysql');
const Bascula = require('../models/bascula');


const listar = async (paciente_id) => {
    // Ejecutamos la consulta SQL para obtener todos los registros de bascula de un paciente
    const [results] = await pool.query('SELECT * FROM basculas WHERE paciente_id = ? ORDER BY fecha DESC', [paciente_id]);

    // Devolvemos los resultados
    return results;
};

const guardar = async (bascula) => {
    // Ejecutamos la consulta SQL para insertar un nuevo registro de bascula
    const [results] = await pool.query(
        'INSERT INTO basculas (paciente_id, peso, altura, fecha) VALUES (?, ?, ?, ?)',
        [bascula.paciente_id, bascula.peso, bascula.altura, bascula.fecha]
    );
    
    // Devolvemos el ID del nuevo registro
    return results.insertId;
};

const buscarPorId = async (id) => {
    // Ejecutamos la consulta SQL para buscar un registro de bascula por su ID
    const [results] = await pool.query('SELECT * FROM basculas WHERE id = ?', [id]);
    
    if (results.length === 0) {
        return null;
    }

    return results[0];
};

const actualizar = async (bascula) => {
    // Ejecutamos la consulta SQL para actualizar un registro de bascula
    await pool.query(
        'UPDATE basculas SET peso = ?, altura = ?, fecha = ? WHERE id = ?',
        [bascula.peso, bascula.altura, bascula.fecha, bascula.id]
    );
    
    return bascula;
};

const eliminar = async (id) => {
    // Ejecutamos la consulta SQL para eliminar un registro de bascula
    const [results] = await pool.query('DELETE FROM basculas WHERE id = ?', [id]);
    
    if (results.affectedRows === 0) {
        return false;
    }
    
    return true;
};

module.exports = {
    listar,
    guardar,
    buscarPorId,
    actualizar,
    eliminar
};

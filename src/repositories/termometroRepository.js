const pool = require('../db/mysql');


const listar = async (paciente_id) => {
    // Ejecutamos la consulta SQL para obtener todos los registros de termometro de un paciente
    const [results] = await pool.query('SELECT * FROM termometro WHERE paciente_id = ? ORDER BY fecha DESC', [paciente_id]);

    // Devolvemos los resultados
    return results;
};

const guardar = async (termometro) => {
    // Ejecutamos la consulta SQL para insertar un nuevo registro de termometro
    const [results] = await pool.query(
        'INSERT INTO termometro (paciente_id, temperatura, fecha) VALUES (?, ?, ?)',
        [termometro.paciente_id, termometro.temperatura, termometro.fecha]
    );
    
    // Devolvemos el ID del nuevo registro
    return results.insertId;
};

const buscarPorId = async (id) => {
    // Ejecutamos la consulta SQL para buscar un registro de termometro por su ID
    const [results] = await pool.query('SELECT * FROM termometro WHERE id = ?', [id]);
    
    if (results.length === 0) {
        return null;
    }

    return results[0];
};

const actualizar = async (termometro) => {
    // Ejecutamos la consulta SQL para actualizar un registro de termometro
    await pool.query(
        'UPDATE termometro SET temperatura = ?, fecha = ? WHERE id = ?',
        [termometro.temperatura, termometro.fecha, termometro.id]
    );
    
    return termometro;
};

const eliminar = async (id) => {
    // Ejecutamos la consulta SQL para eliminar un registro de termometro
    const [results] = await pool.query('DELETE FROM termometro WHERE id = ?', [id]);
    
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

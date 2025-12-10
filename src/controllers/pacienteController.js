const pacienteRepository = require('../repositories/pacienteRepository.js');

const obtenerPaciente = async (req, res ) => {
    const { id } = req.params;
    const paciente = await pacienteRepository.obtenerPorId(id);
    res.render('paciente', {
        title: 'Detalles del Paciente',
        paciente
    });
};

const crearPaciente = async (req, res ) => {

};
const actualizarPaciente = async (req, res ) => {

};

const eliminarPaciente = async (req, res) => {
};


const listarPaciente = async (req, res ) => {
    const pacientes = await pacienteRepository.listar();
    res.render('index', { 
        title: ' App Salud',
        pacientes,
        message: 'Bienvenidos a la App Salud' });
};


module.exports = {
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
    listarPaciente
};
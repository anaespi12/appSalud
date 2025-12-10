const pacienteRepository = require('../repositories/pacienteRepository.js');

const obtenerPaciente = async (req, res ) => {
    
    const id  = req.params.id;
    if (!id) {
        return res.status(400).send('El ID de paciente es obligatorio');
    }
    const paciente = await pacienteRepository.buscarPorId(id);
    if (!paciente) {
        return res.render('buscar', {
            title: 'App Salud',
            message: 'Error: Paciente no encontrado'});
    }

    //Si existe el paciente, lo mostramos
    res.render('buscar', {
        title: 'App Salud',
        paciente,
        message: 'Paciente encontrado'});
            
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
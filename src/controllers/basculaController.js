const basculaRepository = require('../repositories/basculaRepository.js');
const pacienteRepository = require('../repositories/pacienteRepository.js');
const Bascula = require('../models/bascula');

const listarBascula = async (req, res) => {
    const paciente_id = req.params.paciente_id;
    
    if (!paciente_id) {
        return res.status(400).send('El ID de paciente es obligatorio');
    }
    
    const paciente = await pacienteRepository.buscarPorId(paciente_id);
    if (!paciente) {
        return res.status(404).send('Paciente no encontrado');
    }
    
    const registros = await basculaRepository.listar(paciente_id);
    
    // Calcular valores derivados para cada registro
    const registrosConIMC = registros.map(r => ({
        ...r,
        imc: (r.peso / (r.altura * r.altura)).toFixed(2)
    }));
    
    // Crear instancia de Bascula para obtener valores agregados
    const bascula = new Bascula();
    registros.forEach(r => {
        bascula.anotarPeso(r.peso, r.altura);
    });
    
    const imcActual = bascula.calcularIMCO();
    const descripcionIMC = imcActual ? bascula.describirIMC(imcActual) : 'N/A';
    
    res.render('bascula/listar', {
        title: 'App Salud - Báscula',
        paciente,
        registros: registrosConIMC,
        bascula,
        imcActual,
        descripcionIMC,
        message: 'Registros de báscula'
    });
};

const mostrarFormularioAgregarBascula = async (req, res) => {
    const paciente_id = req.params.paciente_id;
    
    if (!paciente_id) {
        return res.status(400).send('El ID de paciente es obligatorio');
    }
    
    const paciente = await pacienteRepository.buscarPorId(paciente_id);
    if (!paciente) {
        return res.status(404).send('Paciente no encontrado');
    }
    
    res.render('bascula/agregar', {
        title: 'App Salud - Agregar Báscula',
        paciente,
        message: ''
    });
};

const agregarBascula = async (req, res) => {
    const paciente_id = req.params.paciente_id;
    const { peso, altura, fecha } = req.body;
    
    if (!paciente_id || !peso || !altura || !fecha) {
        const paciente = await pacienteRepository.buscarPorId(paciente_id);
        return res.render('bascula/agregar', {
            title: 'App Salud - Agregar Báscula',
            paciente,
            message: 'Error: Todos los campos son obligatorios'
        });
    }
    
    const nuevoRegistro = {
        paciente_id,
        peso: parseFloat(peso),
        altura: parseFloat(altura),
        fecha
    };
    
    await basculaRepository.guardar(nuevoRegistro);
    res.redirect(`/bascula/${paciente_id}`);
};

const actualizarBascula = async (req, res) => {
    const { id, peso, altura, fecha } = req.body;
    const paciente_id = req.params.paciente_id;
    
    if (!peso || !altura || !fecha) {
        const registros = await basculaRepository.listar(paciente_id);
        const paciente = await pacienteRepository.buscarPorId(paciente_id);
        return res.render('bascula/listar', {
            title: 'App Salud - Báscula',
            paciente,
            registros,
            message: 'Error: Todos los campos son obligatorios'
        });
    }
    
    const registroActualizado = {
        id,
        peso: parseFloat(peso),
        altura: parseFloat(altura),
        fecha
    };
    
    await basculaRepository.actualizar(registroActualizado);
    res.redirect(`/bascula/${paciente_id}`);
};

const eliminarBascula = async (req, res) => {
    const id = req.params.id;
    const paciente_id = req.params.paciente_id;
    
    const eliminado = await basculaRepository.eliminar(id);
    const message = eliminado ? 'Registro eliminado correctamente' : 'Error al eliminar';
    
    res.redirect(`/bascula/${paciente_id}`);
};

module.exports = {
    listarBascula,
    mostrarFormularioAgregarBascula,
    agregarBascula,
    actualizarBascula,
    eliminarBascula
};

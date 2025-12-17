const termometroRepository = require('../repositories/termometroRepository.js');
const pacienteRepository = require('../repositories/pacienteRepository.js');
const Termometro = require('../models/termometro');

const listarTermometro = async (req, res) => {
    const paciente_id = req.params.paciente_id;
    
    if (!paciente_id) {
        return res.status(400).send('El ID de paciente es obligatorio');
    }
    
    const paciente = await pacienteRepository.buscarPorId(paciente_id);
    if (!paciente) {
        return res.status(404).send('Paciente no encontrado');
    }
    
    const registros = await termometroRepository.listar(paciente_id);
    
    // Crear instancia de Termometro para obtener valores agregados
    const termometro = new Termometro();
    registros.forEach(r => {
        termometro.anotarTemperatura(r.temperatura);
    });
    
    const tempMaxima = termometro.obtenerTemperaturaMaxima();
    const tempMinima = termometro.obtenerTemperaturaMinima();
    const tempActual = registros.length > 0 ? registros[0].temperatura : null;
    const fahrenheitActual = tempActual ? termometro.convertirCelsiusAFahrenheit(tempActual).toFixed(2) : null;
    
    // Calcular estado para cada registro
    const registrosConEstado = registros.map(r => ({
        ...r,
        fahrenheit: termometro.convertirCelsiusAFahrenheit(r.temperatura).toFixed(2),
        estado: r.temperatura < 36.5 ? 'Baja' : 
                r.temperatura <= 37.5 ? 'Normal' : 
                r.temperatura <= 38.5 ? 'Fiebre Leve' : 'Fiebre Alta',
        badgeClass: r.temperatura < 36.5 ? 'info' : 
                    r.temperatura <= 37.5 ? 'success' : 
                    r.temperatura <= 38.5 ? 'warning' : 'danger'
    }));
    
    res.render('termometro/listar', {
        title: 'App Salud - Termómetro',
        paciente,
        registros: registrosConEstado,
        termometro,
        tempMaxima,
        tempMinima,
        tempActual,
        fahrenheitActual,
        message: 'Registros de termómetro'
    });
};

const mostrarFormularioAgregarTermometro = async (req, res) => {
    const paciente_id = req.params.paciente_id;
    
    if (!paciente_id) {
        return res.status(400).send('El ID de paciente es obligatorio');
    }
    
    const paciente = await pacienteRepository.buscarPorId(paciente_id);
    if (!paciente) {
        return res.status(404).send('Paciente no encontrado');
    }
    
    res.render('termometro/agregar', {
        title: 'App Salud - Agregar Termómetro',
        paciente,
        message: ''
    });
};

const agregarTermometro = async (req, res) => {
    const paciente_id = req.params.paciente_id;
    const { temperatura, fecha } = req.body;
    
    if (!paciente_id || !temperatura || !fecha) {
        const paciente = await pacienteRepository.buscarPorId(paciente_id);
        return res.render('termometro/agregar', {
            title: 'App Salud - Agregar Termómetro',
            paciente,
            message: 'Error: Todos los campos son obligatorios'
        });
    }
    
    const nuevoRegistro = {
        paciente_id,
        temperatura: parseFloat(temperatura),
        fecha
    };
    
    await termometroRepository.guardar(nuevoRegistro);
    res.redirect(`/termometro/${paciente_id}`);
};

const actualizarTermometro = async (req, res) => {
    const { id, temperatura, fecha } = req.body;
    const paciente_id = req.params.paciente_id;
    
    if (!temperatura || !fecha) {
        const registros = await termometroRepository.listar(paciente_id);
        const paciente = await pacienteRepository.buscarPorId(paciente_id);
        return res.render('termometro/listar', {
            title: 'App Salud - Termómetro',
            paciente,
            registros,
            message: 'Error: Todos los campos son obligatorios'
        });
    }
    
    const registroActualizado = {
        id,
        temperatura: parseFloat(temperatura),
        fecha
    };
    
    await termometroRepository.actualizar(registroActualizado);
    res.redirect(`/termometro/${paciente_id}`);
};

const eliminarTermometro = async (req, res) => {
    const id = req.params.id;
    const paciente_id = req.params.paciente_id;
    
    const eliminado = await termometroRepository.eliminar(id);
    const message = eliminado ? 'Registro eliminado correctamente' : 'Error al eliminar';
    
    res.redirect(`/termometro/${paciente_id}`);
};

module.exports = {
    listarTermometro,
    mostrarFormularioAgregarTermometro,
    agregarTermometro,
    actualizarTermometro,
    eliminarTermometro
};

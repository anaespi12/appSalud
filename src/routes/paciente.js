const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/pacienteController.js');

router
    .get('/paciente', pacienteController.obtenerPaciente)
    .post('/paciente', pacienteController.crearPaciente)
    .put('/paciente/:id', pacienteController.actualizarPaciente)
    .delete('/paciente/:id', pacienteController.eliminarPaciente)
    .get('/pacientes', pacienteController.listarPaciente);

module.exports = router;

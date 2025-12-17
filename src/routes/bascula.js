const express = require('express');
const router = express.Router();
const basculaController = require('../controllers/basculaController');
const termometroController = require('../controllers/termometroController');

// Rutas para Báscula
router.get('/bascula/:paciente_id', basculaController.listarBascula);
router.get('/bascula/:paciente_id/agregar', basculaController.mostrarFormularioAgregarBascula);
router.post('/bascula/:paciente_id', basculaController.agregarBascula);
router.put('/bascula/:paciente_id/:id', basculaController.actualizarBascula);
router.delete('/bascula/:paciente_id/:id', basculaController.eliminarBascula);

// Rutas para Termómetro
router.get('/termometro/:paciente_id', termometroController.listarTermometro);
router.get('/termometro/:paciente_id/agregar', termometroController.mostrarFormularioAgregarTermometro);
router.post('/termometro/:paciente_id', termometroController.agregarTermometro);
router.put('/termometro/:paciente_id/:id', termometroController.actualizarTermometro);
router.delete('/termometro/:paciente_id/:id', termometroController.eliminarTermometro);

module.exports = router;
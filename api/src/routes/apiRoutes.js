const router = require('express').Router();

const userController = require("../controllers/userController");
const organizerController = require("../controllers/organizerController");

//Rotas Usuário
router.post('/user', userController.createUser);
router.get('/user',userController.getAllUsers);
router.put('/user',userController.updateUser);
router.delete('/user/:cpf',userController.deleteUser);

//Rotas Organizador
router.post('/organizador', organizerController.createOrganizer);
router.get('/organizador', organizerController.getAllOrganizer);
router.put('/organizador', organizerController.updateOganizer);
router.delete('/organizador/:id', organizerController.deleteOrganizer);

module.exports = router
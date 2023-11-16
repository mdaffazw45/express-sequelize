const express = require('express');
const { getUser, addUser, editUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUser)
router.post('/add', addUser)
router.put('/edit/:userId', editUser)
router.delete('/delete/:userId', deleteUser);

module.exports = router;
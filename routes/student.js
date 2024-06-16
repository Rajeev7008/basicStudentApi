const express = require('express')
const {registerStudent, ReadStudent, updateStudent, deleteStudent} = require('../controllers/student')

const router = express.Router();

router.post('/', registerStudent)
router.get('/', ReadStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

module.exports = router;
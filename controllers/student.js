const shortid = require('shortid');
const Student = require('../models/student')
async function registerStudent(req, res) {
    const { name, roll, fathersName, mothersName, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }
    if (!roll || isNaN(roll)) {
        return res.status(400).json({ message: 'Roll must be a number and is required' });
    }
    if (!fathersName) {
        return res.status(400).json({ message: 'FathersName is required' });
    }
    if (!mothersName) {
        return res.status(400).json({ message: 'MothersName is required' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        const newStudent = new Student({
            name,
            roll: Number(roll),  
            fathersName,
            mothersName,
            email,
            password
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
    
}

async function ReadStudent(req, res) {
    try {
        const students = await Student.find();
        res.status(200).json({students})
    } catch (error) {
        res.status(500).json({ message: 'Student fetching faield', error: error.message });  
    }
}

// update Student Details
async function updateStudent(req, res) {
    const { name, roll, fathersName, mothersName, email, password } = req.body;
    try {
        
        const student = await Student.findByIdAndUpdate({_id: req.params.id}, { name, roll, fathersName, mothersName, email, password }, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
        
     } catch (error) {
         console.log(error);
         res.status(500).json({ message: 'Server error'});
        
     }
}
// delete Student api

async function deleteStudent(req, res) {
    try {
        const deleteStudent = await Student.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Student deleted successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'can nott delete student', error: error.message });
        
    }
    
}
 

module.exports = {
    registerStudent,
    ReadStudent,
    updateStudent,
    deleteStudent,
}
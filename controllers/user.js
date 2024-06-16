const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken.js')

// signup user
async function userSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) return res.status(401).send('accout already register')
        
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    const user = await User.create({
                        name,
                        email,
                        password: hash,
                    });
                    let token = generateToken(user)
                    res.cookie("token", token);
                    res.send("user created successfully!!");
                }
            });
        });
    } catch (error) {
        res.send(error.message);
    }
}

// login user
async function userLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
       
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token);
            res.status(200).json({ message: 'user logged in successfully!' });
        }
        else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    })

};

module.exports = {
    userSignup,
    userLogin,
    
}
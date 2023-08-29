const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const RegisterController = async (req, res) => {
    
    const {name, email, password, confirmpassworld } = req.body;

    // Validations
    if(!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if(!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    if(!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    if(password !== confirmpassworld) {
        return res.status(400).json({ error: 'Password does not match' });
    }

    // check if user already exists
    const userExists = await User.findOne({ email: email });

    if(userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
        name,
        email,
        password: passwordHash,
        });
    try {
        await user.save();
        res.status(200).json({ message: 'User created successfully' });

    }catch(err) {
        return res.status(400).json({ error: 'Error registering new user' });
    }
    
};

const OpenRout = (req, res) => {
    res.status(200).json({ message: 'Bem vindo a API' });

};


const LoginController = async (req, res) => {
    
    const { email, password } = req.body;

    // Validations
    if(!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    if(!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    // check if user already exists
    const user =  await User.findOne({ email: email });

    if(!user) {
        return res.status(404).json({ error: 'User does not exists' });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        return res.status(422).json({ error: 'Invalid password' });
    }

    try{
        const secret = process.env.SECRET;
        const token  = jwt.sign({  id: user._id }, secret);

        res.status(200).json({ message: 'User logged in successfully', token });


    }catch(err) {
        return res.status(400).json({ error: 'Error logging in' });
    }


}

//Private Route
const privateRoute = async (req, res) => {

    const id = req.params.id;

    // Check if user exists
    const user = await User.findById(id, '-password');

    if(!user) {
        return res.status(404).json({ error: 'User does not exists' });
    }

    res.status(200).json({ user });

}


module.exports = {
    RegisterController,
    OpenRout,
    LoginController,
    privateRoute
};
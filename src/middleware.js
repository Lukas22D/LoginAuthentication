
require('dotenv').config();
const jwt = require('jsonwebtoken');

function ckeckToken (req, res, next) {

const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(" ")[1];

if(!token) {
    return res.status(401).json({ error: 'Access denied' });
}

try{
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();  
}catch(err) {
    return res.status(400).json({ error: 'Invalid token' });
}



}

module.exports = ckeckToken;
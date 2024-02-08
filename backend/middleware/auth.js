const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.IDTOKEN);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        req.auth = {userId};
        next();
    } catch(error){
        res.status(401).json({error});
    }
};
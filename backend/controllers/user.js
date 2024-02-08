const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenKey = process.env.IDTOKEN;

//User signup
exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				email: req.body.email,
				password: hash
			});
		user.save()
		.then(() => res.status(201).send({message: "Utilisateur enregistré !"}))
		.catch(error => res.status(400).json({error}));
	})
	.catch(error => res.status(500).json({error}))
};

//User login
exports.login = (req, res) => {
	const {email, password} = req.body;
	User.findOne({email})
		.then(user => {
			if(!user){
				res.status(401).send({message: 'Informations erronées !'})
			} else {
				bcrypt.compare(password, user.password)
					.then(valid => {
						if(valid){
							res.status(200).json({
								userId: user._id,
								token: jwt.sign({userId: user._id}, tokenKey, {expiresIn: "24h"})
							});
						} else {
							res.status(401).send({message: 'Informations erronées !'});
						}
					})
					.catch(error => res.status(500).json({error}));
			}
		})
		.catch(error => res.status(500).json({error}));
};
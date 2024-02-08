const mongoose = require('mongoose');
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASSWORD_DB;
const DATABASE = process.env.NAME_DATABASE;
const uri = `mongodb+srv://${USER}:${PASSWORD}@${DATABASE}.hndxnok.mongodb.net/?retryWrites=true&w=majority`;

// Connexion à MongoDB

mongoose.connect(uri)
	.then(() => console.log('connecté à MongoDB'))
	.catch(error => console.error({error}));
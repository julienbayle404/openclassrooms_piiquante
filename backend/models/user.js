const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//User schema mongoose
const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

//Export schema
module.exports = mongoose.model('user', userSchema);
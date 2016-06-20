var mongoose = require('mongoose');

var Model = mongoose.Schema({
	nome: String
});

module.exports = mongoose.model('Genero', Model);
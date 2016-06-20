var mongoose = require('mongoose');

var Model = mongoose.Schema({
	nome: String,
	ano: Number,
	//quando usamos ref, estamo dizendo que o campo genero vai receber um _id de genero
	genero: { type: mongoose.Schema.ObjectId, ref: 'Genero' }
});

module.exports = mongoose.model('Anime', Model);
var app = require('express')();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/anime');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

//importar o model de Anime
var Anime = require('./models/Anime');

//mesmo que: 127.0.0.1:8080/
app.get('/', function (req, res) {
	res.json({online: true});
});

//GET 127.0.0.1:8080/anime
app.get('/anime', function (req, res) {
	Anime.find({}, function(err, docs){
		res.json(docs);
	});
});

//POST 127.0.0.1:8080/anime
app.post('/anime', function (req, res){

	var anime = new Anime(req.body);

	anime.save(function(err, doc) {
		if (err) {
			res.json(err);
		} else {
			res.json(doc);
		}
	});

});

//PUT 127.0.0.1:8080/anime
app.put('/anime', function (req, res) {
	Anime.findOne({_id: req.body._id}, function(err, doc) {
		doc.nome = req.body.nome;
		doc.ano = req.body.ano;

		doc.save(function(err, doc) {
			res.json(doc);
		});
	});
});

//DELETE 127.0.0.1:8080/anime/#id_do_anime
app.delete('/anime/:id', function (req, res) {
	Anime.remove({_id: req.params.id} , function(err, ok){
		res.json(ok);
	});
});

//API escutando na porta 8080 do localhost: localhost:8080
app.listen('8080', '127.0.0.1', function (err) {
	console.log('server start.');
});

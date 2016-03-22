module.exports = function(app){
	var index = require('../controllers/index.controller');
	app.get('/demo',index.render);
	app.get('/',index.render);
	app.get('/demo/dj',index.dj);
	app.get('/demo/producer',index.producer);
}
var controller = require('../controllers/home');

module.exports = function(app) {
    console.log("coxinha "+controller);
    app.get('/index', controller.index);
    app.get('/', controller.index);
}

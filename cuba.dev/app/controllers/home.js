var controller = {};

controller.index = function (req, res) {
    res.render('index', { nome: 'BGShelfie' });
};

module.exports = controller;


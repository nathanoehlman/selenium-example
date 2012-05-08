
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Library' })
};

exports.authors = function(req, res) {
    res.render('authors', { title: 'Authors' })
}

exports.books = function(req, res) {
    res.render('books', { title: 'Books' })
}
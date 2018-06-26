var express = require('express');
var router = express.Router();
var Books = require("../models").Books;


/* _____ ____  _  _____    ____  _____ _     ____  _
  /  __//  _ \/ \/__ __\  /  _ \/  __// \   /  _ \/ \  /|
  |  \  | | \|| |  / \    | | //|  \  | |   | / \|| |  ||
  |  /_ | |_/|| |  | |    | |_\\|  /_ | |_/\| \_/|| |/\||
  \____\\____/\_/  \_/    \____/\____\\____/\____/\_/  \|
*/
//for new_book inputs
//, name="title" value=books.title
//, name="author" value=books.author
//, name="genre" value=books.genre
//, name="first_published" value=books.firstPublished

//input#title(type='text' name='title' value='#{bookTitle}'
/* _____          _
 / ____|        | |
| |  __    ___  | |_
| | |_ |  / _ \ | __|
| |__| | |  __/ | |_
\_____|  \___|  \__|
*/
//* GET articles listing. */
router.get('/', function(req, res, next) {
  Article.findAll({order: [["createdAt", "DESC"]]}).then(function(articles){
    res.render("articles/index", {articles: articles, title: "My Awesome Blog" });
  }).catch(function(error){
      res.send(500, error);
   });
});

/*
  _____                  _
 |  __ \                | |
 | |__) |   ___    ___  | |_
 |  ___/   / _ \  / __| | __|
 | |      | (_) | \__ \ | |_
 |_|      \___/  |___/  \__|

*//* POST create article. */
router.post('/new_book', function(req, res, next) {
  Article.create(req.body).then(function(article) {
    res.redirect("/all_books");
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        // res.render("articles/new", {article: Article.build(req.body), errors: error.errors, title: "New Article"})
        console.log("error");
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
;});

/*
_____                         _
/ ____|                       | |
| |       _ __    ___    __ _  | |_    ___
| |      | '__|  / _ \  / _` | | __|  / _ \
| |____  | |    |  __/ | (_| | | |_  |  __/
\_____| |_|     \___|  \__,_|  \__|  \___|
*/
/* Create a new article form. */
router.get('/new', function(req, res, next) {
  res.render("articles/new", {article: {}, title: "New Article"});
});

/*
 ______       _   _   _
|  ____|     | | (_) | |
| |__      __| |  _  | |_
|  __|    / _` | | | | __|
| |____  | (_| | | | | |_
|______|  \__,_| |_|  \__|
*/
/* Edit article form. */
router.get("/:id/edit", function(req, res, next){
  Article.findById(req.params.id).then(function(article){
    if(article) {
      res.render("articles/edit", {article: article, title: "Edit Article"});
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/*
 _____           _          _
|  __ \         | |        | |
| |  | |   ___  | |   ___  | |_    ___
| |  | |  / _ \ | |  / _ \ | __|  / _ \
| |__| | |  __/ | | |  __/ | |_  |  __/
|_____/   \___| |_|  \___|  \__|  \___|
*/
/* Delete article form. */
router.get("/:id/delete", function(req, res, next){
  Article.findById(req.params.id).then(function(article){
    if(article) {
      res.render("articles/delete", {article: article, title: "Delete Article"});
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/*
 _____          _       _____               _   _
/ ____|        | |     |_   _|             | | (_)
| |  __    ___  | |_      | |    _ __     __| |  _  __   __
| | |_ |  / _ \ | __|     | |   | '_ \   / _` | | | \ \ / /
| |__| | |  __/ | |_     _| |_  | | | | | (_| | | |  \ V /
\_____|  \___|  \__|   |_____| |_| |_|  \__,_| |_|   \_/
*/
/* GET individual article. */
router.get("/:id", function(req, res, next){
  Article.findById(req.params.id).then(function(article){
    if(article) {
      res.render("articles/show", {article: article, title: article.title});
    } else {
      res.send(404);
    }
  }).catch(function(error){
      res.send(500, error);
   });
});

/*
 _____            _
|  __ \          | |
| |__) |  _   _  | |_
|  ___/  | | | | | __|
| |      | |_| | | |_
|_|       \__,_|  \__|
*/
/* PUT update article. */
router.put("/:id", function(req, res, next){
  Article.findById(req.params.id).then(function(article){
    if(article) {
      return article.update(req.body);
    } else {
      res.send(404);
    }
  }).then(function(article){
    res.redirect("/articles/" + article.id);
  }).catch(function(error){
      if(error.name === "SequelizeValidationError") {
        var article = Article.build(req.body);
        article.id = req.params.id;
        res.render("articles/edit", {article: article, errors: error.errors, title: "Edit Article"})
      } else {
        throw error;
      }
  }).catch(function(error){
      res.send(500, error);
   });
});

/*
 _____           _     _____               _   _
|  __ \         | |   |_   _|             | | (_)
| |  | |   ___  | |     | |    _ __     __| |  _  __   __
| |  | |  / _ \ | |     | |   | '_ \   / _` | | | \ \ / /
| |__| | |  __/ | |    _| |_  | | | | | (_| | | |  \ V /
|_____/   \___| |_|   |_____| |_| |_|  \__,_| |_|   \_/
*/
/* DELETE individual article. */
router.delete("/:id", function(req, res, next){
  Article.findById(req.params.id).then(function(article){
    if(article) {
      return article.destroy();
    } else {
      res.send(404);
    }
  }).then(function(){
    res.redirect("/articles");
  }).catch(function(error){
      res.send(500, error);
   });
});


module.exports = router;

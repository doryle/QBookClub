var express = require("express");
var router  = express.Router();
var Book = require("../models/book");
var middleware = require("../middleware");

router.get('/', function(req, res){
    Book.find({}, function(err, allBooks){
      if(err){
        console.log(err);
      } else {
          res.render('books/index.ejs', {books:allBooks, currentUser: req.user});   
  
      }
    });
  });
  
  router.post("/", middleware.isLoggedIn, function(req, res){
      var title = req.body.title
      var author = req.body.author
      var image = req.body.image   
      var description = req.body.description
      var rating = req.body.rating
      var submittedBy = {
        id: req.user._id,
        username: req.user.username 
      }
      var newBook = {title: title, author: author, image: image, description: description, rating: rating, submittedBy: submittedBy}  
      Book.create(newBook, function(err, newlyCreated){
          if(err){
              req.flash("error", "Oops something went wrong!");
              console.log(err)
          } else {
              console.log(newlyCreated);
              req.flash("success", "Added new book to book club!");
              res.redirect("/index");
          }
      }) 
  });
  
  router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('books/new.ejs');
  });
  
  
  //show route
  router.get("/:id", function(req, res){
      Book.findById(req.params.id).populate("comments").exec(function(err, foundBook ){
          if(err || !foundBook){
            console.log(err)
            req.flash("error", "Book not found");
            res.redirect("back"); 
          } else {
            console.log(foundBook);
            res.render("books/show.ejs", {book: foundBook});
          }
      });
  });

  router.get('/:id/edit', middleware.checkBookOwnership, function(req, res){
        Book.findById(req.params.id, function(err, foundBook){
              return res.render("books/edit", {book: foundBook})
      });
    });



 router.put("/:id",middleware.checkBookOwnership, function(req, res){
    Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
        if(err){
          res.redirect('/index');
        } else {
          return res.redirect('/index/' + req.params.id);
        }
    }); 
 });  

 router.delete('/:id',middleware.checkBookOwnership, function(req, res){
   Book.findByIdAndRemove(req.params.id, function(err){
      if(err){
        res.redirect('/index');
      } else {
        req.flash("success", "Book entry deleted")
        return res.redirect('/index');
      }
   });
 });




  module.exports = router;

var express = require("express");
var router  = express.Router({mergeParams: true});
var Book = require("../models/book");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get('/new', middleware.isLoggedIn, function(req, res){
    Book.findById(req.params.id, function(err, book){
      if(err || !book){
        req.flash("error", "Book  not found")
        console.log(err);
      } else {
       return res.render('comments/new.ejs', {book: book});
      }
    });
   });
  
  router.post('/', middleware.isLoggedIn, function(req, res){
     Book.findById(req.params.id, function(err, book){
        if(err){
          console.log(err);
          res.redirect('/index');
        } else {
          Comment.create(req.body.comment, function(err, comment){
            if(err){
              req.flash("error", "Oops! Something went wrong!");
              console.log(err);
            } else {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                book.comments.push(comment);
                book.save();
                console.log(comment);
                req.flash("success", "Successfully added comment")
                return  res.redirect('/index/' +  book._id); 
            }
          });
        }
     })
  }); 

  router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
      Book.findById(req.params.id, function(err, foundBook){
          if(err || !foundBook){
            req.flash("error", "Book not found");
            return res.redirect("back");
          }
          Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){ 
              req.flash("error", "Comment not found");
               res.redirect("back");
            } else {
              res.render("comments/edit", {book_id: req.params.id, comment: foundComment});   
            }
          }); 
      });

  });


  router.put("/:comment_id", middleware.checkCommentOwnership,  function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
        req.flash("success", "Comment updated");
        res.redirect("/index/" + req.params.id );
      }
   });
});

router.delete("/:comment_id",  middleware.checkCommentOwnership, function(req, res){
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
     if(err){
         res.redirect("back");
     } else {
          req.flash("success", "Comment deleted");
          res.redirect("/index/" + req.params.id);
     }
  });
});



  module.exports = router;

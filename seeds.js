var mongoose = require("mongoose");
var Book = require("./models/book");
var Comment   = require("./models/comment");
 
var data = [
    {
        title: "Norwegian Wood", 
        author: "Haruki Murakami",
        rating: 10,
        image: "https://https://m.media-amazon.com/images/I/51+FCl6lWvL.jpg.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        title: "IQ84", 
        author: "Haruku Murakami",
        rating: 10,
        image: "https://https://images-na.ssl-images-amazon.com/images/I/919QvSpFY1L.jpg.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        title: "Men Without Women", 
        author: "Haruki Murakami",
        rating: 7,
        image: "https://images-na.ssl-images-amazon.com/images/I/419S+HBOhnL._SY344_BO1,204,203,200_.jpg://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
    //Remove all books
    Book.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed books!");
          //add a few books
         data.forEach(function(seed){
             Book.create(seed, function(err, book){
                 if(err){
                     console.log(err)
                 } else {
                     console.log("added a book");
                     //create a comment
                     Comment.create(
                         {
                             text: "This place is great, but I wish there was internet",
                             author: "Homer"
                         }, function(err, comment){
                             if(err){
                                 console.log(err);
                             } else {
                                 book.comments.push(comment);
                                 book.save();
                                 console.log("Created new comment");
                             }
                         });
                 }
             });
         });
     }); 
     //add a few comments
 }
 
 module.exports = seedDB;
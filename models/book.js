var mongoose = require("mongoose");
var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    submittedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String, 

    },
    description: String,
    rating: Number,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment" 
        } ]
});
 
module.exports = mongoose.model("Book", bookSchema);
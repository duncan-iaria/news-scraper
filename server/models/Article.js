const mongoose = require( 'mongoose' );

const articleSchema = mongoose.Schema
({
    id: Number,
    title: String,
    link: String,
    image: String,
    comments:
    [{
        author: String,
        text: String,
        date: Date
    }]
});

const Article = mongoose.model( 'Article', articleSchema );

//=========================
// EXPORTS
//=========================
module.exports = Article
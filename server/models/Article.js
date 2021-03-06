const mongoose = require( 'mongoose' );

const articleSchema = mongoose.Schema
({
    articleId: Number,
    title: String,
    link: String,
    image: String,
    source: String,
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
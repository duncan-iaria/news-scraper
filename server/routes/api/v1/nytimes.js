const express = require( 'express' );
const router = express.Router();

const cheerio = require( "cheerio" );
const request = require( "request" );

//get access to the ALL mongoose models
const db = require( '../../../models' );

//limit article count from a source
let articleLimit = 25;

//=========================
// GET
//=========================
router.get( '/', onScrapeNyTimes );

function onScrapeNyTimes( tRequest, tResponse )
{  
    request( "http://www.nytimes.com/", onNytRequestComplete );
    
    function onNytRequestComplete( tError, tData, tHtml )
    {
        let tempStart = Date.now();

        //load the HTML into cheerio
        const $ = cheerio.load( tHtml );

        //make an empty array for saving our scraped info
        let tempResults = [];
        let tempArticles = []; 

        let tempArticleStories = $( 'article.story' );

        //if the article limit is less than the total articles (dont want null stuff)
        if( tempArticleStories.length < articleLimit )
        {
            articleLimit = tempArticleStories.length;
        }

        for( let i = 0; i < articleLimit; ++i )
        {
            getNewsStory( tempArticleStories[i] );
        }

        function getNewsStory( tElement )
        {
            let tempId = $( tElement ).attr( 'data-story-id' );
            let tempTitle = $( tElement ).find( 'a' ).text().trim();
            let tempLink = $( tElement ).find( 'a' ).attr( 'href' );
            let tempImage = $( tElement ).find( 'img' ).attr( 'src' );

            if( tempTitle && tempId )
            {
                tempResults.push( { articleId: tempId, title: tempTitle, link: tempLink, image: tempImage, source: 'nytimes', comments: [] } );
            }
        }

        //load all results to the db for now
        for( let i = tempResults.length - 1; i >= 0; --i )
        {
            //console.log( `temp results = ${ tempResults[i].articleId }` );
            if( db.Article.findOne( { articleId: tempResults[i].articleId }, onFindExistingArticle ) );

            function onFindExistingArticle( tError, tArticle )
            {
                if( tError )
                {
                    console.log( `error when searching db: ${ tError }` );
                    return;
                }
                
                //if the article returns nothing, save a copy in the db
                if( !tArticle )
                {
                    new db.Article( tempResults[i] ).save();
                    tempArticles.push( tempResults[i] );
                }
                else
                {
                    //push the record from the db instead of the scraped stuff
                    tempArticles.push( tArticle );
                }

                //if we've got all the same amount of articles as we had results
                if( tempResults.length == tempArticles.length )
                {
                    db.Article.find( { source: 'nytimes' }, onGetNYTArticles )
                }
            }

            function onGetNYTArticles( tError, tArticles )
            {
                if( tError )
                {
                    console.log( `Error getting the NYTimes articles: ${ tError }` );
                }
                else
                {
                    tResponse.json( tArticles );
                }
            }
        }

        let totalTime = Date.now() - tempStart;
        console.log( `total time to process = ${ totalTime }ms` );
    };
}

//=========================
// EXPORTS
//=========================
module.exports = router;
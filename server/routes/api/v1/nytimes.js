const express = require( 'express' );
const router = express.Router();

const cheerio = require( "cheerio" );
const request = require( "request" );

//get access to the ALL mongoose models
const db = require( '../../../models' );

//limit article count from a source
const articleLimit = 25;

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
                tempResults.push( { id: tempId, title: tempTitle, link: tempLink, image: tempImage, comments: [] } );
            }
        }

        //load all results to the db for now
        for( let i = tempResults.length - 1; i >= 0; --i )
        {
            new db.Article( tempResults[i] ).save();
        }

        let totalTime = Date.now() - tempStart;
        console.log( `total time to process = ${ totalTime }ms` );

        tResponse.json( tempResults );
    };
}

//=========================
// EXPORTS
//=========================
module.exports = router;
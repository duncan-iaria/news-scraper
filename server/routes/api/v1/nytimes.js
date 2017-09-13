const express = require( 'express' );
const router = express.Router();

const cheerio = require( "cheerio" );
const request = require( "request" );

//=========================
// GET
//=========================
router.get( '/', onScrapeNyTimes );

function onScrapeNyTimes( tRequest, tResponse )
{
    console.log( "hey" );
    request( "http://www.nytimes.com/", function( tError, tData, tHtml )
    {
        // Load the HTML into cheerio
        const $ = cheerio.load( tHtml );

        // Make an empty array for saving our scraped info
        let tempResults = [];
        // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
        $( "article.story" ).each( getNewsStory );

        function getNewsStory( tIndex, tElement )
        {
            let tempId = $( tElement ).attr( 'data-story-id' );
            let tempTitle = $( tElement ).find( 'a' ).text().trim();
            let tempLink = $( tElement ).find( 'a' ).attr( 'href' );
            let tempImage = $( tElement ).find( 'img' ).attr( 'src' );

            if( tempTitle && tempId )
            {
                tempResults.push( { id: tempId, title: tempTitle, link: tempLink, image: tempImage } );
            }
        }

        console.log( tempResults );
        console.log( tempResults[0] );
        tResponse.json( tempResults );
    });
}

//=========================
// EXPORTS
//=========================
module.exports = router;
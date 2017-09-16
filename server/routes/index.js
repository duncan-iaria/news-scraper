//=========================
// FOR ALL ROUTES
//=========================
const express = require( 'express' );
const router = express.Router();

//=========================
// HOME ROUTE
//=========================
router.get( '/', onGetIndex );

function onGetIndex( tRequest, tResponse )
{
    console.log( 'hello' );
	tResponse.render( 'index', { title: 'Express' } );
}

//=========================
// NEWS ROUTES
//=========================
router.use( '/api/v1/nytimes', require( './api/v1/nytimes' ) );


//=========================
// EXPORTS
//=========================
module.exports = router;
//=========================
// ALL MODELS
//=========================
//So this is totally overkill for this particular app
//however I wanted to try and get similar functionality
//to how sequelize gives you access to ALL models
//in theory you can add more and more keys and models
//and just call db.ModelYouWant after requiring the models folder
const db =
{
    Article: require( './Article' ),
}

//=========================
// EXPORTS
//=========================
module.exports = db
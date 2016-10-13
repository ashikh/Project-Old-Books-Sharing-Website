//// app/models/user-registration-model.js
//// grab the mongoose module
var mongoose = require('mongoose');

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('bookTableModels', {    
    bookTitle : {type : String, default: ''}, 
    bookAuthor    : {type : String, default: ''},
    bookGenre : {type : String, default: ''},
    userId: {type : String, default: ''}
	});
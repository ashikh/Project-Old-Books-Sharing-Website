//// app/models/user-registration-model.js
//// grab the mongoose module
var mongoose = require('mongoose');

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('rideTableModels', {    
    fromAddress : {type : String, default: ''}, 
    toAddress    : {type : String, default: ''},
    rideDate : {type : String, default: ''},
    rideTime : {type : String, default: ''},
    totalCapacity : {type : String, default: ''},
    avlSeats : {type : String, default: ''},
    phoneNo : {type : String, default: ''},
    carDetails : {type : String, default: ''},
	ridePrice : {type : String, default: ''},
    userId: {type : String, default: ''}
	});
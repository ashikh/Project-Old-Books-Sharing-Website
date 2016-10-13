// grab the user model we just created
var User = require('./models/user');

// grab the rideTable model we just created
var Ride = require('./models/rideTable');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    
    app.get('/api/login', function (req, res) {

        var email = req.query.email;
        var password = req.query.password;

        console.log(req.query);

        User.find({
            email: email,
            password: password
        }, function (err, docs) {
            if (err || docs.length === 0) {
                console.log("error occured");
                return res.status(404).json({
                    message: "Invalid Credentials"
                });

            } else {
                console.log(docs);
                return res.status(200).json({
                    data: docs
                });
            }

        });
    });

    app.post('/api/save', function (req, res) {

        console.log(req.body);
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });

        user.save(function (err, fluffy) {
            if (err) return console.error(err);
            console.log("User save success");
            res.send("Yaay !! Successs ... ");
        });


    });
    // create a new ride
    app.post('/api/newride', function (req, res) {
        var new_ride = new Ride({
            fromAddress : req.body.fromAddress, 
            toAddress    : req.body.toAddress,
            rideDate : req.body.rideDate,
            rideTime : req.body.rideTime,
            totalCapacity : req.body.totalCapacity,
            avlSeats : req.body.avlSeats,
            phoneNo : req.body.phoneNo,
            carDetails : req.body.carDetails,
			ridePrice: req.body.ridePrice,
            userId:req.body.userId
        });
        new_ride.save(function (err, fluffy) {
            if (err) return console.error(err);
            res.json({status:200,message:"Entries have been created"});
        });
        
        
    });
    
    // search ride service
    app.get('/api/seacrhride', function (req, res) {
        
        console.log("Search Service Called");
        
        var fromAddress = req.query.fromAddress;
        var toAddress = req.query.toAddress;
        var rideDate = req.query.rideDate;
        
        
        Ride.find({fromAddress: fromAddress,toAddress:toAddress,rideDate:rideDate }, function (err, docs) {
          if (err){
              console.log("error occured");
              return res.status(404).json({message:"Invalid Credentials"});
              
          }else if(docs.length === 0){
              return res.status(500).json({message:"No match found"});
          }
          else{
              console.log(docs);
              return res.status(200).json({data:docs});
          }
            
        });
        
    });
    
     
    app.get('/:filename', function (req, res) {
        console.log(req.params.filename);
        var filename = req.params.filename;
        if (!filename) return; // might want to change this
        res.sendFile(filename, {
            root: './public/views'
        });
    });
    app.use(function (req, res) {
        res.sendFile('index.html', {
            root: './public'
        });
    });

};
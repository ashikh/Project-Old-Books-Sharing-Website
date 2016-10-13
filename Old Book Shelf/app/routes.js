// grab the user model we just created
var User = require('./models/user');

// grab the bookTable model we just created
var Book = require('./models/bookTable');

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
			name:req.body.name,
			address:req.body.address,
			number:req.body.number,
            email: req.body.email,
            password: req.body.password,
			userId:req.body.userId
        });

        user.save(function (err, fluffy) {
            if (err) return console.error(err);
            console.log("User save success");
            res.send("Yaay !! Successs ... ");
        });


    });
    // submit book details
    app.post('/api/newbook', function (req, res) {
        var new_book = new Book({
            bookTitle : req.body.bookTitle, 
            bookAuthor    : req.body.bookAuthor,
            bookGenre : req.body.bookGenre,
            userId:req.body.userId
        });
        new_book.save(function (err, fluffy) {
            if (err) return console.error(err);
            res.json({status:200,message:"Entries have been created"});
        });
        
        
    });
    
    // order book service
    app.get('/api/orderbook', function (req, res) {
        
        console.log("Search Service Called"); 
        Book.find({}, function (err, docs) {
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
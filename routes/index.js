
/*
 * Handling request to GET home page 
 * so show me something.
 * Render before mine eyes already
 -- Question?
 -- Does that make you a route?
 * Routing the URI. Oh yah!
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

// res.render calling jade. jade are you in?
exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var realName = req.body.realname;
        var phone = req.body.phone;
        var address = req.body.address;
        var city = req.body.city;                        
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "realname" : realName,
            "phone" : phone,
            "address" : address,
            "city" : city,                                                
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}










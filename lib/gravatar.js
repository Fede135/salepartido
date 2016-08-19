//Probando gravatar

Meteor.methods({
  imagengravatar : function (user){
    var email = user.emails.address;
    var options = {
        secure: true // choose between `http://www.gravatar.com`
                    //            and `https://secure.gravatar.com`
                    //            default is `false`
    };

    console.log("dentro de gravatar servidor");
    var md5Hash = Gravatar.hash(email);

    var url = Gravatar.imageUrl(md5Hash, options);
    
    return url;
  }
});
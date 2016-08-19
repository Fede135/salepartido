//Probando gravatar

Template.gravatar.helpers({

  imagengravatar : function(){

    var user = Meteor.user(); 
  
    Meteor.call('imagengravatar', user, function(error, result) {
      if (error)
        return alert(error.reason);
      console.log("dentro de gravatar cliente");
      urlgravatar = result.url;
      return urlgravatar;
    });  

  }
});


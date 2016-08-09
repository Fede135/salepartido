Meteor.methods({
  completeProfile: function(doc) {
    
    check(Meteor.userId(), String);
    check(doc, {
      name : String,
      locality : String,
      email : String
    });

    var user = Meteor.user();
    var locality = doc.locality;
    var userId = Meteor.users.upsert ({_id: user._id }, { $set: { localidad : locality }});

    return {
      _id: userId
    };
  }
});
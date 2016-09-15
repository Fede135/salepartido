Template.userSearch.helpers({
  settings: function() {
    return {
      position: "botton",
      limit: 5,
      rules: [
        {
          token:'@',
          collection: Meteor.users,
          field: "profile.name",
          matchAll: true,
          template: Template.userDataPill,  
          //noMatchTemplate: Template.emptyUserPill
        },
        {
          token:'!',
          collection: Recintos,
          field: "nombre_recinto",
          template: Template.EnclosureDataPill,  
          //noMatchTemplate: Template.emptyEnclosurePill
        },
        
        
      ]
    };
  }
});
Template.userSearch.events({
  "autocompleteselect input": function(event, template, doc) {
  if(! doc.profile) {
      Router.go('showRecinto',{nombre_recinto: doc.nombre_recinto});
    } else {
      console.log("recinto", doc);
      Router.go('showProfile',{_id: doc._id}); 
    }
  },
});



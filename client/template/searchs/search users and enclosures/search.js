Template.search.helpers({
  settings: function() {  //configuraciones de Autocomplete
    return {
      position: "botton",
      limit: 5,
      rules: [
        {
          token:'@',                //busca con @ en la coleccion Meteor.users
          collection: Meteor.users,
          field: "profile.name",
          matchAll: true,
          template: Template.userDataPill,  
          //noMatchTemplate: Template.emptyUserPill
        },
        {
          token:'!',              //busca con ! en la coleccion Recintos
          collection: Recintos,
          field: "nombre_recinto",
          template: Template.EnclosureDataPill,  
          //noMatchTemplate: Template.emptyEnclosurePill
        },
        
        
      ]
    };
  }
});
Template.search.events({
  "autocompleteselect input": function(event, template, doc) {
  if(! doc.profile) {   //si tiene doc.profile rutea a showRecintos sino a showProfile
      Router.go('showRecinto',{nombre_recinto: doc.nombre_recinto});
    } else {
      console.log("recinto", doc);
      Router.go('showProfile',{_id: doc._id}); 
    }
  },
});



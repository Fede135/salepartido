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
          //filter: {type : "roles.__global_roles__.player"}, //preguntar como hacer para buscar solo en usuarios con rol player.
          template: Template.userDataPill,  
          noMatchTemplate: Template.searchEmpty
        },
        {
          token:'!',              //busca con ! en la coleccion Recintos
          collection: Recintos,
          field: "nombre_recinto",
          template: Template.EnclosureDataPill,  
          noMatchTemplate: Template.searchEmpty
        },
        
        
      ]
    };
  }
});
Template.search.events({
  "autocompleteselect input": function(event, template, doc) {
  if(! doc.profile) {   //si tiene doc.profile rutea a showRecintos sino a showProfile
      Router.go('showRecinto',{_id: doc._id});
    } else {
      Router.go('showProfile',{_id: doc._id}); 
    }
  },
});



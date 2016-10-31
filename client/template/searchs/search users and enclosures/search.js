Template.search.helpers({
  settings: function() {  //configuraciones de Autocomplete
    return {
      position: "botton",
      
      rules: [
        {
          token:'@',                //busca con @ en la coleccion Meteor.users
          collection: Meteor.users,
          // selector: function (match){
          //   console.log('selector', {'profile.name': new RegExp(match, 'i'), 'roles.__global_roles__':'player' })   //queda comentado hasta que no saquemos insecure y autopublish
          //   return {'profile.name': new RegExp(match, 'i'), 'roles.__global_roles__':'player' }
          // },
          field: "profile.name",
          matchAll: true,
          filter: {'roles.__global_roles__':'player'}, 
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



Template.searchReserva.helpers({
  settings: function() {  //configuraciones de Autocomplete
    return {
      position: "botton",
      limit: 5,
      rules: [
        {           
          collection: Reserva,
          field: "nom_usuario",
          matchAll: true,          
          template: Template.userDataPillReserva,  
          noMatchTemplate: Template.searchEmptyReserva
        },                
        
      ]
    };
  }
});
Template.searchReserva.events({
  "autocompleteselect input": function(event, template, doc) {
    
  },
});
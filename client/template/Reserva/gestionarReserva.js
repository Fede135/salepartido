Template.gestionarReserva.helpers({

  	recinto: function () {
   
    var recintoDueno = Recintos.find({'ownerId': Meteor.user()._id});
    return recintoDueno;
  	},

    recintoSeleccionado: function(){
      
      return Session.get('recinto');
    },

    errorMessage: function(field) {
     
    return Session.get('recintoErrors')[field];
  },

    errorClass: function (field) {
      
    return !!Session.get('recintoErrors')[field] ? 'has-error' : '';
  }

});  	

Template.gestionarReserva.events({
	
	'click [data-for-recinto]': function(event){
    
    var $item=$(event.currentTarget);
    var $target=$($item.data('forRecinto'));
    
    $target.val($item.text());    

  },

  'click #crearReserva': function(event){

    event.preventDefault();

    var nombre_Recinto=$('input[name=nombreRecinto]').val();
    var recinto=Recintos.findOne({'nombre_recinto':nombre_Recinto});
    
    var errors = validateRecinto(recinto);
        if (errors.nombreRecinto)
        return Session.set('recintoErrors', errors);
    
    Session.set('recinto', recinto);

  }
});

Template.gestionarReserva.onDestroyed( function(){

    Session.set('recinto', null);

});

Template.gestionarReserva.onCreated(function() {
  
  Session.set('recintoErrors', {});
});
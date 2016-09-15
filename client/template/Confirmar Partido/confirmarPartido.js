Template.confirmarPartido.helpers({
	
  reservaSeleccionada: function () {
    return Session.get('reserva');
  },

  reserva: function () {
    return Reserva.find();
  },

  partidoSeleccionado: function(){    
    return Session.get('partido'); 
  }
});

Template.confirmarPartido.events({

    'click [data-for-reserva]': function(event){

    var $item = $(event.currentTarget);
    var $target = $($item.data('forReserva'));

    $target.val($item.text());    

    var reserva = Reserva.findOne($item.data('reservaId'));
    Session.set('reserva', reserva);    
    
    },

    'click #agregarEquipoA': function(event){

        var partido = Partido.findOne({_id:this._id});
        Session.set('partido', partido.equipoA);
        var usuarioId = Meteor.user()._id;
        var usuarioNom = Meteor.user().profile.firstName;

        /*var errors = validateEquipo(partido);
        if (errors.equipoA || errors.equipoB)
        return Session.set('partidoErrors', errors);
        
        Partido.update(reserva._id, {$addToSet: {'equipoA.userId':usuarioId, 'equipoA.nombre':usuarioNom}});*/

       /*Partido.update({_id:this._id}, { $addToSet:  { equipoA: { 'userId': "ausuarioIsssd", 'nombre': "aausuarioNom" } }});*/
       
        Partido.update({_id:this._id}, {$addToSet:  { "equipoA": { userId: "nnbbnbnbnnbnbnbnb", nombre: "asdasdasdad"}}}); 
    
    },

    'click #agregarEquipoB': function(event){
       
          Partido.update(partido, x);
    },

    'click #eliminarEquipoA': function(event){

          Partido.update({_id:this._id}, { $pull: {'equipoA': "bbvbvvbvb" }});
             
    },

    'click #eliminarEquipoB': function(event){       
           
    }
});

Template.confirmarPartido.onDestroyed( function(){

    Session.set('reserva', null);

});
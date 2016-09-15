Template.confirmarPartido.helpers({
	
  reservaSeleccionada: function () {
    return Session.get('reserva');
  },

  reserva: function () {
    return Reserva.find();
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

        var equipoB = Partido.findOne(this._id).equipoB;
        var lista =_.findWhere(equipoB, {userId: Meteor.user()._id});

        if (lista === undefined)                
        
        Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.firstName}}}); 
    
    },

    'click #agregarEquipoB': function(event){

        var equipoA = Partido.findOne(this._id).equipoA;
        var lista =_.findWhere(equipoA, {userId: Meteor.user()._id});

        if (lista === undefined)  
       
        Partido.update(this._id, { $addToSet: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.firstName}}}); 
    },

    'click #eliminarEquipoA': function(event){

        Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.firstName}}});
             
    },

    'click #eliminarEquipoB': function(event){       
           
        Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.firstName}}});         
    }
});

Template.confirmarPartido.onDestroyed( function(){

    Session.set('reserva', null);

});
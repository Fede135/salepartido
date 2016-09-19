Template.confirmarPartido.helpers({
	
  reservaSeleccionada: function () {
    var partido = Partido.findOne(this._id)
    var reservaId=partido && partido.reserva_id;
    
    return Reserva.findOne(reservaId);
  }
});

Template.confirmarPartido.events({

    'click #agregarEquipoA': function(event){

        var equipoB = Partido.findOne(this._id).equipoB;
        var lista =_.findWhere(equipoB, {userId: Meteor.user()._id});

        if (lista === undefined)                
        
        Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}}); 
    
    },

    'click #agregarEquipoB': function(event){

        var equipoA = Partido.findOne(this._id).equipoA;
        var lista =_.findWhere(equipoA, {userId: Meteor.user()._id});

        if (lista === undefined)  
       
        Partido.update(this._id, { $addToSet: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}}); 
    },

    'click #eliminarEquipoA': function(event){

        Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
             
    },

    'click #eliminarEquipoB': function(event){       
           
        Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});         
    },

    'click #confirmarAsistencia': function(event){

        var equipoA = Partido.findOne(this._id).equipoA;
        var lista =_.findWhere(equipoA, {userId: Meteor.user()._id});
        var equipoB = Partido.findOne(this._id).equipoB;
        var listaB =_.findWhere(equipoB, {userId: Meteor.user()._id});

        if (lista ||listaB )
        Router.go('Home');
    },

    'click #noJuega': function(event){

        var equipoA = Partido.findOne(this._id).equipoA;
        var lista =_.findWhere(equipoA, {userId: Meteor.user()._id});
        var equipoB = Partido.findOne(this._id).equipoB;
        var listaB =_.findWhere(equipoB, {userId: Meteor.user()._id});

        if (!lista && !listaB )

        Router.go('Home');
    }    
});

Template.confirmarPartido.onDestroyed( function(){

    Session.set('reserva', null);

});
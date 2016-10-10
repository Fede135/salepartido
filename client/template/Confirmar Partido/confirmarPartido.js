Template.confirmarPartido.helpers({
	
    reservaSeleccionada: function () {

        var partido = Partido.findOne(this._id);
        var reservaId=partido && partido.reserva_id;
        Meteor.subscribe('reserva', reservaId)
            
        return Reserva.findOne({'_id':reservaId});
    },

    cantJugadores: function(){        
        var partido = Partido.findOne(this._id);
        var reserva_id=partido && partido.reserva_id;
        var reserva = reserva_id && Reserva.findOne({'_id': reserva_id});
        var nomrecinto = reserva && reserva.nom_recinto;
        var numcancha = nomrecinto && reserva.num_cancha;
        var recinto = numcancha && Recintos.findOne({'nombre_recinto': nomrecinto});
        var recintoId = recinto && recinto._id;
        var cancha = recintoId && Canchas.findOne({'recintoId': recintoId, 'numero': numcancha});
        var cantJugadores = cancha && cancha.jugadores.cantidad_de_jugadores;
        var porEquipo = _.first(cantJugadores);
        
        return porEquipo;
    },
    puedeVerBotones: function() {
        return Roles.userIsInRole( Meteor.userId(), ['invitado', 'host', 'hostSecundario'], this._id);
    }
});

Template.confirmarPartido.events({

    'click #agregarEquipoA': function(event){

        var reserva_id = Partido.findOne(this._id).reserva_id;
        var reserva = Reserva.findOne({'_id': reserva_id});
        var nomrecinto = reserva.nom_recinto;
        var numcancha = reserva.num_cancha;
        var recinto = Recintos.findOne({'nombre_recinto': nomrecinto});
        var recintoId = recinto._id;
        var cancha = Canchas.findOne({'recintoId': recintoId, 'numero': numcancha});
        var cantJugadores = cancha.jugadores.cantidad_de_jugadores;
        var porEquipo = _.first(cantJugadores);
        var numero = + porEquipo;
        
        var equipoB = Partido.findOne(this._id).equipoB;
        var lista =_.findWhere(equipoB, {userId: Meteor.user()._id});
        var cantJugEquipoA = Partido.findOne(this._id).equipoA.length;

        if (lista === undefined && cantJugEquipoA<numero)        
            Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
        else
            alert("Equipo lleno o estas en el otro equipoB");
    },

    'click #agregarEquipoB': function(event){

        var reserva_id = Partido.findOne(this._id).reserva_id;
        var reserva = Reserva.findOne({'_id': reserva_id});
        var nomrecinto = reserva.nom_recinto;
        var numcancha = reserva.num_cancha;
        var recinto = Recintos.findOne({'nombre_recinto': nomrecinto});
        var recintoId = recinto._id;
        var cancha = Canchas.findOne({'recintoId': recintoId, 'numero': numcancha});
        var cantJugadores = cancha.jugadores.cantidad_de_jugadores;
        var porEquipo = _.first(cantJugadores);
        var numero = + porEquipo;
        
        var equipoA = Partido.findOne(this._id).equipoA;
        var lista =_.findWhere(equipoA, {userId: Meteor.user()._id});
        var cantJugEquipoB = Partido.findOne(this._id).equipoB.length;

        if (lista === undefined && cantJugEquipoB<numero)         
            Partido.update(this._id, { $addToSet: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}}); 
        else            
            alert("Equipo lleno o estas en el otro equipoA");
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
//._first('string')
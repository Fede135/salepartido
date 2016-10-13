Template.confirmarPartido.onRendered(function () {
    if (Session.get('alertReservaCreada')) {
     $('#alertReservaCreada').show();
    } else {
     $('#alertReservaCreada').hide();   
    };
    if (Session.get('alertReservaActualizada')){
      $('#alertReservaActualizada').show();
    } else {
      $('#alertReservaActualizada').hide();
    }
})

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
        porEquipo = _.first(cantJugadores);
        
        return porEquipo;
    },


    disponibleA: function(){
        var partido = Partido.findOne(this._id);
        var arrayA = partido.equipoA;
        var cantidadA = porEquipo;
        
        if(arrayA.length === 0){
            return porEquipo;
        }else if (arrayA.length === porEquipo){
            return false;
        }else{
            cantidadA = cantidadA - arrayA.length;
            return cantidadA;
        }

    },
    disponibleB : function(){
        var partido = Partido.findOne(this._id);
        var arrayB = partido.equipoB;
        var cantidadB = porEquipo;
        
        if(arrayB.length === 0){
            return porEquipo;
        }else if (arrayB.length === porEquipo){
            return false;
        }else{
            cantidadB = cantidadB - arrayB.length;
            return cantidadB;
        }
    },

    suplente : function(){
        var arraySuplente = Partido.findOne(this._id).suplentes;
        if(arraySuplente === undefined || arraySuplente.length === 0){
            return false;
        }else{
            var array = [];
            arraySuplente.forEach(function(e){
                var usu = Meteor.users.findOne({_id:e});
                array.push(usu);         
           });            
            return array;
        }

    },

   jugadoresNoInvitados: function(){
        var usuario = Meteor.users.findOne({_id: Meteor.userId()});
        var array = usuario.profile.friends;    
        if(array != undefined){
            var arrayJugadoresId = [];    
            array.forEach(function (e) {
              var id = e.id;
              arrayJugadoresId.push(id);
          });
            
            var partido = Partido.findOne({_id:this._id});
            var invitadosCorreo = partido.invitados;  
            var invitadosId =[];   
            invitadosCorreo.forEach(function(e){
              var user = Meteor.users.findOne({'emails.0.address':e});
              var userid = user._id;
              invitadosId.push(userid);
          });
            var porInvitar = _.difference(arrayJugadoresId,invitadosId);
            if (porInvitar.length != 0){
              var invitar = [];
              porInvitar.forEach(function(e){
                var use = Meteor.users.findOne({_id: e});        
                invitar.push(use)
            });
              return invitar

            } else{
                return false;
            }
        }else {
            return false;
        }
},

    puedeVerBotones: function() {
        return Roles.userIsInRole( Meteor.userId(), ['invitado', 'host', 'hostSecundario'], this._id);
    },

    puedeInvitar: function () {
        return Roles.userIsInRole( Meteor.userId(), ['host', 'hostSecundario'], this._id);
    },

    isConfirmado: function(){
        return Roles.userIsInRole( Meteor.userId(),'confirmado', this._id);

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

        if (lista === undefined && cantJugEquipoA<numero){        
            Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
       

        }else{
            alert("Equipo lleno o estas en el otro equipoB");
        }
        
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

        if (lista === undefined && cantJugEquipoB<numero){        
            Partido.update(this._id, { $addToSet: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}}); 
       
        }else{
            alert("Equipo lleno o estas en el otro equipoB");
        }
    },

    'click #eliminarEquipoA': function(event){

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
        var cantJugEquipoA = Partido.findOne(this._id).equipoA.length;
        var arraysuplentes= Partido.findOne(this._id).suplentes;
        Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
        var cantA = Partido.findOne(this._id).equipoA.length;
        if(cantA < numero && arraysuplentes.length !=0){
            var primerSuplente = _.first(arraysuplentes);
            var usu = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $addToSet: { equipoA: { userId: primerSuplente, nombre: usu.profile.name}}});
            Partido.update(this._id, { $pull: { suplentes: primerSuplente}});
          
        } else{
        }  

             
    },

    'click #eliminarEquipoB': function(event){       
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
        var cantJugEquipoB = Partido.findOne(this._id).equipoB.length;
        var arraysuplentes= Partido.findOne(this._id).suplentes;
        var cantB = Partido.findOne(this._id).equipoB.length;
        Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}}); 
         if(cantB < numero && arraysuplentes.length !=0){
            var primerSuplente = _.first(arraysuplentes);
            var usu = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $addToSet: { equipoB: { userId: primerSuplente, nombre: usu.profile.name}}});
            Partido.update(this._id, { $pull: { suplentes: primerSuplente}});
          
        } else{
        }     
    },

    'click #confirmarAsistencia': function(event){

        var equipoA = Partido.findOne(this._id).equipoA;
        var lista =_.findWhere(equipoA, {userId: Meteor.user()._id});
        var equipoB = Partido.findOne(this._id).equipoB;
        var listaB =_.findWhere(equipoB, {userId: Meteor.user()._id});


        if (lista || listaB ){
          Roles.addUsersToRoles(Meteor.userId(), 'confirmado', this._id);
          Router.go('Home');
        }  
    },

    'click #noJuega': function(event){

        var equipoA = Partido.findOne(this._id).equipoA;
        var lista =_.findWhere(equipoA, {userId: Meteor.user()._id});
        var equipoB = Partido.findOne(this._id).equipoB;
        var listaB =_.findWhere(equipoB, {userId: Meteor.user()._id});

        if (!lista && !listaB )
          Roles.addUsersToRoles(Meteor.userId(), 'noJuega', this._id);
        Router.go('Home');
    },

    'click #invitarJugadores': function(event,t){
        var idpartido = this._id;
        var reserva_id = Partido.findOne(this._id).reserva_id;
        var reserva = Reserva.findOne({'_id': reserva_id});
        var organizador = reserva.nom_usuario;
        var recinto = reserva.nom_recinto;
        var cancha = reserva.num_cancha;
        var hora = reserva.hora_de_juego;
        var dia = reserva.fecha_de_juego;
        var selected = t.findAll( "input[type=checkbox]:checked");
        var arrayJugadores = _.map(selected, function(item) {
              return item.defaultValue;
        });
        Meteor.call('agregarJugadores',arrayJugadores,idpartido);
        Meteor.call('mailReserva',arrayJugadores, idpartido,dia,hora,recinto,organizador);

        //----------Notifica solo a los nuevos que se agregan----------
        createInvitationToGameNotificationOnlyOthers(idpartido, arrayJugadores);
        $('#alertNuevosJugadores').show();
    }, 

    'click #suplenteA': function(){
        var arraySuplentes = Partido.findOne(this._id).suplentes;
        var arrayA = Partido.findOne(this._id).equipoA;
        var arrayB = Partido.findOne(this._id).equipoB;
        var isJugadorA = _.findWhere(arrayA, {userId:Meteor.userId()});
        var isJugadorB = _.findWhere(arrayB, {userId:Meteor.userId()});
        if(! isJugadorA ){
            if(arraySuplentes.length === 0){
                var us = Meteor.userId();
                Partido.update(this._id, { $addToSet: { suplentes: Meteor.userId()}}); 
                Roles.addUsersToRoles(Meteor.userId(),'suplente',this._id);
            }else{

                var isSuplente= _.findWhere(arraySuplentes, Meteor.userId());
                if(! isSuplente){
                 Partido.update(this._id, { $addToSet: { suplentes: Meteor.user()._id}}); 
                 Roles.addUsersToRoles(Meteor.userId(),'suplente',this._id);     
                }else{
                    alert('Ya estas en la lista de suplentes');
                }
             }
        }else {
            alert('Estas en la lista de confirmados del equipo A');
        }
    }, 

     'click #suplenteB': function(){
        var arraySuplentes = Partido.findOne(this._id).suplentes
        var isSuplente= _.findWhere(arraySuplentes, Meteor.user()._id);
         var arrayB = Partido.findOne(this._id).equipoB;
        var isJugador = _.findWhere(arrayB, {userId:Meteor.userId()});
        if(! isJugador){
            if(arraySuplentes.length === 0){
                var us = Meteor.userId();
                Partido.update(this._id, { $addToSet: { suplentes: Meteor.userId()}}); 
                Roles.addUsersToRoles(Meteor.userId(),'suplente',this._id);
            }else{

                var isSuplente= _.findWhere(arraySuplentes, Meteor.userId());
                if(! isSuplente){
                 Partido.update(this._id, { $addToSet: { suplentes: Meteor.user()._id}}); 
                 Roles.addUsersToRoles(Meteor.userId(),'suplente',this._id);     
                }else{
                    alert('Ya estas en la lista de suplentes');
                }
             }
        }else{
            alert('Estas en la lista de confirmados del equipo A');
        }
    }, 
});

Template.confirmarPartido.onDestroyed( function() {
    Session.set('reserva', null);
    Session.set('alertReservaCreada', undefined);
    Session.set('alertReservaActualizada', undefined);
});
//._first('string')
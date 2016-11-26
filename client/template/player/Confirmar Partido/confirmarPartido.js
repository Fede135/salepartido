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
    };
})

Template.confirmarPartido.helpers({
	position:function(){
        var posi = Meteor.users.findOne({_id:this.userId}).profile.player.position;
        return posi;
    },
    promGeneral:function(){
        var prom = Meteor.users.findOne({_id:this.userId}).profile.promedioGeneral;
        return prom;

    },
    gravatarShow:function(){
    var user = Meteor.users.findOne({_id:this.userId});    
    if (! user.emails){
      var grav = Gravatar.imageUrl("salepartido2016@gmail.com");
    } else {
      var grav = Gravatar.imageUrl(_.first(user.emails).address, {
      default : Gravatar.imageUrl("salepartido2016@gmail.com")
      });    
    }    
    return grav;
    },

    gravatarShowId:function(){
    var user = Meteor.users.findOne({_id:this._id});    
    if (! user.emails){
      var grav = Gravatar.imageUrl("salepartido2016@gmail.com");
    } else {
      var grav = Gravatar.imageUrl(_.first(user.emails).address, {
      default : Gravatar.imageUrl("salepartido2016@gmail.com")
      });    
    }    
    return grav;
    },

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

    lleno: function(){
        var arrayA = Partido.findOne(this._id).equipoA;
        var arrayB = Partido.findOne(this._id).equipoB;
        var tamañoA = arrayA.length;
        var tamañoB = arrayB.length;
        var ab = tamañoA + tamañoB;
        var total = porEquipo * 2;
        if(ab === total){ 
            return true;
        }else{
            return false;
        }   

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

    jugadoresNoInvitados: function() {
        var usuario = Meteor.users.findOne({_id: Meteor.userId()});
        var array = usuario && usuario.profile.friends;    
        if(array != undefined) {
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
          
        var equipoA = _.pluck(Partido.findOne(this._id).equipoA, 'userId' );
        var equipoB = _.pluck(Partido.findOne(this._id).equipoB, 'userId' );
        var equipo = _.union(equipoA, equipoB);
        

            var porInvitar = _.difference(arrayJugadoresId,invitadosId, equipo, partido.suplentes);
            if (porInvitar.length != 0) {
              var invitar = [];
              porInvitar.forEach(function(e){
                var use = Meteor.users.findOne({_id: e});        
                invitar.push(use)
            });
              return invitar

            } else {
                return false;
            }
        } else {
            return false;
        }
},

    
    isHost: function () {
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        return Roles.userIsInRole( user._id, 'host', this._id);
    },
    isHostHostSecundario: function () {
        return Roles.userIsInRole( Meteor.userId(), ['host', 'hostSecundario'], this._id);
    },


    isEquipoA: function(){
        var equipoA = Partido.findOne(this._id).equipoA;
        var equipoA= _.pluck(equipoA, "userId");
        return _.contains(equipoA, Meteor.userId());
        
    },

    isEquipoB: function(){
        var equipoB = Partido.findOne(this._id).equipoB;
        var equipoB = _.pluck(equipoB, "userId");
        return _.contains(equipoB, Meteor.userId());
    },

    isConfirmado: function(){
        return Roles.userIsInRole( Meteor.userId(),'confirmado', this._id);
    },

    isInvitado: function(){
       return Roles.userIsInRole( Meteor.userId(),'invitado', this._id);
    },

    isSuplente: function(){
        return Roles.userIsInRole( Meteor.userId(),'suplente', this._id);

    },
    isNoJuega : function() {
        return Roles.userIsInRole( Meteor.userId(),'noJuega', this._id);    
    },

    isPorJugar : function() {
        var partido = Partido.findOne(this._id);
        var reserva = Reserva.findOne(partido.reserva_id);
        if(reserva.estado == "Reservada") {
            return true;
        } else {
            return false;
        }
    },

    isCancelada : function () {
        var partido = Partido.findOne(this._id);
        var reserva = Reserva.findOne(partido.reserva_id);
        if(reserva.estado == "Cancelada"){
            return true;
        }
    },

    isJugada : function () {
        var partido = Partido.findOne(this._id);
        var reserva = Reserva.findOne(partido.reserva_id);
        if(reserva.estado == "Jugada") {
            return true;
        }
    },


});

Template.confirmarPartido.events({
    'click #agregarEquipoA': function(event) {
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
        
        if (lista === undefined && cantJugEquipoA<numero) {
            if(Roles.userIsInRole( Meteor.userId(),'invitado', this._id)) {
                 Roles.removeUsersFromRoles(Meteor.userId(), 'invitado', this._id);
                 Partido.update(this._id, { $pull: { invitados: Meteor.user().emails[0].address}});
                 Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                 Roles.addUsersToRoles(Meteor.userId(), 'confirmado', this._id);
                 $('#alertEliminado').hide();
                 $('#alertConfirmado').show();
            }
        }
    },

    'click #agregarEquipoB': function(event) {
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

        if (lista === undefined && cantJugEquipoB<numero) {        
            if (Roles.userIsInRole( Meteor.userId(),'invitado', this._id)) {
                Roles.removeUsersFromRoles(Meteor.userId(), 'invitado', this._id);
                Partido.update(this._id, { $pull: { invitados: Meteor.user().emails[0].address}});
                Partido.update(this._id, { $addToSet: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                Roles.addUsersToRoles(Meteor.userId(), 'confirmado', this._id);
                $('#alertEliminado').hide();
                $('#alertConfirmado').show();

            }
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
        
        //Compruebo que este en el array equipoB  
        var equipoA = Partido.findOne(this._id).equipoA;
        var equipoA = _.pluck(equipoA, "userId");
        var retur = _.contains(equipoA, Meteor.userId());
        if(Roles.userIsInRole( Meteor.userId(),'confirmado', this._id) && retur){
            var p = Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
            var cantA = _.pluck(p.equipoA, 'userId' ).length;
            Roles.removeUsersFromRoles(Meteor.userId(),'confirmado',this._id);
            Roles.addUsersToRoles(Meteor.userId(),'invitado',this._id);
            Partido.update(this._id,{$push: {'invitados':Meteor.user().emails[0].address}});
            $('#alertConfirmado').hide();
            $('#alertEliminado').show()
        }
       //Si se baja alguno, sube automaticamente el primer suplente
       var arraySuplentes= Partido.findOne(this._id).suplentes;
       if(cantA < numero && arraySuplentes.length !=0) {
            var primerSuplente = _.first(arraySuplentes);            ;
            var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
            Partido.update(this._id, { $addToSet: { equipoA: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});            
            Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
            Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
            fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
            Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
          
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
        
        //Compruebo que este en el array equipoB  
        var equipoB = Partido.findOne(this._id).equipoB;
        var equipoB = _.pluck(equipoB, "userId");
        var retur = _.contains(equipoB, Meteor.userId());
        
        if(Roles.userIsInRole( Meteor.userId(),'confirmado', this._id) && retur){
            var p = Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
            var cantB = _.pluck(p.equipoB, 'userId' ).length;
            Roles.removeUsersFromRoles(Meteor.userId(),'confirmado',this._id); 
            Roles.addUsersToRoles(Meteor.userId(),'invitado',this._id)
            Partido.update(this._id,{$push: {'invitados':Meteor.user().emails[0].address}});
            $('#alertConfirmado').hide();
            $('#alertEliminado').show()
        }
        //Si se baja alguno, sube autoaticamente le primer suplente
        var arraySuplentes = Partido.findOne(this._id).suplentes;
        if(cantB < numero && arraySuplentes.length !=0) {        
            var primerSuplente = _.first(arraySuplentes);
            var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
            Partido.update(this._id, { $addToSet: { equipoB: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});
            Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
            Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
            fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
            Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
          
        }     
    },
    
    'click #noJuega': function(event) {
        if( Roles.userIsInRole( Meteor.userId(),'host', this._id) ) {
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
            var partido = Partido.findOne(this._id);        
            var equipoA = _.pluck(partido.equipoA, 'userId' );
            var cantA = equipoA.length;
            var equipoB = _.pluck(partido.equipoB, 'userId' );
            var cantB = equipoB.length;
            
            if (_.contains(equipoA, Meteor.userId())) {
                var p = Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                var cantA =  _.pluck(p.equipoA, 'userId' ).length;
                var arraySuplentes= Partido.findOne(this._id).suplentes;
                if(cantA < numero && arraySuplentes.length !=0) {
                var primerSuplente = _.first(arraySuplentes);
                var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
                Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
                Partido.update(this._id, { $addToSet: { equipoA: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});            
                Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
                Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
                fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
                Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
                }
            };
            
            if (_.contains(equipoB, Meteor.userId())) {
                var p = Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                var cantB = _.pluck(p.equipoB, 'userId' ).length;
                var arraySuplentes= Partido.findOne(this._id).suplentes;
                if(cantB < numero && arraySuplentes.length !=0) {  
                var primerSuplente = _.first(arraySuplentes);
                var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
                Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
                Partido.update(this._id, { $addToSet: { equipoB: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});
                Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
                Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
                fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
                Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
                }
            };

            Roles.setUserRoles(Meteor.userId(), ['host', 'invitado'], this._id)
            $('#seguroDeNoJugar').on('hidden.bs.modal', function() {
                    Router.go('showProfile', {_id:Meteor.userId()});
                })
                .modal('hide');

            return true; 
        };

        if( Roles.userIsInRole( Meteor.userId(),'invitado', this._id) ) {
        Roles.removeUsersFromRoles(Meteor.userId(),'invitado',this._id);
        Partido.update(this._id, { $pull: { invitados: Meteor.userId()}});
        Roles.addUsersToRoles(Meteor.userId(), 'noJuega', this._id);
        Session.set('alertNoJuega', true);
        $('#seguroDeNoJugar').on('hidden.bs.modal', function() {
            Router.go('showProfile', {_id:Meteor.userId()});
        })
        .modal('hide');
        }
        if( Roles.userIsInRole( Meteor.userId(),'confirmado', this._id) ) {
            Roles.removeUsersFromRoles(Meteor.userId(),'confirmado',this._id);
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
            var partido = Partido.findOne(this._id);        
            var equipoA = _.pluck(partido.equipoA, 'userId' );
            var cantA = equipoA.length;
            var equipoB = _.pluck(partido.equipoB, 'userId' );
            var cantB = equipoB.length;
            
            if (_.contains(equipoA, Meteor.userId())) {
                var p = Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                var cantA =  _.pluck(p.equipoA, 'userId' ).length;
                var arraySuplentes= Partido.findOne(this._id).suplentes;
                if(cantA < numero && arraySuplentes.length !=0) {
                var primerSuplente = _.first(arraySuplentes);
                var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
                Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
                Partido.update(this._id, { $addToSet: { equipoA: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});            
                Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
                Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
                fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
                Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
                }
                Roles.addUsersToRoles(Meteor.userId(), 'noJuega', this._id);
                Session.set('alertNoJuega', true);
                $('#seguroDeNoJugar').on('hidden.bs.modal', function() {
                    Router.go('showProfile', {_id:Meteor.userId()});
                })
                .modal('hide');   
            }
            
            if (_.contains(equipoB, Meteor.userId())) {
                var p = Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                var cantB = _.pluck(p.equipoB, 'userId' ).length;
                var arraySuplentes= Partido.findOne(this._id).suplentes;
                if(cantB < numero && arraySuplentes.length !=0) {  
                var primerSuplente = _.first(arraySuplentes);
                var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
                Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
                Partido.update(this._id, { $addToSet: { equipoB: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});
                Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
                Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
                fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
                Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
                }
                Roles.addUsersToRoles(Meteor.userId(), 'noJuega', this._id);
                Session.set('alertNoJuega', true);
                $('#seguroDeNoJugar').on('hidden.bs.modal', function() {
                    Router.go('showProfile', {_id:Meteor.userId()});
                })
                .modal('hide');                
            }
        }
        
        if (Roles.userIsInRole(Meteor.userId(), 'suplente', this._id)){
          Roles.removeUsersFromRoles(Meteor.userId(),'suplente',this._id);
          Partido.update(this._id, { $pull: { suplentes: Meteor.userId()}});
          Roles.addUsersToRoles(Meteor.userId(), 'noJuega', this._id);
           Session.set('alertNoJuega', true);
            $('#seguroDeNoJugar').on('hidden.bs.modal', function() {
                Router.go('showProfile', {_id:Meteor.userId()});
            })
            .modal('hide');
        }
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
        
        var selectedHost = t.findAll( "input[name=host]:checked");
        var arrayHostSecundario = _.map(selectedHost, function(item) {
              return item.defaultValue;
        });
        
        Meteor.call('agregarJugadores',arrayJugadores,idpartido);
        Meteor.call('mailReserva',arrayJugadores, idpartido,dia,hora,recinto,organizador);
        //----------Notifica solo a los nuevos que se agregan----------
        createInvitationToGameNotificationOnlyOthers(idpartido, arrayJugadores);
        Meteor.call('gameRolesConfirmar', idpartido, arrayJugadores, arrayHostSecundario);
        $('#alertNuevosJugadores').show();
    }, 

    'click #suplente': function(){
        var arraySuplentes = Partido.findOne(this._id).suplentes;
        var arrayA = Partido.findOne(this._id).equipoA;
        var arrayB = Partido.findOne(this._id).equipoB;
        var tamañoA = arrayA.length;
        var tamañoB = arrayB.length;
        var ab = tamañoA + tamañoB;
        
        var total = porEquipo * 2;
        if(ab === total) {       
            if(Roles.userIsInRole(Meteor.userId(),'invitado',this._id)) {
                Partido.update(this._id, { $pull: { invitados: Meteor.user().emails[0].address}});
                Roles.removeUsersFromRoles(Meteor.userId(),'invitado',this._id);
                Roles.addUsersToRoles(Meteor.userId(),'suplente',this._id);              
                Partido.update(this._id, { $addToSet: { suplentes: Meteor.userId()}});
                $('#alertSuplente').show();
            }
        }               
    },
    'click #cancelarReserva': function (event){
      var partido = Partido.findOne(this._id);
      var reserva = Reserva.findOne({'_id': partido.reserva_id});
      // Guardando los valores originales de la reserva antes de ser actualizada
      var oldHora = reserva.hora_de_juego;
      var oldDia = reserva.fecha_de_juego;
      var oldRecinto = reserva.nom_recinto;
      var oldCancha = reserva.num_cancha;
      Reserva.update({_id: reserva._id},{$set: {estado: 'Cancelada'}});
      //var host = Roles.getUsersInRole('host', partido._id); TIRA CUALQUIER COSA
      var jugadores = Roles.getUsersInRole(['invitado', 'suplente', 'confirmado'], partido._id);
      var jugadoresId = [];
      jugadores.forEach(function (e) {
        var jugadorId = e._id;
        jugadoresId.push(jugadorId);
      })

      Meteor.call('mailCancelar',jugadoresId,oldHora,oldDia,oldRecinto,oldCancha);
      cancelacionReservaForOwnerNotification(oldHora, oldDia, oldRecinto, oldCancha, reserva._id);
      cancelacionReservaPlayersNotification(partido._id, jugadoresId);      
      jugadoresId.forEach(function (e) {
        Roles.setUserRoles(e, 'noJugo', partido._id);
      });

      Session.set('alertReservaCancelada', true);
      $('#cancelarReservaModal').on('hidden.bs.modal', function() {
      		Router.go("showProfile", {_id : Meteor.userId() });
        })
        .modal('hide'); 

  },

  'change [data-toggle-target]': function (event, template) {
    // Y acá en donde puse $(this) deberías reemplazarlo por $(event.currentTarget)
    var target     = $(event.currentTarget).data('toggleTarget');
    var $hostInput = $('[data-toggle-visibility="' + target + '"]');
    var isChecked  = $(event.currentTarget).is(':checked');

    if (isChecked) {
        $hostInput.removeClass('hidden');
    } else {
        $hostInput.addClass('hidden');
    }
  },

  'click #lanzaIdJugador' : function(){
      var playerId = this.userId;
      Session.set('idJugador', playerId);
  },

  'click #pasarAInvitado' : function() {
        var idJugador = Session.get('idJugador');
        var jugador = Meteor.users.findOne({_id:idJugador});
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

        //Compruebo que este en el array equipoB  
        var equipoA = Partido.findOne(this._id).equipoA;
        var equipoA = _.pluck(equipoA, "userId");
        var returA = _.contains(equipoA, idJugador);
        

        //Compruebo que este en el array equipoB  
        var equipoB = Partido.findOne(this._id).equipoB;
        var equipoB = _.pluck(equipoB, "userId");
        var returB = _.contains(equipoB, idJugador);
        
        
        if(Roles.userIsInRole( idJugador,'confirmado', this._id) && returB){
            var p = Partido.update(this._id, { $pull: { equipoB: { userId: jugador._id, nombre: jugador.profile.name}}});
            var cantB = _.pluck(p.equipoB, 'userId' ).length;
            Roles.removeUsersFromRoles(idJugador,'confirmado',this._id); 
            Roles.addUsersToRoles(idJugador,'invitado',this._id)
            Partido.update(this._id,{$push: {'invitados':jugador.emails[0].address}});
            $('#alertEliminadoXHost').show();
            eliminadoPorHostNotification(this._id, idJugador);
        }

        if(Roles.userIsInRole( idJugador,'confirmado', this._id) && returA){
            var p = Partido.update(this._id, { $pull: { equipoA: { userId: jugador._id, nombre: jugador.profile.name}}});
            var cantA = _.pluck(p.equipoA, 'userId' ).length;
            Roles.removeUsersFromRoles(idJugador,'confirmado',this._id); 
            Roles.addUsersToRoles(idJugador,'invitado',this._id)
            Partido.update(this._id,{$push: {'invitados':jugador.emails[0].address}});
            $('#alertEliminadoXHost').show();
            eliminadoPorHostNotification(this._id, idJugador);
        }

        //Si se baja alguno, sube autoaticamente el primer suplente
        var arraySuplentes = Partido.findOne(this._id).suplentes;
        if(cantB < numero && arraySuplentes.length !=0) {        
            var primerSuplente = _.first(arraySuplentes);
            var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
            Partido.update(this._id, { $addToSet: { equipoB: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});
            Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
            Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
            fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
            Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
          
        }

        //Si se baja alguno, sube autoaticamente el primer suplente
        var arraySuplentes = Partido.findOne(this._id).suplentes;
        if(cantA < numero && arraySuplentes.length !=0) {        
            var primerSuplente = _.first(arraySuplentes);
            var primerSuplente = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $pull: { suplentes: primerSuplente._id}});
            Partido.update(this._id, { $addToSet: { equipoA: { userId: primerSuplente._id, nombre: primerSuplente.profile.name}}});
            Roles.removeUsersFromRoles(primerSuplente._id,'suplente',this._id);
            Roles.addUsersToRoles(primerSuplente,'confirmado', this._id);
            fromSupleteToConfirmadoNotification(this._id, primerSuplente._id);
            Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente._id);
          
        }
  }


});



Template.confirmarPartido.onDestroyed( function() {
    Session.set('reserva', null);
    Session.set('alertReservaCreada', undefined);
    Session.set('alertReservaActualizada', undefined);
});
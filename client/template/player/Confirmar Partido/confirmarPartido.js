Template.confirmarPartido.onRendered(function () {
    if (Session.get('alertReservaCreada')) {
     $('#alertReservaCreada').show();
    } else {
     $('#alertReservaCreada').hide();   
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

    lleno: function(){
        var arrayA = Partido.findOne(this._id).equipoA;
        var arrayB = Partido.findOne(this._id).equipoB;
        var tamañoA = arrayA.length;
        var tamañoB = arrayB.length;
        var ab = tamañoA + tamañoB;
        console.log('numero',porEquipo);
        var total = porEquipo * 2;
        console.log(total);
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
        console.log('suplentes',arraySuplente)
        if(arraySuplente === undefined || arraySuplente.length === 0){
            console.log('if')
            return false;
        }else{
            console.log('else')
            var array = [];
            arraySuplente.forEach(function(e){
                var usu = Meteor.users.findOne({_id:e});
                array.push(usu);         
           });            
            return array;
        }

    },

    

    isHostHostSecundario: function () {
        return Roles.userIsInRole( Meteor.userId(), ['host', 'hostSecundario','host-confirmado','hostSecundario-confirmado'], this._id);
    },

    puedeConfirmar:function(){
        return Roles.userIsInRole( Meteor.userId(), ['host', 'hostSecundario','invitado'], this._id);
    },

    isEquipoA: function(){
        var equipoA = Partido.findOne(this._id).equipoA;
        var length = equipoA.length;
        var retur = false;
        for(i=0; i<length; i++ ){
            
            if(equipoA[i].userId === Meteor.userId()){
                retur=true;
                return retur
            }
            break;
        }
        return retur;
    },

    isEquipoB: function(){
        var equipoB = Partido.findOne(this._id).equipoA;
        var length = equipoB.length;
        var retur = false;
        for(i=0; i<length; i++ ){
            
            if(equipoB[i].userId === Meteor.userId()){
                retur=true;
                return retur
            }
            break;
        }
        return retur;
    },

    isConfirmado: function(){
        console.log('isconfirmado',Roles.userIsInRole( Meteor.userId(),['confirmado'], this._id));
        return Roles.userIsInRole( Meteor.userId(),['confirmado','host-confirmado','hostsecundario-confirmado'], this._id);
    },

    /*isInvitado: function(){
       return Roles.userIsInRole( Meteor.userId(),'invitado', this._id);
    },*/

    isSuplente: function(){
        console.log('isusplente',Roles.userIsInRole( Meteor.userId(),['suplente'], this._id));
        return Roles.userIsInRole( Meteor.userId(),['suplente','host-suplente','hostsecundario-suplente'], this._id);

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
            
            if( Roles.userIsInRole( Meteor.userId(),'invitado', this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['invitado'],this._id);
                Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                Roles.addUsersToRoles(Meteor.userId(), 'confirmado', this._id);
                alert('Estas confirmado en el equipo A');
            }else if (Roles.userIsInRole( Meteor.userId(),['host'], this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['host'],this._id);
                Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                Roles.addUsersToRoles(Meteor.userId(), 'host-confirmado', this._id);
                alert('Estas confirmado en el equipo A');
            }else if(Roles.userIsInRole( Meteor.userId(),['hostSecundario'], this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['hostSecundario'],this._id);
                Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                Roles.addUsersToRoles(Meteor.userId(), 'hostSecundario-confirmado', this._id);
                alert('Estas confirmado en el equipo A');
            }else{
                alert('No estas invitado al partido,comunicate con el organizador');
            }    
              

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
            
            if( Roles.userIsInRole( Meteor.userId(),'invitado', this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['invitado'],this._id);
                Partido.update(this._id, { $addToSet: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}}); 
                Roles.addUsersToRoles(Meteor.userId(), 'confirmado', this._id);
                alert('Estas confirmado en el equipo B');
           }else if (Roles.userIsInRole( Meteor.userId(),['host'], this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['host'],this._id);
                Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                Roles.addUsersToRoles(Meteor.userId(), 'host-confirmado', this._id);
                alert('Estas confirmado en el equipo A');
            }else if(Roles.userIsInRole( Meteor.userId(),['hostSecundario'], this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['hostSecundario'],this._id);
                Partido.update(this._id, { $addToSet: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
                Roles.addUsersToRoles(Meteor.userId(), 'hostSecundario-confirmado', this._id);
                alert('Estas confirmado en el equipo A');
            }else{
                alert('No estas invitado al partido,comunicate con el organizador');
            }    
              

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
        
        //Compruebo que este en el array equipoB  
        var equipoA = Partido.findOne(this._id).equipoA;
        var length = equipoA.length;
        var retur = false;
        for(i=0; i<length; i++ ){
            
            if(equipoA[i].userId === Meteor.userId()){
                retur=true;
                return retur
            }
            break;
        };
        console.log('break each A',retur);
        if(Roles.userIsInRole( Meteor.userId(),['confirmado'], this._id) && retur){
            Roles.removeUsersFromROles(Meteor.userId(),['confirmado'],this._id);
            Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
            Roles.addUsersToRoles(primerSuplente,['invitado'], this._id);
        }else if (Roles.userIsInRole( Meteor.userId(),['host-confirmado'], this._id)){
            Roles.removeUsersFromROles(Meteor.userId(),['host-confirmado'],this._id);
            Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
            Roles.addUsersToRoles(Meteor.userId(), 'host', this._id);
            alert('Estas confirmado en el equipo A');
        }else if(Roles.userIsInRole( Meteor.userId(),['hostSecundario-confirmado'], this._id)){
            Roles.removeUsersFromROles(Meteor.userId(),['hostSecundario-confirmado'],this._id);
            Partido.update(this._id, { $pull: { equipoA: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
            Roles.addUsersToRoles(Meteor.userId(), 'hostSecundario', this._id);
            alert('Estas confirmado en el equipo A');
        }else{
            alert('No estas en el equipo A');
        }
       //Si se baja alguno, sube autoaticamente le primer suplente
        var cantA = Partido.findOne(this._id).equipoA.length;
        if(cantA < numero && arraysuplentes.length !=0){
            var arraysuplentes= Partido.findOne(this._id).suplentes;
            var primerSuplente = _.first(arraysuplentes);            ;
            var usu = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $addToSet: { equipoA: { userId: primerSuplente, nombre: usu.profile.name}}});            
            Roles.removeUsersFromROles(Meteor.userId(),['invitado'],this._id);
            Roles.addUsersToRoles(primerSuplente,['confirmado'], this._id);
            Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente);
          
        } else{
            console.log('No hay suplentes A');
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
        var length = equipoB.length;
        var retur = false;
        for(i=0; i<length; i++ ){
           
            if(equipoB[i].userId === Meteor.userId()){
                retur=true;
                return retur
            }
            break;
        };
        
        console.log('break each',retur);
        if(Roles.userIsInRole( Meteor.userId(),['confirmado'], this._id) && retur){
            Roles.removeUsersFromROles(Meteor.userId(),['confirmado'],this._id);
            Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}}); 
            Roles.addUsersToRoles(primerSuplente,['invitado'], this._id);
        }else if (Roles.userIsInRole( Meteor.userId(),['host-confirmado'], this._id)){
            Roles.removeUsersFromROles(Meteor.userId(),['host-confirmado'],this._id);
            Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
            Roles.addUsersToRoles(Meteor.userId(), 'host', this._id);
            alert('Estas confirmado en el equipo A');
        }else if(Roles.userIsInRole( Meteor.userId(),['hostSecundario-confirmado'], this._id)){
            Roles.removeUsersFromROles(Meteor.userId(),['hostSecundario-confirmado'],this._id);
            Partido.update(this._id, { $pull: { equipoB: { userId: Meteor.user()._id, nombre: Meteor.user().profile.name}}});
            Roles.addUsersToRoles(Meteor.userId(), 'hostSecundario', this._id);
            alert('Estas confirmado en el equipo B');
        }else{
            alert('No estas confirmado en el equipo B');
        }
        //Si se baja alguno, sube autoaticamente le primer suplente
        var cantB = Partido.findOne(this._id).equipoB.length;
        if(cantB < numero && arraysuplentes.length !=0){
            var arraysuplentes= Partido.findOne(this._id).suplentes;        
            var primerSuplente = _.first(arraysuplentes);
            var usu = Meteor.users.findOne({_id:primerSuplente});
            Partido.update(this._id, { $addToSet: { equipoB: { userId: primerSuplente, nombre: usu.profile.name}}});
            Roles.removeUsersFromROles(Meteor.userId(),['invitado'],this._id);
            Roles.addUsersToRoles(primerSuplente,['confirmado'], this._id);
            Meteor.call('mailSuplente',this._id,reserva_id,primerSuplente);
          
        } else{
            console.log('Sin suplentes B');
        }     
    },
   

    'click #noJuega': function(event){

        var equipoA = Partido.findOne(this._id).equipoA;
        var listaA =_.findWhere(equipoA, {userId: Meteor.user()._id});
        var equipoB = Partido.findOne(this._id).equipoB;
        var listaB =_.findWhere(equipoB, {userId: Meteor.user()._id});

        if( Roles.userIsInRole( Meteor.userId(),'invitado', this._id) && !listaA && !listaB){

            Roles.removeUsersFromROles(Meteor.userId(),['invitado'],this._id);
            alert('Gracias por avisar que no queres jugar');
            Roles.addUsersToRoles(Meteor.userId(), 'noJuega', this._id);
            Router.go('Home');
        }else if(Roles.userIsInRole( Meteor.userId(),['host'], this._id)){
            Roles.removeUsersFromROles(Meteor.userId(),['host'],this._id);
            alert('Gracias por avisar que no queres jugar');
            Roles.addUsersToRoles(Meteor.userId(), 'host-noJuega', this._id);
            Router.go('Home');

        }else if(Roles.userIsInRole( Meteor.userId(),['hostSecundario'], this._id)){
            Roles.removeUsersFromROles(Meteor.userId(),['hostSecundario'],this._id);
            alert('Gracias por avisar que no queres jugar');
            Roles.addUsersToRoles(Meteor.userId(), 'hostSecundario-noJuega', this._id);
            Router.go('Home');
        }
    },

    'click #invitarJugadores': function(event,t){
        console.log(event)
        var idpartido = this._id;
        var reserva_id = Partido.findOne(this._id).reserva_id;
        var reserva = Reserva.findOne({'_id': reserva_id});
        var organizador = reserva.nom_usuario;
        var recinto = reserva.nom_recinto;
        var cancha = reserva.num_cancha;
        var hora = reserva.hora_de_juego;
        var dia = reserva.fecha_de_juego;
        var selected = t.findAll( "input[type=checkbox]:checked");
        console.log('lo q selecciona',selected);
        var arrayJugadores = _.map(selected, function(item) {
              return item.defaultValue;
        });
        console.log(arrayJugadores);
        Meteor.call('agregarJugadores',arrayJugadores,idpartido);
        Meteor.call('mailReserva',arrayJugadores, idpartido,dia,hora,recinto,organizador);
        alert('Se invitaron')
    }, 

    'click #suplente': function(){
        var arraySuplentes = Partido.findOne(this._id).suplentes;
        var arrayA = Partido.findOne(this._id).equipoA;
        var arrayB = Partido.findOne(this._id).equipoB;
        var tamañoA = arrayA.length;
        var tamañoB = arrayB.length;
        var ab = tamañoA + tamañoB;
        console.log('numero',porEquipo);
        var total = porEquipo * 2;
        console.log(total);
        if(ab === total){       
            if(Roles.addUsersToRoles(Meteor.userId(),'invitado',this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['invitado'],this._id);             
                Partido.update(this._id, { $addToSet: { suplentes: Meteor.userId()}}); 
                Roles.addUsersToRoles(Meteor.userId(),'suplente',this._id);

            }else if(Roles.userIsInRole( Meteor.userId(),['host'], this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['host'],this._id);
                Partido.update(this._id, { $addToSet: { suplentes: Meteor.userId()}}); 
                Roles.addUsersToRoles(Meteor.userId(), 'host-suplente', this._id);
                Router.go('Home');

             }else if(Roles.userIsInRole( Meteor.userId(),['hostSecundario'], this._id)){
                Roles.removeUsersFromROles(Meteor.userId(),['hostSecundario'],this._id);
                Partido.update(this._id, { $addToSet: { suplentes: Meteor.userId()}}); 
                Roles.addUsersToRoles(Meteor.userId(), 'hostSecundario-suplente', this._id);
                Router.go('Home');
            }else{
                alert('No estas invitado al partido.Comunicate con el organizador');
            }
        }else{
            console.log('Todavia hay lugares');
        }               
    }, 

    
});

Template.confirmarPartido.onDestroyed( function() {
    Session.set('reserva', null);
    Session.set('alertReservaCreada', undefined);
});
//._first('string')
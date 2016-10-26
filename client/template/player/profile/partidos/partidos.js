Template.partidos.helpers({

  partidosInvitado: function() {
    var partidosArray = Roles.getGroupsForUser(this._id, 'invitado');
    if(partidosArray.length != 0 ) { 
      var partidos = [];
      partidosArray.forEach(function(e) {
        var partido = Partido.findOne({_id: e});
        partidos.push(partido);
      });
      return _.sortBy(partidos, 'horario');
    } else {
       return false; 
    }
  },

  partidosPendientes: function() {
    var partidosArray = Roles.getGroupsForUser(this._id, 'confirmado');
    if(partidosArray.length != 0 ) {
      var partidos = []; 
      partidosArray.forEach(function(e) {
        var partido = Partido.findOne({_id: e});
        partidos.push(partido);
      });
      return _.sortBy(partidos, 'horario');
    } else {
     return false; 
    }
},

  partidosJugados: function() {
    var partidosArray = Roles.getGroupsForUser(this._id, 'jugoPartido');
    if(partidosArray.length != 0 ) {
      var partidos = []; 
      partidosArray.forEach(function(e) {
        var partido = Partido.findOne({_id: e});
        partidos.push(partido);
      });
      return _.sortBy(partidos, 'horario');
    } else {
      return false;
    }
},
   
  dia: function(){
    var reservaDia = Reserva.findOne({_id: this.reserva_id}).fecha_de_juego;
    return reservaDia;
  },
  hora: function(){
    var reservaHora = Reserva.findOne({_id: this.reserva_id}).hora_de_juego;
    return reservaHora;
  },
  recinto: function(){
    var reservaRecinto = Reserva.findOne({_id: this.reserva_id}).nom_recinto;
    return  reservaRecinto;
  },
  cancha: function(){
   var reservaCancha = Reserva.findOne({_id: this.reserva_id}).num_cancha;
   return reservaCancha
 },

  isHost :function() {
    return Roles.userIsInRole (Meteor.userId(), 'invitado', this._id);
  },
  isInvitado : function() {
    return Roles.userIsInRole (Meteor.userId(), 'invitado', this._id);
  },
  isConfirmado : function() {
    return Roles.userIsInRole (Meteor.userId(), 'confirmado', this._id);
  },
});

Template.partidos.events({ 

  'click #lanzaIdPartido': function () {
    var idPartido = this._id;
    Session.set("idPartido", idPartido );      
  },
  
  'click #modificarHorario': function () {
    var idPartido = Session.get("idPartido");
    var partido = Partido.findOne({_id: idPartido});
    $('#redirigirPartidosModal').on('hidden.bs.modal', function() {
      console.log(partido._id, this._id)
      Router.go("modificarReservaPlayer", {_id : partido.reserva_id });
    })
    .modal('hide');
  },
  
  'click #jugarPartido': function () {
    var idPartido = Session.get('idPartido');
    $('#redirigirPartidosModal').on('hidden.bs.modal', function() {
      Router.go("confirmarPartido", {_id : idPartido });
    })
    .modal('hide');
  },

  'click #confirmarPartido' : function() {
      Router.go("confirmarPartido", {_id: this._id});
    },
});
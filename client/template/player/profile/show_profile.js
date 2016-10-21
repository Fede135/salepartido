Template.showProfile.onRendered(function() {
  if (Session.get('alertPerfilEditado')) {
    $('#alertPerfilEditado').show();
  } else {
    $('#alertPerfilEditado').hide();
  }
});

Template.showProfile.helpers({   //se busca el usuario del cual se esta viendo el perfil
  user : function() {
    use = this._id;
    
    return Meteor.users.findOne({_id: this._id});
  },

  isUserFacebook: function(){
    var user = Meteor.users.findOne({_id: this._id});
    if (user && user.services && user.services.facebook){
      return true;
    }else{
      return false;
    }

  },

  ownProfile: function () { //devuelve verdadero si el perfil es del usuario logeado, o falso sino lo es
    return this._id === Meteor.userId();
  },
  amigosfb: function () {  
    var usuario = Meteor.users.findOne({_id: use});
    var array = usuario.profile.friends;          
        if(array){
          var length = array.length;
          var arrayAmigos= [];
          for(i=0; i<length; i++ ){
            if(array[i].fb){
              var amigosId = array[i].id;
              var amigo = Meteor.users.findOne({_id : amigosId});
              arrayAmigos.push(amigo);
            }
          } 
          return arrayAmigos; 
        } else {
          return false;
        }
      },

      amigosapp: function (){
        var usuario = Meteor.users.findOne({_id: use});
        var array = usuario.profile.friends;          
      if(array){
        var length = array.length;
        var arrayAmigos= [];
        for(i=0; i<length; i++ ){
          if(! array[i].fb){
            var amigosId = array[i].id;
            var amigo = Meteor.users.findOne({_id : amigosId});
            arrayAmigos.push(amigo);
          }
        } 
        return arrayAmigos; 
      }else{
        return false;
      }
    },

    arquero : function() {
     var u = Meteor.users.findOne({_id: this._id});
     var arq = u && u.profile.player && u.profile.player.position;
     if(arq === "Arquero") {
       return true;
     } else {
       return false;
     };
   },

  place : function() {  // se buscan datos del usuario del cual se esta viendo el perfil
    var user = Meteor.users.findOne({_id: this._id});
    var profile = user && user.profile;
    var locality = profile && profile.country && profile.country.locality;
    var province = profile && profile.country && profile.country.province;
    var country = profile && profile.country && profile.country.country;
    var place = country && (locality + ", " + province + ", " + country + ".");

    return place;
  },

  age : function(){ //se calcula la edad del usuario del cual se esta viendo el perfil
    var user = Meteor.users.findOne({_id: this._id});
    var profile = user && user.profile;
    var birth = profile && profile.birthday;
    var today = new Date();
    var diffMs = birth && Math.abs(today.getTime() - birth.getTime());
    var diffDays = diffMs && Math.ceil(diffMs / (1000*3600*24));
    var age = diffDays && ("Edad: " + Math.floor(diffDays / 361));

    return age;
  },
    //Posicion arquero
    promreflejos: function(){
      var cali = Calificacion_reflejo.findOne({id_user:this._id});
      if(cali){
        var array = cali.votes;
        var promedio = 0;

        for( i=0; i<array.length; i++ ){
          promedio += array[i];
        }
        promedio = promedio / array.length;
        
        if(promedio){
          return promedio;
        }else{
          return 0;
        }   
      }    
    },

    promatajadas: function(){
      var cali = Calificacion_atajadas.findOne({id_user:this._id});
      if(cali){
        var array = cali.votes;
        var promedio = 0;

        for( i=0; i<array.length; i++ ){
          promedio += array[i];
        }
        promedio = promedio / array.length;
        if(promedio){
          return promedio;
        }else{
          return 0;
        }
      }
    },
      //Comun a todas las posiciones
      promresistencia: function(){
        var cali = Calificacion_resistencia.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },

      promfairplay: function(){
        var cali = Calificacion_fairplay.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },
      prompuntualidad: function(){
        var cali = Calificacion_puntualidad.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        } 
      },
      promburradas: function(){
        var cali = Calificacion_burradas.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },
      //Resto de las posiciones
      prompase: function(){
        var cali = Calificacion_pase.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },
      promdefensa: function(){
        var cali = Calificacion_defensa.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },
      promgambeta: function(){
        var cali = Calificacion_gambeta.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },

      promrematearco: function(){
        var cali = Calificacion_tiroalarco.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },

      promvelocidad: function(){
        var cali = Calificacion_velocidad.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio;
          }else{
            return 0;
          }
        }
      },


      tieneVotoRe: function () {
        var re = Calificacion_reflejo.findOne({id_user:this._id, upvotes: Meteor.userId() });
        if(re)
          return true;
        else
          return false;
      },
      tieneVotoAt: function () {
        var at = Calificacion_atajadas.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return at;
      },
      tieneVotoRes: function () {
        var res = Calificacion_resistencia.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return res;
      },
      tieneVotoFair: function () {    
        var fair = Calificacion_fairplay.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return fair;
      },
      tieneVotoPunt: function () {
        var punt= Calificacion_puntualidad.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return punt;
      },
      tieneVotoBurr :function () {
        var burr = Calificacion_burradas.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return burr;
      },
      tieneVotoPa: function () {
        var pa = Calificacion_pase.findOne({id_user:this._id, upvotes: Meteor.userId() });

        return pa;
      },
      tieneVotoDef: function () {
        var def = Calificacion_defensa.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return def;
      },
      tieneVotoGam : function () {
        var gam = Calificacion_gambeta.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return gam;
      },
      tieneVotoRema: function (){
        var rema = Calificacion_tiroalarco.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return rema;
      },
      tieneVotoVel: function() {
        var vel = Calificacion_velocidad.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return vel;
      },

      isOwner : function () {
        var dueño = Roles.userIsInRole(Meteor.userId(), 'owner', 'Roles.GLOBAL_GROUP');
        return dueño;

      },

      isFriend : function(){

        var ve = Meteor.users.findOne({_id:Meteor.userId()});
        var array = ve.profile.friends; 
        if(array){        
      var length = array.length;
      var result = false;
      for(i=0; i<length; i++ ){
        if(use === array[i].id){
          result = true;
        }
      }
    }
    return result;
  },
  cantidadPartidosJugados: function(){
    var arrayIdPartido = Roles.getGroupsForUser(use,'jugoPartido');
    var cantidad = arrayIdPartido.length
    return cantidad;
  },
  partidosJugados: function(){
    var arrayIdPartido = Roles.getGroupsForUser(use,'jugoPartido');
    if(arrayIdPartido.length != 0){
      var arrayPartidosJugo=[];    
      arrayIdPartido.forEach(function (e) {
        var partidos = Partido.findOne({_id: e});
        arrayPartidosJugo.push(partidos);
      });    

      var ultimo3 = arrayPartidosJugo.slice(Math.max(arrayPartidosJugo.length - 3, 1));
      return ultimo3;
    
  }else{
    return false;
  }
  },
  partidosInvitado: function(){
    var arrayIdPartido = Roles.getGroupsForUser(use,'invitado');
    if(arrayIdPartido.length != 0) {      

      var arrayPartidosInvitado=[];    
      arrayIdPartido.forEach(function (e) {
        var partidos = Partido.findOne({_id: e});
        arrayPartidosInvitado.push(partidos);
      });    

      var ultimo3 = arrayPartidosInvitado.slice(Math.max(arrayPartidosInvitado.length - 3, 1));
      return ultimo3;
    
  }else{
    return false;
  }
  },

  partidosPendientes: function(){
     var arrayIdPartido = Roles.getGroupsForUser(use,'confirmado');//ver si busca en los q es host
    if(arrayIdPartido.length != 0 ){      

      var arrayPartidosConfirmado=[];    
      arrayIdPartido.forEach(function (e) {
        var partidos = Partido.findOne({_id: e});
        arrayPartidosConfirmado.push(partidos);
      });   

      var ultimo3 = arrayPartidosConfirmado.slice(Math.max(arrayPartidosConfirmado.length - 3, 1));
      return ultimo3;
    
  }else{
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
 isHost :function(){
      //this._id es el id del partido que viene del each de partidos pendientes
      if(Roles.userIsInRole( Meteor.userId(),['host','hostSecundario'], this._id)){
        return true;
      }else{
        return false;
      }
    },

  });

Template.showProfile.events({  //al hacer click en el boton editar se redirige al template editProfile y se le pasa el _id del usuario del cual quiere editar su perfil


  //Codigo para las calificaciones
  //Todas las posiciones
  'click #resistencia': function(){
    var tipo = "resistencia";
    var ratingResistencia = $('#resistencia').data('userrating');
    Meteor.call('calif',use,ratingResistencia,tipo);
  },

  'click #fairplay': function(){
    var tipo = "fairplay";
    var ratingFairplay = $('#fairplay').data('userrating');
    Meteor.call('calif',use,ratingFairplay,tipo);
  },

  'click #puntualidad': function(){
    var tipo = "puntualidad";
    var ratingPunt = $('#puntualidad').data('userrating');
    Meteor.call('calif',use,ratingPunt,tipo);
  },

  'click #burradas': function(){
    var tipo = "burradas";
    var ratingBurradas = $('#burradas').data('userrating');
    Meteor.call('calif',use,ratingBurradas,tipo);
  },
   //Posicion arquero
   'click #reflejos': function(){
    var tipo = "reflejos";
    var ratingReflejos = $('#reflejos').data('userrating');
    Meteor.call('calif',use,ratingReflejos,tipo);
  },
  'click #atajadas': function(){
    var tipo = "atajadas";
    var ratingAtajadas = $('#atajadas').data('userrating');
    Meteor.call('calif',use,ratingAtajadas,tipo);
  },
   //Otras posiciones
   'click #pase': function(){
    var tipo = "pase";
    var ratingPase = $('#pase').data('userrating');
    Meteor.call('calif',use,ratingPase,tipo);
  },
  'click #defensa': function(){
    var tipo = "defensa";
    var ratingDefensa = $('#defensa').data('userrating');
    Meteor.call('calif',use,ratingDefensa,tipo);
  },
  'click #gambeta': function(){
    var tipo = "gambeta";
    var ratingGambeta = $('#gambeta').data('userrating');
    Meteor.call('calif',use,ratingGambeta,tipo);
  },
  'click #rematearco': function(){
    var tipo = "remate";
    var ratingRematearco = $('#rematearco').data('userrating');
    Meteor.call('calif',use,ratingRematearco,tipo);
  },
  'click #velocidad': function(){
    var tipo = "velocidad";
    var ratingVelocidad = $('#velocidad').data('userrating');
    Meteor.call('calif',use,ratingVelocidad,tipo);
  },

  'click #login-buttons-edit-profile': function(event) {
    Router.go('editProfile', {_id: Meteor.userId()});
  },

  'click #addJugadores': function() {
    var agregadoId = use;
    var agregaId = Meteor.userId();
      Meteor.call('addJugadores',agregaId, agregadoId);
    },

    'click #gestionJugador': function(event) {
      Router.go('gestionJugadores', {_id: Meteor.userId()});
    },



    'click #modificarReservaPlayer': function () {
      Router.go('modificarReservaPlayer', {_id: this.reserva_id});        

    },

  'click #lanzarIdJugador': function () {
    var playerId = this._id;
    Session.set('idPlayer', playerId);
    
  },
  'click #deleteFriend': function () { 
    var playerId = Session.get('idPlayer');
    Meteor.users.update(Meteor.userId(),{ $pull: { 'profile.friends': { id: playerId}}});  
  } 
});

Template.showProfile.onDestroyed(function() {
  Session.set('alertPerfilEditado', undefined);
})

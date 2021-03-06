Template.showProfile.onRendered(function() {
  if (Session.get('alertPerfilEditado')) {
    $('#alertPerfilEditado').show();
  } else {
    $('#alertPerfilEditado').hide();
  }
  if (Session.get('alertNoJuega')) {
    $('#alertNoJuega').show();
  } else {
    $('#alertNoJuega').hide();
  }
  if(Session.get('alertReservaCancelada')){
    $('#alertReservaCancelada').show();
  } else {
    $('#alertReservaCancelada').hide();
  }
  //eliminar de la lista jugadores 
var arrayFriend = this.data.profile.friends;
var idU = this.data._id;
if(arrayFriend){
  arrayFriend.forEach(function (e,i) {
    if(!Meteor.users.findOne({_id:e.id})){         
      Meteor.users.update(idU,{ $pull: { 'profile.friends':{id:e.id} }});
    }
  });
}
});

Template.showProfile.helpers({   //se busca el usuario del cual se esta viendo el perfil
  user : function() {
    use = this._id;
    
    return Meteor.users.findOne({_id: this._id});
  }, 
  gravatarShow:function(){
    var userId = this._id;
    var user = Meteor.users.findOne({_id:userId});    
    if (! user.emails){
      var grav = Gravatar.imageUrl("salepartido2016@gmail.com");
    } else {
      var grav = Gravatar.imageUrl(_.first(user.emails).address, {
      default : Gravatar.imageUrl("salepartido2016@gmail.com")
      });    
    }    
    return grav;
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
    var age = diffDays && ( Math.floor(diffDays / 361));

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
          return promedio.toFixed(2);
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
          return promedio.toFixed(2);
        }else{
          return 0;
        }
      }
    },
      //Comun a todas las posiciones
      promconducta: function(){
        var cali = Calificacion_conducta.findOne({id_user:this._id});
        if(cali){
          var array = cali.votes;
          var promedio = 0;

          for( i=0; i<array.length; i++ ){
            promedio += array[i];
          }
          promedio = promedio / array.length;
          if(promedio){
            return promedio.toFixed(2);
          }else{
            return 0;
          }
        }
      },
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
            return promedio.toFixed(2);
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
            return promedio.toFixed(2);
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
            return promedio.toFixed(2);
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
            return promedio.toFixed(2);
          }else{
            return 0;
          }
        }
      },
      
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
            return promedio.toFixed(2);
          }else{
            return 0;
          }
        }
      },

      //Resto de las posiciones
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
            return promedio.toFixed(2);
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
            return promedio.toFixed(2);
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
            return promedio.toFixed(2);
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
            return promedio.toFixed(2);
          }else{
            return 0;
          }
        }
      },

  promedioGeneral: function(){
  var arrayGeneral = [];
  
  var calificacionConducta = Calificacion_conducta.findOne({id_user:this._id});
  if(calificacionConducta){
    var array = calificacionConducta.votes;
    var promedioConducta = 0;
    if(array.length != 0){
      for( i=0; i<array.length; i++ ){
        promedioConducta += array[i];
      }
      promedioConducta = promedioConducta / array.length;
      if(promedioConducta != 0 ){
        promedioConducta = promedioConducta.toFixed(2);
        arrayGeneral.push(promedioConducta);       
      }
    }
  }

  var calificacionPuntualidad = Calificacion_puntualidad.findOne({id_user:this._id});
  if(calificacionPuntualidad){
    var array = calificacionPuntualidad.votes;
    var promedioPuntualidad = 0;
    if(array.length != 0){
      for( i=0; i<array.length; i++ ){
        promedioPuntualidad += array[i];
      }
      promedioPuntualidad = promedioPuntualidad / array.length;
      //console.log('pormpuntualida',promedioPuntualidad)
      if(promedioPuntualidad != 0){
        promedioPuntualidad = promedioPuntualidad.toFixed(2);
        //console.log('puntuali recortado',promedioPuntualidad)
         arrayGeneral.push(promedioPuntualidad);
      }
    }
  }

  var calificacionResistencia = Calificacion_resistencia.findOne({id_user:this._id});
  if(calificacionResistencia){
    var array = calificacionResistencia.votes;
    var promedioResistencia = 0;
    if(array.length != 0){
      for( i=0; i<array.length; i++ ){
        promedioResistencia += array[i];
      }
      promedioResistencia = promedioResistencia / array.length;
      if(promedioResistencia != 0){
        promedioResistencia = promedioResistencia.toFixed(2);
        arrayGeneral.push(promedioResistencia);
      }
    }
  }

  var calificacionFairplay = Calificacion_fairplay.findOne({id_user:this._id});
  if(calificacionFairplay){
    var array = calificacionFairplay.votes;
    var promedioFairplay = 0;
    if(array.length != 0){
      for( i=0; i<array.length; i++ ){
        promedioFairplay += array[i];
      }
      promedioFairplay = promedioFairplay / array.length;
      if(promedioFairplay != 0){
        promedioFairplay = promedioFairplay.toFixed(2);
        arrayGeneral.push(promedioFairplay);
      }
    }
  }

  var califiacionBurradas = Calificacion_burradas.findOne({id_user:this._id});
  if(califiacionBurradas){
    var array = califiacionBurradas.votes;
    var promedioBurrada = 0;
    if(array.length != 0){
      for( i=0; i<array.length; i++ ){
        promedioBurrada += array[i];
      }
      promedioBurrada = promedioBurrada / array.length;
      if(promedioBurrada != 0){
        promedioBurrada = promedioBurrada.toFixed(2);
        arrayGeneral.push(promedioBurrada);
      }
    }
  }

  var calificacionPase = Calificacion_pase.findOne({id_user:this._id});
  if(calificacionPase){
    var array = calificacionPase.votes;
    var promedioPase = 0;
    if(array.length != 0){
      for( i=0; i<array.length; i++ ){
        promedioPase += array[i];
      }
      promedioPase = promedioPase / array.length;
      if(promedioPase != 0){
        promedioPase = promedioPase.toFixed(2);
        arrayGeneral.push(promedioPase);
      }
    }
  }
     

  var isArquero = Meteor.users.findOne({_id: this._id, 'profile.player.position':"Arquero"});
  
  if(isArquero){
    var calificacionReflejo = Calificacion_reflejo.findOne({id_user:this._id});
    if(calificacionReflejo){
      var array = calificacionReflejo.votes;
      var promedioReflejo = 0;
      if(array.length != 0){     
        for( i=0; i<array.length; i++ ){
          promedioReflejo += array[i];
        }
        promedioReflejo = promedioReflejo / array.length;        
        if(promedioReflejo != 0){
          promedioReflejo = promedioReflejo.toFixed(2);
          arrayGeneral.push(promedioReflejo);
        }
      }
    }

    var calificacionAtajadas = Calificacion_atajadas.findOne({id_user:this._id});
    if(calificacionAtajadas){
      var array = calificacionAtajadas.votes;
      var promedioAtajadas = 0;
      if(array.length != 0){
        for( i=0; i<array.length; i++ ){
          promedioAtajadas += array[i];
        }
        promedioAtajadas = promedioAtajadas / array.length;
        if(promedioAtajadas != 0){
          promedioAtajadas = promedioAtajadas.toFixed(2);
          arrayGeneral.push(promedioAtajadas)
        }
      }
    }
  }else{
    var calificacionDefensa = Calificacion_defensa.findOne({id_user:this._id});
    if(calificacionDefensa){
      var array = calificacionDefensa.votes;
      var promedioDefensa = 0;
      if(array.length != 0){
        for( i=0; i<array.length; i++ ){
          promedioDefensa += array[i];
        }
        promedioDefensa = promedioDefensa / array.length;
        if(promedioDefensa != 0){
          promedioDefensa = promedioDefensa.toFixed(2);
          arrayGeneral.push(promedioDefensa);
        }
      }
    }

    var calificacionGambeta = Calificacion_gambeta.findOne({id_user:this._id});
    if(calificacionGambeta){
      var array = calificacionGambeta.votes;
      var promedioGambeta = 0;
      if(array.length != 0){
        for( i=0; i<array.length; i++ ){
          promedioGambeta += array[i];
        }
        promedioGambeta = promedioGambeta / array.length;
        if(promedioGambeta != 0){
          promedioGambeta = promedioGambeta.toFixed(2);
          arrayGeneral.push(promedioGambeta);
        }
      }
    }

    var calificacionTiro = Calificacion_tiroalarco.findOne({id_user:this._id});
    if(calificacionTiro){
      var array = calificacionTiro.votes;
      var promedioTiro = 0;
      if(array.length != 0){
        for( i=0; i<array.length; i++ ){
          promedioTiro += array[i];
        }
        promedioTiro = promedioTiro / array.length;
        if(promedioTiro != 0){
          promedioTiro= promedioTiro.toFixed(2);
          arrayGeneral.push(promedioTiro);
        }
      }
    }

    var calificacionVelocidad = Calificacion_velocidad.findOne({id_user:this._id});
    if(calificacionVelocidad){
      var array = calificacionVelocidad.votes;
      var promedioVelocidad = 0;
      if(array.length != 0){
        for( i=0; i<array.length; i++ ){
          promedioVelocidad += array[i];
        }
        promedioVelocidad = promedioVelocidad / array.length;
        if(promedioVelocidad != 0){
          promedioVelocidad = promedioVelocidad.toFixed(2);
          arrayGeneral.push(promedioVelocidad);        
        }
      }
    }
  }
  //console.log('array promedios',arrayGeneral)
  var suma = 0;  
  if(arrayGeneral.length !=0){
    for( i=0; i<arrayGeneral.length; i++ ){
      var number = parseFloat(arrayGeneral[i]);
      suma = suma + number;
    };     
    
    //console.log('suma',suma)
    if(suma != 0){
      var promGeneral = suma/arrayGeneral.length; 
      var promedioString = promGeneral.toFixed(2);         
      //Meteor.users.update({_id:this._id},{$set : {'profile.promedioGeneral': promGeneral}});
      if(!Meteor.users.findOne({_id:this._id,'profile.promedioGeneral':promedioString})){
          //console.log('adeentroo if cliente')
          Meteor.call('addPromedio',promGeneral,this._id);
          return promedioString ;
        }else{
          return promedioString ;
        }
      }else{
        return 0;
      }
  }else{
    return 0;
  }
  
},

      tieneVotoConducta: function () {
        var aconducta = Calificacion_conducta.findOne({id_user:this._id, upvotes: Meteor.userId() });
        return aconducta;
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
  // partidosJugados: function(){
  //   var arrayIdPartido = Roles.getGroupsForUser(use,'jugoPartido');
  //   if(arrayIdPartido.length != 0){
  //     var arrayPartidosJugo=[];    
  //     arrayIdPartido.forEach(function (e) {
  //       var partidos = Partido.findOne({_id: e});
  //       arrayPartidosJugo.push(partidos);
  //     });    

  //     var ultimo3 = arrayPartidosJugo.slice(Math.max(arrayPartidosJugo.length - 3, 1));
  //     return ultimo3;
    
  // }else{
  //   return false;
  // }
  // },
  partidosInvitado: function(){
    var arrayIdPartido = Roles.getGroupsForUser(use,'invitado');
    if(arrayIdPartido.length != 0) {      

      var arrayPartidosInvitado=[];    
      arrayIdPartido.forEach(function (e) {
        var partidos = Partido.findOne({_id: e});
        arrayPartidosInvitado.push(partidos);
      });    
      var arrayPartidosInvitadoOrdenado = _.sortBy(arrayPartidosInvitado, 'horario');
      var primeros2 = arrayPartidosInvitadoOrdenado.slice(0,2);
      return primeros2;
    } else { 
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
      var arrayPartidosConfirmadoOrdenado = _.sortBy(arrayPartidosConfirmado, 'horario');
      var primeros2 = arrayPartidosConfirmadoOrdenado.slice(0,2);
      return primeros2;
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
 isHost :function(){
      //this._id es el id del partido que viene del each de partidos pendientes
      if(Roles.userIsInRole( Meteor.userId(),'host', this._id)) {
        return true;
      } else {
        return false;
      }
    },
isInvitado : function() {
  return Roles.userIsInRole (Meteor.userId(), 'invitado', this._id);
},
isConfirmado : function() {
  return Roles.userIsInRole (Meteor.userId(), 'confirmado', this._id);
}
});

Template.showProfile.events({  //al hacer click en el boton editar se redirige al template editProfile y se le pasa el _id del usuario del cual quiere editar su perfil


  //Codigo para las calificaciones
  //Todas las posiciones  
  'click #conducta': function(){
    var tipo = "conducta";
    var ratingConducta= $('#conducta').data('userrating');
    Meteor.call('calif',use,ratingConducta,tipo);
  },
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

  'click #lanzaIdPartido': function () {
      var idPartido = this._id;
      Session.set("idPartido", idPartido );      
    },
  'click #confirmarPartido' : function() {
      Router.go("confirmarPartido", {_id: this._id});
    },

  'click #lanzarIdJugador': function () {
    var playerId = this._id;
    Session.set('idPlayer', playerId);
  },
  'click #modificarHorario': function () {
    var idPartido = Session.get("idPartido");
    var partido = Partido.findOne({_id: idPartido});
    $('#redirigirPartidosModal').on('hidden.bs.modal', function() {
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
  'click #deleteFriend': function () { 
    var playerId = Session.get('idPlayer');
    Meteor.users.update(Meteor.userId(),{ $pull: { 'profile.friends': { id: playerId}}});  
  } 
});

Template.showProfile.onDestroyed(function() {
  Session.set('alertPerfilEditado', undefined);
  Session.set('alertNoJuega', undefined);
  Session.set('alertReservaCancelada', undefined);

});

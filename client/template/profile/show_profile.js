Template.showProfile.helpers({   //se busca el usuario del cual se esta viendo el perfil
  user : function(){
    use = this._id;
    return Meteor.users.findOne({_id: this._id});
  },

  arquero : function() {
     var u = Meteor.users.findOne({_id: this._id});
     // console.log('user', u);
     var arq = u && u.profile.player && u.profile.player.position;
     // console.log('u.player.position',u.profile.player.position)
     // console.log('arq',arq);
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
      
      return promedio;
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
      
      return promedio;
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
      
      return promedio;
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
      
      return promedio;
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
      
      return promedio;
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
      
      return promedio;
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
      
      return promedio;
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
      console.log(promedio);
      return promedio;
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
      console.log(promedio);
      return promedio;
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
      console.log(promedio);
      return promedio;
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
      console.log(promedio);
      return promedio;
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
      console.log(pa);
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
     

  ownProfile: function () { //devuelve verdadero si el perfil es del usuario logeado, o falso sino lo es
    return this._id === Meteor.userId();    
  },
  /*amigos: function () {  //este es el metodo que va realmente. falta ver porque no se crea el array usuarios
    friends= Friends && Friends.find();
    var j = friends.count()-1; //uso esto xq el .length me da undefined
    var amigos = []; 
    for (var i=0; j; i++) {
      var fbid = friends.fetch()[i].id; //guardo el atributo id de lo que me manda fb de cada usuario para despues buscar en mi bd, ya que este id es unico
      var usuarios = Meteor.users.findOne({'services.facebook.id' : fbid});
      console.log("usuarios bd", usuarios);
      console.log("amigos antes", amigos);
      var amigos = amigos.push(usuarios);
      console.log("amigos despues", amigos);
    };
    return amigos;
  },*/
  amigos: function (){ //esto esta puesto para mostrarlo en clases, pero redirige a cualquier id
    friends= Friends && Friends.find();
    return friends;
  }
});


Template.showProfile.events({  //al hacer click en el boton editar se redirige al template editProfile y se le pasa el _id del usuario del cual quiere editar su perfil


  //Codigo para las calificaciones
  //Todas las posiciones
  'click #resistencia': function(){
    var tipo = "resistencia";
    var ratingResistencia = $('#resistencia').data('userrating');
    console.log(ratingResistencia);
    Meteor.call('calif',use,ratingResistencia,tipo);
  },

  'click #fairplay': function(){
    var tipo = "fairplay";
    var ratingFairplay = $('#fairplay').data('userrating');
    console.log(ratingFairplay);
    Meteor.call('calif',use,ratingFairplay,tipo);
  },

  'click #puntualidad': function(){
    var tipo = "puntualidad";
    var ratingPunt = $('#puntualidad').data('userrating');
    console.log(ratingPunt);
    Meteor.call('calif',use,ratingPunt,tipo);
  },

  'click #burradas': function(){
    var tipo = "burradas";
    var ratingBurradas = $('#burradas').data('userrating');
    console.log(ratingBurradas);
    Meteor.call('calif',use,ratingBurradas,tipo);
  },
   //Posicion arquero
   'click #reflejos': function(){
    var tipo = "reflejos";
    var ratingReflejos = $('#reflejos').data('userrating');
    console.log(ratingReflejos);
    Meteor.call('calif',use,ratingReflejos,tipo);
  },
  'click #atajadas': function(){
    var tipo = "atajadas";
    var ratingAtajadas = $('#atajadas').data('userrating');
    console.log(ratingAtajadas);
    Meteor.call('calif',use,ratingAtajadas,tipo);
  },
   //Otras posiciones
   'click #pase': function(){
    var tipo = "pase";
    var ratingPase = $('#pase').data('userrating');
    console.log(ratingPase);
    Meteor.call('calif',use,ratingPase,tipo);
  },
  'click #defensa': function(){
    var tipo = "defensa";
    var ratingDefensa = $('#defensa').data('userrating');
    console.log(ratingDefensa);
    Meteor.call('calif',use,ratingDefensa,tipo);
  },
  'click #gambeta': function(){
    var tipo = "gambeta";
    var ratingGambeta = $('#gambeta').data('userrating');
    console.log(ratingGambeta);
    Meteor.call('calif',use,ratingGambeta,tipo);
  },
  'click #rematearco': function(){
    var tipo = "remate";
    var ratingRematearco = $('#rematearco').data('userrating');
    console.log(ratingRematearco);
    Meteor.call('calif',use,ratingRematearco,tipo);
  },
  'click #velocidad': function(){
    var tipo = "velocidad";
    var ratingVelocidad = $('#velocidad').data('userrating');
    console.log(ratingVelocidad);
    Meteor.call('calif',use,ratingVelocidad,tipo);
  },

  'click #login-buttons-edit-profile': function(event) {
      Router.go('editProfile', {_id: Meteor.userId()});
  },

});
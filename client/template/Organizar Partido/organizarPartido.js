Template.organizarPartido.onRendered(function () {
  this.$('#datetimepicker').datetimepicker({
    locale: 'es',
    format: 'L',
    minDate: moment(),
    showClear: true,
  });

  this.$('#datetimepicker3').datetimepicker({
    locale: 'es',
    format:'H',
    disabledHours: [ 2 , 3 , 4 , 5 , 6 , 7 , 8 ],
    showClear: true
  });
});


Template.organizarPartido.events({
    
   'submit form': function(e,t) {
        
        e.preventDefault();

        var diaString = $(e.target).find('[name=datetimepicker]').val();        
        var diaMoment = moment(diaString, 'DD/MM/YYYY', true).format();
        var dia = new Date(diaMoment);
        var hora = $(e.target).find('[name=datetimepicker3]').val();
        var recinto = $(e.target).find('[name=nombreRecinto]').val();

        var reserva = {
            _id:Meteor.ObjectId,
            usuarioId:Meteor.user()._id,            
            nom_reserva:$(e.target).find('[name=nombreDeLaReserva]').val(),
            nom_usuario: Meteor.user().profile.name,
            nom_recinto:$(e.target).find('[name=nombreRecinto]').val(),
            num_cancha:$(e.target).find('[name=nombreCancha]').val(),
            hora_de_juego:$(e.target).find('[name=datetimepicker3]').val(),
            fecha_de_juegoD:dia,
            fecha_de_juego:$(e.target).find('[name=datetimepicker]').val(),
            estado:'Reservada'
        };        

        var errors = validateReserva(reserva);
        if (errors.nombreRecinto || errors.nombreCancha ||  errors.nombreDeLaReserva )
        return Session.set('reservaErrors', errors);

        var selector = {
          
          'nom_recinto':reserva.nom_recinto,
          'num_cancha': +reserva.num_cancha,
          'hora_de_juego': +reserva.hora_de_juego,
          'fecha_de_juegoD':reserva.fecha_de_juegoD,
          'estado':reserva.estado
          
        };

//$gte: newDate()
        if (Reserva.findOne(selector)) {
          $('#alertReservaExistente').removeClass('hide');
        return false;
      }

        var idReserva = Reserva.insert(reserva);        
        
        createReservaForOwnerNotification(idReserva);
        

        var selected = t.findAll( "input[type=checkbox]:checked");
        console.log('lo q selecciona',selected);
        var arrayAmigos = _.map(selected, function(item) {
              return item.defaultValue;
        });
        console.log('array org prtido',arrayAmigos);

        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:idReserva,
          hostId: Meteor.userId(),
          invitados: arrayAmigos,
          equipoA:[],
          equipoB:[],
        };
        
        var partidoId = Partido.insert(partido);
        
        
        
        
       //---------Para mandar mail a los que quiera invitar------- 
        Meteor.call('mailReserva',arrayAmigos,partidoId,diaString,hora,recinto);
        //Envia notificaciones de confirmar partido a invitados
        createInvitationToGameNotification(partidoId);
        Meteor.call('defaultRoles', partidoId); 
        alert("Reserva creada");
        Router.go('confirmarPartido',{_id:partidoId});
    },
  

  'click [data-picker-handle]': function (event) {

    var datetimepicker = $(event.currentTarget).data('pickerHandle');   
    $(datetimepicker).data('DateTimePicker').toggle();

  },

  'click [data-for-recinto]': function(event){
    
    var $item=$(event.currentTarget);
    var $target=$($item.data('forRecinto'));
    
    $target.val($item.text());

    var recinto=Recintos.findOne({'_id':($item.data('forId'))});
    $('input[name=nombreCancha]').val('');
    Session.set('recinto', recinto);
    
  },

  'click [data-for-cancha]': function(event){

    var $item=$(event.currentTarget);
    var $target=$($item.data('forCancha'));

    $target.val($item.text()); 
    
  },
   
  });

Template.organizarPartido.helpers({
	
  recinto: function () {
    return Recintos.find();
  },

  cancha: function () {
      var recinto = Session.get('recinto');
      var recinto_Id = recinto && recinto._id;
      var canchas = recinto_Id && Canchas.find({'recintoId':recinto_Id,'estado_cancha.estado_de_cancha':'Habilitada'});
      return canchas;
  },

   amigos: function () { 
    var usuario = Meteor.users.findOne({_id: Meteor.userId()});
    var array = usuario.profile.friends;          
    console.log('array friends,helper',array);
    if(array){
      var length = array.length;
      console.log('longitud array,helper',length);
      var arrayAmigos= [];
      for(i=0; i<length; i++ ){              
        
          var amigosId = array[i].id;
          console.log('idAmigos,helper',amigosId);
          var amigo = Meteor.users.findOne({_id : amigosId});
          console.log('objeto,helper',amigo)
          arrayAmigos.push(amigo);
          console.log(amigo.emails[0].address);
        
      } 
      return arrayAmigos; 
    }else{
      return false;
    }       

     },

  errorMessage: function(field) {
    return Session.get('reservaErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('reservaErrors')[field] ? 'has-error' : '';
  }

});

Template.organizarPartido.onCreated(function() {
  
  Session.set('reservaErrors', {});
});

Template.organizarPartido.onDestroyed( function(){

    Session.set('recinto', null);

});
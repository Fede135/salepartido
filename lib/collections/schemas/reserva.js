Reserva = new Mongo.Collection("reserva");

if (typeof Schema === 'undefined') Schema = {};

Schema.Reserva = new SimpleSchema({

	nom_reserva:{
		type:String,
		max: 50,
		optional : true
	},

	usuarioId:{
		type: String,
		optional: true,
	},

	nom_usuario:{
		type:String		
	},

	nom_recinto:{
		type: String,
		label: "Nombre del recinto",
	},

	num_cancha:{
		type: Number,
		label: "Cancha elegida",
		min: 0
	},

	hora_de_juego:{
		type: Number,
		label: "Hora elegida"
	},

	fecha_de_juego:{
		type: String,
		label: "Dia de juego"
	},

	fecha_de_juegoD:{
		type: Date,
	},

	estado:{
		type:String,
	}
});

Reserva.attachSchema(Schema.Reserva);

validateReserva = function (reserva) {
		  var errors = {};
		  if (reserva.nom_reserva.length>50)
		    errors.nombreDeLaReserva = "Solo se admiten 50 caracteres solamente ";
		  if (!reserva.nom_reserva)
		    errors.nombreDeLaReserva = "Coloque un nombre para la reserva";
			if (!reserva.nom_usuario)
		    errors.nombreDelCliente = "Coloque el nombre del cliente";
		  if (!reserva.nom_recinto)
		    errors.nombreRecinto = "Seleccione un recinto";
		  if (!reserva.num_cancha)
		    errors.nombreCancha =  "Seleccione una cancha";		  
		  return errors;
},


Meteor.methods({	

	reservaInsert : function(reservaAttributes) {
	    check(this.userId, String);
	    check(reservaAttributes, {
	      nom_reserva: String,
	      nom_recinto: String,
	      num_cancha: Number,
	      fecha_de_juego: String,
	      fecha_de_juegoD: Date,
	      estado: String,
	      hora_de_juego: Number,
	      nom_usuario: String,
	      usuarioId: String,
    	});


	var errors = validateReserva(reserva);
        if (errors.nombreRecinto || errors.nombreDelCliente || errors.nombreCancha ||  errors.nombreDeLaReserva )
        return Session.set('reservaErrors', errors);

        var x= Reserva.insert(reserva);
                
        var partido = { 
          _id:Meteor.ObjectId,
          reserva_id:x
        };
        
        var partidoId=Partido.insert(partido);
        Session.set('recinto', null);
        alert("Reserva creada");
   	},     
});
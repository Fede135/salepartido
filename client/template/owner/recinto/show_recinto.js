
Template.showRecinto.helpers({
	recinto: function () {
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		return  reci;
	},

	cancha: function(){
		can = Canchas.find({recintoId: this._id});
		return can;
	},

	imagen1: function(){
		var reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});

		if (reci) {
			var idImagen1 = reci.imagen1_id;
			var url1 = Images.findOne({_id: idImagen1}).url();
			return url1;
		}
		
	},

	imagen2: function(){
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		var idImagen2 = reci.imagen2_id;
		var url2 = Images.findOne({_id: idImagen2}).url();
			return url2;
	},

	imagen3: function(){
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		var idImagen3 = reci.imagen3_id;
		var url3 = Images.findOne({_id: idImagen3}).url();
			return url3;
	},

	imagen4: function(){
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		idImagen4 = reci.imagen4_id;
		var url4 = Images.findOne({_id: idImagen4}).url();
			return url4;
	},

	promedio: function(){
		var cali = Calificaciones.findOne({id_recinto:this._id});
		var array = cali.votes;
		var promedio = 0;

		for( i=0; i<array.length; i++ ){
			promedio += array[i];
		}
		promedio = promedio / array.length;
		return promedio;
	},

	countUsers : function (){
		var cali = Calificaciones.findOne({id_recinto:this._id});
		var array = cali.upvotes;
		
		var countUsers =  array.length;
		return countUsers;
	},

	tieneVoto: function () {
		return Calificaciones.findOne({ upvotes: Meteor.userId() })
	}
});


Template.showRecinto.events({
	'click #rating': function(){
	    var rating = $('#rating').data('userrating');
	    Meteor.call('upvote',reci._id,rating,function (error) {
  // identify the error
  if (error) {
    // show a nice error message
    alert('YA CALIFICO A ESTE RECINTO')
    Session.set("errorMessage", "Ya ha votado.");
  }else{
  	alert('Califico correctmente')
  }
});
	    console.log('Calificacion recinto: ',rating);
 	}
});

//falta buscar promedio de calificaciones
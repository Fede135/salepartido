
Template.showRecinto.helpers({
	recinto: function () {
		reci = Recintos.findOne({_id: this._id});
		return  reci;
	},

	cancha: function(){
		var can = Canchas.find({recintoId: this._id});
		return can;
	},

	imagen1: function(){
		var reci = Recintos.findOne({_id: this._id});

		if (reci) {
			var idImagen1 = reci.imagen1_id;
			var url1 = idImagen1 && Images.findOne({_id: idImagen1}).url();
			return url1;
		}
		
	},

	imagen2: function(){
		var reci = Recintos.findOne({_id: this._id});
		if(reci){
			var idImagen2 = reci.imagen2_id;
			var url2 = idImagen2 && Images.findOne({_id: idImagen2}).url();
				return url2;
		}
	},

	imagen3: function(){
		var reci = Recintos.findOne({_id: this._id});
		if(reci){
			var idImagen3 = reci.imagen3_id;
			var url3 = idImagen3 && Images.findOne({_id: idImagen3}).url();
				return url3;
		}
	},

	imagen4: function(){
		var reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		if (reci){
			var idImagen4 = reci.imagen4_id;
			var url4 = idImagen4 && Images.findOne({_id: idImagen4}).url();
				return url4;
		}
	},

	promedio: function(){
		var cali = Calificaciones.findOne({id_recinto:this._id});
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

	countUsers : function (){
		var cali = Calificaciones.findOne({id_recinto:this._id});
		if(cali){
			var array = cali.upvotes;
			var countUsers =  array.length;
			return countUsers;
		}
	},

	tieneVoto: function () {
			var tieneVoto = Calificaciones.findOne({id_recinto:this._id, upvotes: Meteor.userId() });
			
		return tieneVoto;
	},

	isOwner: function(){
    return this.ownerId === Meteor.userId();    
  },
	

});


Template.showRecinto.events({
	'click #rating': function(){
	    var rating = $('#rating').data('userrating');
	    Meteor.call('upvote',reci._id,rating);
	 },
});


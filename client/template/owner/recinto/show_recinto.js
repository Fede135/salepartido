
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
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		idImagen1 = reci.imagen1_id;
		return Images.find({_id: idImagen1});
	},

	imagen2: function(){
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		idImagen2 = reci.imagen2_id;
		return Images.find({_id: idImagen2});
	},

		imagen3: function(){
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		idImagen3 = reci.imagen3_id;
		return Images.find({_id: idImagen3});
	},

		imagen4: function(){
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		idImagen4 = reci.imagen4_id;
		return Images.find({_id: idImagen4});
	},
});


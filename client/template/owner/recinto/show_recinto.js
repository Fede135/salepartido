
Template.showRecinto.helpers({
	recinto: function () {
		reci = Recintos.findOne({nombre_recinto : this.nombre_recinto});
		return  reci;
	}
});


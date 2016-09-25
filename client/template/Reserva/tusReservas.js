Template.tusReservas.helpers({
	reservas: function () {
		var reservasDueno = Reservadueno.find();
		
		return reservasDueno;
	}
});
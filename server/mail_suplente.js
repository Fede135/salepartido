Meteor.methods({
	mailSuplente: function(idPartido,idReserva,idUser){
		check(idPartido, String);
		check(idReserva, String);
		check(idUser, String);
		var user = Meteor.users.findOne({_id:idUser});
		var mailUser = user.emails[0].address;
		var partido = Partido.findOne({_id:idPartido});	
		var reservaPartido = partido.reserva_id;
		var reserva = Reserva.findOne({_id:reservaPartido});
		if(reservaPartido === idReserva){
			var dia = reserva.fecha_de_juego;
			var hora = reserva.hora_de_juego;
			var recinto = reserva.nom_recinto;
			var organizadorId = Meteor.users.findOne({_id:partido.hostId});
			var organizador = organizadorId.profile.name;
			Email.send({
				from: "salepartido2016@gmail.com",
				to: mailUser,
				subject: "Sale partido!! Estás confirmado en el equipo,el "+dia+" a las "+hora+" horas en "+recinto+'.Organiza: '+organizador,
				html: '<template><div style="width:100%;padding:24px 0 16px 0;background-color:#f5f5f5;text-align:justify"><div style="padding:24px 32px 24px 32px;background:#fff;border-right:1px solid #eaeaea;border-left:1px solid #eaeaea" dir="ltr"><h1><font color="#1bb3af">SALE PARTIDO</span></font><h2>Estás confirmado para el partido!!</h2><font color="#1bb3af"><li><b>Dia:</b>'+dia+'</li><li><b>Hora:</b>'+hora+'</li><li><b>Recinto:</b>'+recinto+'</li><li><b>Organizador:</b>'+organizador+'</li></font><h3>Si querés saber quien quien mas juega visitá este enlace:http://localhost:3000/confirmarpartido/'+idPartido+'</h3></div><table style="padding:14px 10px 0 10px" role="presentation" dir="ltr"><tbody><tr><td style="width:100%;font-size:11px;font-family:Roboto,Arial,Helvetica,sans-serif;color:#646464;line-height:20px;min-height:40px;vertical-align:middle">Sale Partido 2016, Mendoza, Argentina</td></tr></tbody></table></div></template>',
			});
		}
		
	}


});
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
				html: '<div style="width:100%;padding:24px 0 16px 0;background-color:#c9c9c9;text-align:justify"><table style="border-collapse:collapse;width:310px;margin:0 auto;background-color:#f5f5f5" width="310" border="0" align="center" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td style="padding:20px 0" align="center"><img src="https://rawgit.com/Fede135/salepartido/master/public/logo_salepartido5.png" alt="" class="CToWUd" width="88" height="95"></td></tr><tr style="page-break-before:always"><h1 style="font-family:sans-serif;font-weight:normal;margin:0 0 24px 0;text-align:center"><font color="#1bb3af">Sale Partido!</font></h1><h2 style="font-family:sans-serif;font-weight:normal;margin:0 0 24px 0;text-align:center">Ya estás confirmado en el partido!!no sos más suplente</h2><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 24px 0;text-align:center">Información:<br><br><span style="display:block;margin:2px 0">Día:<font color="#4d3f92"><b>' +dia+'</b></font></span><span style="display:block;margin:2px 0">Hora:<font color="#4d3f92"><b>' +hora+'</b></font></span><span style="display:block;margin:2px 0">Recinto:<font color="#4d3f92"><b>' +recinto+'</b></font></span><span style="display:block;margin:2px 0">Organizador:<font color="#4d3f92"><b>' +organizador+'</b></font></span></p></td></tr><tr height="50"><td valign="top" align="center"><table style="border-collapse:collapse;background-color:#1bb3af;border-radius:4px;height:50px;width:310px!important" width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td style="font-family:sans-serif;font-weight:normal;text-align:center;margin:0;color:#ffffff;font-size:20px;line-height:100%" valign="middle" align="center"><a href="http://localhost:3000/confirmarpartido/'+idPartido+'" style="font-family:sans-serif;color:#fff;display:block;padding:15px;text-decoration:none;width:280px" target="_blank" data-saferedirecturl="url">Ver organización</a></td></tr></tbody></table></td></tr><tr style="page-break-before:always"><td border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><br><p width="310" style="font-family:sans-serif;font-weight:normal;margin:0 0 12px 0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word;word-break:break-all">Además:<a href="http://localhost:3000/confirmarpartido/'+idPartido+'" style="color:#0996f8;text-decoration:none;width:310px!important;display:block"><br><font style="word-break:break-all">http://localhost:3000/confirmarpartido/'+idPartido+'</font></a></p><p style="font-family:sans-serif;font-weight:normal;margin:0 0 12px 0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word">Si no podes jugar, visitá el enlace y pone "NO QUIERO JUGAR"</p></td></tr><tr style="page-break-before:always"><td valign="top"><p style="font-family:sans-serif;font-weight:normal;margin:0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word">Sale Partido 2016, Mendoza, Argentina<br><a href="http://localhost:3000/TerminosDeUso" style="color:#0996f8;text-decoration:none;font-family:sans-serif" target="_blank" data-saferedirecturl="http://localhost:3000/TerminosDeUso">Terminos y condiciones de Sale Partido</a></p></td></tr></tbody></table><div class="yj6qo"></div><div class="adL"></div></div>',
			});
		}
		
	}


});


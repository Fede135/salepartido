Meteor.methods({
	mailCancelar: function(arrayIdJugadores,hora,dia,recinto,cancha){
		check(arrayIdJugadores, Array);		
		check(dia, String);
		check(hora, Number);
		check(recinto, String);	
		check(cancha, Number);			
		//check(organizador, String);
		//var nombreUsuario = Meteor.users.findOne({_id:organizador}).profile.name;
		arrayMail=[];
		arrayIdJugadores.forEach(function (id) {
			var mail = Meteor.users.findOne({_id:id}).emails[0].address ;
			arrayMail.push(mail)
		});
		
			Email.send({
				from: "salepartido2016@gmail.com",
				to: arrayMail,
				subject: "NO Sale partido!!. Se CANCELÓ el partido del "+dia+" a las "+hora+" hs. en "+recinto+' cancha n°'+cancha+'.',
				html: '<div style="width:100%;padding:24px 0 16px 0;background-color:#c9c9c9;text-align:justify"><table style="border-collapse:collapse;width:310px;margin:0 auto;background-color:#f5f5f5" width="310" border="0" align="center" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td style="padding:20px 0" align="center"><img src="https://rawgit.com/Fede135/salepartido/master/public/logo_salepartido5.png" alt="" class="CToWUd" width="88" height="95"></td></tr><tr style="page-break-before:always"><h1 style="font-family:sans-serif;font-weight:normal;margin:0 0 24px 0;text-align:center">NO <font color="#1bb3af">Sale Partido!</font></h1><h2 style="font-family:sans-serif;font-weight:normal;margin:0 0 24px 0;text-align:center;color:#FE2E2E">Se canceló la reserva</h2><p style="font-family:sans-serif;font-size:14px;font-weight:normal;margin:0 0 24px 0;text-align:center;color:#FE2E2E">Información:<br><br><span style="display:block;margin:2px 0">Día:<b>' +dia+'</b></span><span style="display:block;margin:2px 0">Hora:<b>' +hora+'</b></span><span style="display:block;margin:2px 0">Recinto: <b>' +recinto+'</b></span><span style="display:block;margin:2px 0">Cancha:<b>' +cancha+'</b></span></p></td></tr><tr height="50"><td valign="top" align="center"><table style="border-collapse:collapse;background-color:#FE2E2E;border-radius:4px;height:50px;width:310px!important" width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr style="page-break-before:always"><td style="font-family:sans-serif;font-weight:normal;text-align:center;margin:0;color:#ffffff;font-size:20px;line-height:100%" valign="middle" align="center">Partido Cancelado</td></tr></tbody></table></td></tr><tr style="page-break-before:always"><td border="0" cellpadding="0" cellspacing="0" width="100%" height="100%"><br><p width="310" style="font-family:sans-serif;font-weight:normal;margin:0 0 12px 0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word;word-break:break-all"></p><p style="font-family:sans-serif;font-weight:normal;margin:0 0 12px 0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word"></p></td></tr><tr style="page-break-before:always"><td valign="top"><p style="font-family:sans-serif;font-weight:normal;margin:0;text-align:center;color:#8a9ba8;font-size:11px;line-height:13px;width:310px!important;word-wrap:break-word">Sale Partido 2016, Mendoza, Argentina<br><a href="http://localhost:3000/TerminosDeUso" style="color:#0996f8;text-decoration:none;font-family:sans-serif" target="_blank" data-saferedirecturl="http://localhost:3000/TerminosDeUso">Terminos y condiciones de Sale Partido</a></p></td></tr></tbody></table><div class="yj6qo"></div><div class="adL"></div></div>',
			});
		
	}

});


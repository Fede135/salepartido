//Template que captura evento de click en editarPerfil y redirige al template editProfile
Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-edit-profile': function(event) {
		Router.go('editProfile');
	}
});
//agregada para traduciar al castellano lo relacionado con el package accounts-ui
 accountsUIBootstrap3.setLanguage('es');
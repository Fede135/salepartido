//Configuracion de campos adicionales al momento de registrarse.
//Solicitamos Nombre y Apellido para obtener los mismos datos que se obtienen por defecto desde Facebook, asi utilizamos solo una plantilla de editar perfil y no pedir esos datos.
Accounts.ui.config({ 
  requestPermissions: {}, 
  extraSignupFields: [
    {
    fieldName: 'firts_name',
    fieldLabel: 'Nombre',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Ingrese su nombre");
            return false;
          } else {
            return true;
          }
    }
  },
  {
    fieldName: 'last_name',
    fieldLabel: 'Apellido',
    inputType: 'text',
    visible: true,
  }]
});

//configuraciones de simpleSchema
 SimpleSchema.messages({
  required: '[label] es requerido',
  notAllowed: "[value] no es válido",
  minDate: "[label] debe ser igual o superior a [min]",
  maxDate: "[label] debe ser igual o inferior a [max]",
  badDate: "[label] no es una fecha válida",
   "regEx": [
      {exp: SimpleSchema.RegEx.Email, msg: "Debe ingresar un e-mail válido"}
   ],
});
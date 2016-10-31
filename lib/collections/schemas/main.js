//configuraciones de simpleSchema
 SimpleSchema.messages({
  required: '[label] es requerido',
  notAllowed: "[value] no es válido",
  notUnique: '[value] ya existe.',
  minNumber: "[label] no debe ser menor a [min]",
  maxNumber: "[label] no debe ser mayor a [max]", 
  minDate: "[label] debe ser igual o superior a [min]",
  maxDate: "[label] debe ser igual o inferior a [max]",
  badDate: "[label] no es una fecha válida",
  minString: "[label] debe contener como mínimo [min] caracteres",
  maxString: "[label] no debe ser superior a [max] caracteres",
   "regEx": [
      {msg: "[label] contiene caracteres inválidos"},
      {exp: SimpleSchema.RegEx.Email, msg: "Debe ingresar un e-mail válido"}
   ],
});
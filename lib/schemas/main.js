SimpleSchema.messages({
  required: '[label] es requerido',
  "regEx": [
     {exp: SimpleSchema.RegEx.Email, msg: "Debe ingresar un e-mail válido"}
  ],
});


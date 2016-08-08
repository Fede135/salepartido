Schema = {};
Schema.users = new SimpleSchema({
  name : {
    type: String,
    label: "Nombre",
    max: 15
  },
  email: {
    type : String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'Email' 
  },
  locality: {
    type: String,
    label: "Localidad",
    max: 20
  }
})
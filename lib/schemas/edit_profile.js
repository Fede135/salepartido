Schema = {};

Schema.UserCountry = new SimpleSchema({
    country: {
        type: String,
        label: "País"
    },
    province: {
        type: String,
        max: 15,
        label: "Provincia"
    },
    locality: {
        type: String,
        max: 15,
        label: "Localidad"  
    },
    neighborhood: { 
        type: String,
        max: 20,
        label: "Barrio"
    }

});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true,
        label: "Nombre"
    },
    lastName: {
        label: "Apellido",
        type: String,
        optional: true
    },
    birthday: {
        label: "Fecha de nacimiento (aaaa/mm/dd)",
        min: new Date("1920-01-01T00:00:00.000Z"),
        max: new Date("2010-01-01T00:00:00.000Z"),
        type: Date,
        optional: true
    },
    /*gender: {
        type: String,
        allowedValues: ['Masculino', 'Femenino'],
        optional: true,
        label: "Sexo"
    },*/

  
   gender: {
      type: String,
      allowedValues: [
         "Masculino",
         "Femenino"
      ],
      optional: true,
      label: "Sexo (Masculino/Femenino)"
   },

    
    country: {
        type: Schema.UserCountry,
        optional: true
    }
});

Schema.users = new SimpleSchema({
    username: {
        type: String,
        label: "Nombre de usuario",
        optional: true
        //unique: true
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        },
    email: {
        
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email",
        unique: true
        
    },
    
    createdAt: {
        type: Date
        
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    /*roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },*/
    // In order to avoid an 'Exception in setInterval callback' from Meteor
   
   
 });

Meteor.users.attachSchema(Schema.users);




/*Schema = {};
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
})*/
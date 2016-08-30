Schema = {};

Schema.UserCountry = new SimpleSchema({
    country: {
        type: String,
        max : 15,
        label: "País",
        optional: true
    },
    province: {
        type: String,
        max: 15,
        label: "Provincia",
        optional: true
    },
    locality: {
        type: String,
        max: 15,
        label: "Localidad",
        optional: true  
    },
    neighborhood: { 
        type: String,
        max: 20,
        label: "Barrio",
        optional: true
    }

});

Schema.UserPlayer = new SimpleSchema ({
    
    position : {      
        type : String,
        label : "Posición",
        allowedValues: ["Arquero", "Defensor", "Delantero", "Mediocapista"],
        optional : true
    },
    foot : {    
        type: String,
        label : "Pie hábil",
        allowedValues : ["Derecho", "Izquierdo", "Ambos"],
        optional : true
    },
    height: {
        type: Number,
        optional : true,
        label : "Altura"
    },
    weight:{
        type: Number,
        optional : true,
        label : "Peso"
    },
    /*comments : {
        type: Array,
        optional: true,
    } */   
});

Schema.UserOwner = new SimpleSchema ({

    address : {
        type : String,
        optional: true
    },
    numphone : {
        type: Number,
        optional :true, 
    },
    /*comments : {
        type: Array,
        optional: true,
    }*/

});

Schema.UserProfile = new SimpleSchema({

    name : {
        type: String,
        optional : true
    },
    
    firstname : {
        type: String,
        optional : true,
        
    },

    lastname : {
        type: String,
        optional : true,
        
    },

    birthday: {
        label: "Fecha de nacimiento (aaaa-mm-dd)",
        min: new Date("1920-01-01T00:00:00.000Z"),
        max: new Date("2010-01-01T00:00:00.000Z"),
        //regEx: '/^[1|2][0|9][0-9][0-9]-[0-9]|[1][0-2]-[1-3][0-9]$/d',
        type: Date,
        optional: true
    },
     
  gender: {
      type: String,
      allowedValues: [
         "Masculino",
         "Femenino"
      ],
      optional: true,
      label: "Sexo",
      autoform: {
          afFieldInput: {
              firstOption: "(Seleccione sexo)"
         }
      },
   },
    
    country: {
        type: Schema.UserCountry,
        optional: true
    }
});

Schema.users = new SimpleSchema({
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    username: {
        type: String,
        label: "Nombre de usuario",
        optional : true
        
        },
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        emails: {
            type: Array,
            optional: true
         },
        
        "emails.$": {
            type: Object
        },

        "emails.$.address": {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        },
        "emails.$.verified": {
            type: Boolean
        },      
   
        createdAt: {
            type: Date,
            optional: true
        
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

    player: {
        type: Schema.UserPlayer,
        optional:true
    },

    owner: {
        type: Schema.UserOwner,
        optional:true
    },

    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type,
    /*roles: {
        type: [String],
        optional: true
    }*/
    
   
   
 });


Meteor.users.attachSchema(Schema.users);





 
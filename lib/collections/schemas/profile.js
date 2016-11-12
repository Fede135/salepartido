if (typeof Schema === 'undefined') Schema = {};

Schema.UserCountry = new SimpleSchema({
    country: {
        type: String,
        max : 15,
        label: "País*",
        optional: true,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        },
        regEx: /^\D+$/i,
    },
    province: {
        type: String,
        max: 15,
        label: "Provincia*",
        optional: true,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        },
        regEx: /^\D+$/i,
    },
    locality: {
        type: String,
        max: 15,
        label: "Departamento*",
        optional: true,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }, 
        regEx: /^\D+$/i,
    },
    neighborhood: { 
        type: String,
        max: 20,
        label: "Barrio*",
        optional: true,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        },
        regEx: /^\D+$/i,
    }

});

Schema.UserPlayer = new SimpleSchema ({
    
    position : {      
        type : String,
        label : "Posición*",
        allowedValues: ["Arquero", "Defensor", "Mediocampista", "Delantero"],
        optional : true,
         autoform: {
          afFieldInput: {
              firstOption: "(Seleccione posición)"
         }
      },
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }
    },
    foot : {    
        type: String,
        label : "Pie hábil*",
        allowedValues : ["Derecho", "Izquierdo", "Ambos"],
        optional : true,
        autoform: {
          afFieldInput: {
              firstOption: "(Seleccione pie hábil)"
         }
      },
      custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }
    },
    height: {
        type: Number,
        optional : true,
        label : "Altura (cm)*",
        min: 60,
        max: 220,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }
    },
    weight:{
        type: Number,
        optional : true,
        label : "Peso (Kg)*",
        min: 30,
        max: 200,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }
    },     
});

Schema.UserOwner = new SimpleSchema ({

    address : {
        type : String,
        optional: true
    },
    numphone : {
        type: Number,
        optional :true,
        min: 0, 
    },
    
});

Schema.UserProfile = new SimpleSchema({

    name : {
        type: String,
        optional : true
    },
    
    firstName : {
        type: String,
        optional : true,
        min:2,
        regEx: /^[a-z ,.'-ñ]+$/i,
        label: 'Nombre'
        
    },

    lastName : {
        type: String,
        optional : true,
        min:2,
        regEx: /^[a-z ,.'-ñ]+$/i,
        label: 'Apellido'
    },

    birthday: {
        label: "Fecha de nacimiento*",
        min: new Date("1936-01-01T00:00:00.000Z"),
        max: new Date("2010-01-01T00:00:00.000Z"),
        type: Date,        
        optional: true,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }
    },

     
  gender: {
      type: String,
      allowedValues: [
         "Masculino",
         "Femenino"
      ],

      optional: true,
      label: "Sexo*",
      autoform: {
          afFieldInput: {
              firstOption: "(Seleccione sexo)"
         }
      },
      custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }
   },

    numphone: {
        type : Number,
        label: "Teléfono (Fijo o celular)",
        optional: true,
        min: 100000,
        //regEx :'/^\d+\z/$',
        
    },
    
    country: {
        type: Schema.UserCountry,
        optional: true,
        custom: function() {
            if(!this.value && this.isUpdate) return "required";
        }
    },
    friends: {
            type: [Object],
            optional: true,
            
         },
        
    "friends.$.id": {
            type: String,          
        },

    "friends.$.correo": {
            type: String,          
        },

    "friends.$.fb": {
            type: Boolean,          
        },

    promedioGeneral: {
        type: String,
        optional:true
    },   

    player: {
        type: Schema.UserPlayer,
        optional:true
    },    

    owner: {
        type: Schema.UserOwner,
        optional:true
    },
});

Schema.users = new SimpleSchema({
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        username: {
            type: String,
            label: "Nombre de usuario",
            optional : true,
        },
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        estado_usuario: {
            type: String,
            optional : true,
        },

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
      index: true,
      autoValue: function () {
        if (this.isInsert)
          return new Date
        else
          this.unset()
        },
      denyUpdate: true
    },

    updatedAt: {
      type: Date,
      index: true,
      autoValue: function () {
        if (this.isUpdate) return new Date
      },
      denyInsert: true,
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





 

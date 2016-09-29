CommentsForPlayers = new Mongo.Collection("commentsForPlayers");

if (typeof Schema === 'undefined') Schema = {};

Schema.commentsForPlayers = new SimpleSchema({
  
  toUserId: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
   },
 
  fromUserId: {
    type: String,
    autoValue: function() {
      if(this.isInsert){
        return Meteor.userId();
      }
    }
  },
 
  commentToPlayer : {
    type: String,
    label: "Agregar comentario",
    max: 140,
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

    status: {
      type: String,
      optional: true,
      autoValue: function() {
        if (this.isInsert) return "Habilitado"
      },
    },

});

CommentsForPlayers.attachSchema(Schema.commentsForPlayers);






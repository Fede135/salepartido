CommentsForEnclosure = new Mongo.Collection("commentsForEnclosure");

if (typeof Schema === 'undefined') Schema = {};  

  Schema.commentsForEnclosure= new SimpleSchema({
  
  toEnclosureId: {
    type: String,
    optional : true,
    autoform: {
      type: 'hidden'
    }
  },
  
  fromUserId: {
    type: String,
    autoValue: function() {
      if(this.isInsert) {
        return Meteor.userId();
      }
    }
  },
  
  commentToEnclosure : {
    type: String,
    label: "Comentario",
    max: 140
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

CommentsForEnclosure.attachSchema(Schema.commentsForEnclosure)
CommentsForPlayers = new Mongo.Collection("commentsForPlayers");

Schema = {};

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
    autoValue: function(){
      if(this.isInsert){
        return Meteor.userId();
      }
    }
  },
  commentToPlayer : {
    type: String,
    label: "Comentario",
    max: 140,
  },
  
  createAt: {
    type: Date,
    autoValue: function(){
      if(this.isInsert){
        return new Date();
      }
    }
  }
  /*status: {
    type: String,
    optional: true
  },*/

});

CommentsForPlayers.attachSchema(Schema.commentsForPlayers);


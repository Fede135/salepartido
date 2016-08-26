/*Comments = new Mongo.Collection('commentsForPlayers');

var Schemas = {};



Schemas.commentsForPlayers = new SimpleSchema({
  
  toUserId: {
    type: String,
  },
  fromUserId: {
    type: String
  },
  commentToPlayer : {
    type: String,
    label: "Comentario",
    max: 140
  },
  date:{
    type: Date,
  },

});

Meteor.comments.attachSchema(Schema.commentsGeneral);
*/
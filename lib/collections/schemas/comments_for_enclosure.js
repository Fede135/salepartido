CommentsForEnclosure = new Mongo.Collection("commentsForEnclosure");
  
  Schema = {};

  Schema.commentsForEnclosure= new SimpleSchema({
  
  toEnclosureId: {
    type: String,
    optional : true
  },
  fromUserId: {
    type: String,
    optional: true
  },
  commentToEnclosure : {
    type: String,
    label: "Comentario",
    max: 140
  },
  date:{
    type: Date,
    autoValue: function(){
      if(this.isInsert){
        return new Date();
      }
    }
  },
  /*status: {
    type: String,
    optional:true,
  }*/

});

CommentsForEnclosure.attachSchema(Schema.commentsForEnclosure)
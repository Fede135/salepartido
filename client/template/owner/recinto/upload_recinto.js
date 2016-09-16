AutoForm.addHooks(
   'uploadRecinto',
  {
  after:{
    insert: function (error, result) {
      console.log(result);
      Calificaciones.insert({
          
          id_recinto:result,
          upvotes :[],
          votes:[],
      });
    }
  }
},
);




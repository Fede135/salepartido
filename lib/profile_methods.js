//Metodos en el servidor para editar el perfil de usuario
Meteor.methods({

  completeProfile: function (modifier, documentId) { //metodo que comprueba el tipo de los atributos del lado del servidor y luego para hacer un update en la bd los cambios

    check(modifier, Schema.users);
    check(documentId, documentId);

    var userId = Meteor.users.update(documentId, modifier);
    console.log(modifier);
    console.log(documentId);
    //Arquero
    Calificacion_reflejo.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_atajadas.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });

    //Todas las posiciones menos arquero
    Calificacion_pase.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_defensa.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_gambeta.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_tiroalarco.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_velocidad.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    
    // Para todas las posiciones
     Calificacion_burradas.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_resistencia.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_fairplay.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
    Calificacion_puntualidad.insert({

        id_user:documentId,
        upvotes :[],
        votes:[],
    });
   
    return {
      _id: userId
    };
  }
});

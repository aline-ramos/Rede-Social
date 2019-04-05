const database = firebase.database()

$(document).ready(function(){

    database.ref('post/').once('value').then(function(snapshot) {
        //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childData);
 
            createPost(childData.text);
            $('ul').append(`<li>${childData.text}</li>`)
            // ...
          });
        console.log(snapshot.val().text);
            $('ul').append(`<li>${childData.texto}</li>`)
            // ...
          });
        console.log(snapshot.val().texto);
        //$('ul').append(`<li>${snapshot.val().texto}</li>`)

        // ...
      });
    
    $("#post-btn").click(function(e){ 

        const txt = $('#post').val();
        $('#post').val(" ");
        createPost(txt);


        //$('ul').append(`<li>${txt}</li>`)

        database.ref('post/').push({
            text:txt
          });

    })

    function createPost(txt) {
      $('ul').append(`<li><span>${txt}</span><button>Excluir</button></li>`)

    }

});



        const txt = $('#post').val()

        $('ul').append(`<li>${txt}</li>`)

        database.ref('post/').push({
            texto:txt
          });



    })


    






});

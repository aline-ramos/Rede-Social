const database = firebase.database();

$(document).ready(function(){

  database.ref('post/').once('value')
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      createPost(childData.text, childKey, childData.likeCounter);
      likePost(childKey);

      });
    });
    
  $("#post-btn").click(function(){
    let txt = $('#post').val();
    $('#post').val("");
    let newPostInDB = database.ref('post/').push({
      text: txt,
      likeCounter: 0  
    });

    createPost(txt, newPostInDB.key, 0);
    likePost(newPostInDB.key);
    text.remove();
  })
  
  function createPost(txt, key, likeCounter) {
        $('#feed').prepend(
          `<div class=" col-sm-2 col-md-12 col-lg-5 mx-auto card p-3 border-yellow mb-3" style="max-width: 42rem;" data-post-id="${key}">
              <span class="post-style" data-text-id="${key}">${txt}</span><br>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
              <div class="container d-inline-flex p-0"> 
                <button class="m-2 btn btn-dark ml-auto" data-delete-id="${key}">Excluir</button>
                <button class="m-2 btn btn-dark" data-edit-id="${key}">Editar</button>
                <br>
              </div>  
              <a class="like mr-auto" data-like-id='${key}'>
                <i class="fa fa-heart"></i>  
                <input data-like-id='${key}' class="btn-counter border-0" name="btn-counter" readonly="readonly" type="text" value= ${likeCounter}>
              </a>    
            </div>
          </li>`
        );

    //$(`input[data-private-id=${key}]`).click(function(){
      
    //   $(this).parent().remove();
    //   database.ref('post/' + key).remove();
    // });

    $(`button[data-delete-id=${key}]`).click(function(){
      confirm('deseja mesmo excluir este post?');
      $(`[data-post-id=${key}]`).remove();
      database.ref('post/' + key).remove();
    });

    $(`button[data-edit-id=${key}]`).click(function () {
      let newText = prompt(`Altere seu post: ${txt}`);
      $(`span[data-text-id=${key}]`).text(newText);
      database.ref('post/' + key).update({ text: newText })
      })
    }  
      
    
 
});

function likePost (key) {  
  $(`a[data-like-id=${key}]`).click(function() {
    console.log('teste');
    let valId = $(this).find(".btn-counter");
    let token = parseInt(valId.val()) + 1;
    valId.val(token);
    database.ref('post/' + key).update({ likeCounter: token })
  }); 
}; 

//CODIGO NOVO


// const database = firebase.database();
// //saber o que é mas provavelmente é para indicar qual usuario está logado
// //let USER_ID = window.location.search.match(/\?id=(.*)/)[1];


// $(document).ready(function(){
// //inseri o USER_ID
//   database.ref('post/').once('value')
//     .then(function (snapshot) {
//       snapshot.forEach(function (childSnapshot) {
      
//           let childKey = childSnapshot.key;
//           let childData = childSnapshot.val();
          
//           createPost(childData.text, childKey, childData.likeCounter);
//           //pq tenho que chamar o likepost aqui? pq eu fiz o like como uma função fora de tudo
//           likePost(childKey);

//       });
//     });
    
//   $("#post-btn").click(function(event) {
//     event.preventDefault();

//     let txt = $('#post').val();
//     $('#post').val("");

//     let newPostInDB = database.ref('post/').push({
//       text: txt,
//       likeCounter: 0  
//     });

//     createPost(txt, newPostInDB.key, 0);
//     likePost(newPostInDB.key);
//     text.remove();
//   });

//   //habilitar e desabilitar btn se txt estiver vazia
//   $("#post-btn").prop("disabled", true);

//   $("#post-btn").prop("disabled", true);

//   $("#post").keyup(function (event) {
//     if ($(this).val().length != 0) {
//       $("#post-btn").prop("disabled", false);
//     }
//     else {
//       $("#post-btn").prop("disabled", true);
//     }
//   });
  
//   function createPost(txt, key, likeCounter) {
//     $('#feed').prepend(
//       `<div class=" col-sm-2 col-md-12 col-lg-5 mx-auto card p-3 border-yellow mb-3" style="max-width: 42rem;">
//       <span class="post-style" data-text-id="${key}">${txt}</span>
//       <br>
//       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
//       <div class="container d-inline-flex p-0"> 
//       <button class="m-2 btn btn-dark ml-auto" data-delete-id="${key}">Excluir</button>
//       <button class="m-2 btn btn-dark" data-edit-id="${key}">Editar</button>
//       <br>
//       </div>
//       <a class="like mr-auto" data-like-id='${key}'>
//       <i class="fa fa-heart"></i>  
//       <input data-like-id='${key}' class="btn-counter border-0" name="btn-counter" readonly="readonly" type="text" value= ${likeCounter}>
//       </a>
//       </div>`
//     );

//     $(`input[data-private-id=${key}]`).click(function(){ 
//       $(this).parent().remove();
//       database.ref('post/' + key).remove();
//     });

//     $(`button[data-delete-id=${key}]`).click(function(){
//       confirm('deseja mesmo excluir este post?');
//       $(this).parent().remove();
//       database.ref('post/' + key).remove();
//     });


//     $(`button[data-edit-id=${key}]`).click(function () {
//       let newText = prompt(`Altere seu post: ${txt}`);
//       $(`span[data-text-id=${key}]`).text(newText);
//       database.ref('post/' + key).update({ text: newText })
//       })
//     }  


//     //problema no editar: olhar a redesolcial da iana, olhar o do rafa e o da loraine e rafa projeto inplace replacewith

//     // $(`button[data-edit-id=${key}]`).click(function (event) {
//     //   event.preventDefault();

//     //   $(`.post[data-text-id="${key}"]`).replaceWith(`<textarea data-id-txta=${key} class="post-area border-0">${text}</textarea>`);
//     //   $(`.btn-save[data-save-id="${key}"]`).toggleClass("d-none");

//     //   $(`.btn-save[data-save-id="${key}"]`).click(function (event) {
//     //     event.preventDefault();

//     //     let newText = $(`[data-id-txta=${key}]`).val()
//     //     database.ref('post/' +"/" + key).update({
//     //       text: newText
//     //     })

//       // let newText = prompt(`Altere seu post: ${txt}`);
//       // $(`span[data-text-id=${key}]`).text(newText);
//       // database.ref('post/' + key).update({ text: newText })
//       // })
//     // }  


//     // 

      
    
 
// });

// function likePost (key) {  
//   $(`a[data-like-id=${key}]`).click(function() {
//     console.log('teste');
//     let valId = $(this).find(".btn-counter");
//     let token = parseInt(valId.val()) + 1;
//     valId.val(token);
//     database.ref('post/' + key).update({ likeCounter: token })
//   }); 
// };    



// //problema no editar: olhar a redesolcial da iana, olhar o do rafa e o da loraine e rafa projeto inplace replacewith

// //primeiro de tudo: qdo logar aparecer a timeline especifica do usuario logado

// //criar o botao publico ou privado

// //criar uma function para filtrar

// //a function deve conter a let privado e a let publico e deve dizer que:
// // se o usuario clicar em publico a postagem aparece para todos os usuarios
// // se o usuario clicar em privado a postagem só aparece na timeline do pró´rio usuario

// //criar um filter na timeline de usuário que filtre as postagens publicas e privadas
// //para isso precisamos ter armazenado a condição do post se é publico ou pro



const database = firebase.database();

$(document).ready(function(){
  database.ref('post/').once('value').then(function (snapshot) {
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
  
  function createPost(txt, key, likeCounter){
    $('#feed').prepend(
      `<div  class=" col-sm-2 col-md-12 col-lg-5 mx-auto card border-warning mb-3" style="max-width: 42rem;">
          <button class="m-2 btn btn-dark" data-delete-id="${key}">Excluir</button>
          <button class="m-2 btn btn-dark" data-edit-id="${key}">Editar</button> <br>
          <span data-text-id="${key}">${txt}</span> <br>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
          <div class="container"> 
              <a class="like" data-like-id='${key}'><i class="fa fa-thumbs-o-up"></i>  
              Like <input data-like-id='${key}' class="btn-counter" name="btn-counter" readonly="readonly" type="text" value= ${likeCounter}>
              </a>
         </div>
      </div>`
    );

    $(`input[data-private-id=${key}]`).click(function(){
      
      $(this).parent().remove();
      database.ref('post/' + key).remove();
    });

    $(`button[data-delete-id=${key}]`).click(function(){
      confirm('deseja mesmo excluir este post?');
      $(this).parent().remove();
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

    // function createComent(comen, key){
    //   $('#coments').prepend();
    // }

    // $("#btnComent").click(function(){
    //   let comen = $('#coments').val();
    //   $('#coments').val("");
    //   let newPostInDB = database.ref('post/').push({
    //     text: comen
    //   });
    //   createComent(comen, newPostInDB.key);
    //   text.remove();
    // })
//primeiro de tudo: qdo logar aparecer a timeline especifica do usuario logado


//criar o botao publico ou privado

//criar uma function para filtrar
//a function deve conter a let privado e a let publico e deve dizer que:
// se o usuario clicar em publico a postagem aparece para todos os usuarios
// se o usuario clicar em privado a postagem só aparece na timeline do pró´rio usuario

//criar um filter na timeline de usuário que filtre as postagens publicas e privadas
//para isso precisamos ter armazenado a condição do post se é publico ou pro



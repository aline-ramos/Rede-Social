const database = firebase.database();
$(document).ready(function(){
  database.ref('post/').once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();

      createPost(childData.text, childKey);
    });
  })

  $("#post-btn").click(function () {

  database.ref('post/').once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
          createPost(childData.text, childKey)
    });
  });
    
  $("#post-btn").click(function(){

    let txt = $('#post').val();
    $('#post').val("");
    let newPostInDB = database.ref('post/').push({
      text: txt
    });
    createPost(txt, newPostInDB.key);
    text.remove();
  })

  function createPost(txt, key) {
    $('#feed').prepend(
      // `<div  class=" col-sm-2 col-md-12 col-lg-5 mx-auto card border-warning mb-3" style="max-width: 35rem;">
      //     <button  data-delete-id="${key}">Excluir</button>
      //     <button data-edit-id="${key}">Editar</button> <br>
      //     <span data-text-id="${key}">${txt}</span> <br>
      //     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
      //     <button data-like-id="${key}"><i class="fa fa-heart"></i></button> 
      //     <div class="quantLikes">
      //     0
      //     </div>
      //     <input data-coment-id="${key}" type="text" id="coment">
      //     <button id="btnComent" data-comentButton-id="${key}">Comentar</button>
      //     <section id="coments"></section>
      // </div>`

      `<div  data-card-id="${key}" class="mb-4  card text-right">
        <a class="text-dark" href="#" data-edit-id="${key}"> <i  class="far fa-edit"></i></a>
        <a class="text-warning" href="#" data-delete-id="${key}"> <i  class="fas fa-trash-alt"></i></a>
      <div class="card-body text-center">
          <span data-text-id="${key}">${txt}</span>
      </div>
      <div class=" d-inline-flex card-footer text-muted">
          <div class="mr-5" >
          <button class=" bg-warning btn" data-like-id="${key}"><i class="fa fa-heart"></i></button>
         <span class="quantLikes" > 0 </span>
          </div>
          <input class="flex-fill" data-coment-id="${key}" type="text" id="coment">
          <button class="bg-warning btn" id="btnComent" data-comentButton-id="${key}">Comentar</button>
          <section id="coments"></section>
      </div>
  </div>`




    );
    $(`button[data-like-id=${key}]`).click(function () {
      var valId = $(this).data('id');
      var token = $(this).attr('id');
      $(this).next(".quantLikes").html(parseInt($(this).next(".quantLikes").html()) + 1);
      database.ref(".quantLikes" + key).childKey()
    });

    $(`a[data-delete-id=${key}]`).click(function () {
      confirm('deseja mesmo excluir este post?');
      $(this).parent().remove();
      database.ref('post/' + key).remove();
    });
    $(`a[data-edit-id=${key}]`).click(function () {
      let newText = prompt(`Altere seu post: ${txt}`);
      $(`span[data-text-id=${key}]`).text(newText);
      database.ref('post/' + key).update({ text: newText })
    })
  }
});

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
    // });

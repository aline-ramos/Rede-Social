const database = firebase.database();

$(document).ready(function(){
  database.ref('post/').once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let childKey = childSnapshot.key;
      let childData = childSnapshot.val();
      createPost(childData.text, childKey)
      });
    });

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
 
  function createPost(txt, key){
    $('#feed').prepend(
      `<div>
        <span data-text-id="${key}">${txt}</span>
        <button data-delete-id="${key}">Excluir</button>
        <button data-edit-id="${key}">Editar</button>
      </div>`
    );
  

    $(`button[data-delete-id=${key}]`).click(function () {
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
$(document).ready(function(){ 

    $("#sign-facebook-btn").click(function(e){
        e.preventDefault();
        let provider = new firebase.auth.FacebookAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            window.location = `timeline.html?id=${result.user.uid}`;


            if (result.credential) {
              // Para acessar a API do facebook
              let token = result.credential.accessToken;
              // ...
            }
            // Informações do usuário
            let user = result.user;


          }).catch(function(error) {
              console.log(error);
            
            // Erros
            let errorCode = error.code;
            let errorMessage = error.message;
            
            // Erro no email
            let email = error.email;
            
            // Erro no tipo de credenciamento
            let credential = error.credential;
            // ...
          });

    })


});
$(document).ready(function(){ 
    // window.fbAsyncInit = function() {
    //     FB.init({
    //       appId      : '{your-app-id}',
    //       cookie     : true,
    //       xfbml      : true,
    //       version    : '{api-version}'
    //     });
          
    //     FB.AppEvents.logPageView();   
          
    //   };
    
    //   (function(d, s, id){
    //      var js, fjs = d.getElementsByTagName(s)[0];
    //      if (d.getElementById(id)) {return;}
    //      js = d.createElement(s); js.id = id;
    //      js.src = "https://connect.facebook.net/en_US/sdk.js";
    //      fjs.parentNode.insertBefore(js, fjs);
    //    }(document, 'script', 'facebook-jssdk'));

    //Botão entrar com o Facebook

    $("#sign-facebook-btn").click(function(e){
        e.preventDefault();
        let provider = new firebase.auth.FacebookAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            window.location = `postagem.html?id=${result.user.uid}`;


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
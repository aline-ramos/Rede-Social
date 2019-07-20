$(document).ready(function(){

    //Botão entrar com o Google

    $("#sign-google-btn").click(function(e){
        e.preventDefault();

        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            window.location = `timeline.html?id=${result.user.uid}`;
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              let token = result.credential.accessToken;
              // ...
            }
            // The signed-in user info.
            let user = result.user;
          }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...
          });

    })



});       
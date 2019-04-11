$(document).ready(function () {

    //Botão Cadastro

    $("#sign-up-btn").click(function (e) {
        e.preventDefault();
        let email = $("#login-input").val();
        let password = $("#password-input").val();
        console.log(email, password);

        //Criar novo usuário

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (response) {
                window.location = `./postagem.html?id=${response.user.uid}`;

            })

            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });

    })



    //Botão entrar

    $("#sign-in-btn").click(function (e) {
        e.preventDefault();
        let email = $("#login-input").val();
        let password = $("#password-input").val();

        //Fazer login com usuário já cadastrado

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) {
                window.location = `./postagem.html?id=${response.user.uid}`;
            })

            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...

            });

    })





});
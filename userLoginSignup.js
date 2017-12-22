var userGlobal = {
    username: "",
    id: ""
}
var token = ""
var isLoggedIn = false
/*begin functions required during register*/
$(document).ready(() => {
    $("#login-register").each(function () {
        $(this).submit(function (e) {
            e.preventDefault();
        });
    });
    
    alertify.set('notifier','position', 'top-center');
});

function register() {
    let username = $("#username").val();
    let password = $("#password").val();
    let userObject = {
        username: username,
        password: password
    }
    let registerRequest = {
        async: true,
        crossDomain: true,
        url: "http://164.138.216.49/auth/signup",//"http://localhost:5000/auth/signup",
        method: "POST",
        //headers: {
          //  "Content-Type": "application/json",
            //"Cache-Control": "no-cache"
        //},
        processData: false,
        data: JSON.stringify(userObject)
    }

    $.ajax(registerRequest)
        .done(response => registerUserSuccess(response))
        .fail(err => {
            /*console.log('error', err) - should be used only in dev mode*/
            registerUserFail(err.responseJSON.message)
        })
}

function registerUserSuccess(response) {
    if (response.success) {
        loginRequestFunction(response.user.username, response.user.password)
        isLoggedIn = true
    } else {
        alertify.error("Username allready taken")
    }
}

function registerUserFail(message) {

}
/*end functions required during register*/

/*begin functions required during login*/
function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    loginRequestFunction(username, password)
}

function loginRequestFunction(username, password) {
    let userObject = {
        username: username,
        password: password
    }

    let loginRequest = {
        async: true,
        crossDomain: true,
        url: "http://164.138.216.49/auth/login",//"http://localhost:5000/auth/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        processData: false,
        data: JSON.stringify(userObject)
    }

    $.ajax(loginRequest).done(function (response) {
        if (response.success) {
            token = response.token
            userGlobal = response.user
            isLoggedIn = true
            changeLoginNavBarToUserName()
            showUploadProfile()
            changeColorLikeOnLogin(userGlobal.id)
        } else {
            alertify.error("Invalid credentials")
        }
    });
}
/*end functions required during login*/
/*begin additional functions (during both login and signup)*/
function changeLoginNavBarToUserName() {
    let name = userGlobal.username;
    let htmlUserName = '<span class="profile-name"><p> Welcome ' + name + ' </p></span>'
    $("#login-navbar").empty()
    $("#login-navbar").append(htmlUserName)
    $("#login-navbar").css("padding-top", "8px")
}

function showUploadProfile() {
    $("#navbar-upload").css("display", "block")
    $("#closeLogin").trigger("click", "close")
}
/*end additional functions (during both login and signup)*/

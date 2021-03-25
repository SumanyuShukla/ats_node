/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $("#login").hide();

    $("#log").click(function () {
        $("#register").hide();
        $("#login").show();
        $("#reg").removeClass("active");
        $("#log").addClass("active");
    });
    $("#reg").click(function () {
        $("#login").hide();
        $("#register").show();
        $("#log").removeClass("active");
        $("#reg").addClass("active");
    });

    $("#registerButton").click(function () {
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        $.ajax({
            url: "user/register",
            method: "POST",
            data: {
                username: username,
                email: email,
                password: password
//                action: "register"
            },
//            datatype: "application/json",
            success: function (result) {
                // var result = JSON.parse(data);
                if (result.response == "Success") {
                    alert("Successfully Registered!");
                    username = "";
                    email = "";
                    password = "";
                    $("#register").hide();
                    $("#login").show();
                    $("#register").removeClass("active");
                    $("#login").addClass("active");
                }
//              console.log(result.response);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#loginButton").click(function () {
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();
        $.ajax({
            url: "user/login",
            method: "POST",
            data: {
                username: username,
                password: password
//                action: "login"
            },
//            datatype:"application/json",
            success: function (result) {
                // var result = JSON.parse(data);
                console.log(result);
                if (result.status == "success") {
                    window.location.href = result.role;
                } else {
                    alert(result.status);
                }

            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

//function noBack(){
//    alert(1);
//}

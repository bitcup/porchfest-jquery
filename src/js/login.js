import {callAPI, getLoginApi} from "./utils/api.js";

$(document).ready(function () {
    $("#loginForm").validate({
        rules: {
            email: {
                required: true,
                // Specify that email should be validated by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
            }
        },
        messages: {
            password: {
                required: "Please enter a password",
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function (form, event) {
            let formData = {
                "email": $(form).find('input[name="email"]').val(),
                "password": $(form).find('input[name="password"]').val(),
            }
            console.log("submitting login form: " + JSON.stringify(formData))
            callAPI(getLoginApi(), "POST", formData).then(response => {
                if (response) {
                    let roles = response.roles.join();
                    localStorage.pfJwt = response.token;
                    if (roles.indexOf('ROLE_PERFORMER') > -1) {
                        window.location.href = 'acts.html';
                        return;
                    }
                    if (roles.indexOf('ROLE_HOST') > -1) {
                        window.location.href = 'venues.html';
                    }
                }
            })
        }
    });
});

import {callAPI, getRegisterApi} from "./utils/api.js";

$(document).ready(function () {
    $("#signupForm").validate({
        rules: {
            'roles': {
                required: true,
                minlength: 1
            },
            email: {
                required: true,
                // Specify that email should be validated by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 40
            }
        },
        messages: {
            'roles': {
                required: "You must chose at least one role",
                minlength: "Check at least 1 boxes"
            },
            firstName: "Please enter your first name",
            lastName: "Please enter your last name",
            password: {
                required: "Please provide a password between 8 and 40 characters long",
                minlength: "Your password must be between 8 and 40 characters long"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function (form, event) {
            let roles = [];
            $("input:checkbox[name=roles]:checked").each(function () {
                roles.push($(this).val());
            })
            let formData = {
                "firstName": $(form).find('input[name="firstName"]').val(),
                "lastName": $(form).find('input[name="lastName"]').val(),
                "email": $(form).find('input[name="email"]').val(),
                "password": $(form).find('input[name="password"]').val(),
                "roles": roles.join(),
            }
            console.log("submitting signup form: " + JSON.stringify(formData))
            callAPI(getRegisterApi(), "POST", formData).then(response => {
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

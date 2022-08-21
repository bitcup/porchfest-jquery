import {getJwt, getRoles, getSubject, logout} from './utils/jwt.js';

$(document).ready(function () {
    // render nav only if authenticated
    if (getJwt()) {
        let subject = getSubject()
        let pathname = window.location.pathname;
        let actsActive = (pathname.indexOf('acts.html') !== -1 || pathname.indexOf('acts') !== -1) ? 'active' : '';
        let venuesActive = (pathname.indexOf('venues.html') !== -1 || pathname.indexOf('venues') !== -1) ? 'active' : '';

        $('#site-nav').append(
            `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top text-center" style="background-color: #2c3e50 !important;">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">Winchester Porchfest</a>
                <button class="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" 
                        aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-item nav-link ${actsActive}" href="acts.html">Acts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-item nav-link ${venuesActive}" href="venues.html">Venues</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" 
                               role="button" 
                               data-bs-toggle="dropdown" 
                               aria-expanded="false">${subject}</a>
                            <ul class="dropdown-menu">
                                <li><div class="dropdown-item">Roles: ${getRoles()}</div></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" id="logMeOut">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`
        );

        $('#sticky-footer').append(
            `<footer class="mt-auto py-3 my-4" style="background-color: #2c3e50 !important">
            <p class="text-center text-light small" style="margin: 0">Copyright &copy; ${new Date().getFullYear()} porchfest.win</p>
        </footer>`
        )

        $('#logMeOut').click(function (event) {
            event.preventDefault(); // prevent default behavior of link click
            logout();
            console.log('LOGOUT')
        });

        console.log("Finished nav");
    }
})

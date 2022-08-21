export function getJwt() {
    let jwt = localStorage.pfJwt;
    if (jwt == null) {
        window.location.href = 'login.html';
    }
    // console.log("jwt=" + jwt);
    return jwt;
}

export function isRole(role) {
    let jwt = localStorage.pfJwt;
    let payload = parseJwt(jwt);
    return payload.roles.indexOf(role) > -1
}

export function getSubject() {
    let jwt = localStorage.pfJwt;
    let payload = parseJwt(jwt);
    return payload.sub;
}

export function getRoles() {
    let jwt = localStorage.pfJwt;
    let payload = parseJwt(jwt);
    let list = payload.roles.join(", ");
    list = list.replace('ROLE_PERFORMER', 'Performer');
    list = list.replace('ROLE_HOST', 'Host');
    list = list.replace('ROLE_ADMIN', 'Admin');
    return list;
}

export function logout() {
    localStorage.pfJwt = null;
    window.location.href = 'login.html';
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let parsed = JSON.parse(jsonPayload);
    // console.log('id: ' + JSON.stringify(parsed));
    return parsed;
}


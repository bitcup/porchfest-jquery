import {getJwt} from "./jwt.js";

export function getLoginApi() {
    return `${getApiHost()}/api/auth/signin`;
}

export function getRegisterApi() {
    return `${getApiHost()}/api/auth/signup`;
}

export function getActsApi(actId) {
    let url = `${getApiHost()}/api/acts`;
    if (actId) {
        url += `/${actId}`;
    }
    return url;
}

export function getVenuesApi() {
    return `${getApiHost()}/api/venues`;
}


export function callAPI(url, type, data) {
    if (type === "GET") {
        return fetch(url, {
            method: type,
            headers: authHeaders()
        })
            .then(handleResponse())
            .catch(error => {
                alert(`Error: ${error}`);
                console.error('There was an error!', error);
            })
    }

    if (type === "DELETE") {
        return fetch(url, {
            method: type,
            headers: authHeaders()
        })
            .then(handleResponse())
            .catch(error => {
                alert(`Error: ${error}`);
                console.error('There was an error!', error);
            })

            // .then(res => {
            //     if (res.ok) { console.log("HTTP request successful") }
            //     else { console.log("HTTP request unsuccessful") }
            //     return res
            // })
            // .catch(error => error)
    }

    if (type === "POST" || type === "PUT") {
        return fetch(url, {
            method: type,
            headers: authHeaders(),
            body: JSON.stringify(data)
        })
            .then(handleResponse())
            .catch(error => {
                alert(`Error: ${error}`);
                console.error('There was an error!', error);
            })
    }
}

function getApiHost() {
    return 'http://localhost:80';
}

function authHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getJwt()
    }
}

function handleResponse() {
    return async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (response.ok) {
            console.log("HTTP request successful");
            return data;
        }

        if (!response.ok) {
            if ([401].includes(response.status)) {
                window.location.href = 'login.html';
            }
            if ([403].includes(response.status)) {
                alert("Error: you are unauthorized to perform this action" + response.statusText);
                // may need to prevent the other alert below
            }

            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        alert(JSON.stringify(data, null, 4));
    };
}


// function handleResponse(response) {
//     console.log("response: " + JSON.stringify(response));
//     console.log("response.status: " + JSON.stringify(response.status));
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         data['status'] = response.status
//
//         if (!response.ok) {
//             if ([401, 403].includes(response.status)) {
//                 handleUnauthorized(response);
//             }
//
//             if ([422].includes(response.status)) {
//                 // helps with debugging - can we use that in validation?
//                 console.log('status 422 - data=' + JSON.stringify(data))
//             }
//
//             if ([404].includes(response.status)) {
//                 console.log('status 404 - data=' + JSON.stringify(data))
//                 return {}
//             }
//
//             const error = (data && data) || response.statusText;
//             return Promise.reject(error);
//         }
//
//         return data;
//     });
// }

// function handleBadResponse(res) {
//     res.text().then(text => {
//         const responseData = text && JSON.parse(text);
//         responseData['status'] = res.status;
//         let badResponseData = JSON.stringify(responseData);
//
//         console.log("HTTP request unsuccessful: " + res.status);
//         if ([401, 403].includes(res.status)) {
//             handleUnauthorized(res);
//         }
//
//         if ([422].includes(res.status)) {
//             // helps with debugging - can we use that in validation?
//             alert('status 422 - data=' + badResponseData)
//         }
//
//         if ([404].includes(res.status)) {
//             console.log('status 404 - data=' + badResponseData)
//             return {}
//         }
//
//         if ([400].includes(res.status)) {
//             alert('status 400 - data=' + badResponseData)
//         }
//
//         const error = (badResponseData && badResponseData) || res.statusText;
//         return Promise.reject(error);
//     })
// }




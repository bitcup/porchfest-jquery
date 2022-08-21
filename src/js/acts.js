import {isRole} from './utils/jwt.js';
import {callAPI, getActsApi} from './utils/api.js';

function buildActsTable(response) {
    let tableBody = ``;
    for (let i = 0; i < response.length; i++) {
        let act = response[i];
        let slots = Array.prototype.map.call(act.preferredSlots, function (item) {
            return item.name;
        }).join(", ");
        tableBody += `
            <tr>
                <td>${act.actName}</td>
                <td>${act.displayType}</td> 
                <td>${slots}</td>
                <td>
                    <button type="button" class="btn btn-info showAct" data-act-id="${act.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                        </svg>
                    </button>        
                </td>
                <td>
                    <button type="button" class="btn btn-danger deleteAct" data-act-id="${act.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                        </svg>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-success editAct" data-act-id="${act.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                        </svg>
                    </button>
                </td>
            </tr>`;
    }
    return tableBody;
}

function buildActInfoTable(act) {
    let tableBody = ``;
    let slots = Array.prototype.map.call(act.preferredSlots, function (item) {
        return item.name;
    }).join(", ");
    tableBody += `
        <tr>
            <td>Act Name</td>
            <td>${act.actName}</td>
        </tr>
        <tr>
            <td>Act Type</td>
            <td>${act.displayType}</td>
        </tr>
        <tr>
            <td>Preferred Slots</td>
            <td>${slots}</td>
        </tr>
        <tr>
            <td>TODO</td>
            <td>More</td>
        </tr>
    `;
    return tableBody;
}

$(document).ready(function () {
    callAPI(getActsApi(), "GET").then(acts => {
        if (acts) {
            console.log("acts=" + JSON.stringify(acts));
            if (acts.length > 0 || isRole('ROLE_ADMIN')) {
                $('#actsTable').show();
                $('#actsTableBody').append(buildActsTable(acts));
            } else if (isRole('ROLE_PERFORMER')) {
                $('#actForm').show();
            }
        }
    })


    $("#newActForm").validate({
        rules: {
            actName: {
                required: true,
            },
        },
        messages: {
            actName: {
                required: "Please enter a name for your act",
            },
        },
        submitHandler: function (form, event) {
            let check_box_values = $(form).find('input[name="preferredSlots"]:checked').map(function () {
                return this.value;
            }).get();

            let formData = {
                "actName": $(form).find('input[name="actName"]').val(),
                "type": $(form).find('input[name="type"]').val(),
                "preferredSlots": check_box_values,
                "email": "foo@bar.com",
                "contactName": "foo contact",
                "description": "bar desc",
                "performers": "some perfs",
                "phone": "123 456 789",
                "mixerAvailable": "YES",
            }
            console.log("submitting act form: " + JSON.stringify(formData))
            callAPI(getActsApi(), "POST", formData).then(response => {
                if (response) {
                    location.reload();
                }
            })
        }
    });
});

$(document).on("click", ".deleteAct", function (event) {
    event.preventDefault();
    let actId = $(this).data("act-id");
    if (confirm('Are you sure you want to delete this act?')) {
        callAPI(getActsApi(actId), "DELETE").then(response => {
            if (response) {
                location.reload();
            }
        })
    }
});

$(document).on("click", ".showAct", function (event) {
    event.preventDefault();
    // if actInfoTable is already showing, hide it
    let $actInfoTableContainer = $('#actInfoTable');
    if ($actInfoTableContainer.is(":visible")) {
        $actInfoTableContainer.hide();
    } else {
        let actId = $(this).data("act-id");
        callAPI(getActsApi(actId), "GET").then(act => {
            if (act) {
                $actInfoTableContainer.show();
                $('#actInfoTableBody').empty().append(buildActInfoTable(act));
            }
        })
    }
});


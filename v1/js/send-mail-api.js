var clientId = '682344960160-e3tvcibcs9gefuin2icbsi82frhr7gi7.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/gmail.send';
function checkAuth() {
    $('.input').removeClass('error');
    if(!$('#subject').val() ||
       $('#subject').val().trim() == ''){
        $('#subject').parent().addClass('error');
        return false;
    }
    if(!$('#msgbody').val() ||
       $('#msgbody').val().trim() == ''){
        $('#msgbody').parent().addClass('error');
        return false;
    }
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
};
function handleAuthClick() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
    return false;
};
function handleAuthResult(authResult) {
    if(authResult && !authResult.error) {
        loadGmailApi();
    } else {
        handleAuthClick();
    }
};
function loadGmailApi() {
    gapi.client.load('gmail', 'v1', sendEmail);
};
function sendEmail() {
    $('#send-button').addClass('disabled');
    sendMessage(
        {
            'To': 'akhilparjun@gmail.com',
            'Subject': $('#subject').val()
        },
        $('#msgbody').val(),
        cleanMailForm
    );
    return false;
};
function cleanMailForm() {
    $('#subject').val('');
    $('#msgbody').val('');
};
function sendMessage(headers_obj, message, callback){
    var email = '';
    for(var header in headers_obj)
    email += header += ": "+headers_obj[header]+"\r\n";
    email += "\r\n" + message;
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
    return sendRequest.execute(callback);
}

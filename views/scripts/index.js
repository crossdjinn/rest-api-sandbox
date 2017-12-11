var parser = new UAParser();
var socket = io();

var result = parser.getResult();

if(result.cpu.architecture === undefined || result.cpu.architecture === null){
    result.cpu.architecture = result.os.version;
}

var device = {
    name: result.os.name + " " + result.cpu.architecture,
    browser:result.browser.name + " " + result.browser.version,
    engine: result.engine.name + " " + result.engine.version
};

$('#send-message').submit(function(e){
    e.preventDefault();
    socket.emit('send message', $('#message').val());
    $('#message').val('');
});

socket.on('new message', function(data){
    $('#chat').append('<b>' + data.nick + ': </b>' + data.msg + "<br/>");
});

socket.on('connectCounter', function(data){
    $('#connectCounter').empty();
    $('#connectCounter').append("<b>ON-line: </b>" + data);
});
function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}
function readCookie(n){n+='=';for(var a=document.cookie.split(/;\s*/),i=a.length-1;i>=0;i--)if(!a[i].indexOf(n))return a[i].replace(n,'');}

function bodyLoaded(bodyData) {
    console.log(document.cookie);
}

var myObject = {
    id: "cookie io os season id",
    name: device.name + " " + device.browser + " " + device.engine,
    shortName: device.name
};

socket.emit('new user', myObject, function(data){
        $('#contentWrap').show();
});

socket.on('usernames', function(data){
    var html = '';
    for (var nickname in data) //Foreach all nicknames received in data
    {
        var isNicknameOnline = data[nickname].online //Get the online state

        //We test the online status
        if (isNicknameOnline)
        {
            var status = '<font color=green><b>ON</b></font>'
        }
        else
        {
            var status = '<font color=red><b>OFF</b></font>'
        }

        html += status + ' ' + nickname + '<br/>' //print the status
    }
    $('#users').html(html);
});
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

function bodyLoaded(bodyData) {
    console.log("Body loaded" + bodyData)
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
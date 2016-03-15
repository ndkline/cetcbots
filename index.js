var SlackBot = require('slackbots');
http = require('http');
 
// create a bot 
var bot = new SlackBot({
    token: 'xoxb-25929351749-V6A99pkTikG2lAfViYVyHOOP', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'Reginald'
});


function testPort(host, port, path) {
    port = port || 80; 
    path = path || '/';
    var options = {
        host: host,
        port: port,
        path: path
    };

    http.get({ host: host, port: port }, function(res) {
        if (res.statusCode == 200) {
            console.log("\u2705  | " + host + ":" + port + path);
            return "\u2705  | " + host + ":" + port + path;
        }else{
            console.log("\u274C  "+res.statusCode)
            return "\u274C  "+res.statusCode;
        }

    }).on("error", function(e) {
        console.log("Status \u274C \u274C \u274C");
        console.log(e);
        return ("Status \u274C \u274C \u274C";
    });

}

var makeMention = function(userId) {
    return '<@' + userId + '>';
};
 
var isDirect = function(userId, messageText) {
    var userTag = makeMention(userId);
    return messageText &&
           messageText.length >= userTag.length &&
           messageText.substr(0, userTag.length) === userTag;
};

 
bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
        as_user: 'Reginald'
    };
    
    testPort('ed.psu.edu', 80);
    testPort('ed.psu.edu', 80, '/news/2015-jan-march-news/Morgan-award');
    testPort('respect.educ.psu.edu', 80);
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    // bot.postMessageToChannel('programming', 'meow!', params);
    
    // define existing username instead of 'user_name' 
    // bot.postMessageToUser('ndkline', 'meow!', params); 
    
    // define private group instead of 'private_group', where bot exist 
    // bot.postMessageToGroup('private_group', 'meow!', params); 
});








/**
 * @param {object} data
 */
bot.on('message', function(message) {
    // all ingoing events https://api.slack.com/rtm 

    var reply = null;

    switch(message.type) {
        case 'message':


            if(!(message.text.indexOf(makeMention(bot.self.id))==-1)){
                // Mentinoed

                if (isDirect(bot.self.id, message.text)) {
                    // Directly Mentioned
                    console.log(message);
                    if (message.text.indexOf('ed.psu.edu') && message.text.indexOf('stutus') ) {
                        reply = testPort('ed.psu.edu', 80);
                    }
                }

            }
            break;
        case 'hello':

            break;
        case 'reconnect_url':
            // Bot is reconnecting 
            break;
        case 'user_typing':
            // User is Typing
            break;
        case 'presence_change':
            // User changed AFK status
            break;
        default:
            console.log('Unlogged Message Type: ' + message.type);
    }

    if (reply !== null) {
        bot.postMessageToUser(message.user, reply, params); 
        reply = null;
    }

});


console.log('Reginald\'s subroutines are now enabled.' );
var SlackBot = require('slackbots');
http = require('http');
 
// create a bot 
var bot = new SlackBot({
    token: 'xoxb-25929351749-V6A99pkTikG2lAfViYVyHOOP', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'Reginald'
});
 
bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
        as_user: 'Reginald'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    // bot.postMessageToChannel('programming', 'meow!', params);
    
    // define existing username instead of 'user_name' 
    // bot.postMessageToUser('ndkline', 'meow!', params); 
    
    // define private group instead of 'private_group', where bot exist 
    // bot.postMessageToGroup('private_group', 'meow!', params); 
});


var makeMention = function(userId) {
    return '<@' + userId + '>';
};
 
var isDirect = function(userId, messageText) {
    var userTag = makeMention(userId);
    return messageText &&
           messageText.length >= userTag.length &&
           messageText.substr(0, userTag.length) === userTag;
};

// Check Topaz infastucture
var options = {
  host: 'ed.psu.edu',
  port: 80
};

http.get(options, function(res) {
  if (res.statusCode == 200) {
    console.log("Status \u2705 | College of Education");
  }
    }).on('error', function(e) {
      console.log("status \u10060 | College of Education" + e.message);
    });

function testPort(port, host, cb) {
  http.get({
    host: host, 
    port: port 
  }, function(res) {
    cb("success", res); 
  }).on("error", function(e) {
    cb("failure", e);
  });
}

testPort(8081, 'ed.psu.edu', function(err){
    console.log('error');
});


/**
 * @param {object} data
 */
bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm 

    switch(data.type) {
        case 'message':
            var channel = bot.getChannelGroupOrDMByID(message.channel);
            var user = bot.getUserByID(message.user);
         
            if (message.type === 'message' && isDirect(bot.self.id, message.text)) {
                console.log(channel.name + ':' + user.name + ':' + message.text);
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
            console.log('Unlogged Data Type: ' + data.type);
    }

});


console.log('Reginald\'s subroutines are now enabled.' );
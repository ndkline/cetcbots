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




// Check Topaz infastucture
// var options = {
//   host: 'ed.psu.edu',
//   port: 80
// };

// http.get(options, function(res) {
//   if (res.statusCode == 200) {
//     console.log("Status \u2705 | College of Education");
//   }
//     }).on('error', function(e) {
//       console.log("status \u10060 | College of Education" + e.message);
//     });

function testPort_cb(status, message){
    console.log("Status: "+status);
    console.log("Message: "+message);
}

function testPort(port, host, cb) {
    // console.log(host+":"+port);
    http.get({ host: host, port: port }, function(res) {

        // cb("success", res); 
        console.log(res);
    }).on("error", function(e) {
        // cb("failure", e);
        console.log(e);
    });
    
  //   var options = {
  //       host: host,
  //       port: port
  //   };

  //   http.get(options, function(res) {
  // if (res.statusCode == 200) {
  //   console.log("Status \u2705 | College of Education");
  //   cb("success", res)
  // }
  //   }).on('error', function(e) {
  //     console.log("status \u10060 | College of Education" + e.message);
  //   });

}

testPort(80, 'ed.psu.edu', testPort_cb);


var makeMention = function(userId) {
    return '<@' + userId + '>';
};
 
var isDirect = function(userId, messageText) {

    // todo: returning false, should be true
    var userTag = makeMention(userId);

    console.log('TEXT: '+messageText);
    console.log(messageText.length+" >= "+userTag.length)
    console.log(messageText.substr(0, userTag.length)+' === '+userTag);

    return messageText &&
           messageText.length >= userTag.length &&
           messageText.substr(0, userTag.length) === userTag;
};

/**
 * @param {object} data
 */
bot.on('message', function(message) {
    // all ingoing events https://api.slack.com/rtm 

    switch(message.type) {
        case 'message':


            if(!(message.text.indexOf(makeMention(bot.self.id))==-1)){
                // Mentinoed

                if (isDirect(bot.self.id, message.text)) {
                    // Directly Mentioned
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

});


console.log('Reginald\'s subroutines are now enabled.' );
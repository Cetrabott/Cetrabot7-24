const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Jimp = require('jimp');

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'wasted',
            group: 'eglence2',
            memberName: 'wasted',
            description: 'İstediğiniz kullanıcının profiline wasted efekti koyar.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

			args: [
				{
					key: 'member',
					prompt: 'Birisini etiketle!',
					type: 'member'
				}
			]
        });
    }

async run(message, args) {
    const member = args.member;
    const user = member.user;
        
    message.channel.startTyping();
    if (!message.guild) user = message.author;

    Jimp.read(user.avatarURL, (err, image) => {
        image.resize(295, 295)
        image.greyscale()
        image.gaussian(3)
        Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
            avatar.resize(295, 295)
            image.composite(avatar, 4, 0).write(`./img/wasted/${user.id}.png`);
            setTimeout(function() {
                message.channel.send(new Discord.Attachment(`./img/wasted/${user.id}.png`));
            }, 1000);
      message.channel.stopTyping();
        });
    });
    }
}
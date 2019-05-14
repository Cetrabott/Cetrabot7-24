const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AtatürkCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'atatürk',
            aliases: ['ata', 'türkiye', 'cumhuriyet', 'vatan'],
            group: 'eglence',
            memberName: 'atatürk',
            description: 'Bot Atatürkle ilgili mesajlar gönderir. ',
            guildOnly: false,
            throttling: {
                 usages: 1,
                 duration: 10
            }
        });
    }

    run(msg, {yazı}) {
      const embed = new RichEmbed()
          .setDescription(':love_letter: :heart: Mustafa Kemal Atatürkü Saygıyla Anıyoruz.')
          .setImage()
          .setAuthor('Atatürk Command')
          .setColor('RANDOM')
          .setTimestamp();
      return msg.embed(embed);
  }
};

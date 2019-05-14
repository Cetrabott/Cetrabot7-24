const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class OwnersCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'yapimcim',
            aliases: ['yapımcım'],
            group: 'bilgi',
            memberName: 'yapimcim',
            description: 'Bot kendi yapımcısını gösterir.',
            guildOnly: false,
            throttling: {
                 usages: 1,
                 duration: 10
            }
        });
    }

    run(msg, {yazı}) {
      const embed = new RichEmbed()
          .setDescription('**Yapımcım: Cetrabot Yapımcı | Kerim#7553 **')
          .setImage()
          .setAuthor('Yapımcım Command')
          .setColor('RANDOM')
          .setTimestamp();
      return msg.embed(embed);
  }
};

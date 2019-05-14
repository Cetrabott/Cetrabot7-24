const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class GalatasarayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gs',
            aliases: ['gala', 'gs-kadro'],
            group: 'eglence2',
            memberName: 'galatasaray',
            description: 'Galatasarayin Aktif Kadrosunu Gösterir',
        });
    }

    run(msg) {
        const embed = new RichEmbed()
                  embed.setTitle('Galatasaray Aktif Kadro')
                  embed.addField('Kaleci','Fernando Muslera')
                  embed.addField('Savunma','Maicon')
                  embed.addField('Savunma','Serdar Aziz')
                  embed.addField('Savunma','Mariano')
                  embed.addField('Savunma','Yuto Nagatumo')
                  embed.addField('Ortasaha','Feghouli')
                  embed.addField('Ortasaha','Belhanda')
                  embed.addField('Ortasaha','Fernando Reges')
                  embed.addField('Ortasaha','Garry Rodrigues')
                  embed.addField('Santrafor','Bafetimbi Gomis')
                  embed.addField('Santrafor','Henry Onyekuru')
                  embed.setFooter('Galatasaray Aktif Kadro 2018/2019 | Cetrabot')
                  embed.setColor("RANDOM") // Renk belirler
           msg.embed(embed)
    }
}
const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class BesiktasCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bjk',
            aliases: ['besiktas', 'bjk-kadro'],
            group: 'eglence2',
            memberName: 'bjk',
            description: 'Besiktasin Aktif Kadrosunu Gösterir',
        });
    }

    run(msg) {
        const embed = new RichEmbed()
                  embed.setTitle('Besiktas Aktif Kadro: Mac: Torshavn:Besiktas: 0-2 Besiktas Önde')
                  embed.addField('Kaleci','14: Tolga Zengin')
                  embed.addField('Savunma','Adriano')
                  embed.addField('Savunma','Gary Medel')
                  embed.addField('Savunma','Gökhan Gönül 1 Gol')
                  embed.addField('Savunma','Caner Erkin')
                  embed.addField('Ortasaha','Tolgay Arslan')
                  embed.addField('Ortasaha','Fatih Aksoy')
                  embed.addField('Ortasaha','Necip Uysal')
                  embed.addField('Santrafor','Jeremain Lens 1 Gol')
                  embed.addField('Santrafor','Ryan Babel')
                  embed.addField('Santrafor','Cyle Larin')
                  embed.setFooter('Besiktas Aktif Kadro 2018/2019 | Cetrabot')
                  embed.setColor("RANDOM") // Renk belirler
           msg.embed(embed)
    }
}
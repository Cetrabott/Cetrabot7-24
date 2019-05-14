const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class FenerbahceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fb',
            aliases: ['fener', 'fb-kadro'],
            group: 'eglence2',
            memberName: 'fenerbahce',
            description: 'Fenerbahcenin Aktif Kadrosunu Gösterir',
        });
    }

    run(msg) {
        const embed = new RichEmbed()
                  embed.setTitle('Fenerbahce Aktif Kadro')
                  embed.addField('Kaleci','A.Federci')
                  embed.addField('Savunma','Luis Neto')
                  embed.addField('Savunma','Roman Neustadter')
                  embed.addField('Savunma','Hasan Ali')
                  embed.addField('Savunma','A.Florenzi')
                  embed.addField('Ortasaha','Mehmet Ekici')
                  embed.addField('Ortasaha','Guilano')
                  embed.addField('Ortasaha','B.Fernandez')
                  embed.addField('Ortasaha','Deulofeu')
                  embed.addField('Ortasaha','R.Steffen')
                  embed.addField('Santrafor','Roberto Soldado')
                  embed.setFooter('Fenerbahce Aktif Kadro 2018/2019 | Cetrabot')
                  embed.setColor("RANDOM") // Renk belirler
           msg.embed(embed)
    }
}
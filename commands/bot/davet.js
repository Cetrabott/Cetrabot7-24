const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'davet',
			aliases: ['davet', 'invite'],
			group: 'bot',
			memberName: 'link',
			description: 'Botun Davet Linkini Atar.',
			guildOnly: false,
			throttling: {
				usages: 1,
				duration: 10
			}
		});
    }

	async run(msg) {
		if (msg.guild) {
			var embed = new RichEmbed()
			.setTitle('Davetler')
			.setDescription(stripIndents`
            **Davet Linkleri**
            + Botu Ekleme Linki: https://discordbots.org/bot/454681646969389070
            + Destek Sunucusu: https://discord.gg/T3skc7G
			`)
			.setColor('RED');
			return msg.channel.send({embed});
        }

        var embed = new RichEmbed()
		.setTitle('Yenilikler')
		.setDescription(stripIndents`
        **Davet Linkleri**
        + Botu Ekleme Linki: https://discordbots.org/bot/454681646969389070
        + Destek Sunucusu: https://discord.gg/T3skc7G
        `)
		.setColor('RED');

		return msg.channel.send({embed});
	}
};
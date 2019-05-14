const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bilgi',
			aliases: ['b', 'info', 'bot info', 'botinfo'],
			group: 'bot',
			memberName: 'bot',
			description: 'Bot ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
		var embed = {
			color: 3447003,
			description: `**Bilgi**`,
			fields: [
				{
					name: '❯ Yapımcı',
					value: this.client.users.get('438568050443419656').tag,
					inline: false
				},
				{
					name: '❯ Sürüm',
					value: `v0.1.0 Beta`,
					inline: false
				},
				{
					name: '❯ Davet',
					value: `https://discordapp.com/oauth2/authorize?client_id=454681646969389070&scope=bot&permissions=1882328254`,
					inline: false
				},
				{
					name: '❯ Destek sunucusu',
					value: `https://discord.gg/T3skc7G`,
					inline: false
				},
		        {
				   name: '❯ Discord Bot List',
				   value: 'https://discordbots.org/bot/454681646969389070',
				   inline: false
				},
				{
					name: '❯ Kütüphanesi',
					value: `Discord.js-Commando`,       
                    inline: false     
				},
				{
					name: 'Kullanicilar',
					value: `${this.client.users.size} Kullanıcı`,
					inline: false
				},
				{
					name: 'Sunucular',
					value: `${this.client.guilds.size} Sunucu`,
					inline: false
				},
			],
			footer: {
			  icon_url: this.client.user.avatarURL,
			  text: "© 2018 Cetrabot"
			},
			thumbnail: { url: this.client.user.avatarURL }
    };
		return msg.channel.send({embed});
	}
};

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class StatsCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'istatistik',
			aliases: ['bot durum', 'i', 'bi', 'istatistikler', 'kullanımlar', 'botdurum', 'bd', 'istatisik', 'stats', 'stat'],
			group: 'bilgi',
			memberName: 'istatistikler',
			description: 'Botun istatistiklerini gösterir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
		var message = await msg.channel.send('İstatikler alınıyor...')

		var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type()

		var embed = {
			color: 3447003,
			description: '**İstatistikler**',
			fields: [
				{
					name: '❯ Çalışma süresi',
					value: moment.duration(this.client.uptime)
						.format('D [gün], H [saat], m [dakika], s [saniye]'),
					inline: false
				},
				{
					name: '❯ Sunucu işletim sistemi',
					value: `${osType}`,
					inline: false
				},
				{
					name: '❯ Bellek kullanımı',
					value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
					inline: false
				},
				{
					name: '❯ Genel istatistikler',
					value: stripIndents`
					• Sunucu: ${this.client.guilds.size}
					• Kanal: ${this.client.channels.size}
					• Kullanıcı: ${this.client.users.size}
					`,
					inline: false
				},
				{
					name: '❯ Sürümler',
					value: stripIndents`
					• Bot: v0.1.0 Beta
					• Discord.js: v${Discord.version}
					• Discord.js-commando: v${commando.version}
					• Node: ${process.version}
					`,
					inline: false
				}
			],
			thumbnail: { url: this.client.user.avatarURL }
		};
		
		return message.edit('', {embed});
	}
};
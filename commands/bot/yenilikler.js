const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yenilikler',
			aliases: [],
			group: 'bot',
			memberName: 'yenilikler',
			description: 'Bot ile ilgili yeni özellikleri gösterir.',
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
			.setTitle('Yenilikler')
			.setDescription(stripIndents`
			**Sürüm 0.1.0**
			+ Bjk,FB,GS Komutu Aktif-Kadroyu Gösterir
			+ Duelo
			+ Tic-Tac-Toe
			+ Slots
			+ Ekonomi (Bakimda Hatalari Düzeltiyoruz)
			+ Türkcelestiriyoruz
			+ Yeni Proje Yapilcak Adi Ise MüzikCetra
			+ Eglence 2 Dosyasi/Komutlar
			+ Müzik Komutlari c!oynat,c!durdur,c!sarkiadi,c!cik,c!gec,c!ses ve c!devamet
			Komutları görmek için \`${msg.guild.commandPrefix}yardım\`
			`)
			.setColor('RED');
			return msg.channel.send({embed});
		}

		var embed = new RichEmbed()
		.setTitle('Yenilikler')
		.setDescription(stripIndents`
		**Sürüm 0.1.0**
		+ Bjk,FB,GS Komutu Aktif-Kadroyu Gösterir
		+ Duelo
		+ Tic-Tac-Toe
		+ Slots
		+ Ekonomi (Bakimda Hatalari Düzeltiyoruz)
		+ Türkcelestiriyoruz
		+ Yeni Proje Yapilcak Adi Ise MüzikCetra
		+ Eglence 2 Dosyasi/Komutlar
		+ Müzik Komutlari c!oynat,c!durdur,c!sarkiadi,c!cik,c!gec,c!ses ve c!devamet
		`)
		.setColor('RED');

		return msg.channel.send({embed});
	}
};
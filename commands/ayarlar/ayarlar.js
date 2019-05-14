const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class channelinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			group: 'sunucu',
			memberName: 'ayarlar',
			description: 'Sunucudaki ayarları gösterir.',
			guildOnly: true,
		});
	}
	
	    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_MESSAGES');
    }
	
	async run(msg) {
        
        const modlog = msg.guild.channels.get(msg.guild.settings.get('modLog'))
		const anons = msg.guild.channels.get(msg.guild.settings.get('anonsKanal'))
		const reklam = msg.guild.channels.get(msg.guild.settings.get('reklam'))

        const embed = new RichEmbed()
        .setAuthor(msg.guild.name, msg.guild.iconURL)	
        .addField('Mod-Log Kanalı', modlog ? modlog : 'Ayarlanmamış.', true)
		.addField('Anons kanalı', anons ? anons : 'Ayarlanmamış.', true)
		.addField('Reklam Engelle', reklam ? reklam : `${this.client.emojis.get('469563074311880724')}` , true)
		return msg.embed(embed)

	}
}
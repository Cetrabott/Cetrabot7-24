const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationBanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			aliases: ['yasakla', 'sunucudan yasakla', 'banla', 'banhammer'],
			group: 'moderasyon',
			memberName: 'ban',
			description: 'İstediğiniz kişiyi sunucudan yasaklar.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi sunucudan yasaklamak istersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden bu kişiyi sunucudan yasaklamak istiyorsun?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("BAN_MEMBERS");
    }

	async run(message, args) {
		let guild = message.guild;
		const member = args.member;
		const user = member.user;
		const reason = args.sebep;
		const kasa = this.client.provider.get(message.guild.id, 'modKasa', []);
		const eskikasano = Number(kasa);
		const kasano = parseInt(eskikasano) + 1;
		this.client.provider.set(message.guild.id, 'modKasa', kasano);
		const vt = this.client.provider.get(message.guild.id, 'modLog', []);
		const db = this.client.provider.get(message.guild.id, 'modLogK', []);
		if (db ==! "evet") return message.channel.send(`${this.client.emojis.get('464406477851983883')} Lütfen \`mod-log-ayarla\` komutu ile mod-log kanalı belirleyiniz.`);
		let modlog = vt;
		if (!modlog) return message.channel.send(`${this.client.emojis.get('464406477851983883')} Mod-log olarak belirlediğiniz kanal silinmiş, lütfen yeni  bir mod-log kanalı açıp \`mod-log-ayarla\` komutu ile mod-log olarak ayarlayınız.`);

		if (!message.guild.member(user).bannable) return message.channel.send(`${this.client.emojis.get('464406477851983883')} Bu kişiyi sunucudan yasaklayamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
		if (user.id === message.author.id) return message.say(`${this.client.emojis.get('464406477851983883')} Kendini banlayamazsın.`)
		if (member.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.say(`${this.client.emojis.get('464406477851983883')} Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}
		member.send('**' + message.guild.name + '** sunucusunda `' + message.author.tag + '` adlı kişi/yetkili tarafından ___' + reason + '___ sebebi ile yasaklandın.')
		message.guild.ban(user, 2);

		const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField(`» Eylem:`, `Sunucudan yasaklama`)
		.addField(`» Kullanıcı:`, `${user.tag} (${user.id})`)
		.addField(`» Yetkili:`, `${message.author.tag} (${message.author.id})`)
		.addField(`» Sebep`, reason)
		.setThumbnail(user.avatarURL)
		.setTimestamp()
		.setFooter(`Stade Bot | Kasa: ${kasano}`, this.client.user.avatarURL)
		guild.channels.get(modlog).send({embed});
		return message.channel.send(`${this.client.emojis.get('464406478153973770')} <@${user.id}> adlı kullanıcı başarıyla sunucudan yasaklandı!`);
	}
};
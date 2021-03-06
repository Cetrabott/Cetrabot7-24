const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class PreEnableCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'premium-aktif',
            aliases: ['pre-a', 'pre-aktif'],
            group: 'admin',
            memberName: 'premium-aktif',
            description: 'Bir sunucu için premiumu aktifleştirmeyi sağlar.',
            throttling: {
                usages: 2,
                duration: 3
            },

            args: [
                {
                    key: 'guild',
                    label: 'sunucu',
                    prompt: 'Premiumu aktifleştirmek istediğiniz sunucu IDsi nedir?',
                    type: 'string'
                },
                {
					key: 'kullanici',
					label: 'kullanici',
					prompt: 'Kimin için Premium botu aktifleştiriyorsunuz?',
					type: 'user'
                },
                {
					key: 'tarih',
					label: 'tarih',
					prompt: 'Süresi ne zaman bitecek?',
					type: 'string'
                },
                {
					key: 'aciklama',
					label: 'aciklama',
					prompt: 'Eklemek istediğiniz bir not?',
					type: 'string'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    async run(msg, args) {
        const tarih = args.tarih;
        const kullanici = args.kullanici;
        const sunucu = args.guild;
        const aciklama = args.aciklama;
		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
		if (preEnabled == true) return msg.channel.send(' **Bu sunucu zaten premium bota sahip.**');
        this.client.provider.set(sunucu, 'preEnabled', true);

                var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setDescription(`**Aktifleştirme Detayları**`)
				.setThumbnail(this.client.user.avatarURL)
				.addField(`✭ Sunucu ID:`, `${sunucu}`)
				.addField(`✭ Sunucu Sahibi / Ekleten:`, `${kullanici.tag}`)
                .addField('✭ Alınacağı zaman:', `${tarih}`)
                .addField('✭ Not: ', `${aciklama}`)
				.setTimestamp();
        
        this.client.channels.get('476492773894258688').send({embed});

        return msg.channel.send(`Başarıyla ${sunucu} ID'li sunucuda ${kullanici} için "${tarih}" tarihinde alınmak üzere aktifleştirildi.`);
		
    }
};
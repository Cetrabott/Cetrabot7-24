const commando = require('discord.js-commando');

module.exports = class UtilAnnounceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'oylama',
            aliases: ['voting', 'oy', 'oylamayap', 'oyla', 'oylamaolustur', 'oylamaoluştur'],
            group: 'util',
            memberName: 'oylama',
            description: 'Sunucunuzda oylama yapmanızı sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 3
             },

            args: [
                {
                    key: 'dbaslik',
                    label: 'oylama başlığı',
                    prompt: 'Oylama başlığını yazar mısınız?',
                    type: 'string',
                    min: 1,
                    max: 50
                },
                {
                    key: 'dmesaj',
                    label: 'oylama mesajı',
                    prompt: 'Oylama mesajını yazar mısınız?',
                    type: 'string',
                    min: 1,
                    max: 1000
                },
				{
					key: 'kanal',
					prompt: 'oylama hangi kanala gönderilsin? (#kanalismi şeklinde yazınız)',
					type: 'channel',
				}
            ]
        });
    }

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

    async run(msg, args) {
        msg.guild.channels.get(args.kanal.id).send('@everyone').then(msg => msg.delete());
        let embed = {
            color: 3447003,
            title: `__**${args.dbaslik}**__`,
            description: `${args.dmesaj}`,
			timestamp: new Date(),
			footer: {
				text: `Cetrabot | Oylama`,
				icon_url: this.client.user.avatarURL
			},
            thumbnail: {
                url: msg.author.avatarURL || msg.client.user.avatarURL
  		    }
        };
        msg.guild.channels.get(args.kanal.id).send({embed}).then(msg => {
            msg.react("476501236837908480").then(() => msg.react("476501254592528404"));
        })
        msg.channel.send(' Oylama başarılı bir şekilde gönderildi.');
    };
};

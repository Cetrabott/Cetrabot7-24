const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BugCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'bug',
			aliases: ['bug bildir', 'bugbuldum', 'bugbildir'],
			group: 'util',
			memberName: 'bug',
			description: 'Bottaki bugu bildirmenizi sağlar.',
			examples: ['bug <bulduğunuz bug>'],
			guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 120
             },

            args: [
                {
                    key: 'msg',
                    prompt: 'Bulduğun bugu yazar mısın?',
                    type: 'string',
                    min: 1,
                    max: 1000
                }
            ]
		});
	}

	async run(msg, args) {
        let davet;
        if (msg.channel.permissionsFor(this.client.user).has("CREATE_INSTANT_INVITE")) {
            await msg.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0, unique: false}).then(i => { davet = i.url });
        } else davet = 'Yetki yok.';

        const embed =  new Discord.RichEmbed()
        .setColor(3447003)
        .setDescription('**_' + msg.author.tag + '_ adlı kullanıcının bildirdiği bug:**')
        .addField('❯ Bot bilgileri:', `✭ Versiyon:v0.0.8`)
        .addField('❯ Kullanıcı bilgileri;', `✭ ID: ${msg.author.id}\n✭ Adı: ${msg.author.username}\n✭ Tagı: ${msg.author.discriminator}`)
        .addField('❯ Bug;', `${args.msg}`)
        .setThumbnail(this.client.user.avatarURL);
        this.client.channels.get("467756898272149504").send(embed);         
        
        msg.reply('Bug bildirildi! Bug bildirdiğiniz için teşekkür ederiz!')
	}
};
const commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rastgele-üye',
            group: 'eglence2',
            memberName: 'rastgele-üye',
            description: 'Rastgele üye seçer.',

        });
    }

    run(message) {
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Rastgele Üye`, this.client.user.avatarURL)
        .setDescription(`**Şanslı Kişi:** <@${message.guild.members.random().id}>`) 
        message.channel.send(embed)
    }
}
const { Command } = require('discord.js-commando');

module.exports = class BlacklistCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blacklist',
            aliases: ['karaliste', 'kara-liste'],
            group: 'admin',
            memberName: 'blacklist',
            description: 'Birini kara-listeye almak için kullanılır.',
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run(msg) {
        return msg.reply(`${this.client.user.tag} evet adminsin!`);
    }
}
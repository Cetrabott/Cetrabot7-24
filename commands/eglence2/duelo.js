const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../../util/Util');

module.exports = class BattleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'duelo',
			aliases: ['fight', 'death-battle','battle','duelo-oyna'],
			group: 'eglence2',
			memberName: 'duelo',
			description: 'Başka bir kullanıcıya veya AI ya karşı sıra tabanlı bir savaşta bulunun.',
			args: [
				{
					key: 'opponent',
					prompt: 'Hangi kullanıcılarla savaşmak istersiniz?',
					type: 'user',
					default: () => this.client.user
				}
			]
		});

		this.fighting = new Set();
	}

	async run(msg, { opponent }) { // eslint-disable-line complexity
		if (opponent.id === msg.author.id) return msg.reply('Kendinle dövüşemezsin.');
		if (this.fighting.has(msg.channel.id)) return msg.reply('Kanal başına sadece bir dövüş meydana gelebilir.');
		this.fighting.add(msg.channel.id);
		try {
			if (!opponent.bot) {
				await msg.say(`${opponent}, Bu meydan okumayı kabul ediyor musunuz?`);
				const verification = await verify(msg.channel, opponent);
				if (!verification) {
					this.fighting.delete(msg.channel.id);
					return msg.say('Reddettikleri gibi görünüyor ...');
				}
			}
			let userHP = 500;
			let oppoHP = 500;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			};
			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			};
			while (userHP > 0 && oppoHP > 0) { // eslint-disable-line no-unmodified-loop-condition
				const user = userTurn ? msg.author : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
					await msg.say(stripIndents`
						${user}, do you **fight**, **guard**, **special**, or **run**?
						**${msg.author.username}**: ${userHP}HP
						**${opponent.username}**: ${oppoHP}HP
					`);
					const filter = res =>
						res.author.id === user.id && ['fight', 'guard', 'special', 'run'].includes(res.content.toLowerCase());
					const turn = await msg.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						await msg.say('Üzgünüm, zaman doldu!');
						reset();
						continue;
					}
					choice = turn.first().content.toLowerCase();
				} else {
					const choices = ['fight', 'guard', 'special'];
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'fight') {
					const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
					await msg.say(`${user} firsatlar **${damage}** hasar!`);
					dealDamage(damage);
					reset();
				} else if (choice === 'guard') {
					await msg.say(`${user} Gardiyanlar!`);
					guard = true;
					reset(false);
				} else if (choice === 'special') {
					const miss = Math.floor(Math.random() * 4);
					if (!miss) {
						const damage = randomRange(100, guard ? 150 : 300);
						await msg.say(`${user} fırsatlar **${damage}** hasar!`);
						dealDamage(damage);
					} else {
						await msg.say(`${user}'atak cevapsız!`);
					}
					reset();
				} else if (choice === 'run') {
					await msg.say(`${user} kaçar!`);
					forfeit();
					break;
				} else {
					await msg.say('Ne yapmak istediğini anlamadım.');
				}
			}
			this.fighting.delete(msg.channel.id);
			const winner = userHP > oppoHP ? msg.author : opponent;
			return msg.say(`Maç bitti! tebrikler, ${winner}!`);
		} catch (err) {
			this.fighting.delete(msg.channel.id);
			throw err;
		}
	}
};
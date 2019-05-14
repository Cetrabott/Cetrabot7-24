const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const { verify } = require('../../util/Util');

module.exports = class TicTacToeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tic-tac-toe',
			aliases: ['xox'],
			group: 'eglence2',
			memberName: 'tic-tac-toe',
			description: 'Başka bir kullanıcı ile tic-tac-toe oyunu oyna.',
			guildOnly: true,
			args: [
				{
					key: 'opponent',
					prompt: 'Hangi kullanıcıya meydan okumak istersiniz?',
					type: 'user'
				}
			]
		});

		this.playing = new Set();
	}

	async run(msg, { opponent }) { // eslint-disable-line complexity
		if (opponent.bot) return msg.reply('Botlar karşı oynatılamayabilir.');
		if (opponent.id === msg.author.id) return msg.reply('Kendinize karşı oynayamayabilirsiniz.');
		if (this.playing.has(msg.channel.id)) return msg.reply('Kanal başına sadece bir oyun meydana gelebilir.');
		this.playing.add(msg.channel.id);
		try {
			await msg.say(`${opponent}, Bu meydan okumayı kabul ediyor musunuz?`);
			const verification = await verify(msg.channel, opponent);
			if (!verification) {
				this.playing.delete(msg.channel.id);
				return msg.say('Reddettikleri gibi görünüyor ...');
			}
			const sides = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
			const taken = [];
			let userTurn = true;
			let winner = null;
			while (!winner && taken.length < 9) {
				const user = userTurn ? msg.author : opponent;
				const sign = userTurn ? 'X' : 'O';
				await msg.say(stripIndents`
					${user}, hangi tarafı seçiyorsun
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\`
				`);
				const filter = res => {
					const choice = res.content;
					return res.author.id === user.id && sides.includes(choice) && !taken.includes(choice);
				};
				const turn = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!turn.size) {
					await msg.say('Üzgünüm, zaman doldu!');
					userTurn = !userTurn;
					continue;
				}
				const choice = turn.first().content;
				sides[Number.parseInt(choice, 10)] = sign;
				taken.push(choice);
				if (
					(sides[0] === sides[1] && sides[0] === sides[2])
					|| (sides[0] === sides[3] && sides[0] === sides[6])
					|| (sides[3] === sides[4] && sides[3] === sides[5])
					|| (sides[1] === sides[4] && sides[1] === sides[7])
					|| (sides[6] === sides[7] && sides[6] === sides[8])
					|| (sides[2] === sides[5] && sides[2] === sides[8])
					|| (sides[0] === sides[4] && sides[0] === sides[8])
					|| (sides[2] === sides[4] && sides[2] === sides[6])
				) winner = userTurn ? msg.author : opponent;
				userTurn = !userTurn;
			}
			this.playing.delete(msg.channel.id);
			return msg.say(winner ? `Tebrikler, ${winner}! `: 'Oh ... Kedi kazandı.');
		} catch (err) {
			this.playing.delete(msg.channel.id);
			throw err;
		}
	}
};
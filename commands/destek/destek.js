const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const fs = require('fs');

module.exports = class SupportCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'destek',
			group: 'destek',
			memberName: 'destek',
			description: 'Destek bildirimi açmanızı sağlar.',
			examples: ['destek test'],
			guildOnly: true,
			guarded: true,

		args: [
                {
                    key: 'destek',
                    prompt: 'Lütfen destek bildiriminizi yazın?',
                    type: 'string',
                }
            ]
        });
    }

	async run(msg, args) {
        let isEnabled = false
        let chan = msg.channel
        const client = this.client
        const p = msg.author.id

        const o = client.guilds.find("id", `482575162475282443`).channels.find("id", `577573860971642880`)

        const collector = this.client.guilds.find("id", `482575162475282443`).channels.find("id", `577573860971642880`).createCollector(message => 
            message.content.startsWith('Destegi'), {
                time: 0
        })

        this.client.guilds.find("id", `482575162475282443`).channels.find("id", `577573860971642880`).send(`\`Destegi Yanitla\` yazarak çağrıyı yanıtlayabilir, \`kapat\` yazarak çağrıyı reddedebilirsiniz! @everyone`)
        collector.on('message', (message) => {
            if (message.content === 'kapat') collector.stop('aborted')
            if (message.content === 'Destegi Yanitla') collector.stop('success')
        })
        collector.on('end', (collected, reason) => {
            if (reason === 'aborted') {
                msg.reply(':x: Çağrı reddedildi!')
                o.send(':x: Çağrı başarıyla reddedildi!')
            }
            if (reason === 'success') {
                o.send(':white_check_mark:  Çağrı başarıyla alındı!')
                o.send(':exclamation: Lütfen karşı taraf mesaj yazana kadar siz mesaj yazmayın!')
                o.send(':exclamation: Lütfen karşı tarafı rahatsız edecek mesaj yazmayın!')
                o.send(':exclamation: Lütfen karşı tarafla kişisel meselelerinizi konuşmayın!')
                o.send('\`kapat\` yazarak çağrıyı kapatabilirsin.')
                chan.send(`${msg.author}`)
                chan.send(':white_check_mark:  Çağrın destek ekibimiz tarafından alındı!')
                chan.send('\`kapat\` yazarak çağrıyı kapatabilirsin!')
                setTimeout(() => {
                    chan.send(':star: Cetrabot destek sistemine hoşgeldiniz! Size nasıl yardımcı olabiliriz?');
                }, 1000)
                isEnabled = true
                client.on('message', message => {
                    function contact() {
                        if (message.author.id === client.user.id) return
                        if (message.author.bot) return
                        if (isEnabled === false) return
                        if (message.content.startsWith('Destegi Yanitla')) {
                            if (message.channel.id === chan.id) o.send(':x: Çağrı karşı taraf tarafından reddedildi.')
                            if (message.channel.id === "577573860971642880") chan.send(':x: Çağrı karşı taraf tarafından reddedildi.')
                            return isEnabled = false
                        }
                        if (message.channel.id === chan.id) {
                            if(message.author.id === p) {
                                o.send(`:telephone_receiver: **${message.author.tag}**: ${message.content}`)
                            } else {
                                return;
                            }
                        }

                        if (message.channel.id === "577573860971642880") {
                            chan.send(`:star: **${message.author.tag}**: ${message.content}`) // Destek
                        }
                    }
                    contact(client)
                })
            }
        })
	}
}
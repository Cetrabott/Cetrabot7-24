const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const Discord = require('discord.js');
path = require('path'),
moment = require('moment'),
sqlite = require('sqlite');

ayarlar = require('./data/ayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.PREFIX,
    unknownCommandResponse: false,
    owner: ayarlar.SAHIP,
    disableEveryone: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
	['sunucu', 'Sunucu Komutları'],
	['bot', 'Bot Komutları'],
	['ayarlar', 'Ayarlar'],
    ['admin', 'Admin'],
    ['util','Util'],
    ['eglence','Eglence Komutlari'],
    ['eglence2','Eglence Komutlari 2'],
    ['destek-talebi','Destek Talebi Acmak Icin'],
    ['destek','Canlidestek'],
    ['moderasyon','Moderasyon Komutlari'],
    ['bilgi','Bilgi']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

    sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
      client.setProvider(new SQLiteProvider(db));
    });

	client.on("ready", () => {
		var oyun = [
			"c!y ◻️ c!tavsiye ◻️ c!profil ◻️ c!bug",
			"Yapimcim : ByKerim_YT#9961",
			"Gelismis Destek Sistemi!"
		];
	
		setInterval(function() {
	
			var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
	
			client.user.setActivity(oyun[random], {type: "STREAMING", url: "https://www.twitch.tv/bykerimk"})
			}, 2 * 2500); 
	})

		client.on('message', async msg => {
			if (msg.content.toLowerCase() === 'sa') {
			  await msg.react('🇦');
			  msg.react('🇸');
			}
			});

		  client.on("messageEvent", msg => {
			const kufur = ["amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "meme"];
			if (kufur.some(word => msg.content.includes(word)) ) {
				msg.delete()
				msg.reply("Burasi Cetrabot Küfür Engelleme Sistemiyle Korunmakta! Küfür Etme!")
			}
		});

		client.on("message", message => {
			if (message.author.bot) return;
		   if (message.content.toLowerCase() === prefix + 'türkkahvesi')
			  if (message.author.type !== "group") {
					   message.channel.send('Bağlanılıyor....').then(msg => {
					  msg.react("☕").then((msgreaction) => msgreaction.message.edit(kahve))
				  });
					  message.delete()
				const kahve = new Discord.RichEmbed()
				.setImage("https://goo.gl/36DtWR")
				.setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
			};
		  });

		  client.on("messageEvent", msg => {

			const kufur = ["discordapp", ".com", ".net", ".xyz", ".tk", "gulu", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl"];
			if (kufur.some(word => msg.content.includes(word)) ) {
				msg.delete()
				msg.reply("Reklam Koruma 100% ")
			}
		});

      client.on('ready', () => {
        console.log(`Bot => ${client.user.tag} adiyla giris yapti!`);
	  });
	  
 client.on('guildMemberAdd', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye katıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3066993)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	})

	.on('guildMemberRemove', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye ayrıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
  })


	.on('guildBanAdd', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye yasaklandı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});

		}
	})

	.on('guildBanRemove', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üyenin yasaklaması kaldırıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3447003)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});
		}
	})

	.on('messageDelete', async msg => {
		if (!msg.guild) return;
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
			if (msg.author.bot) return;
			var embed = new Discord.RichEmbed()
			.setAuthor(msg.author.tag, msg.author.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen "${msg.content}" mesajı silindi.`)
			.setFooter(`ID: ${msg.id}`)
			msg.guild.channels.get(logCh).send({embed});
		}
	})

	.on('channelCreate', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})

	.on('channelDelete', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})

	.on('messageUpdate', async (oldMsg, newMsg) => {
		if (!oldMsg.guild) return;
		if (oldMsg.author.bot) return;
		const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
		if (oldMsg.guild.channels.get(logCh).type === "text") {
			const embed = new Discord.RichEmbed()
			.setColor(3066993)
			.setAuthor(oldMsg.author.tag, oldMsg.author.avatarURL)
			.setDescription(`${oldMsg.author} adlı kullanıcı <#${oldMsg.channel.id}> kanalına gönderdiği "${oldMsg.content}" mesajını "${newMsg.content}" olarak düzenledi.`)
			.setFooter(`ID: ${oldMsg.id}`);
			oldMsg.guild.channels.get(logCh).send({embed});
		};
  });

  client.dispatcher.addInhibitor(msg => {
    const blacklist = client.provider.get('global', 'userBlacklist', []);
    if (!blacklist.includes(msg.author.id)) return false;
    msg.react('😡');
    return true;
  });

      client.on ('message', message => {
        if (message.content === ayarlar.PREFIX + "emojiler") {
          const emojiList = message.guild.emojis.map(e=>e.toString()).join(" **|** ");
          message.channel.send(emojiList);
        }
        })

        client.on('messageEvent', msg => {
          if (msg.content.toLowerCase() === ayarlar.PREFIX + "sigara") {
          msg.channel.send(':smoking: :cloud::cloud::cloud:')
          .then(nmsg => nmsg.edit(':smoking: :cloud::cloud::cloud:'))
          .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
          .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
          .then(nmsg => nmsg.edit(':smoking: :cloud:'))
          .then(nmsg => nmsg.edit(':smoking: :cloud:'))
          .then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
          }
			});

		  const ytdl = require("ytdl-core");
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./data/ayarlar');
const YouTube = require('simple-youtube-api');


const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Müzik kodları Aktif! iyi dinlemeler moruk'));

client.on('disconnect', () => console.log('bağlantı kesildi. tekrar bağlanmaya çalışıyorum.'));

client.on('reconnecting', () => console.log('Tekrar bağlanıyorum..'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'oynat') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şuanda olduğunuz kanala girmek için gerekli izinlere sahip değilim.'));
		}
		if (!permissions.has('SPEAK')) {
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('🚫 | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // ehehehehu videomuzu bulalım
				await handleVideo(video2, msg, voiceChannel, true); // ve gönderelim
			}
      return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setDescription(`✔ | Playlist ➢ **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`
__**Şarkı seçimi:**__ \n
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
 \n **lütfen 1-10 arasında bir rakam seciniz 30 saniye içinde liste iptal edilecektir.**
`)
          .setColor('RANDOM'));
					// en fazla 5 tane
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setDescription('❎ | Şarkı seçimi iptal edildi. '));
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
          return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(' ❎ | Herhangi bir arama sonucu elde edemedim.'));
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'gec') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
		if (!serverQueue) return msg.channel.send(' ❎ | Kuyruk boş olduğu için geçemiyorum. ');
		serverQueue.connection.dispatcher.end('Geç komudu kullanıldı.');
		return undefined;
	} else if (command === 'qweqweqwedosgjsdflkh242309857238957y239856239856012356') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Kapat komutu kullanıldı!');
		return undefined;
	} else if (command === 'ses') {
    if (!message.guild) {
      if (!msg.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
        .setDescription(`You can not use commands here.`)
        return msg.author.sendEmbed(ozelmesajuyari); }
    if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
  .setDescription(' ❎ | Lütfen öncelikle sesli bir kanala katılınız.'));
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
   .setDescription(' ❎ | Şu anda herhangi bir şarkı çalmıyorum.'));
    if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(` <:hope:412142425838977024> | Ses seviyesi: **${serverQueue.volume}**`));
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    (` <:hope:412142425838977024> | Yeni ses seviyesi: **${args[1]}**`));
      }
	} else if (command === 'sarkiadi') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`<:uyari:405162608631480320> | Şu anda hiçbir şey çalmıyorum.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
    if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('There is nothing playing.'));
    return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`🎶 Şu anda çalınan şarkı: **${serverQueue.songs[0].title}**`));
	} else if (command === 'kuyruk') {
		if (!serverQueue) return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum. ');
		return msg.channel.send(`
__**Şarkı listesi:**__ \n
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
\n **Şu anda çalınan:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'durdur') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription('⏸ | Müzik durduruldu.')
      .setColor('RANDOM'));
		}
		return msg.channel.send('🚫 | Şu anda hiçbir şey çalmıyorum.');
	} else if (command === 'devamet') {
    if (!msg.guild) {
      const ozelmesajuyari = new Discord.RichEmbed()
      .setDescription(`You can not use commands here.`)
      return msg.author.sendEmbed(ozelmesajuyari); }
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('▶ | Müzik şu anda devam ediyor..'));
		}
		return msg.channel.send('❎ | Şu anda hiçbir şey çalmıyorum.');
  }

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
    else return msg.channel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`✔ | **${song.title}** adlı şarkı başarıyla kuyruğa eklendi.`)
  .setColor('RANDOM'));
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()
  .setDescription(`🎶 Çalınan şarkı: **${song.title}**`)
  .setColor('RANDOM'));
}


client.on('message', (message) => {
    if (message.content.toLowerCase() === PREFIX + 'gir') {
        if (!message.guild) {
            const ozelmesajuyari = new Discord.RichEmbed()
            .setDescription(`You can not use commands here.`)
            return message.author.sendEmbed(ozelmesajuyari); }
        try
    {
    message.member.voiceChannel.join();
     return message.channel.sendEmbed(new Discord.RichEmbed()
     .setDescription(' Başarılı ➢**' + message.member.voiceChannel+ '** adlı kanala giriş yaptım. ')
     .setColor('RANDOM'));
    }
    catch(e)
    {
    return message.channel.sendEmbed(new Discord.RichEmbed()
    .setDescription('❎ | Lütfen öncelikle sesli bir kanala katılınız.')
    .setColor('RANDOM'));
    }
    }

    if (message.content.toLocaleLowerCase() === PREFIX + 'dur') {
        if (!message.guild) {
            const ozelmesajuyari = new Discord.RichEmbed()
            .setDescription(`You can not use commands here.`)
            return message.author.sendEmbed(ozelmesajuyari); }
            try
            {
                message.member.voiceChannel.leave();
                return message.channel.sendEmbed(new Discord.RichEmbed()
                .setDescription(' Başarılı ➢**' + message.member.voiceChannel+ '** adlı kanaldan çıkış yaptım.')
                .setColor('RANDOM'));
               }
               catch(e)
               {
               return message.channel.sendEmbed(new Discord.RichEmbed()
               .setDescription('<:uyari:405162608631480320> | Lütfen öncelikle sesli bir kanala katılınız.')
               .setColor('RANDOM'));
               }
              }
          if (message.content.toLowerCase() === PREFIX + 'kanal bilgi' ) {
            if (!message.guild) {
              const ozelmesajuyari = new Discord.RichEmbed()
              .setDescription(`You can not use commands here.`)
              return message.author.sendEmbed(ozelmesajuyari); }
            try
            {
           message.channel.sendEmbed(new Discord.RichEmbed().addField(' __Sesli kanal bilgileri__', ` **•** kanal ismi: **${message.member.voiceChannel.name}** \n **•** MAX kullanıcı sayısı: **${message.member.voiceChannel.userLimit}** \n **•** Bit hızı: **${message.member.voiceChannel.bitrate}** \n **•** kanal ID: **${message.member.voiceChannelID} ** \n **•** Kanal pozisyonu **${message.member.voiceChannel.position}**`).setColor('RANDOM'));
              }
              catch(e)
              {
                message.channel.sendEmbed(new Discord.RichEmbed()
                .setDescription('❎ | Lütfen öncelikle sesli bir kanala katılınız.')
                .setColor('RANDOM'));
              };
            }
        });

		  client.on('guildCreate', guild => {
			const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setTitle('Sunucuya katıldı;')
			.setDescription(`Bot, 》${guild.name}《 adlı sunucuya katıldı [${guild.memberCount} üye]!`)
			.setFooter('Cetrabot', client.user.avatarURL)
			.setTimestamp()
			client.channels.get('473174789935333387').send(embed);
		  });

		  client.on('guildDelete', guild => {
			const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setTitle('Sunucudan ayrıldı;')
			.setDescription(`Bot, 》${guild.name}《 adlı sunucudan ayrıldı [${guild.memberCount} üye]!`)
			.setFooter('Cetrabot', client.user.avatarURL)
			.setTimestamp()
			client.channels.get('473174789935333387').send(embed);
			});

			client.on('guildMemberAdd', member => {
				member.addRole(member.guild.roles.find(r => r.name.startsWith('Üye')));
				const channel = member.guild.channels.find('name', 'giden-gelen');
				if (!channel) return;
			 const embed = new Discord.RichEmbed()
			 .setColor('RANDOM')
			 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
			 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
			 .setTitle('Üye katıldı;')
			 .setDescription(`Sunucuya katıldı [${member.guild.memberCount} üye]!`)
			 .setFooter('Cetrabot', client.user.avatarURL)
			 .setTimestamp()
			 channel.send(embed);
			});

			client.on('guildMemberRemove', member => {
				const channel = member.guild.channels.find('name', 'giden-gelen');
				if (!channel) return;
			 const embed = new Discord.RichEmbed()
			 .setColor('RANDOM')
			 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
			 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
			 .setTitle('Üye ayrıldı;')
			 .setDescription(`Sunucudan ayrıldı [${member.guild.memberCount} üye]!`)
			 .setFooter('Cetrabot', client.user.avatarURL)
			 .setTimestamp()
			 channel.send(embed);
			});

			client.on('message', msg => {
				const reason = msg.content.split(" ").slice(1).join(" ");
				if (msg.channel.name== 'destek') { 
					if (!msg.guild.roles.exists("name", "Destek Ekibi"));
					if(msg.guild.channels.find('name', 'Talepler')) {
						msg.guild.createChannel(`talep-${msg.author.id}`, "text").then(c => {
						const category = msg.guild.channels.find('name', 'Talepler')
						c.setParent(category.id)
						let role = msg.guild.roles.find("name", "Destek Ekibi");
						let role2 = msg.guild.roles.find("name", "@everyone");
						c.overwritePermissions(role, {
								SEND_MESSAGES: true,
								READ_MESSAGES: true
						});
						c.overwritePermissions(role2, {
								SEND_MESSAGES: false,
								READ_MESSAGES: false
						});
						c.overwritePermissions(msg.author, {
								SEND_MESSAGES: true,
								READ_MESSAGES: true
						});
			
						const embed = new Discord.RichEmbed()
						.setColor("RANDOM")
						.setAuthor(`Cetrabot | Destek Sistemi`)
						.addField(`Merhaba ${msg.author.username}!`, `Yetkililer burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`c!kapat\` yazabilirsin.`)
						.addField(`» Talep Konusu/Sebebi:`, `${msg.content}`, true)
						.addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
						.setFooter(`Cetrabot | Destek Sistemi`)
						.setTimestamp()
						c.send({ embed: embed });
						c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, @here`)
						msg.delete()
						}).catch(console.error);
					}
				}
			
				if (msg.channel.name== 'destek') { 
					if (!msg.guild.roles.exists("name", "Destek Ekibi"));
					if(!msg.guild.channels.find('name', 'Talepler')) {
						msg.guild.createChannel(`Talepler`, 'category').then(category => {
						msg.guild.createChannel(`talep-${msg.author.id}`, "text").then(c => {
						c.setParent(category.id)
						let role = msg.guild.roles.find("name", "Destek Ekibi");
						let role2 = msg.guild.roles.find("name", "@everyone");
						c.overwritePermissions(role, {
								SEND_MESSAGES: true,
								READ_MESSAGES: true
						});
						c.overwritePermissions(role2, {
								SEND_MESSAGES: false,
								READ_MESSAGES: false
						});
						c.overwritePermissions(msg.author, {
								SEND_MESSAGES: true,
								READ_MESSAGES: true
						});
			
						const embed = new Discord.RichEmbed()
						.setColor("RANDOM")
						.setAuthor(`Cetrabot| Destek Sistemi`)
						.addField(`Merhaba ${msg.author.username}!`, `Yetkililer burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`c!kapat\` yazabilirsin.`)
						.addField(`» Talep Konusu/Sebebi:`, `${msg.content}`, true)
						.addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
						.setFooter(`Cetrabot | Destek Sistemi`)
						.setTimestamp();
						c.send({ embed: embed });
						c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, @here`)
						msg.delete()
						}).catch(console.error);
					})
				}
			}
			})
			
			client.on('message', message => {
			if (message.content.toLowerCase().startsWith(PREFIX + `kapat`)) {
				if (!message.channel.name.startsWith(`talep-`)) return message.channel.send(`Bu komut sadece destek talebi kanallarında kullanılabilir.`);
			
				const embed = new Discord.RichEmbed()
				.setColor("RANDOM")
				.setAuthor(`Destek Talebi Kapatma İşlemi`)
				.setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
				.setFooter(`Cetrabot | Destek Sistemi`)
				.setTimestamp()
				message.channel.send({embed})
				.then((m) => {
					message.channel.awaitMessages(response => response.content === 'evet', {
						max: 1,
						time: 10000,
						errors: ['time'],
					})
					.then((collected) => {
							message.channel.delete();
						})
						.catch(() => {
							m.edit('Destek talebi kapatma isteği zaman aşımına uğradı.').then(m2 => {
									m2.delete();
							}, 3000);
						});
				});
				}
			})

			const fs = require("fs");
const snekfetch = require('snekfetch');
let points = JSON.parse(fs.readFileSync('./xp.json', 'utf8'));
let prefix = "c!";

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", async message => {
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
message.channel.send(`:up: **| ${user.username} level atladı!**`)
    }

fs.writeFile('./xp.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })

  if (message.content.toLowerCase() === prefix + 'profil' || message.content.toLowerCase() === prefix + 'profile') {
const level = new Discord.RichEmbed().setTitle(`${user.username}`).setDescription(`**Seviye:** ${userData.level}\n**GP:** ${userData.points}`).setColor("#ffff00").setFooter(``).setThumbnail(user.avatarURL)
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının profil kartı**`)
message.channel.send(level)
  }
});

client.on('error', err => {
	console.log(err)
});

client.login(ayarlar.TOKEN);

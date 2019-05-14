const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class FishyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'altın',
            group: 'eglence2',
            aliases: ['altin','altn'],
			memberName: 'altın',
			description: 'Altının döviz bilgisini gösterir.'
		});
	}

	run(message) {
        var request = require('request');
request('https://www.doviz.com/api/v1/golds/gram-altin/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var gram = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/ceyrek-altin/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) {
        var ceyrek = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/yarim-altin/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var yarim = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/tam-altin/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var tam = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/cumhuriyet-altini/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var cha = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/ata-altin/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var a = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/14-ayar-altin/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {        
        var od = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/18-ayar-altin/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {        
        var os = JSON.parse(body);
request('https://www.doviz.com/api/v1/golds/22-ayar-bilezik/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {        
        var yi = JSON.parse(body);                   
        const embed = new RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Altın Bilgisi`)
        .addField(`Gram Altın`, `**Satış:** ${gram.selling} TL \n**Alış:** ${gram.buying} TL`, true)
        .addField(`Çeyrek Altın`, `**Satış:** ${ceyrek.selling} TL \n**Alış:** ${ceyrek.buying} TL`, true)
        .addField(`Yarım Altın`, `**Satış:** ${yarim.selling} TL \n**Alış:** ${yarim.buying} TL`, true)
        .addField(`Tam Altın`, `**Satış:** ${tam.selling} TL \n**Alış:** ${tam.buying} TL`, true)
        .addField(`Cumhuriyet Altını`, `**Satış:** ${cha.selling} TL \n**Alış:** ${cha.buying} TL`, true)
        .addField(`Ata Altın`, `**Satış:** ${a.selling} TL \n**Alış:** ${a.buying} TL`, true)
        .addField(`14 Ayar Altın`, `**Satış:** ${od.selling} TL \n**Alış:** ${od.buying} TL`, true)
        .addField(`18 Ayar Altın`, `**Satış:** ${os.selling} TL \n**Alış:** ${os.buying} TL`, true)
        .addField(`22 Ayar Bilezik`, `**Satış:** ${yi.selling} TL \n**Alış:** ${yi.buying} TL`, true)
		.setThumbnail(`https://cdn.discordapp.com/attachments/473910139313848320/477445607968210944/Bitcoin.png`)
      message.channel.send(embed)    
    }
})
   }
})
    }
})
    }
})
    }
})
    }
})
    }
})
    }
})
    }
})
    }
}
const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class FishyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'döviz',
			group: 'eglence2',
			memberName: 'döviz',
			description: 'Döviz bilgisini gösterir.'
		});
	}

	run(message) {
        var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) {
        var euro = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/GBP/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var eng = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/RUB/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var rub = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/CHF/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var chf = JSON.parse(body);         
        const embed = new RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Döviz Bilgisi`)
        .addField(`Dolar`, `**Satış:** ${info.selling} TL \n**Alış:** ${info.buying} TL`, true)
        .addField(`Euro`, `**Satış:** ${euro.selling} TL \n**Alış:** ${euro.buying} TL`, true)
        .addField(`İngiliz Sterlini`, `**Satış:** ${eng.selling} TL \n**Alış:** ${eng.buying} TL`, true)
        .addField(`Rus Rublesi`, `**Satış:** ${rub.selling} TL \n**Alış:** ${rub.buying} TL`, true)
        .addField(`İsviçre Frangı`, `**Satış:** ${chf.selling} TL \n**Alış:** ${chf.buying} TL`, true)
        .setThumbnail(`https://images-ext-1.discordapp.net/external/yGVbLdU_DJGGw1Smt1QyFUQUypqDxiLDWi7IC_odAcI/https/canlidoviz.co/img/logo_r.png?width=100&height=100`)
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
}
const Discord = require('discord.js');
const gTTS = require('gtts');
const utf8 = require('utf8');
const fs = require('fs');

//const exec = require("child_process").exec
const { exec } = require('child_process');

const bot = new Discord.Client();
const prefix = '';
let tatetts = false;
//const tate = bot.users.fetch(191634797897056265)

bot.on('ready', () => {
	console.log('Logged in as '+bot.user.tag);
	bot.user.setActivity('with myself', { type: 'PLAYING' });
});

bot.on('message', async msg => {
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (msg.content === 'ping') {
		msg.reply('fuck you');
	}

	else if (command === 'tts') {
		let tts = args.join(' ');
		console.log(tts);
		var gtts = new gTTS(tts, 'en');
		gtts.save('cool.mp3');

		const connection = await msg.member.voice.channel.join();
		msg.reply('fuck you');
		const dispatcher = connection.play('cool.mp3');
		dispatcher.on('finish', async () => {
			await msg.member.voice.channel.leave();
		});
	}

	else if (command === 'b') {
		const True = 'True';
		if (True) {
			if (msg.member.voice.channel) {
				awstts(args,msg.member.voice.channel,msg.author.id);
			}
		}
		else {
			console.log('Already in voice channel');
		}
	}

	else if (command === 'stop') {
		console.log('Stopping voice connection and dispatcher..');
		await msg.member.voice.channel.leave();
	}

	else if (command === '.hmm') {
		let thing = args.join(' ');
		var num = Math.floor(Math.random() * 100) + 0;
		await msg.reply('I give '+thing+' **'+num+'%** <:smile:503737897812230144>');
	}

	if (msg.author.id === '601968691998883861' && tatetts === true) {
		awstts(msg.content,msg.member.voice.channel,msg.author.id);
	}

	if (command === '.on') {
		tatetts = true;
		console.log('Tate auto-TTS enabled..')
	}

	else if (command === '.off') {
		tatetts = false;
		console.log('Tate auto-TTS disabled..')
	}
});

async function awstts(args,channel,author) {
	let tts = args.join(' ');
	var apos = tts.replace(/\u2019/g, "'");
	var utftts = utf8.encode('<speak>'+apos+'</speak>');

	//var uutftts = utftts.replace(/\u2019/g, "'");
	/*fs.writeFile('tts.txt', utftts, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log('TTS file saved');
	});*/
	console.log('Joining voice chanel..');
	//console.log(msg.author.id);
	const connection = await channel.join();
	//const child = exec('node_modules/tts-cli/tts.js tts.txt brian.mp3 --type ssml --voice Brian');
	let child

	if (author === '260065470974001153') {
		child = exec('echo "'+utftts+'" | node_modules/tts-cli/tts.js brian.mp3 --type ssml --voice Justin --engine neural');
	}

	else if (author === '601968691998883861') {
		child = exec('echo "'+utftts+'" | node_modules/tts-cli/tts.js brian.mp3 --type ssml --voice Ivy');
	}

	else if (author === '277735371289264128') {
		child = exec('echo "'+utftts+'" | node_modules/tts-cli/tts.js brian.mp3 --type ssml --voice Geraint');
	}

	else if (author === '218286293170388992') {
		child = exec('echo "'+utftts+'" | node_modules/tts-cli/tts.js brian.mp3 --type ssml --voice Russell');
	}

	else if (author === '201762678585294849') {
		child = exec('echo "'+utftts+'" | node_modules/tts-cli/tts.js brian.mp3 --type ssml --voice Ruben');
	}

	else if (author === '134694626832547840') {
		child = exec('echo "'+utftts+'" | node_modules/tts-cli/tts.js brian.mp3 --type ssml --voice Maxim');
	}

	else {
		child = exec('echo "'+utftts+'" | node_modules/tts-cli/tts.js brian.mp3 --type ssml --voice Brian');
	}

	child.on('exit', async function() {
		const dispatcher = connection.play('brian.mp3');

		/*dispatcher.on('finish', async () => {
			console.log('Leaving voice channel..');
			await msg.member.voice.channel.leave();
		});*/
	});
}


bot.login('NDMwMTczOTE1NjgwMzQyMDE2.XqYD8A.tFmE-G8SkwxKStZcJwSiMEgGRXs')

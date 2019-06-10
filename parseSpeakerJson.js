var _ = require('lodash');
var md5 = require('js-md5');

var speakerData = require('./currentSpeakerInfo.json');

var groupedData = _.groupBy(speakerData, 'email');

var speakerDataBySpeaker = [];

_.forIn(groupedData, (talkArray, email) => {
	var holder = {};
	holder.talks = [];

	_.forEach(talkArray, (talk) => {
		if (talk.accepted === 'yes' || talk.accepted === 'yes *') {
		holder.email = talk.email;
		holder.name = talk.name || 'NoName';
		holder.twitter = talk.twitter || '';
		holder.github = talk.github || '';
		holder.youtube = talk.youtube || '';
		holder.talks.push( 
		{
			"talkTitle": talk.talktitle,
			"talkAbstract": talk.talkabstract
		});
		holder.accepted = talk.accepted || '';
		holder.communication = talk.communication ||'';
		holder.bio = holder.bio ? holder.bio : talk.bio || '';
		var emailHash = md5(holder.email.toString().trim().toLowerCase());
		holder.photo = 'https://www.gravatar.com/avatar/' + emailHash;
	}
	});
	if (holder.email === email) {
		speakerDataBySpeaker.push(holder);	
	}
});

console.log('****************************RESULT***********************************************\n');
console.log(JSON.stringify(speakerDataBySpeaker, null , 2));
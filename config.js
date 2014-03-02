module.exports = {
	url: "http://localhost:",
	port: process.env.PORT || 4444,
	movieDb: {
		key: "9bc8fa1df47f3dde957bbd7f9dd5b48a"
	},
	vlc: {
		url: "http://:rival5sof@runwatcher.com:",
		port: "5050"
	},
	nas: {
		url: "https://runwatcher.com/manage/shares/Movies/"
	},
	users: {
		"andrew.petersen15@gmail.com": "full",
		"curtissp@gmail.com": "full"
	},
	googleOAuth: {
		prod : {
			clientID: "127431502665-2ntfl1lgp5bkc9tboc234gal3tivsdkn.apps.googleusercontent.com",
			clientSecret: "IxY76YmkWkpiJysCjN_6MO4U",
			callbackHost: "http://cineprowl.com"
		},
		dev : {
			clientID: "127431502665-8hbasnf1ullh1mvem69cbjgo6n414l8l.apps.googleusercontent.com",
			clientSecret: "HQyn4GUJkZA4R9j-BmxHw7MP",
			callbackHost: "http://localhost:4444"
		}
	}

};
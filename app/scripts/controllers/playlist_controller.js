App.PlaylistController = Ember.ArrayController.extend({

	needs: ['application', 'modal'],

	isPlaying: Ember.computed.alias('controllers.application.isPlaying'),
	playerid: Ember.computed.alias('controllers.application.playerid'),
	playlistid: Ember.computed.alias('controllers.application.playlistid'),
	partymode: Ember.computed.alias('controllers.application.partymode'),
	nowplaying: null,
	fanart: null,
	count: 0,

	// Set up XBMC WebSocket listeners
	initListeners: function() {

		this.socket.on('Playlist.GetItems', function(data) {

			this.store.unloadAll('playlist');

			if (typeof data.result !== 'undefined' && data.result.items) {

				var items = data.result.items.map(function(item, index) {

					return this.mediaObject(item, index);

				}.bind(this));

				if (this.get('partymode')) {
					items.shift();
				}

				this.set('count', items.length);

				this.store.pushMany('playlist', items);

			} else {

				this.set('count', 0);

			}

			this.socket.workingStop();

		}.bind(this));

		this.socket.on('Player.GetItem', function(data) {

			if (typeof data.result !== 'undefined' && data.result.item) {

				var oldTitle = this.get('nowplaying.title');
				var current = this.mediaObject(data.result.item);
				if (this.get('nowplaying.id') !== current.id) {
					this.set('nowplaying', current);
					if (oldTitle !== current.title) {
						this.getFanArt();
					}
				}

			} else {

				this.set('fanart', null)
					.set('nowplaying', null);

			}

		}.bind(this));

		this.socket.on('Player.OnPlay', this.getPlaylistItems.bind(this));
		this.socket.on('Playlist.Insert', this.getPlaylistItems.bind(this));
		this.socket.on('Playlist.OnClear', this.getPlaylistItems.bind(this));
		// this.socket.on('Player.OnStop', this.getPlaylistItems.bind(this));
		// this.socket.on('Playlist.OnAdd', this.getPlaylistItems.bind(this));
		// this.socket.on('Playlist.OnRemove', this.getPlaylistItems.bind(this));

	}.on('init'),

	getPlaylistItems: function(data) {

		if (this.get('playlistid') !== null) {

			if (typeof data !== 'undefined') {

				var last = this.socket.get('events')[1] || null;
				var next = data.id || data.method || null;

				if (next === last && (last === 'Playlist.OnAdd' || last === 'Playlist.OnRemove')) {
						return false;
				}

			}

			this.socket.workingStart();

			Ember.run.debounce(this.socket, 'playerGetItem', {
				playerid: this.get('playerid'),
				properties: ['album','albumid','artist','showtitle','track','year']
			}, 300);

			Ember.run.debounce(this.socket, 'playlistGetItems', {
				playlistid: this.get('playlistid'),
				properties: ['album','albumid','artist','showtitle','track','year']
			}, 300);

		}

	}.observes('playlistid'),

	getFanArt: function() {

		this.set('fanart', 'opacity:0;');

		switch (this.get('nowplaying.type')) {

			case 'musicvideo':
			case 'song':

				// last.fm
				Ember.$.getJSON('//ws.audioscrobbler.com/2.0/', {

					api_key: '70c9409ed6b544eaabc34f5dd80a6eab',
					method: 'artist.getinfo',
					format: 'json',
					artist: this.get('nowplaying.artist')

				}).then(function(data) {

					if (typeof data.artist !== 'undefined') {
						this.setFanArt(data.artist.image.get('lastObject')['#text']);
					}

				}.bind(this));

				break;

			case 'episode':
			case 'movie':

				// themoviedb.org
				Ember.$.getJSON('//api.themoviedb.org/3/search/multi', {

					api_key: 'da34baf0d96a38f18bbefd7a8e8cbf82',
					query: this.get('nowplaying.title') || this.get('nowplaying.label')

				}).then(function(data) {

					if (typeof data.results !== 'undefined') {
						this.setFanArt('//image.tmdb.org/t/p/w780' + data.results.get('firstObject').backdrop_path);
					}

				}.bind(this));

				break;
		}

	},

	setFanArt: function(url) {

		var img = new Image();

		img.onload = function() {

			var style = 'background-image:url(%@);opacity:1;'.fmt(url);
			this.set('fanart', style);

		}.bind(this);

		img.onerror = function() {

			return false;

		};

		img.src = url;

	},

	mediaObject: function(item, index) {

		var media = {
			album: item.album,
			albumid: item.albumid,
			artist: item.artist[0],
			id: item.id,
			index: index,
			label: item.label,
			showtitle: item.showtitle,
			title: item.artist[0] || item.showtitle,
			track: item.track,
			type: item.type,
			value: item.label,
			year: item.year
		};

		switch (item.type) {
			case 'episode' :
				media.value = '%@ - %@'.fmt(item.showtitle, item.label);
				break;
			case 'movie' :
				media.value = '%@ - %@'.fmt(item.label, item.year);
				break;
			case 'musicvideo' :
			case 'song' :
				media.value = '%@ - %@'.fmt(item.artist[0], item.label);
				if (item.album) {
					media.title += ' / ' + item.album;
				}
				break;
		}

		return media;

	},

	// Public methods
	actions: {

		openModal: function(item) {

			this.get('controllers.modal').send('open', item);

		},

		playAlbum: function(item) {

			this.socket.playerOpen({
				item: {
					albumid: item.get('albumid')
				}
			});

		},

		playNow: function(item) {

			if (item.get('index')) {

				this.socket.playerGoTo({
					playerid: this.get('playerid'),
					to: item.get('index')
				});

			} else {

				var params = {item:{}};
				params.item[item.get('type') + 'id'] = +item.get('id');

				if (this.get('isPlaying') &&
					this.get('playlistid') !== null &&
					this.get('type') === this.get('nowplaying.type')) {

					params.playlistid = this.get('playlistid');
					params.position = 1;

					this.socket.playlistInsert(params);

					this.socket.playerGoTo({
						playerid: this.get('playerid'),
						to: 1
					});

				} else {

					this.socket.playlistClear({
						playlistid: this.get('playlistid')
					});

					this.socket.playerOpen(params);

				}

			}

		},

		queueNext: function(item) {

			var params = {
				playlistid: this.get('playlistid'),
				position: this.get('partymode') ? 1 : this.get('count'),
				item: {}
			};

			params.item[item.get('type') + 'id'] = +item.get('id');

			if (item.get('index')) {

				this.send('removeFromQueue', item);

			}

			this.socket.playlistInsert(params);

		},

		removeFromQueue: function(item) {

			this.socket.playlistRemove({
				'playlistid': this.get('playlistid'),
				'position': item.get('index')
			});

			this.getPlaylistItems();

		},

	}

});

App.SearchController = Ember.ObjectController.extend({

  needs: ['application', 'modal'],

  host: Ember.computed.alias('controllers.application.host'),
  searchInput: '',
  libraryRecord: null,
  timeout: 86400000,
  albumBloodhound: null,
  albumLibrary: [],
  albumResults: [],
  episodeBloodhound: null,
  episodeLibrary: [],
  episodeResults: [],
  movieBloodhound: null,
  movieLibrary: [],
  movieResults: [],
  musicVideoBloodhound: null,
  musicVideoLibrary: [],
  musicVideoResults: [],

  initListeners: function() {

    // AudioLibrary.GetAlbums
    this.socket.on('AudioLibrary.GetAlbums', function(data) {

      var items = [];

      if (typeof data.result !== 'undefined' && data.result.albums) {

        items = data.result.albums.map(function(item) {
          return {
            id: item.albumid,
            album: item.label || '',
            type: 'album',
            value: '%@ - %@'.fmt(item.artist[0], item.label)
          };
        });

      }

      this.store.update('library', {
        id: this.get('libraryRecord.id'),
        albumTime: new Date().getTime(),
        albumLibrary: LZString.compressToUTF16(JSON.stringify(items))
      }).save();

      this.set('albumLibrary', items);
      this.socket.workingStop();

    }.bind(this));

    // VideoLibrary.GetEpisodes
    this.socket.on('VideoLibrary.GetEpisodes', function(data) {

      var items = [];

      if (typeof data.result !== 'undefined' && data.result.episodes) {

        items = data.result.episodes.map(function(item) {
          return {
            id: item.episodeid,
            type: 'episode',
            value: '%@ - %@'.fmt(item.showtitle, item.label)
          };
        });

      }

      this.store.update('library', {
        id: this.get('libraryRecord.id'),
        episodeTime: new Date().getTime(),
        episodeLibrary: LZString.compressToUTF16(JSON.stringify(items))
      }).save();

      this.set('episodeLibrary', items);
      this.socket.workingStop();

    }.bind(this));

    // VideoLibrary.GetMovies
    this.socket.on('VideoLibrary.GetMovies', function(data) {

      var items = [];

      if (typeof data.result.movies !== 'undefined' && data.result.movies) {

        items = data.result.movies.map(function(item) {
          return {
            id: item.movieid,
            type: 'movie',
            value: '%@ (%@)'.fmt(item.label, item.year)
          };
        });

      }

      this.store.update('library', {
        id: this.get('libraryRecord.id'),
        movieTime: new Date().getTime(),
        movieLibrary: LZString.compressToUTF16(JSON.stringify(items))
      }).save();

      this.set('movieLibrary', items);
      this.socket.workingStop();

    }.bind(this));

    // VideoLibrary.GetMusicVideos
    this.socket.on('VideoLibrary.GetMusicVideos', function(data) {

      var items = [];

      if (typeof data.result.musicvideos !== 'undefined' && data.result.musicvideos) {

        items = data.result.musicvideos.map(function(item) {
          return {
            id: item.musicvideoid,
            albumid: item.albumid || '',
            album: item.album || '',
            type: 'musicvideo',
            value: '%@ - %@'.fmt(item.artist[0], item.label)
          };
        });

      }

      this.store.update('library', {
        id: this.get('libraryRecord.id'),
        musicVideoTime: new Date().getTime(),
        musicVideoLibrary: LZString.compressToUTF16(JSON.stringify(items))
      }).save();

      this.set('musicVideoLibrary', items);
      this.socket.workingStop();

    }.bind(this));

  }.on('init'),

  albumLibraryUpdated: function() {

    this.setBloodhound('album');

  }.observes('albumLibrary'),

  episodeLibraryUpdated: function() {

    this.setBloodhound('episode');

  }.observes('episodeLibrary'),

  movieLibraryUpdated: function() {

    this.setBloodhound('movie');

  }.observes('movieLibrary'),

  musicVideoLibraryUpdated: function() {

    this.setBloodhound('musicVideo');

  }.observes('musicVideoLibrary'),

  setBloodhound: function(type) {

    var bloodhound = this.get(type + 'Bloodhound');
    var library = this.get(type + 'Library');

    if (bloodhound !== null) {

      bloodhound.clear();
      bloodhound.add(library);

    } else {

      bloodhound = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10,
        local: library
      });

      bloodhound.initialize();

      this.set(type + 'Bloodhound', bloodhound);

    }

  },

  valueChange: function() {

    var term = this.get('searchInput');

    this.get('albumBloodhound').get(term, function(suggestions) {
      this.set('albumResults', suggestions);
    }.bind(this));

    this.get('movieBloodhound').get(term, function(suggestions) {
      this.set('movieResults', suggestions);
    }.bind(this));

    this.get('episodeBloodhound').get(term, function(suggestions) {
      this.set('episodeResults', suggestions);
    }.bind(this));

    this.get('musicVideoBloodhound').get(term, function(suggestions) {
      this.set('musicVideoResults', suggestions);
    }.bind(this));

  }.observes('searchInput'),

  // Public methods
  actions: {

    loadLibraries: function() {

      // Find library record for host
      this.store.find('library', {
        host: this.get('host'),
      }).then(function(records) {

        // If record found check for stale libraries
        var now = new Date().getTime();
        var record = records.get('firstObject');

        // Album library
        if (now - record.get('albumTime') > this.get('timeout')) {

          this.socket.audioLibraryGetAlbums();

        } else {

          this.set('albumLibrary', JSON.parse(LZString.decompressFromUTF16(record.get('albumLibrary'))));

        }

        // Episode library
        if (now - record.get('episodeTime') > this.get('timeout')) {

          this.socket.videoLibraryGetEpisodes();

        } else {

          this.set('episodeLibrary', JSON.parse(LZString.decompressFromUTF16(record.get('episodeLibrary'))));

        }

        // Movie library
        if (now - record.get('movieTime') > this.get('timeout')) {

          this.socket.videoLibraryGetMovies();

        } else {

          this.set('movieLibrary', JSON.parse(LZString.decompressFromUTF16(record.get('movieLibrary'))));

        }

        // Music video library
        if (now - record.get('musicVideoTime') > this.get('timeout')) {

          this.socket.videoLibraryGetMusicVideos();

        } else {

          this.set('musicVideoLibrary', JSON.parse(LZString.decompressFromUTF16(record.get('musicVideoLibrary'))));

        }

        this.set('libraryRecord', record);

      }.bind(this), function() {

        // If not found create record and update libraries
        var record = this.store.createRecord('library', {
          host: this.get('host')
        });

        record.save();

        this.set('libraryRecord', record);

        this.socket.audioLibraryGetAlbums();
        this.socket.videoLibraryGetEpisodes();
        this.socket.videoLibraryGetMovies();
        this.socket.videoLibraryGetMusicVideos();

      }.bind(this));

    },

    openModal: function(item) {

      this.get('controllers.modal').send('open', Ember.Object.create(item));

    },

    search: function() {

      return false;

    }

  }

});

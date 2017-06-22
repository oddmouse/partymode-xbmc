!function(){window.App=Ember.Application.create({ready:function(){FastClick.attach(document.body),Ember.$(document).on("touchstart mousedown",".list li",function(){Ember.$(this).addClass("hover")}),Ember.$("body").on("touchmove touchend mousemove mouseup",function(){Ember.$(".list li").removeClass("hover")})}})}(),function(){App.ApplicationSerializer=DS.LSSerializer.extend(),App.ApplicationAdapter=DS.LSAdapter.extend({namespace:"partymode"})}(),function(){App.XBMCSocket=Ember.Object.extend(Ember.Evented,{host:"localhost",port:"9090",status:"",events:[],ws:null,state:function(){return this.get("ws.readyState")||0}.property().readOnly()["volatile"](),connect:function(a){if("undefined"!=typeof a&&this.set("host",a),null===this.get("ws")){var b=new WebSocket("ws://%@:%@".fmt(this.get("host"),this.get("port")));b.onclose=this._close.bind(this),b.onerror=this._error.bind(this),b.onmessage=this._message.bind(this),b.onopen=this._open.bind(this),this.set("ws",b).set("status","")}else this.set("status","reconnect").disconnect()},disconnect:function(){var a=this.get("ws");a.onerror=null,a.onmessage=null,a.onopen=null,a.close()},audioLibraryGetAlbums:function(){this._push("AudioLibrary.GetAlbums",{properties:["artist"],sort:{order:"ascending",method:"artist",ignorearticle:!0}},!0)},audioLibraryGetSongs:function(){this._push("AudioLibrary.GetSongs",{properties:["displayartist","artist","album","albumid","track"],sort:{order:"ascending",method:"track",ignorearticle:!0}},!0)},audioLibraryScan:function(){this._push("AudioLibrary.Scan")},guiSetFullscreen:function(a){this._push("GUI.SetFullscreen",a)},inputExecuteAction:function(a){this._push("Input.ExecuteAction",a)},playerGetActivePlayers:function(){this._push("Player.GetActivePlayers")},playerGetItem:function(a){this._push("Player.GetItem",a)},playerGetProperties:function(a){this._push("Player.GetProperties",a)},playerGoTo:function(a){this._push("Player.GoTo",a,!0)},playerOpen:function(a){this._push("Player.Open",a,!0)},playerPlayPause:function(a){this._push("Player.PlayPause",a)},playerStop:function(a){this._push("Player.Stop",a)},playlistClear:function(a){this._push("Playlist.Clear",a,!0)},playlistGetItems:function(a){this._push("Playlist.GetItems",a,!0)},playlistInsert:function(a){this._push("Playlist.Insert",a,!0)},playlistRemove:function(a){this._push("Playlist.Remove",a,!0)},systemReboot:function(){this._push("System.Reboot")},videoLibraryGetEpisodes:function(){this._push("VideoLibrary.GetEpisodes",{properties:["showtitle"],sort:{order:"ascending",method:"tvshowtitle",ignorearticle:!0}},!0)},videoLibraryGetMovies:function(){this._push("VideoLibrary.GetMovies",{properties:["year"],sort:{order:"ascending",method:"label",ignorearticle:!0}},!0)},videoLibraryGetMusicVideos:function(){this._push("VideoLibrary.GetMusicVideos",{properties:["artist"],sort:{order:"ascending",method:"artist",ignorearticle:!0}},!0)},videoLibraryScan:function(){this._push("VideoLibrary.Scan")},workingStart:function(){Ember.run.debounce(this,"_workingStart",600,!0)},workingStop:function(){Ember.run.debounce(this,"_workingStop",600)},_open:function(){this._push("XBMC.GetInfoLabels",{labels:["System.FriendlyName","Network.IPAddress","Network.MacAddress"]}),this.trigger("Socket.Open")},_close:function(a){var b=this.get("ws");b.onclose=null,this.set("ws",null),"reconnect"===this.get("status")&&this.connect(),this.trigger("Socket.Close")},_error:function(a){this.disconnect(),this.trigger("Socket.Error",a)},_message:function(a){var b=JSON.parse(a.data),c=b.id||b.method;switch("undefined"!=typeof b.error&&this.workingStop(),c){case"JSONRPC.NotifyAll":case"Other.Working.Start":case"Other.Working.Stop":break;default:this.get("events").unshift(c)}this.set("events",this.get("events").slice(0,2)),this.trigger(c,b)},_push:function(a,b,c){if(1===this.get("state")){var d={jsonrpc:"2.0",id:a,method:a};"undefined"!=typeof b&&(d.params=b),"undefined"!=typeof c&&c===!0&&this.workingStart(),Ember.run.later(function(){this.ws.send(JSON.stringify(d))}.bind(this))}},_workingStart:function(){this._push("JSONRPC.NotifyAll",{sender:"client",message:"Working.Start"})},_workingStop:function(){this._push("JSONRPC.NotifyAll",{sender:"client",message:"Working.Stop"})}}),Ember.Application.initializer({name:"socket",initialize:function(a,b){b.register("socket:main",b.XBMCSocket),b.inject("controller","socket","socket:main"),b.inject("route","socket","socket:main")}})}(),function(){App.Connect=DS.Model.extend({name:DS.attr("string"),host:DS.attr("string"),active:DS.attr("boolean",{defaultValue:!1})})}(),function(){App.Playlist=DS.Model.extend({album:DS.attr("string"),albumid:DS.attr("string"),artist:DS.attr("string"),label:DS.attr("string"),index:DS.attr("number"),showtitle:DS.attr("string"),title:DS.attr("string"),track:DS.attr("string"),type:DS.attr("string"),value:DS.attr("string"),year:DS.attr("string")})}(),function(){App.Library=DS.Model.extend({host:DS.attr("string"),albumLibrary:DS.attr("string",{defaultValue:""}),albumTime:DS.attr("string",{defaultValue:""}),episodeLibrary:DS.attr("string",{defaultValue:""}),episodeTime:DS.attr("string",{defaultValue:""}),movieLibrary:DS.attr("string",{defaultValue:""}),movieTime:DS.attr("string",{defaultValue:""}),musicVideoLibrary:DS.attr("string",{defaultValue:""}),musicVideoTime:DS.attr("string",{defaultValue:""})})}(),function(){App.ApplicationController=Ember.Controller.extend({isConnected:!1,isPlaying:!1,isWorking:!1,partymode:!1,playerid:null,playlistid:null,host:null,hostname:null,sleepTimeout:0,isSupported:function(){var a="localStorage"in window&&null!==window.localStorage,b="WebSocket"in window&&null!==window.WebSocket,c="pointerEvents"in document.body.style;return a&&b&&c}.property(),initUserAgent:function(){navigator.userAgent.match(/(ip(hone|od|ad))/i)&&Ember.$("body").addClass("ios")}.on("init"),initListeners:function(){this.socket.on("Socket.Open",function(){this.set("isConnected",!0),this.socket.playerGetActivePlayers()}.bind(this)),this.socket.on("Socket.Close",function(){this.set("isConnected",!1)}.bind(this)),this.socket.on("Player.GetActivePlayers",function(a){"undefined"!=typeof a.result&&a.result.length?this.set("playerid",a.result.get("firstObject").playerid):this.set("playerid",null)}.bind(this)),this.socket.on("Player.GetProperties",function(a){"undefined"!=typeof a.result?this.set("playlistid",a.result.playlistid).set("partymode",a.result.partymode).set("isPlaying",!0):this.set("playlistid",null).set("partymode",!1).set("isPlaying",!1)}.bind(this)),this.socket.on("Player.OnPlay",function(a){this.set("playerid",a.params.data.player.playerid).set("isPlaying",!0)}.bind(this)),this.socket.on("Player.OnStop",function(a){this.set("isPlaying",!1)}.bind(this)),this.socket.on("Player.OnPropertyChanged",function(a){this.set("playerid",a.params.data.player.playerid).set("partymode",a.params.data.property.partymode)}.bind(this)),this.socket.on("Other.Working.Start",function(a){this.set("isWorking",!0)}.bind(this)),this.socket.on("Other.Working.Stop",function(a){this.set("isWorking",!1)}.bind(this)),this.socket.on("XBMC.GetInfoLabels",function(a){var b=a.result["System.FriendlyName"],c=a.result["Network.IPAddress"];this.set("host",c).set("hostname",b),this.store.find("connect").then(function(a){a.forEach(function(a){a.set("active",!1).save()}),this.store.find("connect",{host:c}).then(function(a){var b=a.get("firstObject");this.store.update("connect",{id:b.get("id"),host:c,active:!0}).save()}.bind(this),function(a){this.store.createRecord("connect",{name:b,host:c,active:!0}).save()}.bind(this))}.bind(this))}.bind(this)),this.reconnect()}.on("init"),isConnectedChanged:function(){this.get("isConnected")?this.transitionToRoute("index"):this.set("host",null).set("hostname",null).set("isPlaying",!1).set("isWorking",!1).set("partymode",!1).set("playerid",null).set("playlistid",null).set("sleepTimeout",0)}.observes("isConnected"),isPlayingChanged:function(){this.get("isPlaying")?this.transitionToRoute("playlist"):this.transitionToRoute("index")}.observes("isPlaying"),playeridChanged:function(){null!==this.get("playerid")&&this.socket.playerGetProperties({playerid:this.get("playerid"),properties:["playlistid","partymode"]})}.observes("playerid"),reconnect:function(){if(1!==this.socket.get("state")){var a=this.queryParam("ip");a?(this.socket.connect(a),window.history.replaceState(null,null,"/")):this.store.find("connect",{active:!0}).then(function(a){var b=a.get("firstObject").get("host");Ember.run.later(function(){this.socket.connect(b)}.bind(this))}.bind(this))}},queryParam:function(a){for(var b=window.location.search.substring(1),c=b.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if(e[0]===a)return e[1]}return!1},actions:{playerNext:function(){this.store.find("playlist").then(function(a){a.get("length")>1&&this.socket.playerGoTo({playerid:this.get("playerid"),to:"next"})}.bind(this))},playerPause:function(){this.socket.playerPlayPause({playerid:this.get("playerid")})},playerStop:function(){this.socket.playerStop({playerid:this.get("playerid")})}}})}(),function(){App.ConnectController=Ember.ArrayController.extend({needs:["modal"],sortProperties:["name"],sortAscending:!0,actions:{addHost:function(){this.socket.connect(this.get("hostInput")),this.set("hostInput","")},connectHost:function(a){a.get("active")||this.socket.connect(a.get("host"))},disconnectHost:function(a,b){a.set("active",!1).save().then(function(){this.socket.disconnect(),"undefined"!=typeof b&&b.resolve()}.bind(this))},removeHost:function(a){if(a.get("active")){var b=Ember.RSVP.defer();b.promise.then(function(){a.destroyRecord()},null),this.send("disconnectHost",a,b)}else a.destroyRecord()},openModal:function(a){this.get("controllers.modal").send("open",a)}}})}(),function(){App.IndexController=Ember.Controller.extend({needs:["application"],isConnected:Ember.computed.alias("controllers.application.isConnected"),isPlaying:Ember.computed.alias("controllers.application.isPlaying"),isSupported:Ember.computed.alias("controllers.application.isSupported"),hostname:Ember.computed.alias("controllers.application.hostname"),actions:{setPartyMode:function(a){this.socket.playerOpen({item:{partymode:a}})}}})}(),function(){App.ModalController=Ember.Controller.extend({needs:["connect","playlist","utilities","search"],selected:null,isOpen:!1,hasAlbum:function(){return this.get("selected.album")&&"album"!==this.get("selected.type")}.property("selected"),hasIndex:function(){return"undefined"!=typeof this.get("selected.index")}.property("selected"),hasPlaylist:function(){return this.get("controllers.playlist.isPlaying")&&null!==this.get("controllers.playlist.playlistid")&&this.get("controllers.playlist.nowplaying.type")===this.get("selected.type")}.property("selected"),confirmReboot:function(){return"systemReboot"===this.get("selected")}.property("selected"),confirmClearSearch:function(){return"clearSearch"===this.get("selected")}.property("selected"),initListeners:function(){this.socket.on("Other.Working.Start",function(a){this.send("close")}.bind(this))}.on("init"),actions:{close:function(){this.set("isOpen",!1)},open:function(a){this.set("isOpen",!0),this.set("selected",a)},systemReboot:function(){this.send("close"),this.get("controllers.utilities").send("systemReboot")},clearSearch:function(){this.send("close"),this.get("controllers.utilities").send("clearSearch")},playAlbum:function(){this.send("close"),this.get("controllers.playlist").send("playAlbum",this.get("selected"))},playNow:function(){this.send("close"),this.get("controllers.playlist").send("playNow",this.get("selected"))},queueNext:function(){this.send("close"),this.get("controllers.playlist").send("queueNext",this.get("selected"))},removeFromQueue:function(){this.send("close"),this.get("controllers.playlist").send("removeFromQueue",this.get("selected"))},connectHost:function(){this.send("close"),this.get("controllers.connect").send("connectHost",this.get("selected"))},disconnectHost:function(){this.send("close"),this.get("controllers.connect").send("disconnectHost",this.get("selected"))},removeHost:function(){this.send("close"),this.get("controllers.connect").send("removeHost",this.get("selected"))},shareHost:function(){this.send("close")}}})}(),function(){App.PlaylistController=Ember.ArrayController.extend({needs:["application","modal"],isPlaying:Ember.computed.alias("controllers.application.isPlaying"),playerid:Ember.computed.alias("controllers.application.playerid"),playlistid:Ember.computed.alias("controllers.application.playlistid"),partymode:Ember.computed.alias("controllers.application.partymode"),nowplaying:null,fanart:null,count:0,initListeners:function(){this.socket.on("Playlist.GetItems",function(a){if(this.store.unloadAll("playlist"),"undefined"!=typeof a.result&&a.result.items){var b=a.result.items.map(function(a,b){return this.mediaObject(a,b)}.bind(this));this.get("partymode")&&b.shift(),this.set("count",b.length),this.store.pushMany("playlist",b)}else this.set("count",0);this.socket.workingStop()}.bind(this)),this.socket.on("Player.GetItem",function(a){if("undefined"!=typeof a.result&&a.result.item){var b=this.get("nowplaying.title"),c=this.mediaObject(a.result.item);this.get("nowplaying.id")!==c.id&&(this.set("nowplaying",c),b!==c.title&&this.getFanArt())}else this.set("fanart",null).set("nowplaying",null)}.bind(this)),this.socket.on("Player.OnPlay",this.getPlaylistItems.bind(this)),this.socket.on("Playlist.Insert",this.getPlaylistItems.bind(this)),this.socket.on("Playlist.OnClear",this.getPlaylistItems.bind(this))}.on("init"),getPlaylistItems:function(a){if(null!==this.get("playlistid")){if("undefined"!=typeof a){var b=this.socket.get("events")[1]||null,c=a.id||a.method||null;if(c===b&&("Playlist.OnAdd"===b||"Playlist.OnRemove"===b))return!1}this.socket.workingStart(),Ember.run.debounce(this.socket,"playerGetItem",{playerid:this.get("playerid"),properties:["album","albumid","artist","showtitle","track","year"]},300),Ember.run.debounce(this.socket,"playlistGetItems",{playlistid:this.get("playlistid"),properties:["album","albumid","artist","showtitle","track","year"]},300)}}.observes("playlistid"),getFanArt:function(){switch(this.set("fanart","opacity:0;"),this.get("nowplaying.type")){case"musicvideo":case"song":Ember.$.getJSON("http://ws.audioscrobbler.com/2.0/",{api_key:"70c9409ed6b544eaabc34f5dd80a6eab",method:"artist.getinfo",format:"json",artist:this.get("nowplaying.artist")}).then(function(a){"undefined"!=typeof a.artist&&this.setFanArt(a.artist.image.get("lastObject")["#text"])}.bind(this));break;case"episode":case"movie":Ember.$.getJSON("http://api.themoviedb.org/3/search/multi",{api_key:"da34baf0d96a38f18bbefd7a8e8cbf82",query:this.get("nowplaying.title")||this.get("nowplaying.label")}).then(function(a){"undefined"!=typeof a.results&&this.setFanArt("http://image.tmdb.org/t/p/w780"+a.results.get("firstObject").backdrop_path)}.bind(this))}},setFanArt:function(a){var b=new Image;b.onload=function(){var b="background-image:url(%@);opacity:1;".fmt(a);this.set("fanart",b)}.bind(this),b.onerror=function(){return!1},b.src=a},mediaObject:function(a,b){var c={album:a.album,albumid:a.albumid,artist:a.artist[0],id:a.id,index:b,label:a.label,showtitle:a.showtitle,title:a.artist[0]||a.showtitle,track:a.track,type:a.type,value:a.label,year:a.year};switch(a.type){case"episode":c.value="%@ - %@".fmt(a.showtitle,a.label);break;case"movie":c.value="%@ - %@".fmt(a.label,a.year);break;case"musicvideo":case"song":c.value="%@ - %@".fmt(a.artist[0],a.label),a.album&&(c.title+=" / "+a.album)}return c},actions:{openModal:function(a){this.get("controllers.modal").send("open",a)},playAlbum:function(a){this.socket.playerOpen({item:{albumid:a.get("albumid")}})},playNow:function(a){if(a.get("index"))this.socket.playerGoTo({playerid:this.get("playerid"),to:a.get("index")});else{var b={item:{}};b.item[a.get("type")+"id"]=+a.get("id"),this.get("isPlaying")&&null!==this.get("playlistid")&&this.get("type")===this.get("nowplaying.type")?(b.playlistid=this.get("playlistid"),b.position=1,this.socket.playlistInsert(b),this.socket.playerGoTo({playerid:this.get("playerid"),to:1})):(this.socket.playlistClear({playlistid:this.get("playlistid")}),this.socket.playerOpen(b))}},queueNext:function(a){var b={playlistid:this.get("playlistid"),position:this.get("partymode")?1:this.get("count"),item:{}};b.item[a.get("type")+"id"]=+a.get("id"),a.get("index")&&this.send("removeFromQueue",a),this.socket.playlistInsert(b)},removeFromQueue:function(a){this.socket.playlistRemove({playlistid:this.get("playlistid"),position:a.get("index")}),this.getPlaylistItems()}}})}(),function(){App.SearchController=Ember.ObjectController.extend({needs:["application","modal"],host:Ember.computed.alias("controllers.application.host"),searchInput:"",libraryRecord:null,timeout:864e5,albumBloodhound:null,albumLibrary:[],albumResults:[],episodeBloodhound:null,episodeLibrary:[],episodeResults:[],movieBloodhound:null,movieLibrary:[],movieResults:[],musicVideoBloodhound:null,musicVideoLibrary:[],musicVideoResults:[],initListeners:function(){this.socket.on("AudioLibrary.GetAlbums",function(a){var b=[];"undefined"!=typeof a.result&&a.result.albums&&(b=a.result.albums.map(function(a){return{id:a.albumid,album:a.label||"",type:"album",value:"%@ - %@".fmt(a.artist[0],a.label)}})),this.store.update("library",{id:this.get("libraryRecord.id"),albumTime:(new Date).getTime(),albumLibrary:LZString.compressToUTF16(JSON.stringify(b))}).save(),this.set("albumLibrary",b),this.socket.workingStop()}.bind(this)),this.socket.on("VideoLibrary.GetEpisodes",function(a){var b=[];"undefined"!=typeof a.result&&a.result.episodes&&(b=a.result.episodes.map(function(a){return{id:a.episodeid,type:"episode",value:"%@ - %@".fmt(a.showtitle,a.label)}})),this.store.update("library",{id:this.get("libraryRecord.id"),episodeTime:(new Date).getTime(),episodeLibrary:LZString.compressToUTF16(JSON.stringify(b))}).save(),this.set("episodeLibrary",b),this.socket.workingStop()}.bind(this)),this.socket.on("VideoLibrary.GetMovies",function(a){var b=[];"undefined"!=typeof a.result.movies&&a.result.movies&&(b=a.result.movies.map(function(a){return{id:a.movieid,type:"movie",value:"%@ (%@)".fmt(a.label,a.year)}})),this.store.update("library",{id:this.get("libraryRecord.id"),movieTime:(new Date).getTime(),movieLibrary:LZString.compressToUTF16(JSON.stringify(b))}).save(),this.set("movieLibrary",b),this.socket.workingStop()}.bind(this)),this.socket.on("VideoLibrary.GetMusicVideos",function(a){var b=[];"undefined"!=typeof a.result.musicvideos&&a.result.musicvideos&&(b=a.result.musicvideos.map(function(a){return{id:a.musicvideoid,albumid:a.albumid||"",album:a.album||"",type:"musicvideo",value:"%@ - %@".fmt(a.artist[0],a.label)}})),this.store.update("library",{id:this.get("libraryRecord.id"),musicVideoTime:(new Date).getTime(),musicVideoLibrary:LZString.compressToUTF16(JSON.stringify(b))}).save(),this.set("musicVideoLibrary",b),this.socket.workingStop()}.bind(this))}.on("init"),albumLibraryUpdated:function(){this.setBloodhound("album")}.observes("albumLibrary"),episodeLibraryUpdated:function(){this.setBloodhound("episode")}.observes("episodeLibrary"),movieLibraryUpdated:function(){this.setBloodhound("movie")}.observes("movieLibrary"),musicVideoLibraryUpdated:function(){this.setBloodhound("musicVideo")}.observes("musicVideoLibrary"),setBloodhound:function(a){var b=this.get(a+"Bloodhound"),c=this.get(a+"Library");null!==b?(b.clear(),b.add(c)):(b=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.obj.whitespace("value"),queryTokenizer:Bloodhound.tokenizers.whitespace,limit:10,local:c}),b.initialize(),this.set(a+"Bloodhound",b))},valueChange:function(){var a=this.get("searchInput");this.get("albumBloodhound").get(a,function(a){this.set("albumResults",a)}.bind(this)),this.get("movieBloodhound").get(a,function(a){this.set("movieResults",a)}.bind(this)),this.get("episodeBloodhound").get(a,function(a){this.set("episodeResults",a)}.bind(this)),this.get("musicVideoBloodhound").get(a,function(a){this.set("musicVideoResults",a)}.bind(this))}.observes("searchInput"),actions:{loadLibraries:function(){this.store.find("library",{host:this.get("host")}).then(function(a){var b=(new Date).getTime(),c=a.get("firstObject");b-c.get("albumTime")>this.get("timeout")?this.socket.audioLibraryGetAlbums():this.set("albumLibrary",JSON.parse(LZString.decompressFromUTF16(c.get("albumLibrary")))),b-c.get("episodeTime")>this.get("timeout")?this.socket.videoLibraryGetEpisodes():this.set("episodeLibrary",JSON.parse(LZString.decompressFromUTF16(c.get("episodeLibrary")))),b-c.get("movieTime")>this.get("timeout")?this.socket.videoLibraryGetMovies():this.set("movieLibrary",JSON.parse(LZString.decompressFromUTF16(c.get("movieLibrary")))),b-c.get("musicVideoTime")>this.get("timeout")?this.socket.videoLibraryGetMusicVideos():this.set("musicVideoLibrary",JSON.parse(LZString.decompressFromUTF16(c.get("musicVideoLibrary")))),this.set("libraryRecord",c)}.bind(this),function(){var a=this.store.createRecord("library",{host:this.get("host")});a.save(),this.set("libraryRecord",a),this.socket.audioLibraryGetAlbums(),this.socket.videoLibraryGetEpisodes(),this.socket.videoLibraryGetMovies(),this.socket.videoLibraryGetMusicVideos()}.bind(this))},openModal:function(a){this.get("controllers.modal").send("open",Ember.Object.create(a))},search:function(){return!1}}})}(),function(){App.UtilitiesController=Ember.ArrayController.extend({needs:["application","modal"],actions:{openModal:function(a){this.get("controllers.modal").send("open",a)},audioLibraryScan:function(){this.socket.audioLibraryScan()},clearSearch:function(){this.store.find("library",{host:this.get("controllers.application.host")}).then(function(a){a.get("firstObject").destroyRecord()}.bind(this))},inputClose:function(){this.socket.inputExecuteAction({action:"close"})},setFullscreen:function(){this.socket.guiSetFullscreen({fullscreen:!0})},systemReboot:function(){this.socket.systemReboot()},videoLibraryScan:function(){this.socket.videoLibraryScan()}}})}(),function(){App.ModalDialogComponent=Ember.Component.extend({actions:{close:function(){return this.sendAction()}}})}(),function(){App.SearchFieldComponent=Ember.TextField.extend({focusIn:function(){Ember.$("body").addClass("search-focused")},focusOut:function(){Ember.$("body").removeClass("search-focused")}})}(),function(){App.ConnectRoute=Ember.Route.extend({activate:function(){this.render("modal-connect",{into:"application",outlet:"modal",controller:"modal"})},model:function(){return this.store.findAll("connect")},actions:{didTransition:function(){1!==this.socket.get("state")&&this.store.find("connect",{active:!0}).then(function(a){var b=a.get("firstObject");this.socket.connect(b.get("host"))}.bind(this))}}})}(),function(){App.PlaylistRoute=Ember.Route.extend({activate:function(){this.render("modal-media",{into:"application",outlet:"modal",controller:"modal"})},model:function(){return this.store.findAll("playlist")},actions:{didTransition:function(){this.controller.getPlaylistItems()}}})}(),function(){App.SearchRoute=Ember.Route.extend({activate:function(){this.render("modal-media",{into:"application",outlet:"modal",controller:"modal"})},actions:{didTransition:function(){this.controller.send("loadLibraries")}}})}(),function(){App.UtilitiesRoute=Ember.Route.extend({activate:function(){this.render("modal-utilities",{into:"application",outlet:"modal",controller:"modal"})}})}(),function(){App.NavigationView=Ember.View.extend({templateName:"navigation",isOpen:!1,click:function(){this.set("isOpen",!this.isOpen)}})}(),function(){App.Router.map(function(){this.route("connect"),this.route("playlist"),this.route("utilities"),this.route("search")}),App.Router.reopen({location:"none",didTransition:function(a){this._super(a),window.scrollTo(0,0)}})}();
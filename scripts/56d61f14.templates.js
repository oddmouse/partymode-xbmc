Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f,h="";return b.buffer.push("\n"),b.buffer.push(j(c.view.call(a,"navigation",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push("\n"),b.buffer.push(j((e=c.outlet||a&&a.outlet,f={hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b},e?e.call(a,"modal",f):k.call(a,"outlet","modal",f)))),b.buffer.push("\n"),d=c["if"].call(a,"isWorking",{hash:{},hashTypes:{},hashContexts:{},inverse:l.noop,fn:l.program(2,g,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n"),h}function g(a,b){b.buffer.push('\n<div class="loading">\n  <i class="spinner fi-loop"></i>\n</div>\n')}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var h,i="",j=this.escapeExpression,k=c.helperMissing,l=this;return h=c._triageMustache.call(b,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["ID"],data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n"),h=c["if"].call(b,"isSupported",{hash:{},hashTypes:{},hashContexts:{},inverse:l.noop,fn:l.program(1,f,e),contexts:[b],types:["ID"],data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n"),i}),Ember.TEMPLATES["components/modal-dialog"]=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g="",h=this.escapeExpression;return e.buffer.push("<div "),e.buffer.push(h(c.action.call(b,"close",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push(" "),e.buffer.push(h(c["bind-attr"].call(b,{hash:{"class":":modal isOpen:open:closed"},hashTypes:{"class":"STRING"},hashContexts:{"class":b},contexts:[],types:[],data:e}))),e.buffer.push('>\n  <div class="overlay"></div>\n  <div class="content">\n    '),f=c._triageMustache.call(b,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["ID"],data:e}),(f||0===f)&&e.buffer.push(f),e.buffer.push('\n    <span class="cancel menu-item fi-x">Cancel</span>\n  </div>\n</div>\n'),g}),Ember.TEMPLATES.connect=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e="";return b.buffer.push("\n      <li "),b.buffer.push(l(c.action.call(a,"openModal","",{hash:{},hashTypes:{},hashContexts:{},contexts:[a,a],types:["STRING","ID"],data:b}))),b.buffer.push(" "),b.buffer.push(l(c["bind-attr"].call(a,{hash:{"class":"active:active"},hashTypes:{"class":"STRING"},hashContexts:{"class":a},contexts:[],types:[],data:b}))),b.buffer.push(">\n        <h3>"),d=c._triageMustache.call(a,"name",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push('</h3>\n        <span class="subhead">'),d=c._triageMustache.call(a,"host",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("</span>\n      </li>\n    "),e}function g(a,b){b.buffer.push('\n      <li class="empty-list">\n        <h2 class="label">No saved hosts</h2>\n        <i class="icon fi-power"></i>\n      </li>\n    ')}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var h,i,j,k="",l=this.escapeExpression,m=c.helperMissing,n=this;return e.buffer.push('<div class="connect fade-in">\n  <form class="connect-form" autocapitalize="off" autocorrect="off" autocomplete="off" '),e.buffer.push(l(c.action.call(b,"addHost",{hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:b},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('>\n    <label class="fi-power">\n      '),e.buffer.push(l((i=c.input||b&&b.input,j={hash:{value:"hostInput",placeholder:"XBMC IP address or hostname"},hashTypes:{value:"ID",placeholder:"STRING"},hashContexts:{value:b,placeholder:b},contexts:[],types:[],data:e},i?i.call(b,j):m.call(b,"input",j)))),e.buffer.push('\n    </label>\n  </form>\n  <ul class="list">\n    '),h=c.each.call(b,"controller",{hash:{},hashTypes:{},hashContexts:{},inverse:n.program(3,g,e),fn:n.program(1,f,e),contexts:[b],types:["ID"],data:e}),(h||0===h)&&e.buffer.push(h),e.buffer.push("\n  </ul>\n</div>\n"),k}),Ember.TEMPLATES.index=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e="";return b.buffer.push("\n      "),d=c["if"].call(a,"isConnected",{hash:{},hashTypes:{},hashContexts:{},inverse:n.program(4,h,b),fn:n.program(2,g,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n    "),e}function g(a,b){var d,e="";return b.buffer.push('\n        <h2>Where’s the party at?</h2>\n        <p>\n          <div class="mixedtape" '),b.buffer.push(l(c.action.call(a,"setPartyMode","music",{hash:{},hashTypes:{},hashContexts:{},contexts:[a,a],types:["STRING","STRING"],data:b}))),b.buffer.push('>\n            <img width="512" src="images/mixedtape.svg" alt="Music PartyMode">\n          </div>\n          <div class="television" '),b.buffer.push(l(c.action.call(a,"setPartyMode","video",{hash:{},hashTypes:{},hashContexts:{},contexts:[a,a],types:["STRING","STRING"],data:b}))),b.buffer.push('>\n            <img width="512" src="images/television.svg" alt="Music Video PartyMode">\n          </div>\n        </p>\n        <h5 class="active-host">&nbsp;'),d=c._triageMustache.call(a,"hostname",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("&nbsp;</h5>\n      "),e}function h(a,b){var d,e,f="";return b.buffer.push("\n        <h2>Please connect to XBMC.</h2>\n        "),b.buffer.push(l((d=c["link-to"]||a&&a["link-to"],e={hash:{"class":"home-connect fi-power"},hashTypes:{"class":"STRING"},hashContexts:{"class":a},contexts:[a,a],types:["STRING","STRING"],data:b},d?d.call(a,"","connect",e):m.call(a,"link-to","","connect",e)))),b.buffer.push("\n      "),f}function i(a,b){b.buffer.push('\n      <div class="unsupported">\n        <h2>Sorry bro, you need a better browser.</h2>\n        <a href="https://browsehappy.com">\n          <i class="bad-browser fi-skull"></i>\n        </a>\n      </div>\n    ')}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var j,k="",l=this.escapeExpression,m=c.helperMissing,n=this;return e.buffer.push('<div class="home fade-in">\n  <div class="inner">\n    '),j=c["if"].call(b,"isSupported",{hash:{},hashTypes:{},hashContexts:{},inverse:n.program(6,i,e),fn:n.program(1,f,e),contexts:[b],types:["ID"],data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push('\n  </div>\n</div>\n<div class="lockup">\n  <a href="https://github.com/oddmouse/partymode-xbmc" target="_blank">\n    <i class="github fi-social-github"></i>\n    <img class="logo" width="72" src="images/xbmc-lockup.svg" alt="PartyMode for XBMC">\n  </a>\n</div>\n'),k}),Ember.TEMPLATES["modal-connect"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e="";return b.buffer.push("\n<h3>"),d=c._triageMustache.call(a,"selected.name",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push(" - "),d=c._triageMustache.call(a,"selected.host",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push('</h3>\n<ul class="modal-menu">\n  '),d=c["if"].call(a,"selected.active",{hash:{},hashTypes:{},hashContexts:{},inverse:n.program(4,h,b),fn:n.program(2,g,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n  <li "),b.buffer.push(m(c.action.call(a,"removeHost",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-prohibited">Remove from history</span>\n  </li>\n</ul>\n'),e}function g(a,b){var d="";return b.buffer.push("\n  <li "),b.buffer.push(m(c.action.call(a,"disconnectHost",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-eject">Disconnect from host</span>\n  </li>\n  '),d}function h(a,b){var d="";return b.buffer.push("\n  <li "),b.buffer.push(m(c.action.call(a,"connectHost",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-power">Connect to host</span>\n  </li>\n  '),d}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var i,j,k,l="",m=this.escapeExpression,n=this,o=c.helperMissing;return j=c["modal-dialog"]||b&&b["modal-dialog"],k={hash:{action:"close",isOpen:"isOpen"},hashTypes:{action:"STRING",isOpen:"ID"},hashContexts:{action:b,isOpen:b},inverse:n.noop,fn:n.program(1,f,e),contexts:[],types:[],data:e},i=j?j.call(b,k):o.call(b,"modal-dialog",k),(i||0===i)&&e.buffer.push(i),e.buffer.push("\n"),l}),Ember.TEMPLATES["modal-media"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e="";return b.buffer.push("\n<h3>"),d=c._triageMustache.call(a,"selected.value",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push('</h3>\n<ul class="modal-menu">\n  '),d=c["if"].call(a,"hasPlaylist",{hash:{},hashTypes:{},hashContexts:{},inverse:o.noop,fn:o.program(2,g,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n  <li "),b.buffer.push(n(c.action.call(a,"playNow",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-play">Play now</span>\n  </li>\n  '),d=c["if"].call(a,"hasAlbum",{hash:{},hashTypes:{},hashContexts:{},inverse:o.noop,fn:o.program(4,h,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n  "),d=c["if"].call(a,"hasIndex",{hash:{},hashTypes:{},hashContexts:{},inverse:o.noop,fn:o.program(6,i,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n</ul>\n"),e}function g(a,b){var d="";return b.buffer.push("\n  <li "),b.buffer.push(n(c.action.call(a,"queueNext",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-clock">Queue next</span>\n  </li>\n  '),d}function h(a,b){var d,e="";return b.buffer.push("\n  <li "),b.buffer.push(n(c.action.call(a,"playAlbum",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-record">Play album <i>'),d=c._triageMustache.call(a,"selected.album",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("</i></span>\n  </li>\n  "),e}function i(a,b){var d="";return b.buffer.push("\n  <li "),b.buffer.push(n(c.action.call(a,"removeFromQueue",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-prohibited">Remove from queue</span>\n  </li>\n  '),d}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var j,k,l,m="",n=this.escapeExpression,o=this,p=c.helperMissing;return k=c["modal-dialog"]||b&&b["modal-dialog"],l={hash:{action:"close",isOpen:"isOpen"},hashTypes:{action:"STRING",isOpen:"ID"},hashContexts:{action:b,isOpen:b},inverse:o.noop,fn:o.program(1,f,e),contexts:[],types:[],data:e},j=k?k.call(b,l):p.call(b,"modal-dialog",l),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n"),m}),Ember.TEMPLATES["modal-utilities"]=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e="";return b.buffer.push("\n"),d=c["if"].call(a,"confirmReboot",{hash:{},hashTypes:{},hashContexts:{},inverse:n.noop,fn:n.program(2,g,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n"),d=c["if"].call(a,"confirmClearSearch",{hash:{},hashTypes:{},hashContexts:{},inverse:n.noop,fn:n.program(4,h,b),contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("\n"),e}function g(a,b){var d="";return b.buffer.push('\n<h3>Reboot system</h3>\n<ul class="modal-menu">\n  <li '),b.buffer.push(m(c.action.call(a,"systemReboot",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-refresh">Confirm reboot</span>\n  </li>\n</ul>\n'),d}function h(a,b){var d="";return b.buffer.push('\n<h3>Clear search cache</h3>\n<ul class="modal-menu">\n  <li '),b.buffer.push(m(c.action.call(a,"clearSearch",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["STRING"],data:b}))),b.buffer.push('>\n    <span class="menu-item fi-refresh">Confirm clear</span>\n  </li>\n</ul>\n'),d}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var i,j,k,l="",m=this.escapeExpression,n=this,o=c.helperMissing;return j=c["modal-dialog"]||b&&b["modal-dialog"],k={hash:{action:"close",isOpen:"isOpen"},hashTypes:{action:"STRING",isOpen:"ID"},hashContexts:{action:b,isOpen:b},inverse:n.noop,fn:n.program(1,f,e),contexts:[],types:[],data:e},i=j?j.call(b,k):o.call(b,"modal-dialog",k),(i||0===i)&&e.buffer.push(i),e.buffer.push("\n"),l}),Ember.TEMPLATES.navigation=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e,f="";return b.buffer.push("\n      "),b.buffer.push(o((d=c["link-to"]||a&&a["link-to"],e={hash:{"class":"menu-item fi-magnifying-glass"},hashTypes:{"class":"STRING"},hashContexts:{"class":a},contexts:[a,a],types:["STRING","STRING"],data:b},d?d.call(a,"Search","search",e):n.call(a,"link-to","Search","search",e)))),b.buffer.push("\n    "),f}function g(a,b){var d,e,f="";return b.buffer.push("\n      "),b.buffer.push(o((d=c["link-to"]||a&&a["link-to"],e={hash:{"class":"menu-item fi-wrench"},hashTypes:{"class":"STRING"},hashContexts:{"class":a},contexts:[a,a],types:["STRING","STRING"],data:b},d?d.call(a,"Utilities","utilities",e):n.call(a,"link-to","Utilities","utilities",e)))),b.buffer.push("\n    "),f}function h(a,b){var d,e,f="";return b.buffer.push("\n      "),b.buffer.push(o((d=c["link-to"]||a&&a["link-to"],e={hash:{"class":"menu-item fi-sound"},hashTypes:{"class":"STRING"},hashContexts:{"class":a},contexts:[a,a],types:["STRING","STRING"],data:b},d?d.call(a,"Now Playing","playlist",e):n.call(a,"link-to","Now Playing","playlist",e)))),b.buffer.push("\n    "),f}function i(a,b){var d,e,f="";return b.buffer.push("\n      "),b.buffer.push(o((d=c["link-to"]||a&&a["link-to"],e={hash:{"class":"menu-item fi-home"},hashTypes:{"class":"STRING"},hashContexts:{"class":a},contexts:[a,a],types:["STRING","STRING"],data:b},d?d.call(a,"Home","index",e):n.call(a,"link-to","Home","index",e)))),b.buffer.push("\n    "),f}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var j,k,l,m="",n=c.helperMissing,o=this.escapeExpression,p=this;return e.buffer.push("  <nav "),e.buffer.push(o(c["bind-attr"].call(b,{hash:{"class":":menu view.isOpen:open:closed isPlaying:playing"},hashTypes:{"class":"STRING"},hashContexts:{"class":b},contexts:[],types:[],data:e}))),e.buffer.push('>\n  <div class="overlay"></div>\n  <ul class="navigation">\n    <li>\n    '),j=c["if"].call(b,"isConnected",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,f,e),contexts:[b],types:["ID"],data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n    </li>\n    <li>\n    "),j=c["if"].call(b,"isConnected",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(3,g,e),contexts:[b],types:["ID"],data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n    </li>\n    <li>\n      "),e.buffer.push(o((k=c["link-to"]||b&&b["link-to"],l={hash:{"class":"menu-item fi-power"},hashTypes:{"class":"STRING"},hashContexts:{"class":b},contexts:[b,b],types:["STRING","STRING"],data:e},k?k.call(b,"Connect","connect",l):n.call(b,"link-to","Connect","connect",l)))),e.buffer.push("\n    </li>\n    <li>\n    "),j=c["if"].call(b,"isPlaying",{hash:{},hashTypes:{},hashContexts:{},inverse:p.program(7,i,e),fn:p.program(5,h,e),contexts:[b],types:["ID"],data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push('\n    </li>\n  </ul>\n  <ul class="transport">\n    <li>\n      <span class="menu-item fi-next" '),e.buffer.push(o(c.action.call(b,"playerNext",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('></span>\n    </li>\n    <li>\n      <span class="menu-item fi-pause" '),e.buffer.push(o(c.action.call(b,"playerPause",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('></span>\n    </li>\n    <li>\n      <span class="menu-item fi-stop" '),e.buffer.push(o(c.action.call(b,"playerStop",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('></span>\n    </li>\n  </ul>\n  <button class="menu-toggle">\n    <span class="ellipse">\n      <i class="dot top"></i>\n      <i class="dot middle"></i>\n      <i class="dot bottom"></i>\n    </span>\n  </button>\n</nav>\n'),m}),Ember.TEMPLATES.playlist=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){var d,e="";return b.buffer.push("<h3><span>"),d=c._triageMustache.call(a,"nowplaying.label",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("</span></h3>"),e}function g(a,b){var d,e="";return b.buffer.push("<h5><span>"),d=c._triageMustache.call(a,"nowplaying.title",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("</span></h5>"),e}function h(a,b){var d,e="";return b.buffer.push("\n      <li "),b.buffer.push(l(c.action.call(a,"openModal","",{hash:{},hashTypes:{},hashContexts:{},contexts:[a,a],types:["STRING","ID"],data:b}))),b.buffer.push('>\n        <span class="label">'),d=c._triageMustache.call(a,"value",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("</span>\n      </li>\n    "),e}function i(a,b){b.buffer.push('\n      <li class="empty-list">\n        <h2 class="label">Playlist Empty</h2>\n        <i class="icon fi-sound"></i>\n      </li>\n    ')}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var j,k="",l=this.escapeExpression,m=this;return e.buffer.push('<div class="playlist fade-in">\n  <header class="current">\n    <figure class="fanart">\n      <div class="thumb" '),e.buffer.push(l(c["bind-attr"].call(b,{hash:{style:"fanart"},hashTypes:{style:"STRING"},hashContexts:{style:b},contexts:[],types:[],data:e}))),e.buffer.push('></div>\n    </figure>\n    <div class="label">\n      '),j=c["if"].call(b,"nowplaying.label",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(1,f,e),contexts:[b],types:["ID"],data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n      "),j=c["if"].call(b,"nowplaying.title",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(3,g,e),contexts:[b],types:["ID"],data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push('\n    </div>\n  </header>\n  <ol class="list numbered">\n    '),j=c.each.call(b,{hash:{},hashTypes:{},hashContexts:{},inverse:m.program(7,i,e),fn:m.program(5,h,e),contexts:[],types:[],data:e}),(j||0===j)&&e.buffer.push(j),e.buffer.push("\n  </ol>\n</div>\n"),k}),Ember.TEMPLATES.search=Ember.Handlebars.template(function(a,b,c,d,e){function f(a,b){b.buffer.push("<h3>Albums</h3>")}function g(a,b){var d,e="";return b.buffer.push("\n      <li "),b.buffer.push(o(c.action.call(a,"openModal","",{hash:{},hashTypes:{},hashContexts:{},contexts:[a,a],types:["STRING","ID"],data:b}))),b.buffer.push('>\n        <span class="label">'),d=c._triageMustache.call(a,"value",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:b}),(d||0===d)&&b.buffer.push(d),b.buffer.push("</span>\n      </li>\n    "),e}function h(a,b){b.buffer.push("<h3>Music Videos</h3>")}function i(a,b){b.buffer.push("<h3>Movies</h3>")}function j(a,b){b.buffer.push("<h3>Episodes</h3>")}this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var k,l,m,n="",o=this.escapeExpression,p=c.helperMissing,q=this;return e.buffer.push('<div class="search fade-in">\n  <form class="search-form" autocapitalize="off" autocorrect="off" autocomplete="off" '),e.buffer.push(o(c.action.call(b,"search",{hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:b},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('>\n    <label class="fi-magnifying-glass">\n      '),e.buffer.push(o((l=c["search-field"]||b&&b["search-field"],m={hash:{value:"searchInput",placeholder:"Search all libraries"},hashTypes:{value:"ID",placeholder:"STRING"},hashContexts:{value:b,placeholder:b},contexts:[],types:[],data:e},l?l.call(b,m):p.call(b,"search-field",m)))),e.buffer.push("\n    </label>\n  </form>\n  "),k=c["if"].call(b,"albumResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(1,f,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push('\n  <ul class="list">\n    '),k=c.each.call(b,"albumResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(3,g,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push("\n  </ul>\n  "),k=c["if"].call(b,"musicVideoResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(5,h,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push('\n  <ul class="list">\n    '),k=c.each.call(b,"musicVideoResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(3,g,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push("\n  </ul>\n  "),k=c["if"].call(b,"movieResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(7,i,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push('\n  <ul class="list">\n    '),k=c.each.call(b,"movieResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(3,g,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push("\n  </ul>\n  "),k=c["if"].call(b,"episodeResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(9,j,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push('\n  <ul class="list">\n    '),k=c.each.call(b,"episodeResults",{hash:{},hashTypes:{},hashContexts:{},inverse:q.noop,fn:q.program(3,g,e),contexts:[b],types:["ID"],data:e}),(k||0===k)&&e.buffer.push(k),e.buffer.push("\n  </ul>\n</div>\n"),n}),Ember.TEMPLATES.utilities=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f="",g=this.escapeExpression;return e.buffer.push('<div class="utilities fade-in">\n  <header class="header">\n    <h2><i class="fi-wrench"></i> Utilities</h2>\n  </header>\n  <ul class="list">\n    <li '),e.buffer.push(g(c.action.call(b,"videoLibraryScan",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('>\n      <span class="label"><i class="fi-video list-icon"></i> Update video library</span>\n    </li>\n    <li '),e.buffer.push(g(c.action.call(b,"audioLibraryScan",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('>\n      <span class="label"><i class="fi-music list-icon"></i> Update audio library</span>\n    </li>\n    <li '),e.buffer.push(g(c.action.call(b,"setFullscreen",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('>\n      <span class="label"><i class="fi-arrows-out list-icon"></i> Set fullscreen</span>\n    </li>\n    <li '),e.buffer.push(g(c.action.call(b,"inputClose",{hash:{},hashTypes:{},hashContexts:{},contexts:[b],types:["STRING"],data:e}))),e.buffer.push('>\n      <span class="label"><i class="fi-x list-icon"></i> Close on-screen window</span>\n    </li>\n    <li '),e.buffer.push(g(c.action.call(b,"openModal","systemReboot",{hash:{},hashTypes:{},hashContexts:{},contexts:[b,b],types:["STRING","STRING"],data:e}))),e.buffer.push('>\n      <span class="label"><i class="fi-refresh list-icon"></i> Reboot system</span>\n    </li>\n    <li '),e.buffer.push(g(c.action.call(b,"openModal","clearSearch",{hash:{},hashTypes:{},hashContexts:{},contexts:[b,b],types:["STRING","STRING"],data:e}))),e.buffer.push('>\n      <span class="label"><i class="fi-magnifying-glass list-icon"></i> Clear search cache</span>\n    </li>\n  </ul>\n</div>\n'),f});
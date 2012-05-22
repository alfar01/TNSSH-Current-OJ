/***********************************************
* com.bydust.ajax - (c) byDust code library (www.bydust.com)
* This notice MUST stay intact for legal use
* Author: Nick Van der Vreken
* More information: http://www.bydust.com/ajaxed-website-automatically-convert-to-ajax-website-combydustajax/
* Online documentation: http://www.bydust.com/example/com.bydust.ajax/
* use:

<script type="text/javascript" src="js/com.bydust.array.js"></script>
<script type="text/javascript" src="js/com.bydust.ajax.js"></script>

window.onload = function(){
	var refreshed_content = Array('!content','sidebar');
	bda.start(refreshed_content);
}

where "content" is your primary content area and sidebar a secondary one.
see the online documentation for more information about implementation of the script.

***********************************************/


function Delegate() {}
Delegate.create = function (o, f) {
	var a = new Array() ;
	var l = arguments.length ;
	for(var i = 2 ; i < l ; i++) a[i - 2] = arguments[i] ;
	return function() {
		var aP = [].concat(arguments, a) ;
		f.apply(o, aP);
	}
}

// Tween core
Tween = function(obj, prop, func, begin, finish, duration, suffixe){this.init(obj, prop, func, begin, finish, duration, suffixe)}
var t = Tween.prototype;
t.obj = new Object();
t.prop='';
t.func = function (t, b, c, d) { return c*t/d + b; };
t.begin = 0;
t.change = 0;
t.prevTime = 0;
t.prevPos = 0;
t.looping = false;
t._duration = 0;
t._time = 0;
t._pos = 0;
t._position = 0;
t._startTime = 0;
t._finish = 0;
t.name = '';
t.suffixe = '';
t._listeners = new Array();	
t.setTime = function(t){ this.prevTime = this._time; if (t > this.getDuration()) { if (this.looping) { this.rewind (t - this._duration); this.update(); this.broadcastMessage('onMotionLooped',{target:this,type:'onMotionLooped'}); } else { this._time = this._duration; this.update(); this.stop(); this.broadcastMessage('onMotionFinished',{target:this,type:'onMotionFinished'}); } } else if (t < 0) { this.rewind(); this.update(); } else { this._time = t; this.update(); } } 
t.getTime = function(){ return this._time; } 
t.setDuration = function(d){ this._duration = (d == null || d <= 0) ? 100000 : d; } 
t.getDuration = function(){ return this._duration; } 
t.setPosition = function(p){ this.prevPos = this._pos; var a = this.suffixe != '' ? this.suffixe : ''; this.obj[this.prop] = Math.round(p) + a; this._pos = p; this.broadcastMessage('onMotionChanged',{target:this,type:'onMotionChanged'}); } 
t.getPosition = function(t){ if (t == undefined) t = this._time; return this.func(t, this.begin, this.change, this._duration); }; 
t.setFinish = function(f){ this.change = f - this.begin; }; 
t.geFinish = function(){ return this.begin + this.change; }; 
t.init = function(obj, prop, func, begin, finish, duration, suffixe){ if (!arguments.length) return; this._listeners = new Array(); this.addListener(this); if(suffixe) this.suffixe = suffixe; this.obj = obj; this.prop = prop; this.begin = begin; this._pos = begin; this.setDuration(duration); if (func!=null && func!='') { this.func = func; } this.setFinish(finish); } 
t.start = function(){ this.rewind(); this.startEnterFrame(); this.broadcastMessage('onMotionStarted',{target:this,type:'onMotionStarted'});} 
t.rewind = function(t){ this.stop(); this._time = (t == undefined) ? 0 : t; this.fixTime(); this.update(); } 
t.fforward = function(){ this._time = this._duration; this.fixTime(); this.update(); } 
t.update = function(){ this.setPosition(this.getPosition(this._time)); } 
t.startEnterFrame = function(){ this.stopEnterFrame(); this.isPlaying = true; this.onEnterFrame(); } 
t.onEnterFrame = function(){ if(this.isPlaying) { this.nextFrame(); setTimeout(Delegate.create(this, this.onEnterFrame), 0); } } 
t.nextFrame = function(){ this.setTime((this.getTimer() - this._startTime) / 1000); } 
t.stop = function(){ this.stopEnterFrame(); this.broadcastMessage('onMotionStopped',{target:this,type:'onMotionStopped'}); } 
t.stopEnterFrame = function(){ this.isPlaying = false; } 
t.continueTo = function(finish, duration){ this.begin = this._pos; this.setFinish(finish); if (this._duration != undefined) this.setDuration(duration); this.start(); } 
t.resume = function(){ this.fixTime(); this.startEnterFrame(); this.broadcastMessage('onMotionResumed',{target:this,type:'onMotionResumed'}); } 
t.yoyo = function (){ this.continueTo(this.begin,this._time); } 
t.addListener = function(o){ this.removeListener (o); return this._listeners.push(o); } 
t.removeListener = function(o){ var a = this._listeners;	 var i = a.length; while (i--) { if (a[i] == o) { a.splice (i, 1); return true; } } return false; } 
t.broadcastMessage = function(){ var arr = new Array(); for(var i = 0; i < arguments.length; i++){ arr.push(arguments[i]) } var e = arr.shift(); var a = this._listeners; var l = a.length; for (var i=0; i<l; i++){ if(a[i][e]) a[i][e].apply(a[i], arr); } }
t.fixTime = function(){ this._startTime = this.getTimer() - this._time * 1000; } 
t.getTimer = function(){ return new Date().getTime() - this._time; }

// Tween types
Tween.backEaseIn = function(t,b,c,d,a,p){ if (s == undefined) var s = 1.70158; return c*(t/=d)*t*((s+1)*t - s) + b; } 
Tween.backEaseOut = function(t,b,c,d,a,p){ if (s == undefined) var s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; } 
Tween.backEaseInOut = function(t,b,c,d,a,p){ if (s == undefined) var s = 1.70158;  if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b; return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b; } 
Tween.elasticEaseIn = function(t,b,c,d,a,p){ if (t==0) return b;   if ((t/=d)==1) return b+c;   if (!p) p=d*.3; if (!a || a < Math.abs(c)) { a=c; var s=p/4; } else  var s = p/(2*Math.PI) * Math.asin (c/a); return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b; } 
Tween.elasticEaseOut = function (t,b,c,d,a,p){ if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3; if (!a || a < Math.abs(c)) { a=c; var s=p/4; } else var s = p/(2*Math.PI) * Math.asin (c/a); return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b); } 
Tween.elasticEaseInOut = function (t,b,c,d,a,p){ if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) var p=d*(.3*1.5); if (!a || a < Math.abs(c)) {var a=c; var s=p/4; } else var s = p/(2*Math.PI) * Math.asin (c/a); if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b; return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b; } 
Tween.bounceEaseOut = function(t,b,c,d){ if ((t/=d) < (1/2.75)) { return c*(7.5625*t*t) + b; } else if (t < (2/2.75)) { return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b; } else if (t < (2.5/2.75)) { return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b; } else { return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b; } } 
Tween.bounceEaseIn = function(t,b,c,d){ return c - Tween.bounceEaseOut (d-t, 0, c, d) + b; } 
Tween.bounceEaseInOut = function(t,b,c,d){ if (t < d/2) return Tween.bounceEaseIn (t*2, 0, c, d) * .5 + b; else return Tween.bounceEaseOut (t*2-d, 0, c, d) * .5 + c*.5 + b; } 
Tween.strongEaseInOut = function(t,b,c,d){ return c*(t/=d)*t*t*t*t + b; } 
Tween.regularEaseIn = function(t,b,c,d){ return c*(t/=d)*t + b; } 
Tween.regularEaseOut = function(t,b,c,d){ return -c *(t/=d)*(t-2) + b; } 
Tween.regularEaseInOut = function(t,b,c,d){ if ((t/=d/2) < 1) return c/2*t*t + b; return -c/2 * ((--t)*(t-2) - 1) + b; }
Tween.strongEaseIn = function(t,b,c,d){ return c*(t/=d)*t*t*t*t + b; }
Tween.strongEaseOut = function(t,b,c,d){ return c*((t=t/d-1)*t*t*t*t + 1) + b; }
Tween.strongEaseInOut = function(t,b,c,d){  if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;  return c/2*((t-=2)*t*t*t*t + 2) + b;  }
	
// Tween opacity 
OpacityTween.prototype = new Tween(); OpacityTween.prototype.constructor = Tween; OpacityTween.superclass = Tween.prototype; function OpacityTween(obj,func,fromOpacity,toOpacity,duration){ this.targetObject = obj; this.init(new Object(),'x',func,fromOpacity,toOpacity,duration); } var o = OpacityTween.prototype; o.targetObject = {}; o.onMotionChanged = function(evt){ var v = evt.target._pos; var t = this.targetObject; t.style['opacity'] = v / 100; t.style['-moz-opacity'] = v / 100; if(t.filters) t.filters.alpha['opacity'] = v; }

var bda = {
	ajaxURL : null,
	calculateText : 'Parsing images and other content...',
	currentLoad : 0,
	denyFormRules : Array(),
	denyURLRules : Array(),
	disallowedExt : new Array('zip','rar','jpg','png','jpeg','gif','bmp','tar','iso','img','exe','rss','pdf','ai','psd','txt','dwt'),
	debugMode : 'off',
	debugLog : document.createElement('ol'),
	errorText : '<h1>The page could not be found</h1><p>The page or data you requested could not be retrieved from the server. The server could be down or you could have a problem with your internet connection.</p>',
	eventListeners : new Array(),
	externalLocation : "<h1>External location</h1><p>I can't parse content from the retrieved data.<br/>The page you requested will open in a new window, and you will <a href='javascript:history.go(-1);'>return to the previous page</a> shortly.<p>",
	externalLocationClick : '<p>Click here to open the requested page in a new window: [link]</p>',
	externalLocationTimeout : 5,
	fullDomain : '',
	historyCurrentLocation : '',
	imagesLoaded : new Array(),
	imageLoadTimeout : 20,
	imagesNotLoadedText : 'Some images could not be loaded.<br/>The page will display without these images.',
	isActive : true,
	isIE : false,
	loadText : 'Loading...',
	notifyRules : Array(),
	pageContent : '',
	primaryRegion : null,
	primaryId : '',
	primaryTween : null,
	secondaryRegions : Array(),
	secondaryIds : Array(),
	transitionTweenType: Tween.regularEaseOut,
	transitionAlpha : true,
	
	start : function(regions){
		if(this.debugMode.indexOf('list') > -1){
			this.debugLog.setAttribute('id','bda_debugLog');
			document.body.appendChild(this.debugLog);
		}
		
		if(navigator.appName.indexOf('Internet Explorer') != -1) this.isIE = true;
		
		if(this.getHTTPRequest()){
			if(regions == 'undefined' && this.regions.length == 0){
				alert('No regions set to refresh!');
			}else{
				for(var i = 0; i < regions.length; i++){
					if(regions[i].substr(0,1) == '!'){
						this.primaryRegion = bd$(regions[i].substr(1));
						this.primaryId = regions[i].substr(1);
					}else{
						this.secondaryRegions.push(bd$(regions[i]));
						this.secondaryIds.push(regions[i]);
					}
				}
				if(this.primaryRegion == null){
					alert('Please define the primary content region by putting an "!" in front of the id');
				}else{
					this.fixDOMObject(document);
					this.setContent(this.primaryRegion.innerHTML);
					this.primaryTween = new Tween(this.primaryRegion.style,'height',this.transitionTweenType,parseInt(this.primaryRegion.offsetHeight),parseInt(this.primaryRegion.offsetHeight),1,'px');
					this.primaryTween.onMotionFinished = function(){bda.triggerEventListeners('tween_complete',{})};
					this.primaryRegion.style.overflow = 'hidden';
					this.fullDomain = this.getDomain(this.getLocationAsString());
					this.historyCurrentLocation = this.getLocationAsString().split('#')[0];
					this.historyListener();
	
					/*
					if(this.isIE){
						// IE fixes
						var pr = this.primaryRegion.style;
						if(pr.width == null || pr.width == '' || pr.width == 'undefined') pr.width = 'auto';
						if(pr.height == null || pr.height == '' || pr.height == 'undefined') pr.height = 'auto';
						if(pr.position == null || pr.position == '' || pr.position == 'undefined') pr.position = 'relative';
					}
					*/
				}
			}
		}else{
			this.isActive = false;
		}
	},
	addEventListener : function(e, eventHandler){
		/*
		 * Adds custom eventhandlers, works crossbrowser
		 * 
		 * parameters: e ('error','load_begin','load_complete','tween_begin','tween_complete','state_changed'), eventHandler (Function)
		 * returns: nothing
		 */
		//alert('addEventListener' + e + '\n ' + eventHandler);
		if(!this.eventListeners[e]) this.eventListeners[e] = new Array();
		this.eventListeners[e].push(eventHandler);
	},
	triggerEventListeners : function(e,parameters){
		/*
		 * Triggers custom eventhandlers, works crossbrowser
		 * 
		 * parameters: e (Event), parameters(Array)
		 * returns: nothing
		 */
		if(!this.eventListeners[e]) return;
		var f_parameters = new Array();
		for(var i in parameters) f_parameters.push(i + ":parameters['" + i + "']");
		//this.debug('event: ' + e, 'f_parameters: ' + f_parameters, 'eventListeners: ' + this.eventListeners[e]);
		for(var eventHandler = 0; eventHandler < this.eventListeners[e].length; eventHandler++){
			var f = this.eventListeners[e][eventHandler] + '({' + f_parameters.join(',') + '});';
			eval(f);
		}
	},
	ajaxRequest : function(url, parameters, requesttype, onlyNotify, urlToLoadWhenReady) {
		if(!url){
			if(bda.ajaxURL) {
				if(http_request.readyState != 4) return;
				url = bda.ajaxURL;
				bda.ajaxURL = null;
			}else return;
		}
		clearInterval(bda.currentLoad);
		bda.debug('executing ajaxRequest', arguments);
		if(!parameters) parameters = '';
		if(!onlyNotify) onlyNotify = false;
		if(urlToLoadWhenReady) bda.ajaxURL = urlToLoadWhenReady;
		if(!('GET,get,POST,post'.contains(requesttype))) requesttype = 'GET';
		if(requesttype == 'GET' && parameters && parameters.length > 2) url += url.contains('?')?'&' + parameters:'?' + parameters;
		
		this.debug('ajaxRequest', arguments);
		
		if(bda.debugMode.indexOf('nocache') > -1) url += url.contains('?')?'&bda_debug_random=' + Math.random():'?bda_debug_random=' + Math.random();
		if(url != bda.historyCurrentLocation && !onlyNotify){
			document.location = bda.getLocationAsString().split('#')[0] + '#/' + url.substr(bda.fullDomain.length);
			bda.historyCurrentLocation = url;
		}
		bda.triggerEventListeners('load_begin',{url:url, parameters:parameters, requesttype:requesttype});
		http_request = false;
		bda.getHTTPRequest();
		http_request.open(requesttype, url, true);
		http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http_request.setRequestHeader("Content-length", parameters.length);
		http_request.setRequestHeader("Connection", "close");
		/*
		if(!onlyNotify || (onlyNotify && urlToLoadWhenReady)){
			if(urlToLoadWhenReady){
				bda.debug('will notify ' + url, 'will load ' + urlToLoadWhenReady + ' when notify completes');
				http_request.onreadystatechange = bda.ajaxRequest;
			}else{
				bda.debug('will execute ajaxReady when ' + url + ' loads');
				http_request.onreadystatechange = bda.ajaxReady;
			}
		}*/
		if(!onlyNotify) 
			http_request.onreadystatechange = bda.ajaxReady;
		//else 
			//http_request.onreadystatechange = bda.ajaxRequest(bda.historyCurrentLocation);
		
		//try{
			http_request.send(parameters);
		//}catch(e){bda.debug('ajaxRequest send catched', arguments);}
	},
	ajaxReady : function() {
		try{
		if (http_request.readyState == 4) {
		//bda.debug('executing ajaxReady');
		 if (http_request.status == 200) {
			bda.pageContent = http_request.responseText;
			bda.preloadImages(bda.pageContent);
		 } else {
			bda.setState('error',http_request.status);
			bda.triggerEventListeners('error',{url:bda.historyCurrentLocation, bda_function:'ajaxReady', message:'Could not load page ' + bda.historyCurrentLocation});
		 }
		}
		}catch(e){bda.debug('ajaxReady had a little error.');}
	},
	allowForLink : function(url){
		if(!url) return false;
		for(var i = 0; i < this.denyURLRules.length; i++) if(eval(this.denyURLRules[i])) return false;
		if(url.contains('bda_ignore')) return false;
		return true;
	},
	allowForForm : function(action){
		for(var i = 0; i < this.denyFormRules.length; i++) if(eval(this.denyFormRules[i])) return false;
		if(action.contains('bda_ignore')) return false;
		return true;
	},
	debug : function(){
		if(this.debugMode == 'off') return;
		var time = new Date();
		var t = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ':' + time.getMilliseconds();
		var jsa = 'DEBUG:';
		var lst =  t+ ' :: ';
		for (var i = 0; i < arguments.length; i++) {
			jsa += '\n ' + arguments[i];
			lst += arguments[i] + '<br/>';
		}
		if(this.debugMode.indexOf('alert') > -1) alert(jsa);
		if(this.debugMode.indexOf('list') > -1){
			var l = document.createElement('li');
			l.innerHTML = lst + String.fromCharCode(10);
			this.debugLog.appendChild(l);
		}
		try{
			if((this.debugMode.indexOf('console') > -1)) console.info(t,arguments);
		}catch(e){};
	},
	debugClear : function(){
		while(this.debugLog.childNodes.length > 0){
			this.debugLog.removeChild(this.debugLog.firstChild);
		}
	},
	fixDOMObject : function(obj){
		/*
		 * Changes links and forms in a DOM-object so they would use our ajax-script.
		 * 
		 * parameters: DOM-object
		 * returns: nothing
		 */
		var links = obj.getElementsByTagName('a');
		var forms = obj.getElementsByTagName('form');
		var loc = this.getDomain(this.getLocationAsString());
		
		// links
		for(var i = 0; i<links.length; i++){
			var currentLink = links[i];
			var currentAllowExt = (this.disallowedExt.indexOf(this.getFileExt(currentLink.href)) == -1)?true:false;
			var currentDomain = this.getDomain(currentLink.href);
			var currentAllow = this.allowForLink(currentLink.href);
			
			//this.debug('currentLink: ' + currentLink, 'currentAllow: ' + currentAllow, 'currentAllowedExt: ' + currentAllowExt, 'currentDomain: ' + currentDomain);

			if(currentLink.href.indexOf('bda_ignore') == -1 && currentLink.className.indexOf('bda_ignore') == -1){
				if((currentLink.href != '') && (currentLink.href != null) && currentAllow && currentAllowExt && (loc == currentDomain)){
					if(this.isIE) currentLink.setAttribute('href',"javascript:bda.getURL('" + currentLink.href + "');");
					else currentLink.setAttribute('onclick','bda.getURL(this.href); return false;');
				}else if((loc != currentDomain) || !currentAllowExt){
					currentLink.target = '_blank';
				}else if(currentLink.href.substr(0,1) == '#'){
					currentLink.removeAttribute('href');
				}
			}
		}
		
		//forms
		for(var i = 0; i < forms.length; i++){
			var currentForm = forms[i];
			var currentAllow = this.allowForForm(currentForm.action);
			if((currentForm.action != null) && (currentForm.action != '') && currentAllow){
				if(currentForm.id == null || currentForm.id == '') currentForm.id = 'bda_' + i;
				currentForm.setAttribute('onsubmit',"bda.postForm(this); return false;");
			}
		}
	},
	fixStringObject : function(str){
		/*
		 * Changes links and forms in a String-object so they would use our ajax-script.
		 * 
		 * parameters: String
		 * returns: String
		 */
		var input = str.replace('<A ','<a ').replace('<FORM ','<form ').replace('<IMG ','<img ');
		var loc = this.getDomain(this.getLocationAsString());
		var output = '';
		
		// links
		while(input.indexOf('<a ') > -1){
			var markBegin = input.indexOf('<a ');
			var markEnd = input.substr(markBegin).indexOf('>') + markBegin;
			
			var currentLink = input.substring(markBegin,markEnd + 1);
			var currentHref = this.getStringTagAttribute(currentLink,'href');
			var currentAllowExt = (this.disallowedExt.indexOf(this.getFileExt(currentHref)) == -1)?true:false;
			var currentDomain = this.getDomain(currentHref);
			var currentAllow = this.allowForLink(currentHref);
			
			//this.debug('currentLink: ' + currentLink, 'currentAllow: ' + currentAllow, 'currentAllowedExt: ' + currentAllowExt, 'currentDomain: ' + currentDomain);
			if(currentLink.indexOf('bda_ignore') == -1){
				if((currentHref != null) && currentAllow && currentAllowExt && (loc == currentDomain)){
					currentLink = this.setStringTagAttribute(currentLink,'onclick','bda.getURL(this.href); return false;');
					//currentLink = this.fixStringLink(currentLink);
				}else if((loc != currentDomain) || !currentAllowExt){
					currentLink = this.setStringTagAttribute(currentLink,'target','_blank',false);
				}else if(currentHref.substr(0,1) == '#'){
					currentLink = this.removeStringTagAttribute(currentLink,'href');
				}
			}
					
			output += input.substring(0,markBegin);
			output += currentLink;
			input = input.substr(markEnd + 1);
		}
		output += input;
		
		//forms
		input = output;
		output = '';
		while(input.indexOf('<form ') > -1){
			var markBegin = input.indexOf('<form ');
			var markEnd = input.substr(markBegin).indexOf('>') + markBegin;
			
			var currentForm = input.substring(markBegin,markEnd + 1);
			var currentAction = this.getStringTagAttribute(currentForm,'action');
			var currentId = this.getStringTagAttribute(currentForm,'id');
			var currentAllow = (currentAction != null)?this.allowForForm(currentAction):false;
			var currentDomain = this.getDomain(currentAction);

			
			//this.debug('currentAllow: ' + currentAllow, 'currentAction: ' + currentAction, 'currentDomain: ' + currentDomain);
			
			if(currentAllow){
				if(currentId == null) currentForm = this.setStringTagAttribute(currentForm,'id','bda_' + markBegin);
				//currentForm = this.setStringTagAttribute(currentForm,'onsubmit',"bda.postForm(this.action,this.id); return false;");
				currentForm = this.setStringTagAttribute(currentForm,'onsubmit',"bda.postForm(this); return false;");
			}
			
			output += input.substring(0,markBegin);
			output += currentForm;
			input = input.substr(markEnd + 1);
		}
		output += input;
		
		//images
		input = output;
		output = '';
		while(input.contains('<img ')){
			var markBegin = input.indexOf('<img ');
			var markEnd = input.substr(markBegin).indexOf('>') + markBegin;
			
			var currentImage = input.substring(markBegin,markEnd + 1);
			var currentSource = this.getAbsoluteURL(this.getCurrentLocation(), this.getStringTagAttribute(currentImage,'src'));
			var currentWidth = this.getStringTagAttribute(currentImage,'width');
			var currentHeight = this.getStringTagAttribute(currentImage,'height');
			var currentRes = this.getImageResolution(currentSource);
			
			if(currentRes.width == 0 || currentRes.height == 0) currentRes = this.getImageResolution(currentSource);
						
			//this.debug('currentImage: ' + currentImage, 'currentSource: ' + currentSource, 'currentWidth: ' + currentWidth, 'currentHeight: ' + currentHeight, 'objectWidth: ' + currentRes.width, 'objectHeight: ' + currentRes.height);
			
			if(currentWidth == null && currentHeight == null){
				currentImage = this.setStringTagAttribute(currentImage,'width',currentRes.width);
				currentImage = this.setStringTagAttribute(currentImage,'height',currentRes.height);
			}else if(currentWidth == null && currentHeight != null){
				currentImage = this.setStringTagAttribute(currentImage,'width',Math.round(currentRes.width*(currentHeight/currentRes.height)));
			}else if(currentWidth != null && currentHeight == null){
				currentImage = this.setStringTagAttribute(currentImage,'height',Math.round(currentRes.height*(currentWidth/currentRes.width)));
			}
					
			output += input.substring(0,markBegin);
			output += currentImage;
			input = input.substr(markEnd + 1);
		}
		output += input;
		
		return output;
	},
	historyListener : function(){
		/*
		 * Handles browser history changes
		 * 
		 * parameters: nothing
		 * returns: nothing
		 */
		var hl = setInterval(function(){
			if(bda.getCurrentLocation() != bda.historyCurrentLocation && !bda.getCurrentLocation().contains('#')) {
				bda.getURL(bda.getCurrentLocation());
			}
		},500);
	},
	get : function(url, parameters){
		/*
		 * Orders a "GET" request with the given url and parameters
		 * 
		 * parameters: url(String), parameters(Array)
		 * returns: nothing
		 */
		if(parameters == 'undefined' || parameters == null) parameters = '';
		this.ajaxRequest(url,parameters,'GET');
	},
	getChildElements : function(obj){
		/*
		 * Returns an array of ALL ( children of children included ) child elements of a DOM-object
		 * 
		 * parameters: DOM-object
		 * returns: Array with DOM-elements
		 */
		var elements = Array();
		if(obj != null){
			for(var e = 0; e < obj.childNodes.length; e++){
				if(obj[e] != null){
					elements.push(obj[e]);
					elements.join(this.getChildElements(obj[e]));
				}
			}
		}
		return elements;
	},
	getCurrentLocation : function(){
		/*
		 * Returns the raw URL of our current location
		 * 
		 * parameters: nothing
		 * returns: String
		 */
		var after = this.getLocationAsString().split('#')[1];
		if(this.getLocationAsString().indexOf('#') != -1 && (after.substr(0,1) == '/' || after.substr(0,1) == '?')){
			return this.fullDomain + this.getLocationAsString().split('#')[1].substr(1);
		}else{
			return this.getLocationAsString();
		}
	},
	getDomain : function(url){
		/*
		 * Returns the domain of a given url, for example "bydust.com"
		 * If it can't find a valid domain in the given url, it'll return the current domain
		 * 
		 * parameters: url(String)
		 * returns: domain(String)
		 */
		if(!url) return 'http://www.unknowndomain.com/';
		var domain = url.split('/');
		if(domain[0].substr(domain[0].length - 1, 1) == ':' && domain[1] == ''){
			return domain[0] + '//' + domain[2] + '/';
		}else{
			return this.getDomain(this.getLocationAsString());
		}
	},
	getLocationAsString : function(){
		/*
		 * Returns the document.location
		 * 
		 * parameters: nothing
		 * returns: location(String)
		 */
		try{
			//document.write('<br/>start getLocationAsString');
			var loc = '' + document.location;
			//document.write('<br/>end getLocationAsString');
			return loc;
		}catch(e){
			alert('exception catched in bda.getLocationAsString. \n error: ' + e.description);
			//document.write('catch getLocationAsString');
		}
	},
	getFileExt : function(file){
		/*
		 * Returns the extension of a given filename
		 * If there's no valid extension, it'll return "unknown"
		 * 
		 * parameters: filename (String)
		 * returns: extension (String)
		 */
		if(!file) return 'unknown';
		var ext = file.toLowerCase().split('/').pop()
		if(ext.indexOf('.') == -1) return 'unknown';
		ext = ext.split('.').pop();
		ext = ext.split('?').shift();
		ext = ext.split('#').shift();
		if(ext == '') ext = 'unknown';
		return ext;
	},
	getHTTPRequest : function(){
		/*
		 * Creates a new HTTP-request in the http_request object
		 * 
		 * parameters: nothing
		 * returns: nothing
		 */
		try{
			if (window.XMLHttpRequest) {
				http_request = new XMLHttpRequest();
				if (http_request.overrideMimeType) http_request.overrideMimeType('text/html');
			} else if (window.ActiveXObject) {
				try {
					http_request = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					//document.write('catched');
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
				}
			}
			if (!http_request) return false;
			else return true;
		}catch(e){
			return false;
		}
	},
	getImageResolution : function(url){
		/*
		 * Returns an image object containing the image width and height
		 * 
		 * parameters: url (String)
		 * returns: Image-object   ( obj.height, obj.width )
		 */
		// werkt alleen als image ingeladen is 
		var newImg = new Image();
		newImg.src = url;
		return newImg;
	},
	getURL : function(url){
		/*
		 * Requests a given url
		 * 
		 * parameters: url (String)
		 * returns: nothing
		 */
		this.setState('loading');
		var fixedurl = url.split('#')[0];
		if(fixedurl.indexOf('://') == -1) fixedurl = this.getAbsoluteURL(this.getCurrentLocation(), fixedurl);
		this.get(fixedurl,'');
	},
	getAbsoluteURL : function(url_rel_from, url_rel_to){
		/*
		 * Calculates an absolute url for a relative url. Needs current location and relative link.
		 * If given an absolute link as the relative link parameter, the absolute link will be returned.
		 * 
		 * parameters: current location (String), (relative) link (String)
		 * returns: absolute link (String)
		 */
		if(!url_rel_to) return url_rel_from;
		if(!url_rel_from) return url_rel_to;
		var rf = url_rel_from.split('/');
		var rt = url_rel_to.split('/');
		if(url_rel_to.indexOf('://') > 2 && url_rel_to.indexOf('://') < 7) return url_rel_to;
		if(url_rel_to.substr(0,1) == '/') return this.fullDomain + url_rel_to.substr(1);
		if(url_rel_from.substr(url_rel_from.length - 1) != '/') rf.pop();
		for(var i = 0; i < rt.length; i++) if(rt[i] == '..') rf.pop();
		return rf.join('/') + '/' + rt.join('/');		
	},
	getStringTagAttribute : function(tag,attribute){
		/*
		 * Returns the value of the requested attribute in a tag(String)
		 * Returns null if the attribute isn't there or if its an empty value
		 * 
		 * parameters: tag (String), attribute (String)
		 * returns: value (String)
		 */
		if(tag.indexOf(attribute + '=') == -1) return null;
		 
		var markBegin = tag.indexOf(attribute + '=');
		var quotetype = tag.substr(markBegin + attribute.length + 1,1);
		var markEnd = tag.substr(markBegin + attribute.length + 2).indexOf(quotetype) + markBegin + attribute.length + 3;
		var value = tag.substring(markBegin + attribute.length + 2, markEnd - 1);
		return (value != '')?value:null;
	},
	getTitle : function(content){
		/*
		 * Returns the content document title
		 * 
		 * parameters: content (String)
		 * returns: title (String)
		 */
		content = content.replace('<TITLE>','<title>').replace('</TITLE>','</title>');
		var markBegin = content.indexOf('<title>');
		var markEnd = content.substr(markBegin + 7).indexOf('</title>') + markBegin + 7;
		return content.substring(markBegin + 7,markEnd);
	},
	outputPage : function(content){
		/*
		 * Inserts the new content in the page, fires the load_complete event and plays animations
		 * 
		 * parameters: content (String)
		 * returns: nothing
		 */
		//this.debug('Images loaded on output: ' + this.imagesLoaded.dump());
		if(content == null) content = this.pageContent;
		//primary
		var primary = content.substring(content.indexOf('<!-- begin ' + this.primaryId + ' -->'),content.indexOf('<!-- end ' + this.primaryId + ' -->'));
		var primaryContent = this.fixStringObject(primary);
		
		//errorcatching
		if(primary.length == 0){
			this.setState('error_location');
			window.open(this.historyCurrentLocation);
			this.triggerEventListeners('error',{url:this.historyCurrentLocation, message:'The received data could not be parsed. Most likely another website.', bda_function:'outputPage'});
			setTimeout('history.go(-1)',this.externalLocationTimeout*1000);
			return;
		}
		
		//secondary
		for(var i = 0; i < this.secondaryRegions.length; i++){
			var secondary = content.substring(content.indexOf('<!-- begin ' + this.secondaryIds[i] + ' -->'),content.indexOf('<!-- end ' + this.secondaryIds[i] + ' -->'));
			this.secondaryRegions[i].innerHTML = this.fixStringObject(secondary);
		}
		this.setTitle(this.getTitle(content));
		this.setContent(primaryContent);
		this.resetTransitionHeight();
		this.triggerEventListeners('load_complete',{url:this.historyCurrentLocation, content:content});
	},
	post : function(action,parameters){
		/*
		 * Orders a "POST"-request for the given url and parameters
		 * 
		 * parameters: url (String), parameters(Array)
		 * returns: nothing
		 */
		var onlyNotify = false;
		for(var i = 0; i < this.notifyRules.length; i++) if(eval(this.notifyRules[i])) onlyNotify = true;
		this.ajaxRequest(action, parameters, 'POST', onlyNotify, (onlyNotify)?this.historyCurrentLocation:null);
	},
	postForm : function(form, state){
		/*
		 * Posts a form to a given url, and sets the documents state
		 * 
		 * parameters: form (DOM-Object), state (String)(optional)
		 * returns: nothing
		 */
		//this.debug('postForm ' + url + ',' + form + ',' + state);
		if(this.isActive){
			var elements = form.elements;//this.getChildElements(form);
			var url = form.action;
			var content = '';
			bda.debug(elements);
			for(var i = 0; i < elements.length; i++){
				var e = elements[i];
				var t = e.tagName.toLowerCase();
				var n = (e.name)?e.name:e.id;
				bda.debug(e,n,e.value);
				if(t == 'input' && (e.type == 'text' || e.type == 'password' || e.type == 'hidden' || (e.checked && (e.type == 'checkbox' || e.type == 'radio')) )) content += n + "=" + e.value + "&";
				if(t == 'textarea') content += n + '=' + escape(e.value) + '&';
				if(t == 'select') content += n + "=" + e.options[e.selectedIndex].value + "&";
				if(t == 'input' && e.type == 'file'){
					form.onsubmit = null;
					form.submit();
					return false;
				}
			}
			if(form.method && form.method.toLowerCase() == 'get'){
				this.get(url,content);
			}else{
				this.post(url,content);
			}
			if(state != null) this.setState(state);
			else this.setState('loading');
		}else{
			form.submit();
		}
	},
	preloadImages : function(content){
		this.setState('calculating');
		var input = content.replace('<IMG ','<img ');
		this.imagesLoaded = Array();
		this.currentLoad = setInterval(function(){
			clearInterval(bda.currentLoad); 
			bda.setState('error_images');
			setTimeout('bda.outputPage()',4000);
		},this.imageLoadTimeout*1000);

		while(input.contains('<img ')){
			var markBegin = input.indexOf('<img ');
			var markEnd = input.substr(markBegin).indexOf('>') + markBegin;
			var currentImage = input.substring(markBegin,markEnd + 1);
			var currentSource = this.getAbsoluteURL(this.getCurrentLocation(), this.getStringTagAttribute(currentImage,'src'));
			
			if(!this.imagesLoaded.getKeys().contains(currentSource)){
				this.imagesLoaded.set(currentSource, false);
				this.preloadImage(currentSource);
			}
			
			input = input.substr(markEnd + 1);
		}
		
		//this.debug(this.imagesLoaded.dump());
		
		if(this.imagesLoaded.size() == 0){
			clearInterval(this.currentLoad);
			this.outputPage();
		}
	},
	preloadImage : function(url){
		var newImg = new Image();
		newImg.onload = function(){
			bda.imagesLoaded.set(url,true);
			//bda.debug('onload ' + this.src + ' : ' + bda.imagesLoaded.dump());
			for(var i in bda.imagesLoaded) if(!bda.imagesLoaded.get(i)) return false;
			clearInterval(bda.currentLoad);
			bda.outputPage();
			this.onload = null;
		};
		newImg.src = url;
	},
	fixStringLink : function(str){
		/*
		 * Applies the ajax-link to a given string
		 * 
		 * parameters: link (String)
		 * returns: link (String)
		 */
		var markBegin = str.indexOf('href=');
		var quotetype = str.substr(markBegin + 5,1);
		var markEnd = str.substr(markBegin + 6).indexOf(quotetype) + markBegin + 7;
		var href = str.substring(markBegin + 6, markEnd - 1);
		var output = str.substring(0,markBegin + 6);
		var jsquotetype = "'";
		if(quotetype == "'") jsquotetype = '"';
		output += 'javascript:bda.getURL(' + jsquotetype + href + jsquotetype + ');' + str.substr(markEnd - 1);
		return output;
	},
	removeStringTagAttribute : function(tag,attribute){
		/*
		 * Removes an attribute from a string tag
		 * 
		 * parameters: tag (String), attribute (String)
		 * returns: tag (String)
		 */
		tag = tag.replace(attribute.toUpperCase() + '=',attribute.toLowerCase() + '=');
		var markBegin = tag.indexOf(attribute + '=');
		var quotetype = tag.substr(markBegin + attribute.length + 1,1);
		var markEnd = tag.substr(markBegin + attribute.length + 2).indexOf(quotetype) + markBegin + attribute.length + 3;
		return tag.substring(0,markBegin) + tag.substr(markEnd);
	},
	resetTransitionHeight : function(){
		this.transitionHeight(bd$('bda_content').offsetHeight);
	},
	setContent : function(content){
		/*
		 * Inserts the primary content into the page
		 * 
		 * parameters: content (String)
		 * returns: nothing
		 */
		this.primaryRegion.innerHTML = '<div id="bda_content">' + content + '</div>';
	},
	setState : function(state,parameters){
		/*
		 * Sets the document state
		 * 
		 * parameters: state (String), parameters (Object)
		 * returns: nothing
		 */
		this.triggerEventListeners('stage_changed',{state:state, parameters:parameters});
		var output = '';
		switch(state){
			case 'loading':
				output += this.loadText;
				break;
			case 'calculating':
				output += this.calculateText;
				break;
			case 'error':
				output += this.errorText;
				break;
			case 'error_images':
				output += this.imagesNotLoadedText;
				break;
			case 'error_location':
				output += this.externalLocation + '<br/>' + this.externalLocationClick.replace('[link]','<a href="' + this.historyCurrentLocation + '" target="_blank">open window</a><br/><br/><br/><br/>');
				break;
			default:
				output += state;
				break;
		}
		if(parameters != null && parameters != 'undefined') output += '<br/>' + parameters;
		this.setContent(output);
		this.transitionHeight(bd$('bda_content').offsetHeight);
	},
	setStringTagAttribute : function(tag,attribute,value,overwrite){
		/*
		 * Sets an attribute for a string tag
		 * 
		 * parameters: tag (String), attribute (String), value (String), overwrite (Boolean)
		 * returns: tag (String)
		 */
		if(overwrite == null) overwrite = true;
		var output = '';
		tag = tag.replace(attribute.toUpperCase() + '=',attribute.toLowerCase() + '=');
		if(tag.contains(' ' + attribute + '=') && overwrite){
			var markBegin = tag.indexOf(' ' + attribute + '=');
			var quotetype = tag.substr(markBegin + attribute.length + 2,1);
			var markEnd = tag.substr(markBegin + attribute.length + 3).indexOf(quotetype) + markBegin + attribute.length + 4;
			output = tag.substr(0,markBegin + attribute.length + 3) + value + tag.substr(markEnd - 1);
		}else if(!tag.contains(attribute + '=')){
			var tagpart = tag.split(' ')[0];
			output = tagpart + ' ' + attribute + '="' + value + '" ' + tag.substr(tagpart.length);
		}else if(tag.contains(' ' + attribute + '=') && !overwrite){
			output = tag;
		}
		return output;
	},
	setTitle : function(title){
		/*
		 * Sets the document title
		 * 
		 * parameters: title (String)
		 * returns: nothing
		 */
		document.title = title;
	},
	transitionHeight : function(to){
		/*
		 * Tweens the primary contents height to the given height
		 * 
		 * parameters: to (Number)
		 * returns: nothing
		 */
		if(to < 100) to = 100;
		this.triggerEventListeners('tween_begin',{tween_to:to});
		this.primaryTween.continueTo(parseInt(to),1);
		if(!this.isIE && this.transitionAlpha){
			var opacity_tween = new OpacityTween(this.primaryRegion,this.transitionTweenType, 0,100,1);
			opacity_tween.start();
		}
	}
}
var http_request = false;

function bd$(id){return document.getElementById(id);}

// Adding String.contains method. Easier if a user wants to add rules.
if(!String.contains){
	String.prototype.contains = function(obj){
		return (this.indexOf(obj) == -1)?false:true;
	}
}
/***********************************************
* com.bydust.array - (c) byDust code library (www.bydust.com)
* Extended Javascript array class.
* This notice MUST stay intact for legal use
* Author: Nick Van der Vreken
* use:

<script type="text/javascript" src="js/com.bydust.array.js"></script>

***********************************************/

Array.prototype.set = function(key,value){
	this[key] = value;
}

Array.prototype.get = function(key){
	if(this.getKeys().contains(key)) return this[key];
	return null;
}

Array.prototype.size = function(){
	var s = 0;
	for(var i in this) if(typeof eval(this.get(i)) != 'function') s++;
	return s;
}

Array.prototype.getKeys = function(){
	var keys = '';
	for(var i in this) keys += ',' + i;
	return keys.substr(1).split(',');
}

Array.prototype.indexOfKey = function(key){
	for(var i in this) if(i == key) return i;
	return -1;
}

Array.prototype.remove = function(key){
	var i = this.indexOfKey(key);
	this.splice(i,1);
}

Array.prototype.contains = function(obj){
	return (this.indexOf(obj) == -1)?false:true;
}

// fixing Array.indexOf for the fucking IE engine..
if(!Array.indexOf){
	Array.prototype.indexOf = function(obj){
		for(var i=0; i<this.length; i++){
			if(this[i]==obj) return i;
		}
		return -1;
	}
}

Array.prototype.dump = function(){
	var output = new Array();
	var number = 0;
	output.push('<tr><th>#</th><th>Key</th><th>Value</th></tr>');
	for(var i in this){
		if(typeof eval(this.get(i)) != 'function'){
			output.push('<tr><td>' + number + '</td><td>' + i + '</td><td>' + this.get(i) + '</td></tr>');
			number++;
		}
	}
	return 'Array dump: <table>' + String.fromCharCode(10) + output.join(String.fromCharCode(10)) + String.fromCharCode(10) + '</table>';
}
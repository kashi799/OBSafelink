var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}
output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}
return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}
if(enc4!=64){output=output+String.fromCharCode(chr3)}}
output=Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}
return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}
return string}};var Obs={_webhostname:window.location.hostname,_except:[],_only:[],_safelink:'',_delay:5,_repeat:0,_interval:60,_currentRepetition:0,_running:!1,_error:[],safelink:function(url){if(url!=""&&typeof url!=='undefined'){Obs._safelink=url}
return this},except:function(except){if(Array.isArray(except)){Obs._except=except}
return this},only:function(only){if(Array.isArray(only)){Obs._only=only}
return this},delay:function(minute){var minute=parseInt(minute);if(isNaN(minute))
{Obs._error.push("Invalid delay value")}
Obs._delay=minute;return this},repeat:function(count,interval){var count=parseInt(count);var interval=parseInt(interval);if(isNaN(count))
{Obs._error.push("Invalid repeat value")}
else if(isNaN(interval)){Obs._error.push("Invalid interval value")}
Obs._repeat=count;Obs._interval=interval;return this},setCookie:function(cname,cvalue,exminute){var d=new Date();d.setTime(d.getTime()+(exminute*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/";return!0},getCookie:function(cname){var name=cname+"=";var decodedCookie=decodeURIComponent(document.cookie);var ca=decodedCookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1)}
if(c.indexOf(name)==0){return c.substring(name.length,c.length)}}
return""},updateCookie:function(cname,cvalue){document.cookie=cname+"="+cvalue+";";if(Obs.getCookie(cname)==cvalue){return!0}
return!1},isCrawler:function(){var list=['googlebot','mediapartners-google','adsbot-google','bingbot','slurp','duckduckbot','baiduspider','yandexbot','sogou','exabot','facebookexternalhit','facebot','ia_archiver'];var ua=navigator.userAgent;var isCrawler=RegExp(list.join('|'), 'i').exec(ua);return isCrawler},boot:function(){if(Obs._webhostname==''){Obs._error.push("Undefined web hostname")}
if(!Array.isArray(Obs._except)){Obs._error.push("'except' must be an array of domains that shouldn NOT be converted")}
if(!Array.isArray(Obs._only)){Obs._error.push("'only' must be an array of domains that should be converted")}
if(Obs._safelink==''){Obs._error.push("Undefined safelink URL")}
if(Obs._delay===''||isNaN(Obs._delay)){Obs._error.push("Undefined or invalid delay value")}
if(Obs._repeat===''||isNaN(Obs._repeat)){Obs._error.push("Undefined or invalid repeat value")}
if(Obs._interval===''||isNaN(Obs._interval)){Obs._error.push("Undefined or invalid interval value")}
if(Obs._except.indexOf(Obs._webhostname)==-1){Obs._except.push(Obs._webhostname)}
if(Obs.getCookie("__Obs_Safelink_r")==""){Obs.setCookie("__Obs_Safelink_r",Obs._currentRepetition,Obs._interval)}
else{var currentRepetition=parseInt(Obs.getCookie("__Obs_Safelink_r"));if(isNaN(currentRepetition)){Obs._error.push("Internal error. Can not defining current repertition")}
else{Obs._currentRepetition=currentRepetition}}},run:function(){if(!Obs.isCrawler()){Obs.boot();if(Obs._error.length>0){Obs._error.forEach(function(item,key){console.log(Obs._error[key])});return!1}
Obs._running=!0;if(Obs._delay>0&&Obs._repeat>0){if(Obs.getCookie("__Obs_Safelink")==""){if(Obs._currentRepetition<=Obs._repeat){Obs.start();Obs.updateCookie("__Obs_Safelink_r",(Obs._currentRepetition+1))}
Obs.setCookie("__Obs_Safelink",1,Obs._delay)}}
else if(Obs._delay>0&&Obs._repeat<=0){if(Obs.getCookie("__Obs_Safelink")==""){Obs.start();Obs.setCookie("__Obs_Safelink",1,Obs._delay)}}
else if(Obs._delay<=0&&Obs._repeat>0){if(Obs._currentRepetition<=Obs._repeat){Obs.start();Obs.updateCookie("__Obs_Safelink_r",(Obs._currentRepetition+1))}}
else{Obs.start()}
return!0}
return!1},start:function(){var links=document.getElementsByTagName("a");var i=0;Object.keys(links).forEach(function(index){var data=links[index];var destination=data.getAttribute("href");var hostname=data.hostname;var pathname=data.pathname;var matchesExcept=(Obs._except.length>0?RegExp(Obs._except.join('|'), 'i').exec(hostname):!1);var matchesOnly=(Obs._only.length>0?RegExp(Obs._only.join('|'), 'i').exec(hostname):!0);if(!matchesExcept&&matchesOnly){var encoded=Base64.encode(destination);var newURL=Obs._safelink+encoded;links[i].setAttribute("href",newURL)}
i++})},linkCount:function(){var links=document.getElementsByTagName("a");return links.length}}

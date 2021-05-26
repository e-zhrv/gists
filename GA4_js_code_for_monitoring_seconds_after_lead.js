
	/*! js-cookie v3.0.0-rc.1 | MIT */
	!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,r=e.Cookies=t();r.noConflict=function(){return e.Cookies=n,r}}())}(this,function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var t={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};return function n(r,o){function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),n=r.write(n,t);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}return Object.create({set:i,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=t.read(c[0]);if(o[f]=r.read(u,f),e===f)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){i(t,"",e({},n,{expires:-1}))},withAttributes:function(t){return n(this.converter,e({},this.attributes,t))},withConverter:function(t){return n(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(t,{path:"/"})});

	function idleTimer() {
		var t;
		//window.onload = resetTimer;
		window.onmousemove = resetTimer; // catches mouse movements
		window.onmousedown = resetTimer; // catches mouse movements
		window.onclick = resetTimer;     // catches mouse clicks
		window.onscroll = resetTimer;    // catches scrolling
		window.onkeypress = resetTimer;  //catches keyboard actions

	   function resetTimer() {
			window.minus = (new Date().getTime() / 1000) - window.latestActive;
			
			if(window.minus>1 || window.minus<0) {
				
				window.cookie_goal_timer = Cookies.get('goal_timer');
				
				if(window.cookie_goal_timer>window.timer) {
					window.timer = parseInt(window.cookie_goal_timer);
					console.log("Cookie goal timer loaded");
				}
				
				if(typeof Cookies.get('goal_timer_end') == 'undefined') {
					var goal_timer_end = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
					Cookies.set('goal_timer_end', goal_timer_end, { expires: 1 });
				}
				
				var goal_timer_end = Cookies.get('goal_timer_end');
				window.latestActive = new Date().getTime() / 1000;
				window.timer = window.timer + 10;
				var goal_timer_end_object = new Date(goal_timer_end);
				Cookies.set('goal_timer', window.timer, { expires: goal_timer_end_object });
				
				if(window.timer >= 10 && window.timer <= 30) {
					console.log("10-30");
				}
				if(window.timer > 30 && window.timer <= 60) {
					console.log("30-60");
				}
				if(window.timer > 60 && window.timer < 120) {
					console.log("60-120");
				}
				if(window.timer > 120 && window.timer < 180) {
					console.log("20-180");
				}
				console.log(window.timer);
			}
			
			
		}
	}
	window.timer = 0;
	window.latestActive = 0;
	idleTimer();

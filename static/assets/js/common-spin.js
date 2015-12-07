
$(document).ready(function(){
	var mins = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ministries
	});
	var jsonData = null;
	mins.initialize();
	$('.typeahead').typeahead(
	    null, {
	    name: 'mins',
	    displayKey: 'Name',
	    source: mins.ttAdapter()
	}).on('typeahead:selected', function(event, data){
	  jsonData = data;
	  $('.ministry').val(data.Ministry);
	  $('.cm').val(data.CM);
	  $.each(data.Zones, function (key, value) {
            $("#dropDownZones").append($('<option></option>').val(value).html(key));
      });
      $("#tweetContent").append(data.Ministry).append(" ").append(data.CM);
	});
	
	$( "#dropDownZones" ).change(function() {
  		var selectedZone = $("#dropDownZones :selected").text();
  		$.each(jsonData.Zones, function (key, value) {
            if(key === selectedZone) {
            	$('.gm').val(value.gm);
            	$("#dropDownDRMS").html("");
            	$("#dropDownDRMS").append($('<option></option>').val("None").html("Select Division"));
            	for(var i=0;i< value.drms.length; i++){
            		var obj = value.drms[i];
            		$("#dropDownDRMS").append($('<option></option>').val(obj.handle).html(obj.city));
            	}
            	$("#tweetContent").append(" ").append(value.gm);	
            }
      	});
	});
	$( "#dropDownDRMS" ).change(function() {
  		var drm = $("#dropDownDRMS :selected").val();
    	$('.drm').val(drm);
    	$("#tweetContent").append(" ").append(drm);
	});
	$( "#dropdownType" ).change(function() {
		var type = $("#dropdownType :selected").val();
		$("#tweetContent").append(" ").append(type);
	});	

	$("#tweetButton").click(function() {
		if($('#ministry').val() === undefined || $('#ministry').val() === "") return;
		var opts = {
			  lines: 13 // The number of lines to draw
			, length: 18 // The length of each line
			, width: 10 // The line thickness
			, radius: 22 // The radius of the inner circle
			, scale: 1 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#FFF' // #rgb or #rrggbb or array of colors
			, opacity: 0.25 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 1 // Rounds per second
			, trail: 60 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '50%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: false // Whether to render a shadow
			, hwaccel: false // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
		}
        var target = document.getElementById('spinner')
		var spinner = new Spinner(opts).spin(target);
		$(".spinner").show();
    });
	
});

var ministries = [
{ "Id": "41",  "Name":  "Ministry of Railways",
"Ministry": "@RailMinIndia",
"CM": "@sureshpprabhu",
"Zones": {
	"Central": {
		"gm": "@gm_crly",
		"drms": [{"city": "Mumbai", "handle": "@drmmumbaicr"}, {"city": "Nagpur", "handle": "@drmcrngp"}, {"city": "Pune", "handle": "@drmpune"}, {"city": "Solapur", "handle": "@drmsolapur"}, {"city": "Bhusawal", "handle": "@bhusavaldivn"}]
	},
	"Eastern": {
		"gm": "@EasternRailway",
		"drms": [{"city": "Sealdah", "handle": "@drmsdah"}, {"city": "Howrah", "handle": "@drmhowrah"}, {"city": "Malda", "handle": "@drmmalda"}]
	},
	"East Central": {
		"gm": "@GM_ECRly",
		"drms": [{"city": "Danapur", "handle": "@DrmDnr"}, {"city": "Howrah", "handle": "@Dhanbad"}, {"city": "Mugalsarai", "handle": "@drmmgs"}, {"city": "Sonpur", "handle": "@spjdivn"}, {"city": "Samastipur", "handle": "@drmsee1"}]
	},
	"East Coast": {
		"gm": "@gmeastcoastrly",
		"drms": [{"city": "Waltair", "handle": "@drmwat_ecor"}, {"city": "Khurda Road", "handle": "@DRMKhurdaroad"}, {"city": "Sambhalpur", "handle": "@drmsambalpur"}]
	},
	"Northern": {
		"gm": "@GM_NRly",
		"drms": [{"city": "Moradabad", "handle": "@drm_moradabad"}, {"city": "Firozpur", "handle": "@firozpur_nrly"}, {"city": "Lucknow", "handle": "@drmlko25"}, {"city": "Delhi", "handle": "@drmdli"}, {"city": "Malda", "handle": "@drmumb****"}]
	},
	"North Central": {
		"gm": "@GMNCR1",
		"drms": [{"city": "Allahabad", "handle": "@drmncrald"}, {"city": "Jhansi", "handle": "@Drmjhansi"}, {"city": "Agra", "handle": "@DRM_Agra"}]
	},
	"North Eastern": {
		"gm": "@gmner_gkp",
		"drms": [{"city": "Izzatnagar", "handle": "@drm_drmizn"}, {"city": "Varanasi", "handle": "@drmbsbner****"}, {"city": "Lucknow", "handle": "@drmljn****"}]
	},
	"Northeast Frontier": {
		"gm": "@gm_nfr",
		"drms": [{"city": "Katihar", "handle": "@kirDrm"}, {"city": "Alipurduar", "handle": "@drm_apdj"}, {"city": "Rangiya", "handle": "@DRM_RNY"}, {"city": "Tinsukhia", "handle": "@Drm_tsk"}]
	},
	"Northeast Western": {
		"gm": "@GMNWRailway",
		"drms": [{"city": "Jaipur", "handle": "@DRMJaipur"}, {"city": "Jodhpur", "handle": "@DRMJodhpurNWR"}, {"city": "Bikaner", "handle": "@drmbikaner"}, {"city": "Ajmer", "handle": "@DRMAjmer"}]
	},
	"Southern": {
		"gm": "@GMSRailway",
		"drms": [{"city": "Chennai", "handle": "@Drmchennai"}, {"city": "Trivendrum", "handle": "@TVC138"}, {"city": "Salem", "handle": "@SalemDRM"}, {"city": "Madurai", "handle": "@drmmadurai"}, {"city": "Palghat", "handle": "@propgt14"}, {"city": "Trichy", "handle": "@Drmtpj"}]
	},
	"South Central": {
		"gm": "@Gmscrailway",
		"drms": [{"city": "Secunderabad", "handle": "@drmsecunderabad"}, {"city": "Hyderabad", "handle": "@drmhyb"}, {"city": "Vijaywada", "handle": "@drmvijayawada"}, {"city": "Guntakal", "handle": "@drmgnt"}, {"city": "Nanded", "handle": "@drmned"}]
	},
	"South Eastern": {
		"gm": "@GMSERAILWAY",
		"drms": [{"city": "Chakradharpur", "handle": "@DRMCKP"}, {"city": "Adra", "handle": "@ADRARAIL"}, {"city": "Kharagpur", "handle": "@drmkgp"}, {"city": "Ranchi", "handle": "@drmrnc"}]
	},
	"South East Central": {
		"gm": "@Gmsecr",
		"drms": [{"city": "Bilaspur", "handle": "@DRM_Bilaspur"}, {"city": "Raipur", "handle": "@Drm_raipur"}, {"city": "Nagpur", "handle": "@drmngpsecr"}]
	},
	"South Western": {
		"gm": "@gmswr",
		"drms": [{"city": "Hubli", "handle": "@DRMUBL"}, {"city": "Bengaluru", "handle": "@DRMSBC"}, {"city": "Mysore", "handle": "@Mysore"}]
	},
	"Western": {
		"gm": "@Gmwrly",
		"drms": [{"city": "BCT", "handle": "@Drmbct"}, {"city": "Ahemdabad", "handle": "@drmadiwr"}, {"city": "Ratlam", "handle": "@RatlamDrm"}, {"city": "Rajkot", "handle": "@wrdrmrjt"}, {"city": "Bhavnagar", "handle": "@drm_bvp"}, {"city": "Vadodara", "handle": "@drmbrcwr"}]
	},
	"West Central": {
		"gm": "@Gmwcrailway",
		"drms": [{"city": "Bhopal", "handle": "@Drmbhopal"}, {"city": "Jabalpur", "handle": "@drmjabalpur"}, {"city": "Kota", "handle": "@drmkota"}]
	}
}}];
// http://spin.js.org/#v2.3.2
!function(a,b){"object"==typeof module&&module.exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return m[e]||(k.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",k.cssRules.length),m[e]=1),e}function d(a,b){var c,d,e=a.style;if(b=b.charAt(0).toUpperCase()+b.slice(1),void 0!==e[b])return b;for(d=0;d<l.length;d++)if(c=l[d]+b,void 0!==e[c])return c}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}k.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.scale*d.width,left:d.scale*d.radius,top:-d.scale*d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.scale*(d.length+d.width),k=2*d.scale*j,l=-(d.width+d.length)*d.scale*2+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k,l=["webkit","Moz","ms","O"],m={},n={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",opacity:.25,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"};if(h.defaults={},f(h.prototype,{spin:function(b){this.stop();var c=this,d=c.opts,f=c.el=a(null,{className:d.className});if(e(f,{position:d.position,width:0,zIndex:d.zIndex,left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.scale*(f.length+f.width)+"px",height:f.scale*f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.scale*f.radius+"px,0)",borderRadius:(f.corners*f.scale*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.scale*f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),"undefined"!=typeof document){k=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}();var o=e(a("group"),{behavior:"url(#default#VML)"});!d(o,"transform")&&o.adj?i():j=d(o,"animation")}return h});
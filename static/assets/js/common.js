
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
	
	
});

var ministries = [
{ "Id": "1",  "Name":  "Ministry of Agriculture"}, 
{ "Id": "2",  "Name":  "Ministry of Chemicals and Fertilizers"}, 
{ "Id": "3",  "Name":  "Ministry of Civil Aviation"}, 
{ "Id": "4",  "Name":  "Ministry of Coal"}, 
{ "Id": "5",  "Name":  "Ministry of Commerce and Industry"}, 
{ "Id": "6",  "Name":  "Ministry of Communications and Information Technology"}, 
{ "Id": "7",  "Name":  "Ministry of Consumer Affairs, Food and Public Distribution"}, 
{ "Id": "8",  "Name":  "Ministry of Youth Affairs and Sports"}, 
{ "Id": "9",  "Name":  "Ministry of Corporate Affairs"}, 
{ "Id": "10",  "Name":  "Ministry of Culture"}, 
{ "Id": "11",  "Name":  "Ministry of Defence"}, 
{ "Id": "12",  "Name":  "Ministry of Development of North Eastern Region"}, 
{ "Id": "13",  "Name":  "Ministry of Drinking Water Supply and Sanitation"}, 
{ "Id": "14",  "Name":  "Ministry of Earth Sciences"}, 
{ "Id": "15",  "Name":  "Ministry of Environment, Forest and Climate Change"}, 
{ "Id": "16",  "Name":  "Ministry of Women and Child Development"}, 
{ "Id": "17",  "Name":  "Ministry of External Affairs"}, 
{ "Id": "18",  "Name":  "Ministry of Finance"}, 
{ "Id": "19",  "Name":  "Ministry of Food Processing Industries"}, 
{ "Id": "20",  "Name":  "Ministry of Health and Family Welfare"}, 
{ "Id": "21",  "Name":  "Ministry of Heavy Industries and Public Enterprises"}, 
{ "Id": "22",  "Name":  "Ministry of Home Affairs"}, 
{ "Id": "23",  "Name":  "Ministry of Housing and Urban Poverty Alleviation"}, 
{ "Id": "24",  "Name":  "Ministry of Human Resource Development"}, 
{ "Id": "25",  "Name":  "Ministry of Information and Broadcasting"}, 
{ "Id": "26",  "Name":  "Ministry of Labour and Employment"}, 
{ "Id": "27",  "Name":  "Ministry of Law and Justice"}, 
{ "Id": "28",  "Name":  "Ministry of Micro, Small and Medium Enterprises"}, 
{ "Id": "29",  "Name":  "Ministry of Water Resources"}, 
{ "Id": "30",  "Name":  "Ministry of Mines"}, 
{ "Id": "31",  "Name":  "Ministry of Minority Affairs"}, 
{ "Id": "32",  "Name":  "Ministry of New and Renewable Energy"}, 
{ "Id": "33",  "Name":  "Ministry of Overseas Indian Affairs"}, 
{ "Id": "34",  "Name":  "Ministry of Panchayati Raj"}, 
{ "Id": "35",  "Name":  "Ministry of Parliamentary Affairs"}, 
{ "Id": "36",  "Name":  "Ministry of Personnel, Public Grievances and Pensions"}, 
{ "Id": "37",  "Name":  "Ministry of Urban Development"}, 
{ "Id": "38",  "Name":  "Ministry of Petroleum and Natural Gas"}, 
{ "Id": "39",  "Name":  "Ministry of Planning"}, 
{ "Id": "40",  "Name":  "Ministry of Power"}, 
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
}}, 
{ "Id": "42",  "Name":  "Ministry of Road Transport and Highways"}, 
{ "Id": "43",  "Name":  "Ministry of Rural Development"}, 
{ "Id": "44",  "Name":  "Ministry of Science and Technology"}, 
{ "Id": "45",  "Name":  "Ministry of Shipping"}, 
{ "Id": "46",  "Name":  "Ministry of Skill Development and Entrepreneurship"}, 
{ "Id": "47",  "Name":  "Ministry of Social Justice and Empowerment"}, 
{ "Id": "48",  "Name":  "Ministry of Statistics and Programme Implementation"}, 
{ "Id": "49",  "Name":  "Ministry of Steel"}, 
{ "Id": "50",  "Name":  "Ministry of Textiles"}, 
{ "Id": "51",  "Name":  "Ministry of Tourism"}, 
{ "Id": "52",  "Name":  "Ministry of Tribal Affairs"}, 
{ "Id": "53",  "Name":  "Ministry of Urban Development"}];
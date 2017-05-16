
var wikiApp = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?";
$(document).ready(function () {

	document.getElementById("search")
	    .addEventListener("search", function(event) {


	        document.getElementById("search").click();
	        var searchObject =  document.getElementById("search").value;

	        if (searchObject !== "") {
			$.getJSON(wikiApp, {
				url: wikiApp,
				search: searchObject,
				limit: 10,
				prop: "revisions",
				rvprop: "content",
		        }).done(function(json) {


				var obj = JSON.parse(JSON.stringify(json));
				$(".main").animate({opacity: '0', 'padding-top': '20px'}, 500, function () {


				 		var crashNumber = 10;

					for (var i = 0; i < 10; i++) {
				 		let name = "name" + (i + 1) + "";
				 		let info = "info" + (i + 1) + "";
				 		let link = "link" + (i + 1) + "";

				 
				 		function createArticle(i) {
				 			document.getElementById(link).className += " article";
				 			document.getElementById(name).innerHTML = '' + obj[1][i] + '';
				  			document.getElementById(info).innerHTML = '' + obj[2][i] + '';
				  			document.getElementById(link).href = '' + obj[3][i] + '';
				 		}




						if (obj[1][i] !== undefined ) {
				 			createArticle(i);
				  		} else if (obj[1][i] === undefined && i == 0) {
				 			obj[1][i] = "Try again";
				 			obj[2][i] = "Can't find anything with \"" + searchObject + "\"";
				 			obj[3][i] = "#";
				 			crashNumber = i;
				 			createArticle(i);
							$(".main").animate({opacity: '1', 'padding-top': '0'}, 500);

				  		} else if (obj[1][i] === undefined && i < crashNumber) {
				  			obj[1][i] = "Try again";
				 			obj[2][i] = "Can't find anything else with \"" + searchObject + "\"";
				 			obj[3][i] = "";
				 			crashNumber = i;
				 			createArticle(i);
							$(".main").animate({opacity: '1', 'padding-top': '0'}, 500);
				  		} else if (obj[1][i] === undefined && i > crashNumber) {				  			
				 			$("#" + link + "").removeClass("article");	
				 			document.getElementById(name).innerHTML = '';
				  			document.getElementById(info).innerHTML = '';
				  			document.getElementById(link).href = '';
						
				  		}
					};


					$(".main").animate({opacity: '1', 'padding-top': '0'}, 500);


		 		})

		    })
		}
	});
});




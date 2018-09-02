function createXMLHttpRequestObject(){
	
	if(window.XMLHttpRequest){
		xmlHTTPRequest = new XMLHttpRequest();
	}
	else{
		xmlHTTPRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHTTPRequest;
}

var allMovies = [];
var searchresmovies = [];
var whichres=0;
document.addEventListener("DOMContentLoaded", function (){
    getAllMovies();
	document.getElementById("searchterm").addEventListener("keyup", function (e){
		
		var searchterm = e.target.value;
		searchresmovies = [];
		
		if(searchterm.length>3){	
		whichres=1;
			for(var m=0; m<allMovies.length; m++){
				
				if((allMovies[m].movie_title.toUpperCase()).indexOf(searchterm.toUpperCase())>=0){
					
					searchresmovies.push(allMovies[m]);
				}
			}
			displayMovies(searchresmovies);
		}
		else{
			displayMovies(allMovies);
		}
	});
	document.getElementById("filtertext").addEventListener("keyup", function (e){
		var fileterterm = e.target.value;
		var filteron = document.getElementById("filter_type").value;
		
		searchresmovies= [];
		if(fileterterm.length>1){
			whichres=1;
			for(var a =0; a<allMovies.length; a++){
				if(filteron=="l"){// check if the user filtered on language or country
					if((allMovies[a].language.toUpperCase()).indexOf(fileterterm.toUpperCase())>=0){
						searchresmovies.push(allMovies[a]);
					}
				}
				else{
					if((allMovies[a].country).indexOf(fileterterm)>=0){
						searchresmovies.push(allMovies[a]);
					}
				}
			}
			
			displayMovies(searchresmovies);
		}
		else{
			displayMovies(allMovies);
		}
	});
});

var reqObject = new createXMLHttpRequestObject();
function getAllMovies(){
    if(reqObject!=null){
        reqObject.open("GET", "http://starlord.hackerearth.com/movieslisting", true);
        reqObject.onreadystatechange = processMoviesRes;
        reqObject.send(null);
    }
    else{
        console.log("Object is null");
    }
}
function processMoviesRes(){
    if(reqObject.status==200 && reqObject.readyState == 4){
        var jsonResponse = reqObject.responseText;
        var jsonObjectResponse = JSON.parse(jsonResponse);
        
		for(var _=0; _<jsonObjectResponse.length; _++){
			whichres=0;
			allMovies.push(jsonObjectResponse[_]);
		}
		
		
        displayMovies(jsonObjectResponse);
    }
}
function createAnEleWithClass(ele, cls){
    var ele = document.createElement(ele);
    if(cls!="")
    ele.classList.add(cls);
    return ele;
}



function displayMovies(jsonObjectResponse){
    var moviesWrapper = document.getElementById("main");
	
	
	
	while (moviesWrapper.firstChild) {
		moviesWrapper.removeChild(moviesWrapper.firstChild);
	}
	
        for(var i=0; i<jsonObjectResponse.length; i++){
            //allMovies.push(jsonObjectResponse[i]);
            var box = createAnEleWithClass("div", "amvbox");
                var header = createAnEleWithClass("div", "movieheader");
                    var ttl = createAnEleWithClass("div", "movietitle");
                        var ttltext  = createAnEleWithClass("h4", "");
                        ttltext.innerHTML=jsonObjectResponse[i].movie_title;
                    ttl.appendChild(ttltext);
                    var dirs = createAnEleWithClass("div", "moviedirs") ;
                        var dirsspan = createAnEleWithClass("span", "");
                        dirsspan.innerHTML="Directed by "+jsonObjectResponse[i].director_name;
                    dirs.appendChild(dirsspan);
                    var actrs = createAnEleWithClass("div", "movieactors"); 
                        var actrsspan = createAnEleWithClass("span", "");
                        actrsspan.innerHTML="Starring "+ jsonObjectResponse[i].actor_1_name+" and "+jsonObjectResponse[i].actor_2_name;
                    actrs.appendChild(actrsspan);
                header.appendChild(ttl);
                header.appendChild(dirs);
                header.appendChild(actrs);

                var detail = createAnEleWithClass("div", "moviedet") ;
                    var imdb = createAnEleWithClass("a","");
                    imdb.setAttribute("href", jsonObjectResponse[i].movie_imdb_link);
                    imdb.innerHTML="IMDB";
                    var detspan = createAnEleWithClass("span", "");
                    detspan.innerHTML=" | "+ jsonObjectResponse[i].language+" | "+ jsonObjectResponse[i].content_rating;
                detail.appendChild(imdb);
                detail.appendChild(detspan);

                var genre = createAnEleWithClass("div", "genres") ;
                    var genrespan = createAnEleWithClass("span", "");
                    genrespan.innerHTML=jsonObjectResponse[i].genres;
                genre.appendChild(genrespan);

				var cntry =  createAnEleWithClass("div", "cntry");
				cntry.innerHTML=jsonObjectResponse[i].country+" | "+ jsonObjectResponse[i].title_year;
				
            box.appendChild(header);
            box.appendChild(detail);
            box.appendChild(genre);
			box.appendChild(cntry);

            moviesWrapper.appendChild(box);
        }
}


function sortResult(elem){
		
		if(elem=="year"){
			if(whichres==0){// main ds
				allMovies.sort(function(a, b){
					return a.title_year-b.title_year;
				});
				
				displayMovies(allMovies);
			}
			else{
				searchresmovies.sort(function (a, b){
					return a.title_year-b.title_year;
				});
				displayMovies(searchresmovies);
			}
		}
		else{
			// we dont have popularity rating 
			/*if(whichres==0){// main ds
				allMovies.sort(function(a, b){
					return a.title_year-b.title_year;
				});
			}
			else{
				searchresmovies.sort(function (a, b){
					return a.title_year-b.title_year;
				});
			}*/
		}
}
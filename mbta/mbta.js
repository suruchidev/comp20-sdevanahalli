
var stopNames = ["Alewife","Davis","Porter Square","Harvard Square","Central Square",
"Kendall/MIT","Charles/MGH","Park Street","Downtown Crossing","South Station","Broadway",
"Andrew","JFK/UMass","North Quincy","Wollaston", "Quincy Center","Quincy Adams","Braintree", 
 "Savin Hill","Fields Corner","Shawmut", "Ashmont"];
var stationarray= [ 
{lat:42.395428 , lng:-71.142483},
{lat:42.39674 , lng:-71.121815},
{lat:42.3884, lng:-71.11914899999999},
{lat:42.373362 ,lng: -71.118956},
{lat:42.365486 ,lng: -71.103802},
{lat:42.36249079 , lng:-71.08617653},
{lat:42.361166 , lng:-71.070628},
{lat:42.35639457, lng:-71.0624242},
{lat:42.355518 , lng:-71.060225},
{lat:42.352271 ,lng:-71.05524200000001},
{lat:42.342622, lng:-71.056967},
{lat:42.330154 , lng:-71.057655},
{lat:42.320685, lng:-71.052391},
{lat:42.275275 , lng:-71.029583},
{lat:42.2665139 , lng:-71.0203369},
{lat:42.251809 ,lng: -71.005409},
{lat:42.233391 , lng:-71.007153},
{lat:42.2078543 , lng:-71.0011385},
{lat:42.31129, lng: -71.053331},
{lat:42.300093 , lng:-71.061667},
{lat:42.29312583 , lng:-71.06573796000001},
{lat:42.284652 , lng:-71.06448899999999}
];

var stop_info;

function getCoords() {

        navigator.geolocation.getCurrentPosition(geolocate);
        function geolocate(position){
        	var latlong = {lat: position.coords.latitude, lng:position.coords.longitude}
             
             setElements(latlong);
             
        
        }

       
}


function setElements(latlong){
	var googlemap = new google.maps.Map(document.getElementById('googlemap'), {
		center: latlong,
		zoom: 12
	});


	image ="me_icon.png";
	    marker = new google.maps.Marker({
		position: latlong,
		map: googlemap,
		icon:image
	});


	setMarkers(googlemap);
	setPath(googlemap);
	closestStop(latlong,marker,googlemap);
}







function funex(){

if (request.readyState == 4 && request.status == 200) {
        theData = request.responseText;
       
        stop_info = JSON.parse(theData);
        
      }
else if(request.status == 404){
   alert("Loading.....Please click MBTA station again")
}
}

function get_stop_info(){

  request = new XMLHttpRequest();
  request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
  request.onreadystatechange = funex;
  request.send();
}

function click_markers( i, station){
  
   google.maps.event.addListener(station, 'click', function() {
            
           //if (infowindow.getMap() != null){
            get_stop_info();
  

            
             station.content="";
             for(x = 0; x < stop_info["TripList"]["Trips"].length; x++){
              for (y =0; y < stop_info["TripList"]["Trips"][x]["Predictions"].length; y++){
                
                //console.log("outside if!");
                 //console.log(stop_info["TripList"]["Trips"][x]["Destination"])
                 //console.log(stop_info["TripList"]["Trips"][x]["Predictions"][y]["Stop"]);
                
                if (stop_info["TripList"]["Trips"][x]["Predictions"][y]["Stop"] == stopNames[i]){
                  
                 seconds =  stop_info["TripList"]["Trips"][x]["Predictions"][y]["Seconds"];
                 remainder = seconds %60;
                 whole_num = (seconds - remainder)/ 60;

                 
                 station.content = station.content + '<div> To:' + stop_info["TripList"]["Trips"][x]["Destination"] + ' '
                                   + whole_num + ":" + remainder + ' mins </div>';
                console.log(station.content);
                                   
                  
                  }
                }
             }
           

             
          infowindow.setContent(this.content);
       
             
          
          infowindow.open(googlemap, this);
         /*    }
          else{
             infowindow.close();
          }*/
        });
    
       
           
}
function setMarkers(googlemap) {
         
         infowindow = new google.maps.InfoWindow({
            content: ""
            });
         
         for( i=0; i <22; i++){
           var coords = stationarray[i];
           var image = "anadol_train_icon.png";
           
           var station = new google.maps.Marker({
            position: coords,
            map: googlemap,
            icon:image

           });

           

           

           click_markers( i, station, infowindow);
           
          
     }
}
var braintree = [{lat:42.395428 , lng:-71.142483},
{lat:42.39674 , lng:-71.121815},
{lat:42.3884, lng:-71.11914899999999},
{lat:42.373362 ,lng: -71.118956},
{lat:42.365486 ,lng: -71.103802},
{lat:42.36249079 , lng:-71.08617653},
{lat:42.361166 , lng:-71.070628},
{lat:42.35639457, lng:-71.0624242},
{lat:42.355518 , lng:-71.060225},
{lat:42.352271 ,lng:-71.05524200000001},
{lat:42.342622, lng:-71.056967},
{lat:42.330154 , lng:-71.057655},
{lat:42.320685, lng:-71.052391},
{lat:42.275275 , lng:-71.029583},
{lat:42.2665139 , lng:-71.0203369},
{lat:42.251809 ,lng: -71.005409},
{lat:42.233391 , lng:-71.007153},
{lat:42.2078543 , lng:-71.0011385}];

var ashmont = [{lat:42.320685, lng:-71.052391},
{lat:42.31129, lng: -71.053331},
{lat:42.300093 , lng:-71.061667},
{lat:42.29312583 , lng:-71.06573796000001},
{lat:42.284652 , lng:-71.06448899999999}
];
function setPath(googlemap){
	 var mbtaPath1 = new google.maps.Polyline({
          path: braintree,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 5
        });
	  var mbtaPath2 = new google.maps.Polyline({
          path: ashmont,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 5
        });
	  mbtaPath1.setMap(googlemap);
	 mbtaPath2.setMap(googlemap);

}
function rad(x) {return x * Math.PI / 180;}
function distance(lat1,lat2,lon1,lon2) {
    var dlat = rad(lat2-lat1);
    var dlon = rad(lon2-lon1);
    var R = 6371;
    var a = Math.sin(dlat/2) * Math.sin(dlat/2) + 
                Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * 
                Math.sin(dlon/2) * Math.sin(dlon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var distance = R * c; 
           return distance;
}

function closestStop(latlong,marker,googlemap){



         
         
         var lat1 = latlong.lat;
         var lon1 = latlong.lng;
         
          index = 0;
         closest = distance (lat1, stationarray[0].lat , lon1, stationarray[0].lng);
         for(i=1; i<22; i++){
         	var lat2 = stationarray[i].lat;
         	var lon2 = stationarray[i].lng;
          var dist = distance (lat1, lat2, lon1, lon2);
          if (dist < closest){
            closest = dist;
            index = i;
          }
 
         }

         var closest_path = [latlong , stationarray[index]];

         var mbta_closest= new google.maps.Polyline({
          path: closest_path,
          geodesic: true,
          strokeColor: '#009900',
          strokeOpacity: 0.7,
          strokeWeight: 5
        });
         mbta_closest.setMap(googlemap);
         marker.addListener('click', function() {
         var contentString = '<div>'+'<div> Closest Red Line MBTA Stop: '+ stopNames[index] +'</div>'+ '<div> Distance: '+closest+'</div></div>';
         infowindow = new google.maps.InfoWindow({
          content: contentString
        });
       
        infowindow.open(googlemap, marker);
        

    }); 


}





const mappakey = 'pk.eyJ1IjoicmxmYmNrciIsImEiOiJja2d0Ym5qbjkwc3poMzBreTBnMnM2Z3czIn0.6fZAUJL9xrsg5Mi-DHH-ZA';
const mappa = new Mappa('MapboxGL', mappakey);
const version = "21";
let myMap;
let canvas;
let myFont;

//Options for map
const options = {
  lat: 53.0793, // center in bremen
  lng: 8.8017,
  zoom: 6,
  style: 'mapbox://styles/mapbox/dark-v9',
   pitch: 0,
};

//Attribute
var distance_button; // Button fürs starten der Funktion
var end_button; // Button für beenden der Funktion
let uid = gen_uid(); // unique brower/user id wird als db key benutze...
let name = "-"; // Spielername

let lat = 0; // Latitude von 1. Spielerposition
let long = 0; // Longitude von 1. Spielerposition
let lat2 = 0; // Latitude von 2. Spielerposition
let long2 = 0; // Longitude von 2. Spielerposition
var database; // db ref

let dist = 0.0 ; // Distanzvariable

//Startposition wird gespeichert
navigator.geolocation.getCurrentPosition(position => {
  lat = (position.coords.latitude); 
  long = (position.coords.longitude);
}
);

//Aktuelle Position wird ermittelt & gespeichert
function positionPing(position){
  print("lat: " + position.latitude);
  print("long: " + position.longitude);
  lat2 = position.latitude;
  long2 = position.longitude;
  distance_calculate();
  print(dist);
}

//Abstand zu Startpunkt und aktueller Position wird berechnet
function distance_calculate(){
  dist += calcGeoDistance(lat, long, lat2, long2, 'km');
}

//Distanz wird alle 5 Sekunden berechnet, End Button wird bereit gestellt
function  distance_measure(){
  dist = 0;
  intervalCurrentPosition(positionPing, 5000);
 distance_button.remove();
//End Button wird erzeugt
end_button = createButton("end walk");
//End Button wird platziert
end_button.position(windowWidth/2, windowHeight-windowHeight/4);
//Methode die ausgeführt wird, wenn der End Button gedrückt wird
end_button.mouseClicked(show_distance);
}

//Gibt Distanz zurück in Textform
function show_distance(){
  background(0);
  //text ausgabe
 textSize(30);
 fill(255);
  text("you walked " + dist + " kilometers", windowWidth/2 - 100, windowHeight/2);

  clearIntervalPos();

 

end_button.remove();

distance_button = createButton("start walk");

//position of the button
  distance_button.position(windowWidth/2, windowHeight-windowHeight/4);
// when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);

}




function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);


//create the button
  distance_button = createButton("start walk");

//position of the button
  distance_button.position(windowWidth/2, windowHeight-windowHeight/4);
// when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);

 





  
}


function gen_uid() {
  /*
   erzeuge eine user id anhänig von bildschirmaufläsung; browser id, etc....
  
  */
  var navigator_info = window.navigator;
  var screen_info = window.screen;
  var uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, '');
  uid += navigator_info.plugins.length;
  uid += screen_info.height || '';
  uid += screen_info.width || '';
  uid += screen_info.pixelDepth || '';
  return uid;
}


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








var distance_button; // button for the function
var end_button; // button for ending the function
let uid = gen_uid(); // unique brower/user id wird als db key benutze...
let name = "-"; // player name

let lat = -1; // wo bin ich
let long = -1;
var database; // db ref

var dist ; // distance











function  distance_measure(){

 
//button to end the function
end_button = createButton("end walk");
//button position
end_button.position(windowWidth/2, windowHeight-windowHeight/4);
//method if button is pressed
end_button.mouseClicked(show_distance);


//get the position every 5 sec
  p5.prototype.intervalCurrentPosition();


//calc the distance between two points
  dist += p5.prototype.calcGeoDistance();


}


function show_distance(){
 textSize(30);
 fill(255);
  text('you walked meter', windowWidth/2 - 100, windowHeight/2);
end_button.remove();


}




function setup() {
  createCanvas(windowWidth, windowHeight);

  


//create the button
  distance_button = createButton("start walk");

//position of the button
  distance_button.position(windowWidth/2, windowHeight-windowHeight/4);
// when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);







  
}

function draw () {
// black background

background(0);

distance_button.draw();


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

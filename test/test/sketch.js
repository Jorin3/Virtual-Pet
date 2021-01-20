
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
let egg = true;

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
  dist += calcGeoDistance(lat, long, lat2, long2, 'km');
  print(dist);
  round(dist);
}

//Abstand zu Startpunkt und aktueller Position wird berechnet
function distance_calculate(){
  
}

//Distanz wird alle 5 Sekunden berechnet, End Button wird bereit gestellt
function  distance_measure(){
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
    });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight/2+370, windowWidth, 100);
    });
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
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
    });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight/2+370, windowWidth, 100);
    });
  //text ausgabe
 textSize(30);
 fill(255);
  text("you walked " + dist + " kilometers", windowWidth/2 -150, windowHeight/2);

  clearIntervalPos();

 

end_button.remove();

distance_button = createButton("start walk");

//position of the button
  distance_button.position(windowWidth/2, windowHeight-windowHeight/4);
// when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);

}

let n = 100;

function round(dist, n) {
  dist = (Math.round(dist * n) / n);
}

let listimg;
let buttonlist;
let buttonsound;
let buttonclothes;
let buttonfood;
let buttonwalk;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(90);
  
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
    });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight/2+370, windowWidth, 100);
    });
  loadImage('pet.png', img => {
  image(img, windowWidth/2.7, 100, 443, 745);
  });

  buttonlist = createImg('list.png');
  buttonlist.position(windowWidth/3, 0, 120, 120);
  buttonlist.size(115, 115);
  
  buttonsound = createImg("sound.png");
  buttonsound.position(windowWidth/1.7, 0, 120);
  buttonsound.size(115, 115);

  buttonclothes = createImg("clothes.png");
  buttonclothes.position(windowWidth/1.7, windowHeight/2+365, 120, 120);
  buttonclothes.size(100, 100);

  buttonfood = createImg("food.png");
  buttonfood.position(windowWidth/2.17, windowHeight/2+365, 120, 120);
  buttonfood.size(100, 100);

  buttonwalk = createImg("walk.png");
  buttonwalk.position(windowWidth/3, windowHeight/2+365, 120, 120);
  buttonwalk.size(100, 100);
  buttonwalk.mouseClicked(walk);
  /*if (egg == false){
    textSize(30);
 fill(255);
  text("Name your pet!", windowWidth/2 -150, windowHeight/3);
  <input type="text" size="40" name="User"></input>
  }*/
 



  
}

function walk(){
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
    });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight/2+370, windowWidth, 100);
    });
  buttonlist.remove();
  buttonsound.remove();
  buttonclothes.remove();
  buttonfood.remove();
  buttonwalk.remove();

  goBack = createImg("walk.png");
  goBack.position(windowWidth/3, windowHeight/2+365, 120, 120);
  goBack.size(100, 100);
  goBack.mouseClicked(goingBack);
//create the button
  distance_button = createButton("start walk");

//position of the button
  distance_button.position(windowWidth/2, windowHeight-windowHeight/4);
// when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);
}

function goingBack(){
  distance_button.remove();
  end_button.remove();
  goBack.remove();
  setup();
}
/*class Button {
  
  constructor(inX, inY, inImg) {
    this.x = inX;
    this.y = inY;
    this.img = inImg;
  }
  
  display() {
    stroke(0);
    
    // tint the image on mouse hover
    if (this.over()) {
      tint(204, 0, 128);
    } else {
      noTint();
    }
    
    image(this.img, this.x, this.y);
  }
  
  // over automatically matches the width & height of the image read from the file
  // see this.img.width and this.img.height below
  over() {
    if (mouseX > this.x && mouseX < this.x + this.img.width && mouseY > this.y && mouseY < this.y + this.img.height) {
      return true;
    } else {
      return false;
    }
  }
}
*/

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

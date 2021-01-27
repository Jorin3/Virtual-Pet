
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
let latStart = 0; // Latitude von 1. Spielerposition
let longStart = 0; // Longitude von 1. Spielerposition
let lat2 = 0; // Latitude von 2. Spielerposition
let long2 = 0; // Longitude von 2. Spielerposition
var database; // db ref
let beginning = false;
let end = false;
let hunger = 50;
var petName = '';
let dist = 0.0; // Distanzvariable
let music = true;
let walkstarted = true;
var gif_pet;

//Startposition wird gespeichert
navigator.geolocation.getCurrentPosition(position => {
  lat = (position.coords.latitude);
  long = (position.coords.longitude);
}
);

//Aktuelle Position wird ermittelt & gespeichert
function positionPing(position) {
  if (walkStarted == true) {
    latStart = position.latitude;
    longStart = position.longitude;
  }
  walkstarted = false;
  print(latStart);
  print(longStart);
  print("lat: " + position.latitude);
  print("long: " + position.longitude);
  lat2 = position.latitude;
  long2 = position.longitude;
  dist += calcGeoDistance(latStart, longStart, lat2, long2, 'km');
  print(dist);
}


//Distanz wird alle 5 Sekunden berechnet, End Button wird bereit gestellt
function distance_measure() {
  walkStarted = true;
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });
  dist = 0;
  intervalCurrentPosition(positionPing, 5000);
  end = true;
  distance_button.remove();
  //End Button wird erzeugt
  end_button = createButton("end walk");
  //End Button wird platziert
  end_button.position(windowWidth / 2, windowHeight - windowHeight / 4);
  //Methode die ausgeführt wird, wenn der End Button gedrückt wird
  end_button.mouseClicked(show_distance);
}

//Gibt Distanz zurück in Textform
function show_distance() {
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });
  roundThis();
  //text ausgabe
  textSize(30);
  fill(255);
  text("you walked " + rounded + " kilometers", windowWidth / 2 - 150, windowHeight / 2);

  clearIntervalPos();



  end_button.remove();

  distance_button = createButton("start walk");

  //position of the button
  distance_button.position(windowWidth / 2, windowHeight - windowHeight / 4);
  // when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);

}

let rounded = 0;

function roundThis() {
  rounded = round(dist, 2);
}

let res = false;
let listimg;
let buttonlist;
let soundOn;
let soundOff
let buttonclothes;
let buttonfood;
let buttonwalk;
let inp;
let freshStart = false;
let acc = false;
let fur = false;
let eyes = false;
let cloth = false;
let purpleGreen = true;
let blueGreen = false;
let purpleRed = false;
let blueRed = false;
let purpleFur = true;
let blueFur = false;
let greenEyes = true;
let redEyes = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(90);

  

  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });

  if (beginning == false){
    egg();
  }

  
}

function main() {
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });
  
  if (acc == true) {
    furColor.remove();
    eyeColor.remove();
    accessoires.remove();
    backFromClothes.remove();
  }
  if (fur == true) {
    furOption1.remove();
    furOption2.remove(); 
  }
  if (eyes == true) {
    eyesOption1.remove();
    eyesOption2.remove();
  }
  if (cloth == true) {
    clothOption1.remove();
    clothOption2.remove();
  }
  yesButton.remove();
  noButton.remove();
  
  if (purpleGreen == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_purple_green.gif');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
    if (hunger > 60) {
      gif_pet = createImg('pet_purple_green_chubby.png');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
  }
  if (purpleRed == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_purple_red.gif');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
    if (hunger > 60) {
      gif_pet = createImg('pet_purple_red_chubby.png');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
  }
  if (blueGreen == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_blue_green.gif');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
    if (hunger > 60) {
      gif_pet = createImg('pet_blue_green_chubby.png');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
  }
  if (blueRed == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_blue_red.gif');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
    if (hunger > 60) {
      gif_pet = createImg('pet_blue_red_chubby.png');
      gif_pet.position(windowWidth / 2.7, 140);
      gif_pet.size(413, 705);
    }
  }

  buttonlist = createImg('list.png');
  buttonlist.position(windowWidth / 3, 0, 120, 120);
  buttonlist.size(100, 100);

  if (music == true) {
    soundOn = createImg("sound.png");
    soundOn.position(windowWidth / 1.7, 0, 120);
    soundOn.size(100, 100);
    soundOn.mouseClicked(soundToggleOff);
  }
  if (music == false) {
    soundOff = createImg("soundOff.png");
    soundOff.position(windowWidth / 1.7, 0, 120);
    soundOff.size(100, 100);
    soundOff.mouseClicked(soundToggleOn);
  }
  

  buttonclothes = createImg("clothes.png");
  buttonclothes.position(windowWidth / 1.7, windowHeight / 2 + 375, 120, 120);
  buttonclothes.size(90, 90);
  buttonclothes.mouseClicked(clothes);

  buttonfood = createImg("food.png");
  buttonfood.position(windowWidth / 2.17, windowHeight / 2 + 375, 120, 120);
  buttonfood.size(90, 90);
  buttonfood.mouseClicked(feed);

  buttonwalk = createImg("walk.png");
  buttonwalk.position(windowWidth / 3, windowHeight / 2 + 375, 120, 120);
  buttonwalk.size(90, 90);
  buttonwalk.mouseClicked(walk);

  textSize(30);
  fill(255);
  text(petName, windowWidth / 2.17, 135);
}

function explosion() {
  background(0);
  gif_pet.remove();
  buttonlist.remove();
  if (music == true) {
    soundOn.remove();
  }
  if (music == false) {
    soundOff.remove();
  }
  buttonclothes.remove();
  buttonfood.remove();
  buttonwalk.remove();
  loadImage('pet.png', img => {
    image(img, windowWidth / 2.7, 100, 443, 745);
  });
  ohButton = createButton("Oh.");
  ohButton.position(windowWidth / 2.17, windowHeight / 2 + 365);
  ohButton.mouseClicked(gameOver);
}

function skeleton() {
  background(0);
  gif_pet.remove();
  buttonlist.remove();
  if (music == true) {
    soundOn.remove();
  }
  if (music == false) {
    soundOff.remove();
  }
  buttonclothes.remove();
  buttonfood.remove();
  buttonwalk.remove();
  loadImage('pet.png', img => {
    image(img, windowWidth / 2.7, 100, 443, 745);
  });
  ohButton = createButton("Oh.");
  ohButton.position(windowWidth / 2.17, windowHeight / 2 + 365);
  ohButton.mouseClicked(gameOver);
}

function clothes() {
  acc = true;
  buttonclothes.remove();
  buttonlist.remove();
  if (music == true) {
    soundOn.remove();
  }
  if (music == false) {
    soundOff.remove();
  }
  buttonfood.remove();
  buttonwalk.remove();
  backFromClothes = createImg("clothes.png");
  backFromClothes.position(windowWidth / 1.7, windowHeight / 2 + 375, 120, 120);
  backFromClothes.size(90, 90);
  backFromClothes.mouseClicked(main);
  furColor = createButton("Fur");
  furColor.position(windowWidth / 3, windowHeight / 2 + 305);
  furColor.mouseClicked(furMenu);
  eyeColor = createButton("Eyes");
  eyeColor.position(windowWidth / 2.17, windowHeight / 2 + 305);
  eyeColor.mouseClicked(eyesMenu);
  accessoires = createButton("Clothes");
  accessoires.position(windowWidth / 1.7, windowHeight / 2 + 305);
  accessoires.mouseClicked(clothesMenu);
}

function furMenu() {
  fur = true;
  furColor.remove();
  eyeColor.remove();
  accessoires.remove();
  furOption1 = createImg("purple.png");
  furOption1.position(windowWidth / 3, windowHeight / 2 + 305);
  furOption1.size(50, 50);
  furOption1.mouseClicked(furPurple);
  furOption2 = createImg("blue.png");
  furOption2.position(windowWidth / 1.7, windowHeight / 2 +305);
  furOption2.size(50, 50);
  furOption2.mouseClicked(furBlue);
}

function furPurple() {
  gif_pet.remove();
  if (greenEyes == true) {
    purpleFur = true;
    blueFur = false;
    purpleGreen = true;
    purpleRed = false;
    blueGreen = false;
    blueRed = false;
  }
  if (redEyes == true) {
    purpleFur = true;
    blueFur = false;
    purpleRed = true;
    purpleGreen = false;
    blueGreen = false;
    blueRed = false;
  }
  main();
}

function furBlue() {
  gif_pet.remove();
  if (greenEyes == true) {
    purpleFur = false;
    blueFur = true;
    purpleGreen = false;
    purpleRed = false;
    blueGreen = true;
    blueRed = false;
  }
  if (redEyes == true) {
    purpleFur = false;
    blueFur = true;
    purpleRed = false;
    purpleGreen = false;
    blueGreen = false;
    blueRed = true;
  }
  main();
}

function eyesMenu() {
  eyes = true;
  furColor.remove();
  eyeColor.remove();
  accessoires.remove();
  eyesOption1 = createImg("green.png");
  eyesOption1.position(windowWidth / 3, windowHeight / 2 + 305);
  eyesOption1.size(50, 50);
  eyesOption1.mouseClicked(eyesGreen);
  eyesOption2 = createImg("red.png");
  eyesOption2.position(windowWidth / 1.7, windowHeight / 2 +305);
  eyesOption2.size(50, 50);
  eyesOption2.mouseClicked(eyesRed);
}
function eyesGreen() {
  gif_pet.remove();
  if (purpleFur == true) {
    greenEyes = true;
    redEyes = false;
    purpleGreen = true;
    purpleRed = false;
    blueGreen = false;
    blueRed = false;
  }
  if (blueFur == true) {
    greenEyes = true;
    redEyes = false;
    purpleRed = false;
    purpleGreen = false;
    blueGreen = true;
    blueRed = false;
  }
  main();
}
function eyesRed() {
  gif_pet.remove();
  if (purpleFur == true) {
    greenEyes = false;
    redEyes = true;
    purpleGreen = false;
    purpleRed = true;
    blueGreen = false;
    blueRed = false;
  }
  if (blueFur == true) {
    greenEyes = false;
    redEyes = true;
    purpleRed = false;
    purpleGreen = false;
    blueGreen = false;
    blueRed = true;
  }
  main();
}

function soundToggleOff() {
  soundOn.remove();
  music = false;
  console.log("soundOff");
  buttonlist.remove();
  buttonfood.remove();
  buttonclothes.remove();
  buttonwalk.remove();
  gif_pet.remove();
  main();
}
function soundToggleOn() {
  soundOff.remove();
  music = true;
  console.log("soundOn");
  buttonlist.remove();
  buttonfood.remove();
  buttonclothes.remove();
  buttonwalk.remove();
  gif_pet.remove();
  main();
}

function clothesMenu() {
  cloth = true;
  furColor.remove();
  eyeColor.remove();
  accessoires.remove();
  clothOption1 = createButton("Option 1");
  clothOption1.position(windowWidth / 3, windowHeight / 2 + 305);
  clothOption2 = createButton ("Option 2");
  clothOption2.position(windowWidth / 1.7, windowHeight / 2 +305);
}

function feed() {
  buttonclothes.remove();
  buttonlist.remove();
  gif_pet.remove();
  if (music == true) {
    soundOn.remove();
  }
  if (music == false) {
    soundOff.remove();
  }
  buttonfood.remove();
  buttonwalk.remove();
  if (hunger == 100) {
    explosion();
  }
  hunger += 10;
  console.log(hunger);
  main();
}

function gameOver() {
  ohButton.remove();
  background(0);
  textSize(30);
  fill(255);
  text("Game Over", windowWidth / 2 - 150, windowHeight / 2);
  restart = createButton("Restart");
  restart.position(windowWidth / 2 - 150, windowHeight / 2 + 100);
  res = true;
  restart.mouseClicked(egg);
}

function egg() {
  if (freshStart == true) {
    yesButton.remove();
    noButton.remove();
  }
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });
  if (res == true) {
  restart.remove();
  }
  beginning = true;
  textSize(30);
 fill(255);
  text("Name your pet!", windowWidth/2 -150, windowHeight/3);
  inp = createInput('');
  inp.position(windowWidth/2 -150, windowHeight/3 + 50);
  nameThePet = createButton("Name it!");
  nameThePet.position(windowWidth/2 -150, windowHeight/3 + 100);
  nameThePet.mouseClicked(areYouSure);
}

function areYouSure() {
  freshStart = true;
  nameThePet.remove();
  inp.remove();
  petName = inp.value();
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });
textSize(30);
 fill(255);
  text("Is this its name?: " + petName, windowWidth/2 -150, windowHeight/3);
  yesButton = createButton("Yes");
  yesButton.position(windowWidth/2 -150, windowHeight/3 + 50)
  yesButton.mouseClicked(main);
  noButton = createButton("No");
  noButton.position(windowWidth/2 -100, windowHeight/3 + 50)
  noButton.mouseClicked(egg);
}

function walk() {
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });
  gif_pet.remove();
  buttonlist.remove();
  if (music == true) {
    soundOn.remove();
  }
  if (music == false) {
    soundOff.remove();
  }
  buttonclothes.remove();
  buttonfood.remove();
  buttonwalk.remove();

  goBack = createImg("goBack.png");
  goBack.position(windowWidth / 3, windowHeight / 2 + 375, 120, 120);
  goBack.size(90, 90);
  goBack.mouseClicked(goingBack);
  //create the button
  distance_button = createButton("start walk");

  //position of the button
  distance_button.position(windowWidth / 2, windowHeight - windowHeight / 4);
  // when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);
}

function goingBack() {
  distance_button.remove();
  if (end == true) {
    end_button.remove();
  }
  goBack.remove();
  main();
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

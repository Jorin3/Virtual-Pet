
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
let displayName;
let displayIntro;
let displayAccept;
let displayWalk;
let show_name = false;
let show_intro = false;
let show_accept = false;
let show_walk = false;
let answerNo = false;
let show_pet = false;
let initial_height;
let initial_width;
let init_pet = false;
let init_walk1 = false;
let init_walk2 = false;
let init_walk3 = false;
let init_clothes = false;
let init_fur = false;
let init_eyes = false;
let init_customize = false;
let thereWasAccept = false;
var x = document.cookie;
let appearance = "purpleGreen";
let savePetName = false;
let saveHunger = false;
let saveAppearance = false;
let score = 0;
let deathByExplosion = false;
let deathByStarvation = false;
let firstPet = true;
let init_walkPet = false;
let firstTime = true;
let finishTutorial = false;

var database; // database reference
var players; // Liste aller Spieler

//Cookies
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
  var the_name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(the_name) == 0) {
      return c.substring(the_name.length, c.length);
    }
  }
  return "";
}

function checkCookie_Intro() {
  var this_user = getCookie("petname");
  if (this_user != "") {
    beginning = true;
  } else {
    beginning = false;
  }
}

function checkCookie_Looks() {
  var this_user = getCookie("looks");
  if (this_user == "purpleGreen" || this_user == "") {
    greenEyes = true;
    redEyes = false;
    purpleFur = true;
    blueFur = false;
    purpleGreen = true;
    purpleRed = false;
    blueGreen = false;
    blueRed = false;
  }
  if (this_user == "purpleRed") {
    greenEyes = false;
    redEyes = true;
    purpleFur = true;
    blueFur = false;
    purpleGreen = false;
    purpleRed = true;
    blueGreen = false;
    blueRed = false;
  }
  if (this_user == "blueGreen") {
    greenEyes = true;
    redEyes = false;
    purpleFur = false;
    blueFur = true;
    purpleGreen = false;
    purpleRed = false;
    blueGreen = true;
    blueRed = false;
  }
  if (this_user == "blueRed") {
    greenEyes = false;
    redEyes = true;
    purpleFur = false;
    blueFur = true;
    purpleGreen = false;
    purpleRed = false;
    blueGreen = false;
    blueRed = true;
  }
}

function checkCookie_Name() {
  var this_user = getCookie("petname");
  petName = this_user;
}

function checkCookie_Hunger() {
  var this_user = getCookie("hunger");
  if (this_user == 0) {
    hunger = 0;
  }
  if (this_user == 10) {
    hunger = 10;
  }
  if (this_user == 20) {
    hunger = 20;
  }
  if (this_user == 30) {
    hunger = 30;
  }
  if (this_user == 40) {
    hunger = 40;
  }
  if (this_user == 50) {
    hunger = 50;
  }
  if (this_user == 60) {
    hunger = 60;
  }
  if (this_user == 70) {
    hunger = 70;
  }
  if (this_user == 80) {
    hunger = 80;
  }
  if (this_user == 90) {
    hunger = 90;
  }
  if (this_user == 100) {
    hunger = 100;
  }
}

function checkCookie_Distance() {
  var this_user = getCookie("distance");
  score = this_user;
}

//Startposition wird gespeichert
navigator.geolocation.getCurrentPosition(position => {
  lat = (position.coords.latitude);
  long = (position.coords.longitude);
}
);

//Aktuelle Position wird ermittelt & gespeichert
function positionPing(position) {
  if (walkstarted == true) {
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
  init_walk1 = false;
  init_walk2 = true;
  init_walk3 = false;
  do_interval = true;
  newBackground();
  walkstarted = true;

  goBack.remove();
  goBack = createImg("goBack.png");
  goBack.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight());
  goBack.size(borderResizeHeight(), borderResizeHeight());
  goBack.mouseClicked(goingBack);

  if (purpleGreen == true) {
    walk_pet = createImg('walking_purple_green.gif');
    walk_pet.position(windowWidth / 2 - (23.0 / 37.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
    walk_pet.size(23.0 / 37.0 * petResizeHeight(), petResizeHeight());
  }
  if (purpleRed == true) {
    walk_pet = createImg('walking_purple_red.gif');
    walk_pet.position(windowWidth / 2 - (23.0 / 37.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
    walk_pet.size(23.0 / 37.0 * petResizeHeight(), petResizeHeight());
  }
  if (blueGreen == true) {
    walk_pet = createImg('walking_blue_green.gif');
    walk_pet.position(windowWidth / 2 - (23.0 / 37.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
    walk_pet.size(23.0 / 37.0 * petResizeHeight(), petResizeHeight());
  }
  if (blueRed == true) {
    walk_pet = createImg('walking_blue_red.gif');
    walk_pet.position(windowWidth / 2 - (23.0 / 37.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
    walk_pet.size(23.0 / 37.0 * petResizeHeight(), petResizeHeight());
  }
  init_walkPet = true;
  dist = 0;
  intervalCurrentPosition(positionPing, 5000);
  end = true;
  distance_button.remove();
  //End Button wird erzeugt
  end_button = createButton("end walk");
  //End Button wird platziert
  end_button.position(windowWidth / 2 - (borderResizeHeight() / 2), windowHeight - borderResizeHeight() * 2);
  //Methode die ausgeführt wird, wenn der End Button gedrückt wird
  end_button.mouseClicked(show_distance);
}

//Gibt Distanz zurück in Textform
function show_distance() {

  init_walk1 = false;
  init_walk2 = false;
  init_walk3 = true;
  walk_pet.remove();
  goBack.remove();
  goBack = createImg("goBack.png");
  goBack.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight());
  goBack.size(borderResizeHeight(), borderResizeHeight());
  goBack.mouseClicked(goingBack);

  saveHunger = true;
  if (dist != 0) {
    hunger -= 10;
  }

  roundThis();
  if (dist != 0) {
    if (rounded > score) {
      score = rounded;
    }
  }

  //text ausgabe
  /*
  textSize(30);
  fill(255);
  text("you walked " + rounded + " kilometers", windowWidth / 2 - 150, windowHeight / 2);
  */
  show_walk = true;

  clearIntervalPos();



  end_button.remove();

  distance_button = createButton("start walk");

  //position of the button
  distance_button.position(windowWidth / 2 - (borderResizeHeight() / 2), windowHeight - borderResizeHeight() * 2);
  // when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);

}

let rounded = 0;

function roundThis() {
  rounded = round(dist, 2);
}



/*function preload() {
  font = loadFont("Montserrat-Regular.ttf");
}*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  initial_height = windowHeight;
  initial_width = windowWidth;
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, borderResizeHeight());
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight - borderResizeHeight(), windowWidth, borderResizeHeight());
  });
  displayName = createGraphics(borderResizeHeight() * 3, borderResizeHeight());
  displayName.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0) + borderResizeHeight(), 0);
  displayIntro = createGraphics(borderResizeHeight() * 3, borderResizeHeight());
  displayIntro.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0) + borderResizeHeight(), 0);
  displayAccept = createGraphics(borderResizeHeight() * 3, borderResizeHeight());
  displayAccept.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0) + borderResizeHeight(), 0);
  displayWalk = createGraphics(borderResizeHeight() * 3, borderResizeHeight());
  displayWalk.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0) + borderResizeHeight(), 0);

  var firebaseConfig = {
    apiKey: "AIzaSyDnoxMbdGuX63QAeTZ_3y7on8qTj1eBkuI",
    authDomain: "virtual-pet-e974b.firebaseapp.com",
    databaseURL: "https://virtual-pet-e974b.firebaseio.com",
    projectId: "virtual-pet-e974b",
    storageBucket: "virtual-pet-e974b.appspot.com",
    messagingSenderId: "1066275384712",
    appId: "1:1066275384712:web:9365d4d8f759a389c8de3d"
  }


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);
  console.log('uid:' + uid);
  database = firebase.database();

  //COOKIE DELETER
  /*
  document.cookie = "petname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "looks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "hunger=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "distance=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  */

  checkCookie_Intro();
  checkCookie_Looks();
  console.log(beginning);

  if (beginning == false) {
    if (firstTime == true) {
      tutorial();
    }
    if (firstTime == false) {
      egg();
    }
  } else {
    main();
  }
}

function main() {
  show_pet = true;
  show_accept = false;
  show_name = true;
  init_clothes = false;
  init_fur = false;
  init_eyes = false;
  init_customize = false;


  if (acc == true) {
    furColor.remove();
    eyeColor.remove();
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
  if (thereWasAccept == true) {
    yesButton.remove();
    noButton.remove();
  }
  if (savePetName == true) {
    setCookie("petname", petName);
    savePetName = false;
  }
  if (saveHunger == true) {
    setCookie("hunger", hunger);
    saveHunger = false;
  }
  if (saveAppearance == true) {
    setCookie("looks", appearance);
    saveAppearance = false;
  }
  setCookie("distance", score);

  checkCookie_Hunger();

  createPet();

  buttonlist = createImg('list.png');
  buttonlist.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), 0, 120, 120);
  buttonlist.size(borderResizeHeight(), borderResizeHeight());

  if (music == true) {
    soundOn = createImg("sound.png");
    soundOn.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), 0, 120);
    soundOn.size(borderResizeHeight(), borderResizeHeight());
    soundOn.mouseClicked(soundToggleOff);
  }
  if (music == false) {
    soundOff = createImg("soundOff.png");
    soundOff.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), 0, 120);
    soundOff.size(borderResizeHeight(), borderResizeHeight());
    soundOff.mouseClicked(soundToggleOn);
  }


  buttonclothes = createImg("clothes.png");
  buttonclothes.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight());
  buttonclothes.size(borderResizeHeight(), borderResizeHeight());
  buttonclothes.mouseClicked(clothes);

  buttonfood = createImg("food.png");
  buttonfood.position(windowWidth / 2 - (borderResizeHeight() / 2), windowHeight - borderResizeHeight());
  buttonfood.size(borderResizeHeight(), borderResizeHeight());
  buttonfood.mouseClicked(feed);

  buttonwalk = createImg("walk.png");
  buttonwalk.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight());
  buttonwalk.size(borderResizeHeight(), borderResizeHeight());
  buttonwalk.mouseClicked(walk);
  init_pet = true;
  console.log(document.cookie);

  if (hunger > 100) {
    explosion();
  }
  if (hunger < 0) {
    skeleton();
  }
}

function pet_windowChange() {
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

  newBackground();
  main();
}

function walk1_windowChange() {
  distance_button.remove();
  if (end == true) {
    end_button.remove();
  }
  goBack.remove();
  newBackground();
  walk();
}

function walk2_windowChange() {
  distance_button.remove();
  if (end == true) {
    end_button.remove();
  }
  newBackground();
  distance_measure();
}

function walk3_windowChange() {
  distance_button.remove();
  if (end == true) {
    end_button.remove();
  }
  newBackground();
  show_distance();
}

function customize_windowChange() {
  gif_pet.remove();
  createPet();
  backFromClothes.remove();
  furColor.remove();
  eyeColor.remove();
  newBackground();
  clothes();
}

function fur_windowChange() {
  gif_pet.remove();
  createPet();
  backFromClothes.remove();
  furOption1.remove();
  furOption2.remove();
  newBackground();
  furMenu();
}

function eyes_windowChange() {
  gif_pet.remove();
  createPet();
  backFromClothes.remove();
  eyesOption1.remove();
  eyesOption2.remove();
  newBackground();
  eyesMenu();
}

function clothes_windowChange() {
  gif_pet.remove();
  createPet();
  backFromClothes.remove();
  clothOption1.remove();
  clothOption2.remove();
  newBackground();
  clothesMenu();
}

function draw() {
  if (deathByExplosion == true) {
    if (purpleGreen == true) {
      dead_pet = createImg('explosion_purple_green.gif');
      dead_pet.position(windowWidth / 2 - (900.0 / 1300.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(900.0 / 1300.0 * petResizeHeight(), petResizeHeight());
      setTimeout(explosionFinish, 1400);
    }
    if (purpleRed == true) {
      dead_pet = createImg('explosion_purple_red.gif');
      dead_pet.position(windowWidth / 2 - (900.0 / 1300.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(900.0 / 1300.0 * petResizeHeight(), petResizeHeight());
      setTimeout(explosionFinish, 1400);
    }
    if (blueGreen == true) {
      dead_pet = createImg('explosion_blue_green.gif');
      dead_pet.position(windowWidth / 2 - (900.0 / 1300.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(900.0 / 1300.0 * petResizeHeight(), petResizeHeight());
      setTimeout(explosionFinish, 1400);
    }
    if (blueRed == true) {
      dead_pet = createImg('explosion_blue_red.gif');
      dead_pet.position(windowWidth / 2 - (900.0 / 1300.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(900.0 / 1300.0 * petResizeHeight(), petResizeHeight());
      setTimeout(explosionFinish, 1400);
    }
    deathByExplosion = false;
  }
  if (deathByStarvation == true) {
    if (purpleGreen == true) {
      dead_pet = createImg('skeleton_purple_green.gif');
      dead_pet.position(windowWidth / 2 - (553.0 / 1000.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(553.0 / 1000.0 * petResizeHeight(), petResizeHeight());
      setTimeout(skeletonFinish, 2000);
    }
    if (purpleRed == true) {
      dead_pet = createImg('skeleton_purple_red.gif');
      dead_pet.position(windowWidth / 2 - (553.0 / 1000.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(553.0 / 1000.0 * petResizeHeight(), petResizeHeight());
      setTimeout(skeletonFinish, 2000);
    }
    if (blueGreen == true) {
      dead_pet = createImg('skeleton_blue_green.gif');
      dead_pet.position(windowWidth / 2 - (553.0 / 1000.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(553.0 / 1000.0 * petResizeHeight(), petResizeHeight());
      setTimeout(skeletonFinish, 2000);
    }
    if (blueRed == true) {
      dead_pet = createImg('skeleton_blue_red.gif');
      dead_pet.position(windowWidth / 2 - (553.0 / 1000.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      dead_pet.size(553.0 / 1000.0 * petResizeHeight(), petResizeHeight());
      setTimeout(skeletonFinish, 2000);
    }
    deathByStarvation = false;
  }
  if (init_pet == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      pet_windowChange();
    }
  }

  if (init_walk1 == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      walk1_windowChange();
    }
  }

  if (init_walk2 == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      walk2_windowChange();
    }
  }

  if (init_walk3 == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      show_walk = true;
      walk3_windowChange();
    }
  }

  if (init_customize == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      customize_windowChange();
    }
  }

  if (init_fur == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      fur_windowChange();
    }
  }

  if (init_eyes == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      eyes_windowChange();
    }
  }

  if (init_clothes == true) {
    if (windowWidth != initial_width || windowHeight != initial_height) {
      initial_width = windowWidth;
      initial_height = windowHeight;
      clothes_windowChange();
    }
  }

  if (show_name == true) {
    newBackground();
    erase();

    fill(255);
    textSize(50);
    text(petName, windowWidth / 2 - (textWidth(petName) / 2), 0);
    /*
    displayName.fill(255);
    displayName.textSize(30);
    displayName.text(petName, 0, 100);
    image(displayName, windowWidth / 2 - (textWidth(petName) / 2), 0);
    */
    noErase();
    show_name = false;
  }
  if (show_intro == true) {
    newBackground();

    fill(255);
    textSize(30);
    text('Name your pet!', windowWidth / 2 - (textWidth('Name your pet!') / 2), borderResizeHeight() * 2);
    /*
    displayIntro.fill(255);
    displayIntro.textSize(50);
    displayIntro.text('Name your pet!', 0, 100);
    image(displayIntro, windowWidth / 2 - (textWidth('Name your pet!') / 2), borderResizeHeight());
    */
    show_intro = false;
  }
  if (show_accept == true) {
    newBackground();

    fill(255);
    textSize(30);
    text('Is this its name?: ' + petName, windowWidth / 2 - (textWidth('Is this its name?: ' + petName) / 2), borderResizeHeight() * 2);
    /*
    displayAccept.fill(255);
    displayAccept.textSize(30);
    displayAccept.text('Is this its name?: ' + petName, 0, 100);
    image(displayAccept, windowWidth / 2 - (textWidth('Is this its name?: ' + petName) / 2), borderResizeHeight() * 2);
    */
    show_accept = false;
  }
  if (show_walk == true) {
    newBackground();

    fill(255);
    textSize(30);
    text("you walked", windowWidth / 2 - (textWidth("you walked") / 2), borderResizeHeight() * 2);
    text(rounded, windowWidth / 2 - (textWidth(rounded) / 2), borderResizeHeight() * 2 + 50);
    text("kilometers", windowWidth / 2 - (textWidth("kilometers") / 2), borderResizeHeight() * 2 + 100);
    /*
    displayWalk.fill(255);
    displayWalk.textSize(30);
    displayWalk.text("you walked " + rounded + " kilometers", 0, 100);
    image(displayWalk, windowWidth / 2 - (textWidth("you walked " + rounded + " kilometers") / 2), borderResizeHeight() * 2);
    */
    show_walk = false;
  }
}

function newBackground() {
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, borderResizeHeight());
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight - borderResizeHeight(), windowWidth, borderResizeHeight());
  });
}

function createPet() {
  if (firstPet == false) {
    gif_pet.remove();
  }
  if (purpleGreen == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_purple_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 60 && hunger < 90) {
      gif_pet = createImg('chubby_idle_purple_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 80) {
      gif_pet = createImg('fat_idle_purple_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 10 && hunger < 40) {
      gif_pet = createImg('thin_idle_purple_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger < 20) {
      gif_pet = createImg('skinny_idle_purple_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
  }
  if (purpleRed == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_purple_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 60 && hunger < 90) {
      gif_pet = createImg('chubby_idle_purple_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 80) {
      gif_pet = createImg('fat_idle_purple_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 10 && hunger < 40) {
      gif_pet = createImg('thin_idle_purple_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger < 20) {
      gif_pet = createImg('skinny_idle_purple_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
  }
  if (blueGreen == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_blue_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 60 && hunger < 90) {
      gif_pet = createImg('chubby_idle_blue_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 80) {
      gif_pet = createImg('fat_idle_blue_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 10 && hunger < 40) {
      gif_pet = createImg('thin_idle_blue_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger < 20) {
      gif_pet = createImg('skinny_idle_blue_green.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
  }
  if (blueRed == true) {
    if (hunger > 30 && hunger < 70) {
      gif_pet = createImg('idle_blue_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 60 && hunger < 90) {
      gif_pet = createImg('chubby_idle_blue_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 80) {
      gif_pet = createImg('fat_idle_blue_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger > 10 && hunger < 40) {
      gif_pet = createImg('thin_idle_blue_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
    if (hunger < 20) {
      gif_pet = createImg('skinny_idle_blue_red.gif');
      gif_pet.position(windowWidth / 2 - (553.0 / 915.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
      gif_pet.size(553.0 / 915.0 * petResizeHeight(), petResizeHeight());
    }
  }
  firstPet = false;
}

function borderResizeHeight() {
  return windowHeight * 0.125;
}
function petResizeHeight() {
  return windowHeight * 0.7;
}

function explosionFinish() {
  dead_pet.remove();
  dead_pet = createImg('explosion_death.png');
  dead_pet.position(windowWidth / 2 - (900.0 / 1300.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
  dead_pet.size(900.0 / 1300.0 * petResizeHeight(), petResizeHeight());
}
function skeletonFinish() {
  dead_pet.remove();
  dead_pet = createImg('skeleton_death.png');
  dead_pet.position(windowWidth / 2 - (553.0 / 1000.0 * petResizeHeight() / 2), windowHeight / 2 - (petResizeHeight() / 2));
  dead_pet.size(553.0 / 1000.0 * petResizeHeight(), petResizeHeight());
}
function explosion() {
  init_pet = false;
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
  background(0);
  deathByExplosion = true;
  ohButton = createButton("Oh.");
  ohButton.position(windowWidth / 2 - (borderResizeHeight() / 2), windowHeight - borderResizeHeight());
  ohButton.mouseClicked(gameOver);
}

function skeleton() {
  init_pet = false;
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
  background(0);
  deathByStarvation = true;
  ohButton = createButton("Oh.");
  ohButton.position(windowWidth / 2 - (borderResizeHeight() / 2), windowHeight - borderResizeHeight());
  ohButton.mouseClicked(gameOver);
}

function clothes() {
  init_customize = true;
  init_pet = false;
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
  backFromClothes.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight());
  backFromClothes.size(borderResizeHeight(), borderResizeHeight());
  backFromClothes.mouseClicked(main);
  furColor = createButton("Fur");
  furColor.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight() * 2);
  furColor.mouseClicked(furMenu);
  eyeColor = createButton("Eyes");
  eyeColor.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight() * 2);
  eyeColor.mouseClicked(eyesMenu);
}

function furMenu() {
  init_customize = false;
  init_fur = true;
  fur = true;
  furColor.remove();
  eyeColor.remove();

  backFromClothes.remove();
  backFromClothes = createImg("clothes.png");
  backFromClothes.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight());
  backFromClothes.size(borderResizeHeight(), borderResizeHeight());
  backFromClothes.mouseClicked(main);

  furOption1 = createImg("purple.png");
  furOption1.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight() * 2);
  furOption1.size(50, 50);
  furOption1.mouseClicked(furPurple);
  furOption2 = createImg("blue.png");
  furOption2.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight() * 2);
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
    appearance = "purpleGreen";
  }
  if (redEyes == true) {
    purpleFur = true;
    blueFur = false;
    purpleRed = true;
    purpleGreen = false;
    blueGreen = false;
    blueRed = false;
    appearance = "purpleRed";
  }
  saveAppearance = true;
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
    appearance = "blueGreen";
  }
  if (redEyes == true) {
    purpleFur = false;
    blueFur = true;
    purpleRed = false;
    purpleGreen = false;
    blueGreen = false;
    blueRed = true;
    appearance = "blueRed";
  }
  saveAppearance = true;
  main();
}

function eyesMenu() {
  init_customize = false;
  init_eyes = true;
  eyes = true;
  furColor.remove();
  eyeColor.remove();

  backFromClothes.remove();
  backFromClothes = createImg("clothes.png");
  backFromClothes.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight());
  backFromClothes.size(borderResizeHeight(), borderResizeHeight());
  backFromClothes.mouseClicked(main);

  eyesOption1 = createImg("green.png");
  eyesOption1.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight() * 2);
  eyesOption1.size(50, 50);
  eyesOption1.mouseClicked(eyesGreen);
  eyesOption2 = createImg("red.png");
  eyesOption2.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight() * 2);
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
    appearance = "purpleGreen";
  }
  if (blueFur == true) {
    greenEyes = true;
    redEyes = false;
    purpleRed = false;
    purpleGreen = false;
    blueGreen = true;
    blueRed = false;
    appearance = "blueGreen";
  }
  saveAppearance = true;
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
    appearance = "purpleRed";
  }
  if (blueFur == true) {
    greenEyes = false;
    redEyes = true;
    purpleRed = false;
    purpleGreen = false;
    blueGreen = false;
    blueRed = true;
    appearance = "blueRed";
  }
  saveAppearance = true;
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
  init_customize = false;
  init_clothes = true;
  cloth = true;
  furColor.remove();
  eyeColor.remove();

  backFromClothes.remove();
  backFromClothes = createImg("clothes.png");
  backFromClothes.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight());
  backFromClothes.size(borderResizeHeight(), borderResizeHeight());
  backFromClothes.mouseClicked(main);

  clothOption1 = createButton("Option 1");
  clothOption1.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight() * 2);
  clothOption2 = createButton("Option 2");
  clothOption2.position(min(windowWidth / 2 - (borderResizeHeight() / 2) + (borderResizeHeight() * 2), windowWidth - borderResizeHeight()), windowHeight - borderResizeHeight() * 2);
}

function feed() {
  saveHunger = true;
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
  /*if (hunger == 100) {
    explosion();
  }*/
  hunger += 10;
  console.log(hunger);
  main();
}

function gameOver() {
  dead_pet.remove();
  setCookie("petname", "");
  setCookie("hunger", 50);
  setCookie("distance", 0);
  setCookie("looks", "purpleGreen");
  console.log(document.cookie);
  petName = "";
  hunger = 50;
  score = 0;
  purpleGreen = true;
  purpleRed = false;
  blueGreen = false;
  blueRed = false;
  ohButton.remove();
  background(0);
  textSize(30);
  fill(255);
  text("Game Over", windowWidth / 2 - (textWidth('Game Over') / 2), borderResizeHeight() * 2);
  restart = createButton("Restart");
  restart.position(windowWidth / 2 - (textWidth("Restart") / 2), borderResizeHeight() * 4);
  res = true;
  restart.mouseClicked(egg);
}

function tutorial() {
  newBackground();
  fill(255);
  textSize(30);
  text('Congratulations', windowWidth / 2 - (textWidth('Congratulations') / 2), borderResizeHeight() * 2);
  text('You will get your own Momo.', windowWidth / 2 - (textWidth('You will get your own Momo.') / 2), borderResizeHeight() * 2 + 50);
  text('After you name it, you have to take care of it.', windowWidth / 2 - (textWidth('After you name it, you have to take care of it.') / 2), borderResizeHeight() * 2 + 100);
  text('You have to feed your pet and go for a walk frequently.', windowWidth / 2 - (textWidth('You have to feed your pet and go for a walk frequently.') / 2), borderResizeHeight() * 2 + 150);
  text('Lets Start!', windowWidth / 2 - (textWidth('Lets Start!') / 2), borderResizeHeight() * 2 + 350);
  okay = createButton("Okay");
  okay.position(windowWidth / 2 - (textWidth("Okay") / 2), borderResizeHeight() * 2 + 400);
  okay.mouseClicked(egg);
  finishTutorial = true;
}

function egg() {
  if (finishTutorial == true) {
    okay.remove();
    finishTutorial = false;
  }
  firstTime = false;
  show_intro = true;
  if (answerNo == true) {
    displayAccept.remove();
  }
  /*background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });*/
  if (freshStart == true) {
    yesButton.remove();
    noButton.remove();
  }
  if (res == true) {
    restart.remove();
  }
  beginning = true;
  //To Do: text("Name your pet!", windowWidth / 2, windowHeight / 3);
  inp = createInput('');
  inp.position(windowWidth / 2 - (textWidth(inp) / 2), borderResizeHeight() * 3);
  nameThePet = createButton("Name it!");
  nameThePet.position(windowWidth / 2 - (textWidth("Name it!") / 2), borderResizeHeight() * 4);
  nameThePet.mouseClicked(areYouSure);
}

function areYouSure() {
  thereWasAccept = true;
  savePetName = true;
  saveAppearance = true;
  saveHunger = true;
  answerNo = true;
  show_accept = true;
  freshStart = true;
  nameThePet.remove();
  inp.remove();
  petName = inp.value();
  /*
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });*/
  //To Do: text("Is this its name?: " + petName, windowWidth / 2, windowHeight / 3);
  yesButton = createButton("Yes");
  yesButton.position(windowWidth / 2 - 50, borderResizeHeight() * 4);
  yesButton.mouseClicked(main);
  noButton = createButton("No");
  noButton.position(windowWidth / 2 + 50, borderResizeHeight() * 4);
  noButton.mouseClicked(egg);
}

function walk() {
  init_pet = false;
  init_walk1 = true;
  /*
  background(90);
  loadImage('black.png', img2 => {
    image(img2, 0, 0, windowWidth, 100);
  });
  loadImage('black.png', img3 => {
    image(img3, 0, windowHeight / 2 + 370, windowWidth, 100);
  });*/
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
  goBack.position(max(windowWidth / 2 - (borderResizeHeight() / 2) - (borderResizeHeight() * 2), 0), windowHeight - borderResizeHeight());
  goBack.size(borderResizeHeight(), borderResizeHeight());
  goBack.mouseClicked(goingBack);
  //create the button
  distance_button = createButton("start walk");

  //position of the button
  distance_button.position(windowWidth / 2 - (borderResizeHeight() / 2), windowHeight - borderResizeHeight() * 2);
  // when button is clicked distance measure function is called
  distance_button.mouseClicked(distance_measure);
}

function goingBack() {
  init_walk1 = false;
  init_walk2 = false;
  init_walk3 = false;
  if (init_walkPet == true) {
    walk_pet.remove();
  }

  distance_button.remove();
  clearIntervalPos();
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

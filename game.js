var jerry;
var tomContainer;
var cheeseContainer;
var scoreDisplay;
var score = 0;

var gameWidth = 600;
var gameHeight = 400;

var jerryWidth = 50;
var jerryHeight = 50;

var tomWidth = 50;
var tomHeight = 50;

var cheeseWidth = 40;
var cheeseHeight = 40;

var maxToms = 10;
var maxCheese = 10;

function createTom() {
  var tom = document.createElement("img");
  tom.setAttribute("src", "tom.png");
  tom.setAttribute("class", "tom");
  tom.style.left = Math.floor(Math.random() * (gameWidth - tomWidth)) + "px";
  tom.style.top = Math.floor(Math.random() * (gameHeight - tomHeight)) + "px";
  tomContainer.appendChild(tom);
}

function createCheese() {
  var cheese = document.createElement("img");
  cheese.setAttribute("src", "cheese.png");
  cheese.setAttribute("class", "cheese");
  cheese.style.left = Math.floor(Math.random() * (gameWidth - cheeseWidth)) + "px";
  cheese.style.top = Math.floor(Math.random() * (gameHeight - cheeseHeight)) + "px";
  cheeseContainer.appendChild(cheese);
}

function updateScore(change) {
  score += change;
  scoreDisplay.textContent = "得分: " + score;
}

function checkCollision(element1, element2) {
  var rect1 = element1.getBoundingClientRect();
  var rect2 = element2.getBoundingClientRect();
  
  return !(rect1.right < rect2.left || 
           rect1.left > rect2.right || 
           rect1.bottom < rect2.top || 
           rect1.top > rect2.bottom);
}

function gameLoop() {
  var toms = document.getElementsByClassName("tom");
  var cheeses = document.getElementsByClassName("cheese");

  for (var i = 0; i < toms.length; i++) {
    if (checkCollision(jerry, toms[i])) {
      updateScore(-50);
      toms[i].remove();
    }
  }

  for (var j = 0; j < cheeses.length; j++) {
    if (checkCollision(jerry, cheeses[j])) {
      updateScore(50);
      cheeses[j].remove();
    }
  }

  if (toms.length < maxToms) {
    createTom();
  }

  if (cheeses.length < maxCheese) {
    createCheese();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(event) {
  var key = event.keyCode;
  var jerryRect = jerry.getBoundingClientRect();

  if (key === 37 && jerryRect.left > 0) { // 左箭头键
    jerry.style.left = (jerryRect.left - 10) + "px";
  } else if (key === 38 && jerryRect.top > 0) { // 上箭头键
    jerry.style.top = (jerryRect.top - 10) + "px";
  } else if (key === 39 && jerryRect.right < gameWidth) { // 右箭头键
    jerry.style.left = (jerryRect.left + 10) + "px";
  } else if (key === 40 && jerryRect.bottom < gameHeight) { // 下箭头键
    jerry.style.top = (jerryRect.top + 10) + "px";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  jerry = document.getElementById("jerry");
  tomContainer = document.getElementById("tom-container");
  cheeseContainer = document.getElementById("cheese-container");
  scoreDisplay = document.getElementById("score");

  createTom();
  createCheese();
  gameLoop();
});

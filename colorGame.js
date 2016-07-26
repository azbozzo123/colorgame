var numSquares = 6;
var colors = genColors(numSquares);
var squares = document.querySelectorAll(".colorSq");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
var messageDis = document.getElementById("message");
var refreshBtn = document.querySelector(".refreshBtn");
var easyBtn = document.querySelector(".easy");
var hardBtn = document.querySelector(".hard");

//change view and color options to 3 for easier play
easyBtn.addEventListener("click", function(){
     numSquares = 3;
     easyBtn.classList.add("active");
     hardBtn.classList.remove("active");
     resetGame();
     //hide squares that are larger than colors arr
     for (var i=0;i<squares.length;i++){
          if (!colors[i]){
               squares[i].style.display = "none";
          }
     }
});

//change view and color options to 6 for harder play
hardBtn.addEventListener("click", function(){
     numSquares = 6;
     hardBtn.classList.add("active");
     easyBtn.classList.remove("active");
     resetGame();
     // make the hidden squares visable
     for (var i=0;i<squares.length;i++){
        squares[i].style.display = "block";
     }
});

//reset colors/game based on whether hard/easy button pushed
refreshBtn.addEventListener("click", function(){
     resetGame();
});

//go through the color squares and asign them the color from colors arr and listen for clicks
for (var i=0;i<colors.length;i++){
     //add initial color
     squares[i].style.background = colors[i];
     
     //add click listeners
     squares[i].addEventListener("click", function(){
          var clickedColor = this.style.background;
          //see if the color of clicked is correct
          if (clickedColor === pickedColor){
               changeWinColors(pickedColor);
               messageDis.textContent = "YOU WON!";
               refreshBtn.textContent = "PLAY AGAIN";
               
          }else {
               messageDis.textContent = "Try Again";
               //if wrong make "dissapear" by changing to background color of body
               this.style.background = "#313541";
               refreshBtn.textContent = "RESET";
          }
     });
}

//make all the changes to display after choosing winning number
function changeWinColors(color){
     for (var i=0;i<squares.length;i++){
          squares[i].style.background = color;
     }
     document.querySelector(".jumbotron").style.background = pickedColor;
}

//randomly chose one color from colors arr
function pickColor(){
     var random = Math.floor(Math.random() * colors.length);
     return colors[random];
}

//make array of rgb colors
function genColors(num){
     var arr = [];
     for (var i=0;i<num;i++){
          arr.push(randomColor());
     }
     return arr;
}

//make 1 random rgb color as a string
function randomColor(){
     var r = Math.floor(Math.random()*256);
     var g = Math.floor(Math.random()*256);
     var b = Math.floor(Math.random()*256);
     return "rgb(" + r + ", " + g + ", " + b + ")";
}

//make and assign new colors based on difficulty button pushed
function resetGame(){
     colors = genColors(numSquares);
     pickedColor = pickColor();
     colorDisplay.textContent = pickedColor;
     for (var i=0;i<colors.length;i++){
          squares[i].style.background = colors[i];
     }
     document.querySelector(".jumbotron").style.background = "#A4DDF5";
     refreshBtn.textContent = "NEW COLORS";
     messageDis.textContent = "";
}
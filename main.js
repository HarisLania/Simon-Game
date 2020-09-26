colorsArray = new Array('red', 'blue', 'green', 'yellow');
var computerPattern = new Array();
var userPattern = new Array(); 
var level = 1;
var count = 0;
var limit = 3;
var gameStart = false;
var check = 0;
var compTurn = true;

$(document).ready( function() {
  $('button.start-btn').click(function() {
    $('div.start').addClass('display-prop');
    $('button.start-btn').addClass('display-prop');
    $('h1').text('Game Begins');
    if (gameStart == false) {
      gameStart = true;
      game();
    }
  })

  function game(){
    $('h1').text('Level ' + level);
    function getSound(file) {
      var sound = new Audio("sounds/" + file + ".mp3");
      sound.play();
    };

    var interval = setInterval(startLvl, 2000);

    function startLvl() {
      var color_num = Math.floor(Math.random() * 4);
      var color = colorsArray[color_num];
      $("div." + color).fadeIn(100).fadeOut(100).fadeIn(100);
      getSound(color);
      computerPattern.push(color);
      count++;
      if (count == limit){
        clearInterval(interval)
        console.log(computerPattern);
        $('h1').text('Your turn!');
        compTurn = false;
        if (level === 1) {
          $('div#button').on('click', getUserPattern);
        };
      }
    } 


    function getUserPattern() {
      if (compTurn == false) {
        var color = $(this).attr('class');
        console.log(this);
        console.log(color);
        $('div.'+color).addClass('pressed');
        setTimeout(() => {
          $('div.'+color).removeClass('pressed');
        }, 200);
        getSound(color);
        userPattern.push(color);
        if (color === computerPattern[check]){
          check++;
          if (check < computerPattern.length) {
            console.log('win');
          }
          else {
            level++;
            userPattern = Array();
            computerPattern = Array();
            limit = limit + 2;
            count = 0;
            check = 0;
            console.log(level);
            console.log(limit);
            console.log(userPattern);
            console.log(computerPattern);
            compTurn = true;
            game();
          }

        }
        else {
          var sound = new Audio('sounds/wrong.mp3');
          sound.play();
          $('h1').html('Your lost! <br> Do you wish to play again?');
          $('button').hide()
          $('div').hide()
          $('h1').append("<br><button class='btn'>Yes</button><button class='btn'>No</button>");
          $('button.btn').click(function(){
            location.reload();
          })
        } 
      }
    }
  }
});


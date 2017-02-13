var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

//Variable number of rows and columns. Change to whatever.
var numberOfColumns = 8;
var numberOfRows = 8;

var xArray = [];
var yArray = [];
var blockColorArray = [];
var isInfected = [];
var individualAlphaValues = [];

var blockLength;

var infectedInitialIndex;

function drawBlocks() {
  //Just stores the center x and y coordinates on the canvas.
  var xCenterOfCanvas = Math.round(canvas.width/2);
  var yCenterOfCanvas = Math.round(canvas.height/2);

  //The coefficients that help center each individual block. This value is multiplied by the length of a small block and either added or subtracted from the x center of the canvas. Small blocks are drawn starting from the top left corners.
  var xCoefficient = -(numberOfColumns/2);
  var yCoefficient = -(numberOfRows/2);

  var normalGreen = "hsl(150,100%,45%)";
  var normalBlue = "hsl(205,100%,50%)";
  var listOfColors = [normalGreen, normalBlue];

  //Two for loops that build the big block row by row. xCoefficient is reset after each row's completion while yCoefficient is increased.
  for (var i=0; i < numberOfRows; i++) {
    for (var j=0; j < numberOfColumns; j++) {
      ctx.fillStyle = listOfColors[Math.floor(Math.random()*(listOfColors.length))];

      blockColorArray.push(ctx.fillStyle);

      var x = xCenterOfCanvas + j + (xCoefficient*blockLength);
      var y = yCenterOfCanvas + i + (yCoefficient*blockLength);

      //The point of reference NEVER changes (xCenterOfCanvas or yCenterOfCanvas). Blocks are drawn accordingly, with x and y added to make small gaps in between the blocks.
      ctx.fillRect(x, y, blockLength, blockLength);

      xArray.push(x);
      yArray.push(y);

      isInfected.push(false);

      individualAlphaValues.push(0);

      xCoefficient++;
    }
    xCoefficient = -(numberOfColumns/2);
    yCoefficient++;
  }
}

function animateIndividualInfection(j) {
  // if (blockColorArray[j] == "#00e673") {
  //   individualAlphaValues[j] += 0.01;
  // }
  // else if (blockColorArray[j] == "#0095ff"){
  //   individualAlphaValues[j] += 0.001;
  // }
  individualAlphaValues[j] += 0.005;
  ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

  //FOR TESTING.
  // ctx.fillStyle = "pink";

  ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);

  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (individualAlphaValues[j] < 0.18 && individualAlphaValues[j] !== 0) {
    animateIndividualInfection(j);
  }
  else if (individualAlphaValues[j] >= 0.18)   {
    individualAlphaValues[j] = 1;

    // deduction += 1;

    ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

    ctx.clearRect(xArray[j], yArray[j], blockLength, blockLength);
    ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);

    infect(j);
  }
}, 120);
}

function infect(i) {
  if (isInfected[i] && individualAlphaValues[i] == 0) {
    animateIndividualInfection(i);
  }
  //else if statement that determines whether there IS a false value in isInfected array ajacent to the current i block. If there is, this infects them :(.
  else if (isInfected.indexOf(false) !== -1 && individualAlphaValues[i] == 1){
    var internalInfectedArray = [];

    //Checks ALL adjacent blocks around the infected block (8 total). Starts with the block to the left of the target block, and then checks below it, and then above it. This process repeats at the next two columns.
    for (var k = -1; k < 2; k++) {
      //The coefficient that determines whether the algorithm searches for an uninfected block in the upward or downward direction.
      var a = 1;

      //First determines whether the block to the left is adjacent to the infected block. If so, it infects that block.
      if (yArray[i+k] - yArray[i] == 0) {
        // internalInfectedArray.push(i+k);
        // isInfected[i + k] = true;
        if (blockColorArray[i] == blockColorArray[i+k]) {
          internalInfectedArray.push(i+k);
        }
        //First determines whether the block below the infected block is adjacent to it. If it is, it infects that block. Later, the process is repeated for the block above.
        for (var z = 0; z < 2; z++) {
          if (xArray[i + (a*numberOfColumns) + k] - xArray[i + k] == 0 && blockColorArray[i + (a*numberOfColumns) + k] == blockColorArray[i]) {
            internalInfectedArray.push(i + (a*numberOfColumns) + k);
            // isInfected[i + (a*numberOfColumns) + k] = true;
          }

          //Coefficient sign change that allows the algorithm to look for an adjacent block above the infected block in the second itiration of this for loop.
          a = -a;
        }
      }
    }

    //This for loop searches for the blocks that are infected but are still completely clear of ay red. Infectious blocks have a globalAlphaValue of 1.
    for (var j=0; j < internalInfectedArray.length; j++) {
      if (individualAlphaValues[internalInfectedArray[j]] == 0) {
        isInfected[internalInfectedArray[j]] = true;
        animateIndividualInfection(internalInfectedArray[j]);
      }
    }
    // for (var j=0; j < isInfected.length; j++) {
    //   if (isInfected[j] && individualAlphaValues[j] == 0) {
    //     // isInfected[internalInfectedArray[j]] = true;
    //     animateIndividualInfection(j);
    //   }
    // }
  } //else if statement end.
} //infect() end

function infectionOrigins() {
  infectedInitialIndex = Math.floor(Math.random()*xArray.length);
  isInfected[infectedInitialIndex] = true;

  setTimeout(function() {
    infect(infectedInitialIndex);
  }, 500);

  return;

  var theInterval = setInterval(function() {
    var falseIndexArray = [];

    for (var i=0; i < isInfected.length; i++) {
      if (isInfected[i] == false) {
        falseIndexArray.push(i);
      }
    }
    if (falseIndexArray.length == 0) {
      clearInterval(theInterval);
      console.log("its been cleared lul");
    }
    console.log(falseIndexArray);

    var lerandom = Math.floor(Math.random()*falseIndexArray.length);

    infectedInitialIndex = falseIndexArray[lerandom];
    console.log("This is the chosen index: "+infectedInitialIndex);

    isInfected[infectedInitialIndex] = true;

    infect(infectedInitialIndex);
  }, 8000);
}

var cooldownReady = true;

function cooldown() {
  setTimeout(function() {
    cooldownReady = true;
  }, 00);
}

var totalScore = 0;
var totalCuredBlocks = 0;

function cure(event) {
  if (cooldownReady) {

  var deduction = 0;

  var mouseX = Math.round(event.clientX-test.left);
  var mouseY = Math.round(event.clientY-test.top);

  //Now that the clicked block and its adjacent blocks have been disinfected and have had their globalAlphaValue set to 0, we need to check surrounding blocks to see if they're infectious (globalAlpha value == 1) and touching any of the cured blocks.
  function mouseTimeout(i) {
    var reInfectedArray = [];

    window.setTimeout(function() {
      //if there is NO infected squares, start over with one random infected square.
      if (isInfected.indexOf(true) == -1) {
        infectedInitialIndex = Math.floor(Math.random()*xArray.length);
        isInfected[infectedInitialIndex] = true;

        infect(infectedInitialIndex);

        //No need to look for surrounding infectious blocks if there aren't any.
        return;
      }

      //Checks the blocks AROUND the newly cured blocks. Calls the infection function if it finds any infectious blocks.
      //Starts at the leftmost column and finishes at the rightmost.
      for (var k = -2; k < 3; k++) {
        //Coefficient variable that changes which way (downward/upward) the algorithm searches for infectious blocks.
        var c = 1;

        if (k == -2 || k == 2) {
          //First checks to see if the block two spaces to the left of the newly cured block is on the same row and whether its infectious.
          if (yArray[i+k] - yArray[i] == 0 && individualAlphaValues[i+k] == 1) {
            //Adds the index value of the infectious block to an array.
            reInfectedArray.push(i+k);

            //First checks the block two spaces left, one space down followed by the block two spaces left, two spaces down. Followed by upward direction.
            for (var z = 0; z < 2; z++) {
              if (xArray[i + (c*numberOfColumns) + k] - xArray[i + k] == 0 && individualAlphaValues[i + (c*numberOfColumns) + k] == 1) {
                reInfectedArray.push(i + (c*numberOfColumns) + k);
              }

              if (xArray[i + (c*numberOfColumns) + (c*numberOfColumns) + k] - xArray[i + k] == 0 && individualAlphaValues[i + (c*numberOfColumns) + (c*numberOfColumns) + k] == 1) {
                reInfectedArray.push(i + (c*numberOfColumns) + (c*numberOfColumns) + k);
              }
              c = -c;
            } //End of for loop.
          }
        }
        //Else statement had to be a little different, because this includes the columns that contain the newly cured blocks, which are obviously not infectious.
        else {
          for (var z = 0; z < 2; z++) {
            //First checks the block one space left, two spaces up from cured block. Followed by downward direction.
            if (xArray[i + (c*numberOfColumns) + (c*numberOfColumns) + k] - xArray[i + k] == 0 && individualAlphaValues[i + (c*numberOfColumns) + (c*numberOfColumns) + k] == 1) {
              reInfectedArray.push(i + (c*numberOfColumns) + (c*numberOfColumns) + k);
            }
            //Changes the direction of the infectious block search.
            c = -c;
          } //End of for loop.
        }
      } //End of for loop.

      for (var k = 0; k < reInfectedArray.length; k++) {
        isInfected[reInfectedArray[k]] = true;
        infect(reInfectedArray[k]);
      }
    }, 1800);
  }

  //Determines which infected square's been clicked on.
  for (var i = 0; i < isInfected.length; i++) {
    if (mouseX >= xArray[i] && mouseX <= xArray[i]+blockLength && mouseY >= yArray[i] && mouseY <= yArray[i]+blockLength && isInfected[i] && individualAlphaValues[i] < 1) {
      //Where the indices of the newly cured blocks are stored.
      // var curedArray = [];

      // //Start at the left column, ends at the right.
      // for (var k = -1; k < 2; k++) {
      //   //Direction coefficient.
      //   var c = 1;
      //
      //   //First stores the index of the block to the left of the clicked block.
      //   if (yArray[i+k] - yArray[i] == 0 && isInfected[i+k] && individualAlphaValues[i+k] < 1) {
      //     curedArray.push(i+k);
      //
      //     deduction += 1;
      //
      //     totalCuredBlocks += 1;
      //     // if (individualAlphaValues[i+k] == 1) {
      //     //   deduction += 1;
      //     // }
      //
      //     for (var z = 0; z < 2; z++) {
      //       //First stores the index of the block down from the clicked block, and later the one up.
      //       if (xArray[i + (c*numberOfColumns) + k] - xArray[i + k] == 0 && isInfected[i + (c*numberOfColumns) + k] && individualAlphaValues[i + (c*numberOfColumns) + k] < 1) {
      //         curedArray.push(i + (c*numberOfColumns) + k);
      //
      //         deduction += 1;
      //
      //         totalCuredBlocks += 1;
      //         // if (individualAlphaValues[i + (c*numberOfColumns) + k] == 1) {
      //         //   deduction += 1;
      //         // }
      //       }
      //
      //       c = -c;
      //     } //End of for loop.
      //   } //End of if statement.
      // } //End of for loop.
      // curedArray.push(i);
      console.log(totalCuredBlocks);
      // return;
      //Restores uninfected status to cured blocks and clears the area to restore the block as its original color.
      // for (var u = 0; u < curedArray.length; u++) {
      //   isInfected[curedArray[u]] = false;
      //
      //   ctx.clearRect(xArray[curedArray[u]], yArray[curedArray[u]], blockLength, blockLength);
      //   ctx.fillStyle = blockColorArray[curedArray[u]];
      //   ctx.fillRect(xArray[curedArray[u]], yArray[curedArray[u]], blockLength, blockLength);
      //
      //   individualAlphaValues[curedArray[u]] = 0;
      // }
      ctx.clearRect(xArray[i], yArray[i], blockLength, blockLength);
      ctx.fillStyle = blockColorArray[i];
      ctx.fillRect(xArray[i], yArray[i], blockLength, blockLength);

      individualAlphaValues[i] = 0;

      //Calls the function that will check for infectious blocks surrounding the newly cured blocks.
      mouseTimeout(i);

      // if (totalCuredBlocks > 1) {
      //   var testArray = [];
      //   for (var p = 0; p < isInfected.length; p++) {
      //     if (isInfected[p] == false) {
      //       testArray.push(false);
      //     }
      //   }
      //   console.log(testArray);
      //   return;
      //   infectedInitialIndex2 = Math.floor(Math.random()*xArray.length);
      //   isInfected[infectedInitialIndex2] = true;
      //
      //   infect(infectedInitialIndex2);
      // }
      //Cooldown that prevents cure spam.
      // cooldownReady = false;
      // cooldown();

      //Displays points by mouse cursor.
      scoreFade();
    }
  }

  function scoreFade() {
    document.getElementById("div").style.opacity = 1;
    document.getElementById("div").style.left = mouseX + 20 + "px";
    document.getElementById("div").style.top = mouseY - 20 + "px";

    window.setTimeout(function() {
      document.getElementById("div").style.opacity = 0;
    }, 1000);

    var score = 21 - deduction;

    document.getElementById("div").innerHTML = "+" + score;

    function updateScore() {
      totalScore += score;
      document.getElementById("score").innerHTML = "Score: " + totalScore;
    }

    updateScore();
  }



  }
}

canvas.addEventListener("click", cure, false);

function setDimensions() {
  document.getElementById("score").innerHTML = "Score: 0";

  blockLength = 40;

  canvas.width = window.screen.availWidth * 0.4;
  // blockPositions();
  // canvas.width = blockWidth * rows;
  canvas.height = canvas.width / 2;

  drawBlocks();

  infectionOrigins();

}

setDimensions();
var test = canvas.getBoundingClientRect();
// window.addEventListener("mousemove", test, false);

// if (window.matchMedia("(min-width: 900px)").matches && window.matchMedia("(max-width: 1100px)").matches) {
//   var mq = window.matchMedia("(min-width: 900px)");
//   mq.addListener(widthChange);
//   widthChange(mq);
// }
//
// // media query change
// function widthChange(x) {
//   if (x.matches) {
//     canvas.width = window.screen.availWidth * 0.9;
//     drawBlocks();
//   } else {
//     canvas.width = window.screen.availWidth * 0.4;
//     drawBlocks();
//   }
// }

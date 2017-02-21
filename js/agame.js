var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

//Variable number of rows and columns. Change to whatever.
var numberOfColumns = 6;
var numberOfRows = 6;

var xArray = [];
var yArray = [];
var blockColorArray = [];
var isInfected = [];
var individualAlphaValues = [];

var blockLength;

var infectedInitialIndex;

var blueColorArray = [];
var greenColorArray = [];

var normalGreen = "hsl(150,100%,45%)";
var normalBlue = "hsl(205,100%,50%)";

function drawBlocks() {
  //Just stores the center x and y coordinates on the canvas.
  var xCenterOfCanvas = Math.round(canvas.width/2);
  var yCenterOfCanvas = Math.round(canvas.height/2);
  // var yCenterOfCanvas = 146;
  console.log("xCenterOfCanvas: "+xCenterOfCanvas);
  console.log("yCenterOfCanvas: "+yCenterOfCanvas);
  //The coefficients that help center each individual block. This value is multiplied by the length of a small block and either added or subtracted from the x center of the canvas. Small blocks are drawn starting from the top left corners.
  var xCoefficient = -(numberOfColumns/2);
  var yCoefficient = -(numberOfRows/2);
  console.log("xCoefficient is: "+xCoefficient);
  console.log("yCoefficient is: "+yCoefficient);

  var listOfColors = [normalGreen, normalBlue];
  // var listOfColors = [normalGreen];

  //Two for loops that build the big block row by row. xCoefficient is reset after each row's completion while yCoefficient is increased.
  for (var i=0; i < numberOfRows; i++) {
    for (var j=0; j < numberOfColumns; j++) {
      var blockColorArrayIndex = listOfColors[Math.floor(Math.random()*(listOfColors.length))];

      ctx.fillStyle = blockColorArrayIndex;

      blockColorArray.push(blockColorArrayIndex);

      var x = xCenterOfCanvas + j + (xCoefficient*blockLength);
      var y = yCenterOfCanvas + i + (yCoefficient*blockLength);
      // var x = Math.floor(xCenterOfCanvas + j + (xCoefficient*blockLength));
      // var y = Math.floor(yCenterOfCanvas + i + (yCoefficient*blockLength));
      console.log("x is: "+x);
      console.log("y is: "+y);
      //The point of reference NEVER changes (xCenterOfCanvas or yCenterOfCanvas). Blocks are drawn accordingly, with x and y added to make small gaps in between the blocks.
      ctx.fillRect(x, y, blockLength, blockLength);

      xArray.push(x);
      yArray.push(y);

      isInfected.push(false);

      individualAlphaValues.push(0);

      xCoefficient++;

      //To help determine when 100% of green or blue blocks have become infectious.
      function oneColorArrays() {
        if (blockColorArrayIndex == normalGreen) {
          greenColorArray.push(blockColorArray.length-1);
          greenColorArray.push(false);
        }
        if (blockColorArrayIndex == normalBlue) {
          blueColorArray.push(blockColorArray.length-1);
          blueColorArray.push(false);
        }
      }
      oneColorArrays();
    }
    xCoefficient = -(numberOfColumns/2);
    yCoefficient++;
  }
  // console.log("blockColorArray length: "+blockColorArray.length);
  // console.log("blueColorArray length + greenColorArray length: "+(blueColorArray.length+greenColorArray.length));
  // console.log("blueColorArray length: "+blueColorArray.length);
  // console.log("greenColorArray length: "+greenColorArray.length);
  // console.log(greenColorArray);
  // console.log(blueColorArray);

  // return;
}

function createScoreContainers() {
  for (var i=0; i<xArray.length; i++) {
    var newChild = document.createElement("div");

    newChild.className = "scoreContainer";

    document.getElementById("div").appendChild(newChild);
  }
}

function animateBlackSquares(j) {
  var blackIndividualAlphaValues = individualAlphaValues.slice(0);

  for (var k=0; k < blackIndividualAlphaValues.length; k++) {
    blackIndividualAlphaValues[k] = 0;
  }

  // console.log("blackIndividualAlphaValues at the beginning of animateBlackSquares()")
  // console.log(blackIndividualAlphaValues);
  // return;
  function animateBlackSquaresCycle(j) {
  if (blockColorArray[j] == normalGreen) {
    console.log("blackIndividualAlphaValues at the beginning of animateBlackSquares() for greenColorArray");
    console.log(blackIndividualAlphaValues);
    // console.log("blockColorArray[j] is: "+blockColorArray[j]);
    // console.log("blockColor Array is: ");
    // console.log(blockColorArray);
    console.log("greenColorArray is: ");
    console.log(greenColorArray);
    // return;
    for (var i=0; i < greenColorArray.length; i++) {
      ctx.fillStyle = "rgba(0, 0, 0," + blackIndividualAlphaValues[j] + ")";
      blackIndividualAlphaValues[greenColorArray[i]] += 0.005;
      // console.log("fuck");
      // console.log("blackIndividualAlphaValues are: ");
      // console.log(blackIndividualAlphaValues);
      // return;
      ctx.fillRect(xArray[greenColorArray[i]], yArray[greenColorArray[i]], blockLength, blockLength);
    }
  }
  else if (blockColorArray[j] == normalBlue) {
    console.log("blackIndividualAlphaValues at the beginning of animateBlackSquares() for blueColorArray");
    console.log(blackIndividualAlphaValues);

    // console.log("blockColorArray[j] is: "+blockColorArray[j]);
    // console.log("blockColor Array is: ");
    // console.log(blockColorArray);
    console.log("blueColorArray is: ");
    console.log(blueColorArray);
    // return;
    // console.log(isInfected);
    for (var i=0; i < blueColorArray.length; i++) {
      ctx.fillStyle = "rgba(0, 0, 0," + blackIndividualAlphaValues[j] + ")";
      blackIndividualAlphaValues[blueColorArray[i]] += 0.005;
      // console.log("fuck");
      // console.log("blackIndividualAlphaValues are: ");
      // console.log(blackIndividualAlphaValues);
      // return;
      ctx.fillRect(xArray[blueColorArray[i]], yArray[blueColorArray[i]], blockLength, blockLength);
    }
  }
  // console.log("Individual alpha values at the end: ");
  // console.log(blackIndividualAlphaValues);
  // return;
  // ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);

  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (blackIndividualAlphaValues[j] < 0.19) {
    animateBlackSquaresCycle(j);
  }
  else if (blackIndividualAlphaValues[j] >= 0.19)   {
    ctx.fillStyle = "rgba(0, 0, 0," + blackIndividualAlphaValues[j] + ")";

    if (blockColorArray[j] == normalGreen) {
      greenColorArray.push(true);
      // console.log(greenColorArray);

      for (var i=0; i < greenColorArray.length-1; i++) {
        blackIndividualAlphaValues[greenColorArray[i]] = 1;

        ctx.fillRect(xArray[greenColorArray[i]],  yArray[greenColorArray[i]], blockLength, blockLength);

        // infect(greenColorArray[i]);
      }
    }
    else if (blockColorArray[j] == normalBlue) {
      blueColorArray.push(true);
      // console.log(blueColorArray);

      for (var i=0; i < blueColorArray.length-1; i++) {
        blackIndividualAlphaValues[blueColorArray[i]] = 1;

        ctx.fillRect(xArray[blueColorArray[i]],  yArray[blueColorArray[i]], blockLength, blockLength);

        // infect(blueColorArray[i]);
      }
    }

    console.log("greenColorArray at the end of animateBlackSquaresCycle()");
    console.log(greenColorArray);
    console.log("blueColorArray at the end of animateBlackSquaresCycle()");
    console.log(blueColorArray);
    console.log("blackIndividualAlphaValues at the end of animateBlackSquaresCycle()");
    console.log(blackIndividualAlphaValues);

  }
  }, 120);

  } //end of animateBlackSquaresCycle()
  animateBlackSquaresCycle(j);
} //end of animateBlackSquares()

function animateIndividualInfection(j) {
  var animateTimer = 120;
  var internalIndividualAlphaValues = individualAlphaValues.filter(function(parameter) {
    return parameter == 1;
  });

  // console.log("this is the j parameter in animateIndividualInfection: "+j);
  if (greenColorArray.indexOf(true) == -1 && blueColorArray.indexOf(true) == -1) {
    if (internalIndividualAlphaValues.length > individualAlphaValues.length/2) {
      // console.log("Is internalIndividual length less than individualAlpha length/2?")
      // console.log(internalIndividualAlphaValues.length > individualAlphaValues.length/2);
      individualAlphaValues[j] += 0.015;
    }
    else {
      individualAlphaValues[j] += 0.005;
    }
  }
  else if (greenColorArray.indexOf(true) !== -1 || blueColorArray.indexOf(true) !== -1) {
    // console.log("the black state is running");
    animateTimer = 0;
    individualAlphaValues[j] += 0.19;
  }

  ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

  //FOR TESTING.
  // ctx.fillStyle = "pink";

  ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);
  console.log("With j = "+j+" fillRect only called with xArray[j]: "+xArray[j]+" and yArray[j]: "+yArray[j]);

  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (individualAlphaValues[j] < 0.18 && individualAlphaValues[j] !== 0) {
    // console.log("current animateTimer: "+animateTimer);
    animateIndividualInfection(j);
  }
  else if (individualAlphaValues[j] >= 0.18)   {
    // console.log("current animateTimer: "+animateTimer);
    individualAlphaValues[j] = 1;

    ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

    ctx.clearRect(xArray[j], yArray[j], blockLength, blockLength);
    ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);
    console.log("With j = "+j+" fillRect AND clearRect called with xArray[j]: "+xArray[j]+" and yArray[j]: "+yArray[j]);

    if (blockColorArray[j] == normalGreen) {
      var greenIndexToBeReplaced = greenColorArray.indexOf(false);

      if (greenIndexToBeReplaced !== -1) {
        greenColorArray.splice(greenIndexToBeReplaced, 1);
      }
      console.log("greenColorArray after splcie");
      console.log(greenColorArray);

      if (greenColorArray.indexOf(false) == -1) {
        // for (var i=0; i < greenColorArray.length; i++) {
        //   individualAlphaValues[greenColorArray[i]] = 0;
        //
        // }
        // individualAlphaValues[j] = 0;
        console.log("animateBlackSquares() called from greenColorArray");
        animateBlackSquares(j);

        // console.log("greencolorarray");
        // console.log(greenColorArray);
        return;
      }
    }
    else if (blockColorArray[j] == normalBlue) {
      var blueIndexToBeReplaced = blueColorArray.indexOf(false);

      if (blueIndexToBeReplaced !== -1) {
        blueColorArray.splice(blueIndexToBeReplaced, 1);
      }

      if (blueColorArray.indexOf(false) == -1) {
        // for (var i=0; i < blueColorArray.length; i++) {
        //   individualAlphaValues[blueColorArray[i]] = 0;
        // }
        // individualAlphaValues[j] = 0;
        console.log("animateBlackSquares() called from blueColorArray");
        animateBlackSquares(j);

        return;
      }
    }

    infect(j);
  }
}, animateTimer);
}

function infect(i) {
  if (isInfected[i] && individualAlphaValues[i] == 0) {
    animateIndividualInfection(i);
  }
  //else if statement that determines whether there IS a false value in isInfected array ajacent to the current i block. If there is, this infects them :(.
  else if (isInfected.indexOf(false) !== -1 && individualAlphaValues[i] == 1 && greenColorArray.indexOf(true) == -1) {
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
    } //end of for loop

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
  // else if (greenColorArray.indexOf(true) !== -1 || blueColorArray.indexOf(true) !== -1) {
  //   if (isInfected.indexOf(false) !== -1) {
  //
  //
  //   console.log("black infection started");
  //   var internalInfectedArray = [];
  //
  //   for (var k = -1; k < 2; k++) {
  //     var a = 1;
  //
  //     //First determines whether the block to the left is adjacent to the infected block. If so, it infects that block.
  //     if (yArray[i+k] - yArray[i] == 0) {
  //       internalInfectedArray.push(i+k);
  //       // isInfected[i + k] = true;
  //       // if (blockColorArray[i] == blockColorArray[i+k]) {
  //       //   internalInfectedArray.push(i+k);
  //       // }
  //       //First determines whether the block below the infected block is adjacent to it. If it is, it infects that block. Later, the process is repeated for the block above.
  //       for (var z = 0; z < 2; z++) {
  //         if (xArray[i + (a*numberOfColumns) + k] - xArray[i + k] == 0) {
  //           internalInfectedArray.push(i + (a*numberOfColumns) + k);
  //           // isInfected[i + (a*numberOfColumns) + k] = true;
  //         }
  //
  //         //Coefficient sign change that allows the algorithm to look for an adjacent block above the infected block in the second itiration of this for loop.
  //         a = -a;
  //       }
  //     }
  //   } //end of for loop
  //
  //   console.log("black infections internalinfectedarray");
  //   console.log(internalInfectedArray);
  //   for (var j=0; j < internalInfectedArray.length; j++) {
  //     if (individualAlphaValues[internalInfectedArray[j]] == 0) {
  //       isInfected[internalInfectedArray[j]] = true;
  //
  //       animateIndividualInfection(internalInfectedArray[j]);
  //     }
  //   }
  // }
  // }

} //infect() end

function infectionOrigins() {
  infectedInitialIndex = Math.floor(Math.random()*xArray.length);
  isInfected[infectedInitialIndex] = true;

  setTimeout(function() {
    infect(infectedInitialIndex);
  }, 500);

  var timer = 4000;

  function subsequentOrigins() {
    var numberOfFullyInfectedBlocks = individualAlphaValues.filter(function(para) {
      return para == 1;
    });

    var theInterval = setTimeout(function() {
      var falseIndexArray = [];

      if (timer > 2000) {
        timer -= 550;
      }
      else if (timer < 2000 && timer > 550) {
        timer -= 50;
      }
      else if (numberOfFullyInfectedBlocks.length == 1) {
        timer = 4000;
      }
      else if (isInfected.indexOf(false) == -1){
        return;
      }

      // console.log("The current timer: "+timer);
      for (var i=0; i < isInfected.length; i++) {
        if (isInfected[i] == false) {
          falseIndexArray.push(i);
        }
      }
      if (falseIndexArray.length == 0) {
        // clearInterval(theInterval);
      }

      var lerandom = Math.floor(Math.random()*falseIndexArray.length);

      infectedInitialIndex = falseIndexArray[lerandom];

      isInfected[infectedInitialIndex] = true;

      infect(infectedInitialIndex);

      subsequentOrigins();
    }, timer);
  }
  subsequentOrigins();
  // var theInterval = setInterval(function() {
  //   var falseIndexArray = [];
  //
  //   timer -= 1000;
  //   console.log("TIMER LUL: "+timer);
  //   for (var i=0; i < isInfected.length; i++) {
  //     if (isInfected[i] == false) {
  //       falseIndexArray.push(i);
  //     }
  //   }
  //   if (falseIndexArray.length == 0) {
  //     clearInterval(theInterval);
  //     console.log("its been cleared lul");
  //   }
  //   console.log(falseIndexArray);
  //
  //   var lerandom = Math.floor(Math.random()*falseIndexArray.length);
  //
  //   infectedInitialIndex = falseIndexArray[lerandom];
  //   console.log("This is the chosen index: "+infectedInitialIndex);
  //
  //   isInfected[infectedInitialIndex] = true;
  //
  //   infect(infectedInitialIndex);
  // }, timer);
}

var cooldownReady = true;

function cooldown() {
  setTimeout(function() {
    cooldownReady = true;
  }, 00);
}

var totalScore = 0;
var totalCuredBlocks = 0;
var bonus = 0;

function cure(event) {

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
      for (var k = -1; k < 2; k++) {
        //Coefficient variable that changes which way (downward/upward) the algorithm searches for infectious blocks.
        var c = 1;

          //First checks to see if the block two spaces to the left of the newly cured block is on the same row and whether its infectious.
          if (yArray[i+k] - yArray[i] == 0 && individualAlphaValues[i+k] == 1) {
            //Adds the index value of the infectious block to an array.
            reInfectedArray.push(i+k);
          }
            //First checks the block two spaces left, one space down followed by the block two spaces left, two spaces down. Followed by upward direction.
            for (var z = 0; z < 2; z++) {
              if (xArray[i + (c*numberOfColumns) + k] - xArray[i + k] == 0 && individualAlphaValues[i + (c*numberOfColumns) + k] == 1) {
                reInfectedArray.push(i + (c*numberOfColumns) + k);
              }

              c = -c;
            } //End of for loop.
          // }

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
      // console.log(totalCuredBlocks);
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
      ctx.fillStyle = blockColorArray[i];
      ctx.clearRect(xArray[i], yArray[i], blockLength, blockLength);
      ctx.fillRect(xArray[i], yArray[i], blockLength, blockLength);

      individualAlphaValues[i] = 0;

      isInfected[i] = false;

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
      scoreFade(i);
      if (bonus < 19) {
        bonus += 1;
      }
    }
    else if (mouseX >= xArray[i] && mouseX <= xArray[i]+blockLength && mouseY >= yArray[i] && mouseY <= yArray[i]+blockLength && isInfected[i] == false) {
      bonus = 0;
    }
  }

  function scoreFade(i) {
    var scoreContainer = document.getElementsByClassName("scoreContainer");

    scoreContainer[i].style.opacity = 1;

    scoreContainer[i].style.left = xArray[i] + "px";
    scoreContainer[i].style.top = yArray[i] + "px";

    // scoreContainer[i].style.left = mouseX + 10 + "px";
    // scoreContainer[i].style.top = mouseY - 40 + "px";

    scoreContainer[i].style.width = blockLength + "px";
    scoreContainer[i].style.height = blockLength + "px";

    var score = 1 + bonus - deduction;

    window.setTimeout(function() {
      scoreContainer[i].style.opacity = 0;
    }, 800);

    // var score = 1 + bonus - deduction;

    scoreContainer[i].innerHTML = "+" + score;

    function updateScore() {
      totalScore += score;
      document.getElementById("score").innerHTML = "Score: " + totalScore;
    }

    updateScore();
  }




}

var LUL = document.getElementById("aParent");
// canvas.addEventListener("mousedown", cure, false);
LUL.addEventListener("mousedown", cure, false);

function setDimensions() {
  document.getElementById("score").innerHTML = "Score: 0";
  var div = document.getElementById("div");

  if (window.screen.width >= 1200) {
    var width = Math.round(window.screen.availWidth * 0.25);
    var height = Math.round(width / 1.6);

    blockLength = Math.round(0.8 * (height/numberOfRows));

    canvas.width = width;
    canvas.height = height;

    div.style.width = width + "px";

    div.style.height = height + "px";
    LUL.style.width = width + "px";

    drawBlocks();
    // console.log("SUP?");
    // createScoreContainers();
    infectionOrigins();
  }
  else if (window.screen.width >= 320) {
    var width = Math.round(window.screen.availWidth * 0.9);
    // var height = Math.round(width / 1.2);
    var height = width;

    blockLength = Math.round(0.85 * (width/numberOfColumns));

    canvas.width = width;
    canvas.height = height;

    div.style.width = width + "px";

    div.style.height = height + "px";
    LUL.style.width = width + "px";

    drawBlocks();
    // console.log("SUP?");
    // createScoreContainers();
    // infectionOrigins();
  }

  // if (window.matchMedia("(min-width: 1200px)").matches) {
    // var mq = window.matchMedia("(min-width: 1200px)");
    // mq.addListener(widthChange);
    // widthChange(mq);
  // }
  // if (window.screen.width >= 1200) {
  //   var mq = window.matchMedia("(min-width: 1200px)");
  //
  //   mq.addListener(widthChange);
  //   widthChange(mq);
  // }

  // media query change
  // function widthChange(x) {
  //   if (x.matches) {
  //     console.log("MATCHED");
  //     width = Math.round(window.screen.availWidth * 0.3);
  //     height = Math.round(width / 2);
  //
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  //     canvas.width = width;
  //     div.style.width = width + "px";
  //     // blockPositions();
  //     // canvas.width = blockWidth * rows;
  //     canvas.height = height;
  //
  //     div.style.height = height + "px";
  //     LUL.style.width = width + "px";
  //
  //     drawBlocks();
  //     // console.log("SUP?");
  //     // createScoreContainers();
  //     // infectionOrigins();
  //   } else {
  //     width = window.screen.availWidth * 0.4;
  //     height = Math.round(width / 2);
  //
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  //     canvas.width = width;
  //     div.style.width = width + "px";
  //     // blockPositions();
  //     // canvas.width = blockWidth * rows;
  //     canvas.height = height;
  //
  //     div.style.height = height + "px";
  //     LUL.style.width = width + "px";
  //
  //     drawBlocks();
  //     // console.log("HELLO?");
  //     // createScoreContainers();
  //     // infectionOrigins();
  //   }
  // }

  // drawBlocks();

}

// window.addEventListener("resize", setDimensions, false);
setDimensions();

var test = canvas.getBoundingClientRect();

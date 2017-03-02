var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var blockFeedbackContainer = document.getElementsByClassName("blockFeedbackContainer");

var reactionTimeFeedback = document.getElementById("reactionTimeFeedback");


//Variable number of rows and columns. Change to whatever.
var numberOfColumns;
var numberOfRows;

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
var normalBlue = "hsl(195,100%,45%)";

function drawBlocks() {
  //Just stores the center x and y coordinates on the canvas.
  var xCenterOfCanvas = Math.round(canvas.width/2);
  var yCenterOfCanvas = Math.round(canvas.height/2);
  // var yCenterOfCanvas = 146;
  // console.log("xCenterOfCanvas: "+xCenterOfCanvas);
  // console.log("yCenterOfCanvas: "+yCenterOfCanvas);
  //The coefficients that help center each individual block. This value is multiplied by the length of a small block and either added or subtracted from the x center of the canvas. Small blocks are drawn starting from the top left corners.
  var xCoefficient = -(numberOfColumns/2);
  var yCoefficient = -(numberOfRows/2);
  // console.log("xCoefficient is: "+xCoefficient);
  // console.log("yCoefficient is: "+yCoefficient);

  var listOfColors = [normalGreen, normalBlue];
  // var listOfColors = [normalGreen];

  for (var p=0; p < 0.5*(numberOfRows*numberOfColumns); p++) {
      greenColorArray.push(normalGreen);
      greenColorArray.push(false);
  }
  for (var l=0; l < 0.5*(numberOfRows*numberOfColumns); l++) {
      blueColorArray.push(normalBlue);
      blueColorArray.push(false);
  }

  var localGreenColorArray = greenColorArray.filter(function(parameter) {
    return parameter !== false;
  });

  var localBlueColorArray = blueColorArray.filter(function(parameter) {
    return parameter !== false;
  });

  var localArrayBothColors = [];
  for (var b=0, v=1; b < 0.5*(numberOfRows * numberOfColumns); b++, v+=2) {
    localArrayBothColors.push(localGreenColorArray[b]);
    localArrayBothColors.push(localBlueColorArray[b]);
  }

  //Two for loops that build the big block row by row. xCoefficient is reset after each row's completion while yCoefficient is increased.
  for (var i=0; i < numberOfRows; i++) {
    for (var j=0; j < numberOfColumns; j++) {
      // console.log(localArrayBothColors);
      // var blockColorArrayIndex = listOfColors[Math.floor(Math.random()*(listOfColors.length))];
      var actualRandomIndex = Math.floor(Math.random()*(localArrayBothColors.length));

      var blockColorArrayIndex = localArrayBothColors[actualRandomIndex];
      // console.log(actualRandomIndex);

      localArrayBothColors.splice(actualRandomIndex, 1);
      // console.log(localArrayBothColors);
      // return;

      ctx.fillStyle = blockColorArrayIndex;

      blockColorArray.push(blockColorArrayIndex);

      if (numberOfRows < 6) {
        var x = xCenterOfCanvas + 2*j + (xCoefficient*blockLength);
        var y = yCenterOfCanvas + 2*i + (yCoefficient*blockLength);
      } else {
        var x = xCenterOfCanvas + j + (xCoefficient*blockLength);
        var y = yCenterOfCanvas + i + (yCoefficient*blockLength);
      }

      // var x = Math.floor(xCenterOfCanvas + j + (xCoefficient*blockLength));
      // var y = Math.floor(yCenterOfCanvas + i + (yCoefficient*blockLength));
      // console.log("x is: "+x);
      // console.log("y is: "+y);
      //The point of reference NEVER changes (xCenterOfCanvas or yCenterOfCanvas). Blocks are drawn accordingly, with x and y added to make small gaps in between the blocks.
      ctx.fillRect(x, y, blockLength, blockLength);

      xArray.push(x);
      yArray.push(y);

      isInfected.push(false);

      individualAlphaValues.push(0);

      xCoefficient++;

      //To help determine when 100% of green or blue blocks have become infectious.
      // function oneColorArrays() {
      //   if (blockColorArrayIndex == normalGreen) {
      //     greenColorArray.push(blockColorArray.length-1);
      //     greenColorArray.push(false);
      //   }
      //   if (blockColorArrayIndex == normalBlue) {
      //     blueColorArray.push(blockColorArray.length-1);
      //     blueColorArray.push(false);
      //   }
      // }
      // oneColorArrays();
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

function createBlockFeedbackContainers() {
  for (var i=0; i<xArray.length; i++) {
    var newChild = document.createElement("div");

    newChild.className = "blockFeedbackContainer";

    document.getElementById("blockFeedbackContainerWrapper").appendChild(newChild);

    blockFeedbackContainer[i].style.left = xArray[i] + "px";
    blockFeedbackContainer[i].style.top = yArray[i] + "px";

    blockFeedbackContainer[i].style.width = blockLength + "px";
    blockFeedbackContainer[i].style.height = blockLength + "px";
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
    // console.log("blackIndividualAlphaValues at the beginning of animateBlackSquares() for greenColorArray");
    // console.log(blackIndividualAlphaValues);
    // console.log("blockColorArray[j] is: "+blockColorArray[j]);
    // console.log("blockColor Array is: ");
    // console.log(blockColorArray);
    // console.log("greenColorArray is: ");
    // console.log(greenColorArray);
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
    // console.log("blackIndividualAlphaValues at the beginning of animateBlackSquares() for blueColorArray");
    // console.log(blackIndividualAlphaValues);

    // console.log("blockColorArray[j] is: "+blockColorArray[j]);
    // console.log("blockColor Array is: ");
    // console.log(blockColorArray);
    // console.log("blueColorArray is: ");
    // console.log(blueColorArray);
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

    // console.log("greenColorArray at the end of animateBlackSquaresCycle()");
    // console.log(greenColorArray);
    // console.log("blueColorArray at the end of animateBlackSquaresCycle()");
    // console.log(blueColorArray);
    // console.log("blackIndividualAlphaValues at the end of animateBlackSquaresCycle()");
    // console.log(blackIndividualAlphaValues);

  }
  }, 120);

  } //end of animateBlackSquaresCycle()
  animateBlackSquaresCycle(j);
} //end of animateBlackSquares()

function animateIndividualInfection(j) {
  // if (individualAlphaValues[j] == 1) {
  //   console.log("ALERT ALERT ALERT INDIVIDUALALPHAVALUES[J] IS FUCKING 1 MATE");
  // }
  // console.log("animateIndividualInfection() has just been initialized for j: "+j+" with individualAlphaValues[j]: "+individualAlphaValues[j]+" and isInfected[j]: "+isInfected[j]);
  var animateTimer = 120;
  var internalIndividualAlphaValues = individualAlphaValues.filter(function(parameter) {
    return parameter == 1;
  });

  // console.log("this is the j parameter in animateIndividualInfection: "+j);
  if (greenColorArray.indexOf(true) == -1 && blueColorArray.indexOf(true) == -1 && isInfected[j]) {
    if (internalIndividualAlphaValues.length > individualAlphaValues.length/2) {
      // console.log("Is internalIndividual length less than individualAlpha length/2?")
      // console.log(internalIndividualAlphaValues.length > individualAlphaValues.length/2);
      // console.log("Fast rate running for j: "+j);
      individualAlphaValues[j] += 0.006;
    }
    else {
      // console.log("Slow rate running for j: "+j);
      individualAlphaValues[j] += 0.002;
    }
  }
  else if (greenColorArray.indexOf(true) !== -1 || blueColorArray.indexOf(true) !== -1 && isInfected[j]) {
    // console.log("the black state is running");
    animateTimer = 4;
    individualAlphaValues[j] += 0.19;
  }

  ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

  //FOR TESTING.
  // ctx.fillStyle = "pink";

  ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);
  // console.log("With j = "+j+" fillRect only called with xArray[j]: "+xArray[j]+" and yArray[j]: "+yArray[j]);

  // console.log("animateIndividualInfection() is right before setTimeout for j: "+j+" with individualAlphaValues[j]: "+individualAlphaValues[j]+" and isInfected[j]: "+isInfected[j]);
  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (individualAlphaValues[j] < 0.135 && individualAlphaValues[j] !== 0) {
    // console.log("current animateTimer: "+animateTimer);
    animateIndividualInfection(j);
  }
  else if (individualAlphaValues[j] >= 0.135 && individualAlphaValues[j] < 1)   {
  // else if (individualAlphaValues[j] >= 0.18)   {
    // console.log("current animateTimer: "+animateTimer);
    // console.log("individualAlphaValue[j]: "+individualAlphaValues[j]+" for j: "+j+" is about to get turned to 1");
    individualAlphaValues[j] = 1;
    // console.log("individualAlphaValues[j] for j: "+j+" is now: "+individualAlphaValues[j]);

    ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

    ctx.clearRect(xArray[j], yArray[j], blockLength, blockLength);
    ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);
    // console.log("With j = "+j+" fillRect AND clearRect called with xArray[j]: "+xArray[j]+" and yArray[j]: "+yArray[j]);

    if (blockColorArray[j] == normalGreen) {
      var greenIndexToBeReplaced = greenColorArray.indexOf(false);

      if (greenIndexToBeReplaced !== -1) {
        greenColorArray.splice(greenIndexToBeReplaced, 1);
      }
      // console.log("greenColorArray after splice for j: "+j);
      // console.log(greenColorArray);

      if (greenColorArray.indexOf(false) == -1) {
        // for (var i=0; i < greenColorArray.length; i++) {
        //   individualAlphaValues[greenColorArray[i]] = 0;
        //
        // }
        // individualAlphaValues[j] = 0;
        // console.log("ANIMATEBLACKSQUARES() CALLED FROM greenColorArray WITH j: "+j);
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
      console.log("blueColorArray after splice for j: "+j);
      console.log(blueColorArray);

      if (blueColorArray.indexOf(false) == -1) {
        // for (var i=0; i < blueColorArray.length; i++) {
        //   individualAlphaValues[blueColorArray[i]] = 0;
        // }
        // individualAlphaValues[j] = 0;
        // console.log("ANIMATEBLACKSQUARES() CALLED FROM blueColorArray WITH j: "+j);
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

      if (numberOfFullyInfectedBlocks.length == individualAlphaValues.length){
        // document.getElementById("score").innerHTML = "I HAVE RETURNED";
        return;
      }
      else if (timer > 2000) {
        timer -= 550;
      }
      else if (timer > 1600) {
        timer -= 250;
      }
      else if (timer > 400) {
        timer -= 50;
      }
      else if (timer > 225 && numberOfRows == 6) {
        timer -= 5;
      }
      else if (timer > 450 && numberOfRows < 6) {
        timer -= 5;
      }
      else if (numberOfFullyInfectedBlocks.length == 1) {
        timer = 4000;
      }

      console.log("The current timer: "+timer);
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

      // blockFeedbackContainer[lerandom].classList.add("insetInfectedBorder");

      // window.setTimeout(function() {
        infect(infectedInitialIndex);
      // }, 1000);

      subsequentOrigins();
    }, timer);
  }
  subsequentOrigins();
  // var theInterval = setInterval(function() {
  //   var falseIndexArray = [];
  //
  //   timer -= 1000;
  //   console.log("TIMER aParent: "+timer);
  //   for (var i=0; i < isInfected.length; i++) {
  //     if (isInfected[i] == false) {
  //       falseIndexArray.push(i);
  //     }
  //   }
  //   if (falseIndexArray.length == 0) {
  //     clearInterval(theInterval);
  //     console.log("its been cleared aParent");
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

var totalScoreGreen = 0;
var totalScoreBlue = 0;

var scoreTimeout;

function cure(event) {
  var mouseX = Math.round(event.clientX-test.left);
  var mouseY = Math.round(event.clientY-test.top);

  var greenPointsScored = 10;
  var bluePointsScored = 10;

  var wasPreviouslyInfected = false;

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
            } //End of inner for loop.
      } //End of outer for loop.

      for (var k = 0; k < reInfectedArray.length; k++) {
        // isInfected[reInfectedArray[k]] = true;

        infect(reInfectedArray[k]);
      }
    }, 1800);
  } //End of mouseTimeout

  //Determines which infected square's been clicked on.
  for (var i = 0; i < isInfected.length; i++) {
    if (mouseX >= xArray[i] && mouseX <= xArray[i]+blockLength && mouseY >= yArray[i] && mouseY <= yArray[i]+blockLength && isInfected[i] && individualAlphaValues[i] < 1) {

      //Restores uninfected status to cured blocks and clears the area to restore the block as its original color.

      ctx.fillStyle = blockColorArray[i];
      ctx.clearRect(xArray[i], yArray[i], blockLength, blockLength);
      ctx.fillRect(xArray[i], yArray[i], blockLength, blockLength);

      individualAlphaValues[i] = 0;

      isInfected[i] = false;

      //Calls the function that will check for infectious blocks surrounding the newly cured blocks.
      mouseTimeout(i);

      //Cooldown that prevents cure spam.
      // cooldownReady = false;
      // cooldown();

      wasPreviouslyInfected = true;

      if (blockColorArray[i] == normalGreen && totalScoreGreen < 80) {
        totalScoreGreen += greenPointsScored;

        totalScore += totalScoreGreen;

        totalScoreBlue = 0;
      }
      else if (blockColorArray[i] == normalBlue && totalScoreBlue < 80) {
        totalScoreBlue += bluePointsScored;

        totalScore += totalScoreBlue;

        totalScoreGreen = 0;
      }

      scoreFade(i);
    }
    else if (mouseX >= xArray[i] && mouseX <= xArray[i]+blockLength && mouseY >= yArray[i] && mouseY <= yArray[i]+blockLength && isInfected[i] == false) {
      totalScoreGreen = 0;
      totalScoreBlue = 0;

      scoreFade(i);
    }
  } //End of for loop.

  function scoreFade(i) {
    // var div = document.getElementById("blockFeedbackContainerWrapper");

    blockFeedbackContainer[i].style.opacity = 1;

    window.setTimeout(function() {
      blockFeedbackContainer[i].style.opacity = 0;
    }, 350);

    // blockFeedbackContainer[i].innerHTML = "+" + score;
    // blockFeedbackContainer[i].innerHTML = ".";

    function updateColorScore() {
      var notAlreadyFullOpacity = false;

      if (reactionTimeFeedback.style.opacity == 0) {
        reactionTimeFeedback.style.opacity = 1;

        notAlreadyFullOpacity = true;
      }

      if (blockColorArray[i] == normalGreen) {
        reactionTimeFeedback.innerHTML = totalScoreGreen;

        reactionTimeFeedback.classList.remove("blueText");
        reactionTimeFeedback.classList.add("greenText");
      } else {
        reactionTimeFeedback.innerHTML = totalScoreBlue;

        reactionTimeFeedback.classList.remove("greenText");
        reactionTimeFeedback.classList.add("blueText");
      }

      if (notAlreadyFullOpacity) {
        scoreTimeout = window.setTimeout(function() {
          reactionTimeFeedback.style.opacity = 0;
        }, 600);
      } else {
        window.clearTimeout(scoreTimeout);
        scoreTimeout = window.setTimeout(function() {
          reactionTimeFeedback.style.opacity = 0;
        }, 600);
      }
    }

    function updateTotalScore() {
      // if (document.getElementById("score").innerHTML !== "I HAVE RETURNED") {
      //   document.getElementById("score").innerHTML = "Score: " + totalScore;
      // }
      document.getElementById("score").innerHTML = totalScore;
    }

    if (wasPreviouslyInfected) {
      updateColorScore();
      updateTotalScore();
    }
  } //End of scoreFade()




}

var aParent = document.getElementById("aParent");
aParent.ontouchmove = function(event) {
  event.preventDefault();
}

aParent.addEventListener("mousedown", cure, false);
aParent.addEventListener("touchstart", cure, false);

function setDimensions() {
  var blockFeedbackContainerWrapper = document.getElementById("blockFeedbackContainerWrapper");

  if (window.screen.width >= 992) {
    numberOfColumns = 6;
    numberOfRows = 6;

    var width = Math.round(window.screen.availWidth * 0.25);
    var height = Math.round(width / 1.6);

    blockLength = Math.round(0.9 * (height/numberOfRows));

    canvas.width = width;
    canvas.height = height;

    blockFeedbackContainerWrapper.style.width = width + "px";

    blockFeedbackContainerWrapper.style.height = height + "px";

    aParent.style.width = width + "px";

    drawBlocks();
    createBlockFeedbackContainers();

    var bigTime = 6;
    // reactionTimeFeedback.style.opacity = 1;
    function bigScreenCountdown() {
      // reactionTimeFeedback.style.opacity = 0;
      window.setTimeout(function() {
        reactionTimeFeedback.style.opacity = 0;
      }, 600);

      window.setTimeout(function() {
        // reactionTimeFeedback.style.opacity = 0;

        bigTime -= 1;

        reactionTimeFeedback.style.opacity = 0;

        reactionTimeFeedback.innerHTML = bigTime;
        reactionTimeFeedback.style.opacity = 1;

        if (bigTime == 0) {
          reactionTimeFeedback.innerHTML = "";

          infectionOrigins();
        } else {
          bigScreenCountdown();
        }
      }, 1000);
    }

    bigScreenCountdown();
  }
  else if (window.screen.width >= 320) {
    numberOfColumns = 4;
    numberOfRows = 4;

    var width = Math.round(window.screen.availWidth * 0.80);
    // var height = Math.round(width / 1.2);
    var height = width;

    blockLength = Math.round(0.85 * (width/numberOfColumns));

    canvas.width = width;
    canvas.height = height;

    blockFeedbackContainerWrapper.style.width = width + "px";

    blockFeedbackContainerWrapper.style.height = height + "px";

    aParent.style.width = width + "px";

    drawBlocks();
    createBlockFeedbackContainers();

    var smallTime = 6;
    // reactionTimeFeedback.style.opacity = 1;
    function smallScreenCountdown() {
      // reactionTimeFeedback.style.opacity = 0;
      window.setTimeout(function() {
        reactionTimeFeedback.style.opacity = 0;
      }, 600);

      window.setTimeout(function() {
        // reactionTimeFeedback.style.opacity = 0;

        smallTime -= 1;

        reactionTimeFeedback.style.opacity = 0;

        reactionTimeFeedback.innerHTML = smallTime;
        reactionTimeFeedback.style.opacity = 1;

        if (smallTime == 0) {
          reactionTimeFeedback.innerHTML = "";

          infectionOrigins();
        } else {
          smallScreenCountdown();
        }
      }, 1000);
    }

    smallScreenCountdown();
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
  //     aParent.style.width = width + "px";
  //
  //     drawBlocks();
  //     // console.log("SUP?");
  //     // createBlockFeedbackContainers();
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
  //     aParent.style.width = width + "px";
  //
  //     drawBlocks();
  //     // console.log("HELLO?");
  //     // createBlockFeedbackContainers();
  //     // infectionOrigins();
  //   }
  // }

  // drawBlocks();

}

// window.addEventListener("resize", setDimensions, false);
setDimensions();

var test = canvas.getBoundingClientRect();

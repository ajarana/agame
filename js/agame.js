var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var feedbackPanelWrapper = document.getElementById("feedbackPanelWrapper");

var aParent = document.getElementById("aParent");

var blockFeedbackContainer = document.getElementsByClassName("blockFeedbackContainer");

var blockFeedbackContainerWrapper = document.getElementById("blockFeedbackContainerWrapper");

var blockFeedbackText = document.getElementById("blockFeedbackText");

var chosen = document.getElementById("blockStatus"),
    chosenClassList = chosen.classList;

var score = document.getElementById("score");

// var newChild = document.createElement("div");

var numberOfColumns = 4;
var numberOfRows = 4;
var blockLength;

function initializeGame() {
aParent.removeEventListener("click", initializeGame, false);

blockFeedbackContainerWrapper.classList.remove("blackBackground");
blockFeedbackContainerWrapper.classList.add("transparentBackground");
blockFeedbackContainerWrapper.classList.remove("whiteText");
blockFeedbackContainerWrapper.classList.add("transparentText");

chosenClassList.remove("greenBlock");
chosenClassList.remove("blueBlock");
chosenClassList.add("emptyBlock");
chosen.innerHTML = "?";

var xArray = [];
var yArray = [];
var blockColorArray = [];
var isInfected = [];
var individualAlphaValues = [];

var infectedInitialIndex;
// var blockLength;
var blueColorArray = [];
var greenColorArray = [];

var normalGreen = "hsl(150,100%,45%)";
var normalBlue = "hsl(195,100%,47%)";

function drawBlocks() {
  //Just stores the center x and y coordinates on the canvas.
  blockColorArray = [];

  greenColorArray = [];
  blueColorArray = [];

  xArray = [];
  yArray = [];

  // isInfected = [];
  // individualAlphaValues = [];

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

  var pixelRatio = setCanvasScalingFactor();

  var localArrayBothColors = [];

  var preventEasyShapes = [];

  for (var b=0, v=1; b < 0.5*(numberOfRows * numberOfColumns); b++, v+=2) {
    localArrayBothColors.push(normalGreen);
    localArrayBothColors.push(normalBlue);
  }
  // console.log("localarraybothcolors");
  // console.log(localArrayBothColors);

  //Two for loops that build the big block row by row. xCoefficient is reset after each row's completion while yCoefficient is increased.
  for (var i=0; i < numberOfRows; i++) {
    for (var j=0; j < numberOfColumns; j++) {
      if (window.screen.width >= 1200) {
        var x = xCenterOfCanvas + j + (xCoefficient*blockLength);
        var y = yCenterOfCanvas + i + (yCoefficient*blockLength);
      } else {
        var x = xCenterOfCanvas + 2*j + (xCoefficient*blockLength);
        var y = yCenterOfCanvas + 2*i + (yCoefficient*blockLength);
      }
      // if (window.screen.width >= 1200) {
      //   var x = j * blockLength + j;
      //   var y = i * blockLength + i;
      // }
      xArray.push(x);
      yArray.push(y);

      // console.log(localArrayBothColors);
      // var blockColorArrayIndex = listOfColors[Math.floor(Math.random()*(listOfColors.length))];
      var actualRandomIndex = Math.floor(Math.random()*(localArrayBothColors.length));

      preventEasyShapes.push(localArrayBothColors[actualRandomIndex]);
      //
      // console.log("Here is preventEasyShapes at length = " + preventEasyShapes.length);
      // console.log(preventEasyShapes);

      // // console.log((preventEasyShapes.length-1) % numberOfColumns == 0);
      //
      // console.log(yArray[preventEasyShapes.length-1]-yArray[preventEasyShapes.length-4] == 0);

      // if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-3] == preventEasyShapes[preventEasyShapes.length-4] && preventEasyShapes[preventEasyShapes.length-1] == normalGreen) {
      //   console.log("third condition activated");
      //   actualRandomIndex = localArrayBothColors.indexOf(normalBlue);
      //
      //   preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalBlue);
      // }
      // else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-3] == preventEasyShapes[preventEasyShapes.length-4] && preventEasyShapes[preventEasyShapes.length-1] == normalBlue) {
      //   console.log("fourth condition activated");
      //   actualRandomIndex = localArrayBothColors.indexOf(normalGreen);
      //
      //   preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalGreen);
      // }

      //Prevents 3 adjacent blocks of the same color in either the horizontal or vertical direction.
      if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-3] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-3] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalGreen) {
        // console.log("first condition activated");
        if (localArrayBothColors.indexOf(normalBlue) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalBlue);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalBlue);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns*2] && xArray[(preventEasyShapes.length-1)] - xArray[(preventEasyShapes.length-1)-numberOfRows*2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalGreen) {
        // console.log("second condition activated");
        if (localArrayBothColors.indexOf(normalBlue) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalBlue);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalBlue);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-3] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-3] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalBlue) {
        // console.log("third condition activated");
        if (localArrayBothColors.indexOf(normalGreen) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalGreen);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalGreen);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns*2] && xArray[(preventEasyShapes.length-1)] - xArray[(preventEasyShapes.length-1)-numberOfRows*2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalBlue) {
        // console.log("fourth condition activated");
        if (localArrayBothColors.indexOf(normalGreen) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalGreen);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalGreen);
      }
      //Prevents squares of 4 adjacent blocks of the same color from forming.
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1)-numberOfRows] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-2)-numberOfRows] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalBlue) {
        // console.log("fifth condition activated");
        if (localArrayBothColors.indexOf(normalGreen) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalGreen);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalGreen);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1)-numberOfRows] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-2)-numberOfRows] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalGreen) {
        // console.log("sixth condition activated");
        if (localArrayBothColors.indexOf(normalBlue) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalBlue);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalBlue);
      }

      // console.log("actualRandomIndex");
      // console.log(actualRandomIndex);

      var blockColorArrayIndex = localArrayBothColors[actualRandomIndex];
      // console.log(actualRandomIndex);
      // console.log("blockColorArrayIndex: ");
      // console.log(blockColorArrayIndex);
      // console.log("localArrayBothColors[actualRandomIndex]: ");
      // console.log(localArrayBothColors[actualRandomIndex]);
      //
      // console.log("localArrayBothColors before splice: ")
      // console.log(localArrayBothColors);
      localArrayBothColors.splice(actualRandomIndex, 1);
      // console.log("localArrayBothColors after splice: ")
      // console.log(localArrayBothColors);

      ctx.fillStyle = blockColorArrayIndex;

      // console.log("The fillStyle for this block is: ");
      // console.log(ctx.fillStyle);

      blockColorArray.push(blockColorArrayIndex);

      // if (window.screen.width >= 1200) {
      //   var x = xCenterOfCanvas + j + (xCoefficient*blockLength);
      //   var y = yCenterOfCanvas + i + (yCoefficient*blockLength);
      // } else {
      //   var x = xCenterOfCanvas + 2*j + (xCoefficient*blockLength);
      //   var y = yCenterOfCanvas + 2*i + (yCoefficient*blockLength);
      // }
      // // if (window.screen.width >= 1200) {
      // //   var x = j * blockLength + j;
      // //   var y = i * blockLength + i;
      // // }

      //The point of reference NEVER changes (xCenterOfCanvas or yCenterOfCanvas). Blocks are drawn accordingly, with x and y added to make small gaps in between the blocks.
      ctx.fillRect(x, y, blockLength, blockLength);

      // xArray.push(x);
      // yArray.push(y);

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

  // console.log("initial greenColorArray from drawBlocks():");
  // console.log(greenColorArray);
  // console.log("initial blueColorArray from drawBlocks():");
  // console.log(blueColorArray);
}

function createBlockFeedbackContainers() {
  var scoreBlockLength = blockLength / setCanvasScalingFactor();

  for (var i=0; i<xArray.length; i++) {
    var newChild = document.createElement("div");

    newChild.classList.add("blockFeedbackContainer");
    // newChild.classList.add("transparentBackground");
    newChild.classList.add("weakWhiteBackground");

    blockFeedbackContainerWrapper.appendChild(newChild);


    blockFeedbackContainer[i].style.left = xArray[i]/setCanvasScalingFactor() + "px";
    blockFeedbackContainer[i].style.top = yArray[i]/setCanvasScalingFactor() + "px";

    blockFeedbackContainer[i].style.width = scoreBlockLength + "px";
    blockFeedbackContainer[i].style.height = scoreBlockLength + "px";
  }
}

var animateBlackSquareCounter = 0;

function animateBlackSquares(j) {
  var blackIndividualAlphaValues = individualAlphaValues.slice(0);
  console.log("animateblacksquares INITIATED");
  console.log(blackIndividualAlphaValues);
  console.log("individualAlphaValues here:");
  console.log(individualAlphaValues);
  for (var k=0; k < blackIndividualAlphaValues.length; k++) {
    // if (individualAlphaValues[k] < 1) {
    blackIndividualAlphaValues[k] = 0;
    // }
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
      blackIndividualAlphaValues[blueColorArray[i]] += 0.004;
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

    animateBlackSquareCounter++;

    if (animateBlackSquareCounter == 2) {
      // window.setTimeout(function() {
        blockFeedbackContainerWrapper.classList.remove("transparentBackground");
        blockFeedbackContainerWrapper.classList.add("blackBackground");

        blockFeedbackContainerWrapper.classList.remove("transparentText");
        blockFeedbackContainerWrapper.classList.add("whiteText");

        blockFeedbackText.innerHTML = "Restart";

        aParent.removeEventListener("touchstart", cure, false);
        aParent.removeEventListener("mousedown", cure, false);
        aParent.addEventListener("click", initializeGame, false);
      // }, 1000);
    }
    // console.log(blackIndividualAlphaValues);
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
  var animateTimer = 180;
  var internalIndividualAlphaValues = individualAlphaValues.filter(function(parameter) {
    return parameter == 1;
  });

  // console.log("this is the j parameter in animateIndividualInfection: "+j);
  if (greenColorArray.indexOf(true) == -1 && blueColorArray.indexOf(true) == -1 && isInfected[j]) {
    if (internalIndividualAlphaValues.length > individualAlphaValues.length/2) {
      // console.log("Is internalIndividual length less than individualAlpha length/2?")
      // console.log(internalIndividualAlphaValues.length > individualAlphaValues.length/2);
      // console.log("Slightly fast rate running for j: "+j);
      individualAlphaValues[j] += 0.004;
    }
    else if (internalIndividualAlphaValues.length > individualAlphaValues.length/3) {
      // console.log("Super fast rate running for j: "+j);
      individualAlphaValues[j] += 0.002;
    }
    else {
      // console.log("Slow rate running for j: "+j);
      individualAlphaValues[j] += 0.001;
    }
    // individualAlphaValues[j] += 0.001;
  }
  else if (greenColorArray.indexOf(true) !== -1 || blueColorArray.indexOf(true) !== -1 && isInfected[j]) {
    console.log("the black block super fast rate is running");
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
  if (individualAlphaValues[j] < 0.088 && individualAlphaValues[j] !== 0) {
    // console.log("current animateTimer: "+animateTimer);
    animateIndividualInfection(j);
  }
  else if (individualAlphaValues[j] >= 0.088 && individualAlphaValues[j] < 1)   {
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
      // console.log("greenColorArray after splice in animateIndividualInfection(j) for j: "+j);
      // console.log(greenColorArray);

      if (greenColorArray.indexOf(false) == -1) {
        // for (var i=0; i < greenColorArray.length; i++) {
        //   individualAlphaValues[greenColorArray[i]] = 0;
        //
        // }
        // individualAlphaValues[j] = 0;
        // console.log("ANIMATEBLACKSQUARES() CALLED FROM greenColorArray WITH j: "+j);
        animateBlackSquares(j);
        // console.log("sup dawg?");
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
      // console.log("blueColorArray after splice in animateIndividualInfection(j) for j: "+j);
      // console.log(blueColorArray);

      if (blueColorArray.indexOf(false) == -1) {
        // for (var i=0; i < blueColorArray.length; i++) {
        //   individualAlphaValues[blueColorArray[i]] = 0;
        // }
        // individualAlphaValues[j] = 0;
        // console.log("ANIMATEBLACKSQUARES() CALLED FROM blueColorArray WITH j: "+j);
        animateBlackSquares(j);
        // console.log("super dawg");
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

  var timer = 3500;

  var numberOfTimerResets = 0;

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
      else if (timer > 500) {
        timer -= 50;
      }
      else if (timer > 350) {
        timer -= 2;
      }
      else if (numberOfFullyInfectedBlocks.length == 3 && numberOfTimerResets == 0) {
        timer = 1500;
        console.log("TIMER RESET");
        numberOfTimerResets++;
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

score.innerHTML = 0;

var totalScoreGreen = 1;
var totalScoreBlue = 1;

var scoreTimeout;

var lastBlockColorComparison = [];
var lastBlockIndexComparison = [];

function cure(event) {
  var selectX, selectY;

  if (event.type == "mousedown") {
    selectX = Math.round(event.clientX-canvasBoundingClientRect.left);
    selectY = Math.round(event.clientY-canvasBoundingClientRect.top);
  }
  else if (event.type == "touchstart") {
    //Prevents mousedown event from firing in some browsers.
    event.preventDefault();

    selectX = Math.round(event.changedTouches[0].clientX - canvasBoundingClientRect.left);
    selectY = Math.round(event.changedTouches[0].clientY - canvasBoundingClientRect.top);
  }

  var greenPointsScored = 2;
  var bluePointsScored = 2;

  var wasPreviouslyInfected = false;
  var curedBlockLength = blockLength / setCanvasScalingFactor();

  var scaledxArray = xArray.slice();
  var scaledyArray = yArray.slice();

  var secondBlockCured = false;

  for (var h=0; h < scaledxArray.length; h++) {
    scaledxArray[h] = scaledxArray[h] / setCanvasScalingFactor();
  }
  for (var g=0; g < scaledyArray.length; g++) {
    scaledyArray[g] = scaledyArray[g] / setCanvasScalingFactor();
  }

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
    if (selectX >= scaledxArray[i] && selectX <= scaledxArray[i]+curedBlockLength && selectY >= scaledyArray[i] && selectY <= scaledyArray[i]+curedBlockLength && isInfected[i] && individualAlphaValues[i] < 1) {
      var passedTheCheck = false;

      function blockColorAndIndexCheck(i) {
        //First filter to see if any black blocks exist.
        // if (blockColorArray[i] == normalGreen && greenColorArray.indexOf(true) !== -1) {
        //   // return;
        // }
        // else if (blockColorArray[i] == normalBlue && blueColorArray.indexOf(true) !== -1) {
        //   // return;
        // }

        lastBlockColorComparison.push(blockColorArray[i]);
        console.log("This is lastBlockColorComparison before its modified by the i = " + i + " instance of cure(i)");
        console.log(lastBlockColorComparison);
        lastBlockIndexComparison.push(i);

        if (lastBlockIndexComparison.length == 2 && lastBlockIndexComparison[1] == lastBlockIndexComparison[0]) {
          console.log("Selected block as same index as previous block, cure() stops here. lastBlockIndexComparison NOT cleared, but pop() used.");
          //Gets rid of the last value for the two comparison arrays, otherwise lastBlockColorComparison continues to get infinitely larger.
          lastBlockIndexComparison.pop();
          lastBlockColorComparison.pop();

          return;
        }
        else if (lastBlockIndexComparison.length == 2 && lastBlockIndexComparison[1] !== lastBlockIndexComparison[0]) {
          console.log("Selected block is NOT same index as previous block, cure() continues. lastBlockIndexComparison cleared.")
          lastBlockIndexComparison = [];
        }

        // console.log("This is lastBlockColorComparison after selecting an infected block.");
        // console.log(lastBlockColorComparison);
        //Compare the last two blocks selected to see if they're the same color.
        if (lastBlockColorComparison.length == 1 && individualAlphaValues[i] < 1) {
          console.log("lastBlockColorComparison only had 1 value, was cleared. The selected block was already FULLY infected.");
          // console.log(lastBlockColorComparison);
          // lastBlockColorComparison = [];
          // return;
          passedTheCheck = true;
        }
        else if (lastBlockColorComparison.length == 2 && lastBlockColorComparison[1] == lastBlockColorComparison[0] && individualAlphaValues[i] < 1) {
          lastBlockColorComparison = [];
          console.log("Previous block's color matched and lastBlockColorComparison cleared.");
          // console.log(lastBlockColorComparison);

          // if (blockColorArray[i] == normalGreen && individualAlphaValues[i] == 1) {
          //   greenColorArray.push(false);
          //   console.log("false pushed onto greenColorArray from cure()");
          //   console.log(greenColorArray);
          // }
          // else if (blockColorArray[i] == normalBlue && individualAlphaValues[i] == 1) {
          //   blueColorArray.push(false);
          //   console.log("false pushed onto blueColorArray from cure()");
          //   console.log(blueColorArray);
          // }

          passedTheCheck = true;
          secondBlockCured = true;
        }
        else if (lastBlockColorComparison.length == 2 && lastBlockColorComparison[1] !== lastBlockColorComparison[0] && individualAlphaValues[i] == 1) {
          console.log("Blocks didn't match, selected block was fully infected, and the last value has been removed from lastBlockColorComparison");
          lastBlockColorComparison.pop();
          // return;
        }
        else if (lastBlockColorComparison.length == 2 && individualAlphaValues[i] !== 1) {
          console.log("The selected block does NOT match the previous color and has now been fully infected. lastBlockColorComparison has been cleared as well.");

          individualAlphaValues[i] = 1;
          ctx.fillStyle = "rgba(255,0,0," + individualAlphaValues[i] + ")";
          //make sure to change individual alpha values and isinfected to true
          ctx.clearRect(xArray[i], yArray[i], blockLength, blockLength);
          ctx.fillRect(xArray[i], yArray[i], blockLength, blockLength);

          lastBlockColorComparison = [];
          // console.log(lastBlockColorComparison.length);
          infect(i);

          if (blockColorArray[i] == normalGreen) {
            var greenIndexToBeReplaced = greenColorArray.indexOf(false);
            if (greenIndexToBeReplaced !== -1) {
              greenColorArray.splice(greenIndexToBeReplaced, 1);
              console.log("one false value has been removed from greenColorArray");
              console.log(greenColorArray);
            }
          }
          else if (blockColorArray[i] == normalBlue) {
            var blueIndexToBeReplaced = blueColorArray.indexOf(false);
            if (blueIndexToBeReplaced !== -1) {
              blueColorArray.splice(blueIndexToBeReplaced, 1);
              console.log("one false value has been removed from blueColorArray");
              console.log(blueColorArray);
            }
          }

          if (greenColorArray.indexOf(false) == -1) {
            animateBlackSquares(i);
          }
          else if (blueColorArray.indexOf(false) == -1) {
            animateBlackSquares(i);
          }
          // return;
        }
      }

      blockColorAndIndexCheck(i);

      if (passedTheCheck == false) {
        updateChosen(i);

        return;
      }

      //Restores uninfected status to cured blocks and clears the area to restore the block as its original color.
      console.log("The selected block has just been cured through the regular cure.")
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

      function updateChosen(i) {
        if (blockColorArray[i] == normalGreen && lastBlockColorComparison.length == 0) {
          console.log("negative condition chosen");
          chosenClassList.remove("greenBlock");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else if (blockColorArray[i] == normalBlue && lastBlockColorComparison.length == 0) {
          console.log("0th condition chosen");
          chosenClassList.remove("greenBlock");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else if (blockColorArray[i] == normalGreen && secondBlockCured == false) {
          console.log("first updateChosen condition chosen");
          chosenClassList.remove("emptyBlock");
          chosenClassList.add("greenBlock");

          chosen.innerHTML = "";
        }
        else if (blockColorArray[i] == normalBlue && secondBlockCured == false) {
          console.log("second updateChosen condition chosen");
          chosenClassList.remove("emptyBlock");
          chosenClassList.add("blueBlock");

          chosen.innerHTML = "";
        }
        else if (blockColorArray[i] == normalGreen && secondBlockCured) {
          console.log("third updateChosen condition chosen");
          chosenClassList.remove("greenBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else {
          console.log("fourth updateChosen condition chosen");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
      }

      function checkBlockCureOrder(i) {
        updateChosen(i);

        if (blockColorArray[i] == normalGreen && totalScoreGreen < 128 && secondBlockCured) {
          totalScoreGreen *= greenPointsScored;

          totalScore += totalScoreGreen;

          totalScoreBlue = 1;
        }
        else if (blockColorArray[i] == normalBlue && totalScoreBlue < 128 && secondBlockCured) {
          totalScoreBlue *= bluePointsScored;

          totalScore += totalScoreBlue;

          totalScoreGreen = 1;
        }

        if (secondBlockCured) {
          scoreFade(i);
          return;
        }

        blockFeedbackContainer[i].classList.remove("weakWhiteBackground");
        blockFeedbackContainer[i].classList.add("whiteBackground");
        blockFeedbackContainer[i].style.opacity = 1;

        window.setTimeout(function() {
          blockFeedbackContainer[i].style.opacity = 0;
        }, 450);
      }

      checkBlockCureOrder(i);
    }
    else if (selectX >= scaledxArray[i] && selectX <= scaledxArray[i]+curedBlockLength && selectY >= scaledyArray[i] && selectY <= scaledyArray[i]+curedBlockLength && isInfected[i] == false) {
      // lastBlockColorComparison = [];
      // lastBlockColorComparison.push(blockColorArray[i]);
      console.log("This is lastBlockColorComparison after selecting a non-infected block")
      console.log(lastBlockColorComparison);
      totalScoreGreen = 1;
      totalScoreBlue = 1;

      // scoreFade(i);
    }
  } //End of for loop.

  function scoreFade(i) {
    blockFeedbackContainer[i].classList.remove("whiteBackground");
    blockFeedbackContainer[i].classList.add("weakWhiteBackground");

    blockFeedbackContainer[i].style.opacity = 1;

    window.setTimeout(function() {
      blockFeedbackContainer[i].style.opacity = 0;
    }, 450);

    function updateColorScore() {
      if (blockColorArray[i] == normalGreen) {
        blockFeedbackContainer[i].innerHTML = "+" + totalScoreGreen;
      } else {
        blockFeedbackContainer[i].innerHTML = "+" + totalScoreBlue;
      }
    }

    function updateTotalScore() {
      document.getElementById("score").innerHTML = totalScore;
    }

    if (wasPreviouslyInfected && secondBlockCured) {
      updateColorScore();
      updateTotalScore();
    }

    secondBlockCured = false;
  } //End of scoreFade()




}
// aParent.ontouchmove = function(event) {
//   event.preventDefault();
// }

aParent.addEventListener("touchstart", cure, false);
aParent.addEventListener("mousedown", cure, false);

// function setCanvasScalingFactor() {
//   var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
//                           ctx.mozBackingStorePixelRatio ||
//                           ctx.msBackingStorePixelRatio ||
//                           ctx.oBackingStorePixelRatio ||
//                           ctx.backingStorePixelRatio ||
//                           1;
//
//   var pixelRatio = window.devicePixelRatio || 1;
//
//   var ratio = pixelRatio / backingStoreRatio;
//
//   return ratio;
// }
//
// function setDimensions() {
//   var blockFeedbackContainerWrapper = document.getElementById("blockFeedbackContainerWrapper");
//
//   var width, height, pixelRatio, switchCase;
//
//   if (window.screen.width >= 1200) {
//     width = Math.round(window.screen.availWidth * 0.25);
//     height = Math.round(width / 1.6);
//
//     pixelRatio = setCanvasScalingFactor();
//
//     switchCase = 1200;
//   }
//   else {
//     width = Math.round(window.screen.availWidth * 0.80);
//     height = width;
//
//     pixelRatio = setCanvasScalingFactor();
//   }
//
//   canvas.style.width = width + "px";
//   canvas.style.height = height + "px";
//   canvas.width = width * pixelRatio;
//   canvas.height = height * pixelRatio;
//
//   ctx = canvas.getContext("2d");
//
//   switch (switchCase) {
//     case 1200:
//       blockLength = Math.round(0.9 * (canvas.height/numberOfRows));
//       break;
//     default:
//       blockLength = Math.round(0.85 * (canvas.width/numberOfRows));
//       break;
//   }
//
//   blockFeedbackContainerWrapper.style.width = width + "px";
//   blockFeedbackContainerWrapper.style.height = height + "px";
//
//   aParent.style.width = width + "px";
//
//   drawBlocks();
//   createBlockFeedbackContainers();
//   infectionOrigins();
// }
//
// setDimensions();

// var canvasBoundingClientRect = canvas.getBoundingClientRect();

drawBlocks();
createBlockFeedbackContainers();
infectionOrigins();

}

function setCanvasScalingFactor() {
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                          ctx.mozBackingStorePixelRatio ||
                          ctx.msBackingStorePixelRatio ||
                          ctx.oBackingStorePixelRatio ||
                          ctx.backingStorePixelRatio ||
                          1;

  var pixelRatio = window.devicePixelRatio || 1;

  var ratio = pixelRatio / backingStoreRatio;

  return ratio;
}

// function setDimensions() {
//   // var orientation = window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation;
//
//   var width, height, pixelRatio, switchCase;
//   var screenRatio = window.screen.width / window.screen.height;
//
//   if (window.screen.width >= 1200) {
//     width = Math.round(window.screen.availWidth * 0.2);
//     // height = Math.round(width / 1.4);
//     height = width;
//
//     pixelRatio = setCanvasScalingFactor();
//
//     switchCase = 1200;
//   }
//   else if (window.screen.width >= 768) {
//     if (screenRatio > 1) {
//       width = Math.round(window.screen.availHeight * 0.5);
//     } else {
//       width = Math.round(window.screen.availWidth * 0.5);
//     }
//
//     height = width;
//
//     pixelRatio = setCanvasScalingFactor();
//
//     // switchCase = 768;
//   }
//   else if (window.screen.width >= 576) {
//     if (screenRatio > 1) {
//       width = Math.round(window.screen.availHeight * 0.60);
//       console.log("576 condition");
//     } else {
//       width = Math.round(window.screen.availWidth * 0.60);
//     }
//
//     height = width;
//
//     pixelRatio = setCanvasScalingFactor();
//
//     // switchCase = 576;
//   }
//   else {
//     if (screenRatio > 1) {
//       width = Math.round(window.screen.availHeight * 0.80);
//       // console.log("width is based off screen height");
//       feedbackPanelWrapper.innerHTML = "width is based off screen height"+" with screenRatio: "+screenRatio;
//     } else {
//       width = Math.round(window.screen.availWidth * 0.80);
//       // console.log("width is based off screen width");
//       feedbackPanelWrapper.innerHTML = "width is based off screen width"+" with screenRatio: "+screenRatio;
//     }
//
//     // width = Math.round(window.screen.availWidth * 0.80);
//     height = width;
//
//     pixelRatio = setCanvasScalingFactor();
//   }
//
//   canvas.style.width = width + "px";
//   canvas.style.height = height + "px";
//   canvas.width = width * pixelRatio;
//   canvas.height = height * pixelRatio;
//
//   ctx = canvas.getContext("2d");
//
//   switch (switchCase) {
//     case 1200:
//       blockLength = Math.round(0.9 * (canvas.height/numberOfRows));
//       break;
//     // case 576:
//     //   blockLength = Math.round(0.9 * (canvas.height/numberOfRows));
//     //   break;
//     default:
//       blockLength = Math.round(0.85 * (canvas.width/numberOfRows));
//       break;
//   }
//
//   blockFeedbackContainerWrapper.style.width = width + "px";
//   blockFeedbackContainerWrapper.style.height = height + "px";
//
//   aParent.style.width = width + "px";
//
//   feedbackPanelWrapper.style.width = width + "px";
//   // drawBlocks();
//   // createBlockFeedbackContainers();
//   // infectionOrigins();
// }
function setDimensions() {
  var width, height, pixelRatio, switchCase;
  var screenRatio = window.screen.width / window.screen.height;

  if (window.screen.width >= 1200) {
    width = Math.round(window.screen.availWidth * 0.2);
    // height = Math.round(width / 1.4);
    height = width;

    pixelRatio = setCanvasScalingFactor();

    switchCase = 1200;
  }
  else if (window.screen.width >= 768) {
    if (screenRatio > 1) {
      width = Math.round(window.screen.availHeight * 0.5);
    } else {
      width = Math.round(window.screen.availWidth * 0.5);
    }

    height = width;

    pixelRatio = setCanvasScalingFactor();

    // switchCase = 768;
  }
  // else if (window.screen.width >= 576) {
  //   if (screenRatio > 1) {
  //     width = Math.round(window.screen.availHeight * 0.60);
  //     console.log("576 condition");
  //   } else {
  //     width = Math.round(window.screen.availWidth * 0.60);
  //   }
  //
  //   height = width;
  //
  //   pixelRatio = setCanvasScalingFactor();
  //
  //   // switchCase = 576;
  // }
  else {
    if (screenRatio > 1) {
      width = Math.round(window.screen.availHeight * 0.80);
      // console.log("width is based off screen height");
      feedbackPanelWrapper.innerHTML = "width is based off screen height"+" with screenRatio: "+screenRatio;
    } else {
      width = Math.round(window.screen.availWidth * 0.80);
      // console.log("width is based off screen width");
      feedbackPanelWrapper.innerHTML = "width is based off screen width"+" with screenRatio: "+screenRatio;
    }

    // width = Math.round(window.screen.availWidth * 0.80);
    height = width;

    pixelRatio = setCanvasScalingFactor();
  }

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  ctx = canvas.getContext("2d");

  switch (switchCase) {
    case 1200:
      blockLength = Math.round(0.9 * (canvas.height/numberOfRows));
      break;
    // case 576:
    //   blockLength = Math.round(0.9 * (canvas.height/numberOfRows));
    //   break;
    default:
      blockLength = Math.round(0.85 * (canvas.width/numberOfRows));
      break;
  }

  blockFeedbackContainerWrapper.style.width = width + "px";
  blockFeedbackContainerWrapper.style.height = height + "px";

  aParent.style.width = width + "px";

  feedbackPanelWrapper.style.width = width + "px";
  // drawBlocks();
  // createBlockFeedbackContainers();
  // infectionOrigins();
}

var canvasBoundingClientRect;
function setBoundingClient() {
  canvasBoundingClientRect = canvas.getBoundingClientRect();
}

window.addEventListener("resize", setBoundingClient, false);

setDimensions();
setBoundingClient();

aParent.addEventListener("click", initializeGame, false);

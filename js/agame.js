var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var mainWrapper = document.getElementById("mainWrapper");
var feedbackPanelWrapper = document.getElementById("feedbackPanelWrapper");
var aParent = document.getElementById("aParent");
var blockFeedbackContainerWrapper = document.getElementById("blockFeedbackContainerWrapper");

var blockFeedbackContainer = document.getElementsByClassName("blockFeedbackContainer");
var blockFeedbackText = document.getElementById("blockFeedbackText");
var chosen = document.getElementById("blockStatus"),
    chosenClassList = chosen.classList;
var score = document.getElementById("score");

// var newChild = document.createElement("div");

var numberOfColumns = 4;
var numberOfRows = 4;
var blockLength;

var xArray;
var yArray;

var gameInitialized = false;


function initializeGame() {
aParent.removeEventListener("click", initializeGame, false);

blockFeedbackContainerWrapper.classList.remove("blackBackground");
blockFeedbackContainerWrapper.classList.add("transparentBackground");
// blockFeedbackContainerWrapper.classList.remove("whiteText");
// blockFeedbackContainerWrapper.classList.add("transparentText");

chosenClassList.remove("greenBlock");
chosenClassList.remove("blueBlock");
chosenClassList.add("emptyBlock");
chosen.innerHTML = "?";

// var xArray = [];
// var yArray = [];
// var isInfected = [];
// var individualAlphaValues = [];
gameInitialized = true;

var individualAlphaValues = [];
var isInfected = [];

var infectedInitialIndex;
// var blockLength;
// var blockColorArray = [];
var blockColorArray = [];

var blackIndividualAlphaValues = [];
var blackIsInfected = [];

var blueColorArray = [];
var greenColorArray = [];

var normalGreen = "hsl(150,100%,45%)";
var normalBlue = "hsl(195,100%,47%)";

function generateEasyColors() {
  var listOfColors = [normalGreen, normalBlue];

  for (var b=0, v=1; b < 0.5*(numberOfRows * numberOfColumns); b++, v+=2) {
    blockColorArray.push(normalGreen);
    blockColorArray.push(normalBlue);
  }

  for (var z=0; z < blockColorArray.length/2; z++) {
    greenColorArray.push(z);
    greenColorArray.push(false);
  }
  for (var x=0; x < blockColorArray.length/2; x++) {
    blueColorArray.push(x+blockColorArray.length);
    greenColorArray.push(false);
  }

  for (var i=0; i < numberOfRows; i++) {
    for (var j=0; j < numberOfColumns; j++) {
      isInfected.push(false);
      blackIsInfected.push(false);
      individualAlphaValues.push(0);
      blackIndividualAlphaValues.push(0);
    }
  }
}
function generateBlockColors() {
  // greenColorArray = [];
  // blueColorArray = [];

  //The coefficients that help center each individual block. This value is multiplied by the length of a small block and either added or subtracted from the x center of the canvas. Small blocks are drawn starting from the top left corners.

  var listOfColors = [normalGreen, normalBlue];

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
      var actualRandomIndex = Math.floor(Math.random()*(localArrayBothColors.length));

      preventEasyShapes.push(localArrayBothColors[actualRandomIndex]);
      //
      // console.log("Here is preventEasyShapes at length = " + preventEasyShapes.length);
      // console.log(preventEasyShapes);

      // // console.log((preventEasyShapes.length-1) % numberOfColumns == 0);
      // console.log(yArray[preventEasyShapes.length-1]-yArray[preventEasyShapes.length-4] == 0);

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

      // console.log("The fillStyle for this block is: ");
      // console.log(ctx.fillStyle);

      blockColorArray.push(blockColorArrayIndex);

      isInfected.push(false);
      blackIsInfected.push(false);
      individualAlphaValues.push(0);
      blackIndividualAlphaValues.push(0);

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
  }

  // console.log("initial greenColorArray from generateBlockColors():");
  // console.log(greenColorArray);
  // console.log("initial blueColorArray from generateBlockColors():");
  // console.log(blueColorArray);
  // console.log("this is blackIsInfected: ");
  // console.log(blackIsInfected);
  // console.log("this is blackIndividualAlphaValues: ");
  // console.log(blackIndividualAlphaValues);
}

function drawBlocks() {
  // positionBlocks();

  var animationRequest;

  var numberOfFullyInfectedBlackBlocks = blackIndividualAlphaValues.filter(function(para) {
    return para == 1;
  });
  // console.log("this is numberoffullyinfectedblackblocks");
  // console.log(numberOfFullyInfectedBlackBlocks);

  ctx.clearRect(0,0, canvas.width, canvas.height);

  for (var i=0; i < xArray.length; i++) {
    if (blackIsInfected[i]) {
      ctx.fillStyle = "rgba(0,0,0,"+blackIndividualAlphaValues[i]+")";
      // console.log("drawing black block based off alpha value: "+blackIndividualAlphaValues[i]);
    }
    else if (isInfected[i]) {
      ctx.fillStyle = "rgba(255,0,0,"+individualAlphaValues[i]+")";
    } else {
      ctx.fillStyle = blockColorArray[i];
    }

    ctx.fillRect(xArray[i], yArray[i], blockLength, blockLength);
  }

  if (numberOfFullyInfectedBlackBlocks.length == blackIndividualAlphaValues.length) {
    window.cancelAnimationFrame(animationRequest);
    console.log("animation frame cancelled!");
  } else {
    animationRequest = window.requestAnimationFrame(drawBlocks);
    // console.log("requestAnimationFrame running");
  }
}

function createBlockFeedbackContainers() {
  for (var i=0; i < xArray.length; i++) {
    var newChild = document.createElement("div");

    newChild.classList.add("blockFeedbackContainer");
    // newChild.classList.add("transparentBackground");
    newChild.classList.add("weakWhiteBackground");
    newChild.classList.add("whiteText");

    blockFeedbackContainerWrapper.appendChild(newChild);
  }
}

var animateBlackSquareCounter = 0;

function animateBlackSquares(j) {
  // var blackIndividualAlphaValues = individualAlphaValues.slice(0);
  // blackIndividualAlphaValues = individualAlphaValues.slice(0);
  // console.log("animateblacksquares INITIATED");
  // console.log(blackIndividualAlphaValues);
  // console.log("individualAlphaValues here:");
  // console.log(individualAlphaValues);
  // for (var k=0; k < blackIndividualAlphaValues.length; k++) {
  //   // if (individualAlphaValues[k] < 1) {
  //   blackIndividualAlphaValues[k] = 0;
  //   // }
  // }
  if (blockColorArray[j] == normalGreen) {
    for (var i=0; i < greenColorArray.length; i++) {
      blackIsInfected[greenColorArray[i]] = true;
    }
  }
  else if (blockColorArray[j] == normalBlue) {
    for (var i=0; i < blueColorArray.length; i++) {
      blackIsInfected[blueColorArray[i]] = true;
    }
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
      // ctx.fillStyle = "rgba(0, 0, 0," + blackIndividualAlphaValues[j] + ")";
      blackIndividualAlphaValues[greenColorArray[i]] += 0.04;
      // console.log("fuck");
      // console.log("blackIndividualAlphaValues are: ");
      // console.log(blackIndividualAlphaValues);
      // return;

      // ctx.fillRect(xArray[greenColorArray[i]], yArray[greenColorArray[i]], blockLength, blockLength);
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
      // ctx.fillStyle = "rgba(0, 0, 0," + blackIndividualAlphaValues[j] + ")";
      blackIndividualAlphaValues[blueColorArray[i]] += 0.04;
      // console.log("fuck");
      // console.log("blackIndividualAlphaValues are: ");
      // console.log(blackIndividualAlphaValues);
      // return;

      // ctx.fillRect(xArray[blueColorArray[i]], yArray[blueColorArray[i]], blockLength, blockLength);
    }
  }
  // console.log("Individual alpha values at the end: ");
  // console.log(blackIndividualAlphaValues);
  // return;
  // ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);

  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (blackIndividualAlphaValues[j] < 0.95) {
    animateBlackSquaresCycle(j);
  }
  else if (blackIndividualAlphaValues[j] >= 0.95)   {
    // ctx.fillStyle = "rgba(0, 0, 0," + blackIndividualAlphaValues[j] + ")";

    if (blockColorArray[j] == normalGreen) {
      greenColorArray.push(true);
      // console.log(greenColorArray);

      for (var i=0; i < greenColorArray.length-1; i++) {
        blackIndividualAlphaValues[greenColorArray[i]] = 1;
      }
    }
    else if (blockColorArray[j] == normalBlue) {
      blueColorArray.push(true);
      // console.log(blueColorArray);

      for (var i=0; i < blueColorArray.length-1; i++) {
        blackIndividualAlphaValues[blueColorArray[i]] = 1;
      }
    }

    animateBlackSquareCounter++;

    if (animateBlackSquareCounter == 2) {
      window.setTimeout(function() {
        gameInitialized = false;

        blockFeedbackContainerWrapper.classList.remove("transparentBackground");
        blockFeedbackContainerWrapper.classList.add("blackBackground");

        blockFeedbackContainerWrapper.classList.remove("transparentText");
        blockFeedbackContainerWrapper.classList.add("whiteText");

        blockFeedbackText.classList.remove("noDisplay");
        blockFeedbackText.classList.add("regularDisplay");
        blockFeedbackText.innerHTML = "Restart";

        aParent.removeEventListener("touchstart", cure, false);
        aParent.removeEventListener("mousedown", cure, false);
        aParent.addEventListener("click", initializeGame, false);
      }, 1500);
    }
    // console.log(blackIndividualAlphaValues);
    // console.log("greenColorArray at the end of animateBlackSquaresCycle()");
    // console.log(greenColorArray);
    // console.log("blueColorArray at the end of animateBlackSquaresCycle()");
    // console.log(blueColorArray);
    console.log("blackIndividualAlphaValues at the end of animateBlackSquaresCycle() setTimeout for: "+blockColorArray[j]);
    console.log(blackIndividualAlphaValues);

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
      // console.log("Super fast rate running for j: "+j);
      individualAlphaValues[j] += 0.14;
    }
    else if (internalIndividualAlphaValues.length > individualAlphaValues.length/3) {
      // console.log("Slightly fast rate running for j: "+j);
      individualAlphaValues[j] += 0.02;
    }
    else {
      // console.log("Slow rate running for j: "+j);
      individualAlphaValues[j] += 0.01;
    }
    // individualAlphaValues[j] += 0.001;
  }
  else if (greenColorArray.indexOf(true) !== -1 || blueColorArray.indexOf(true) !== -1 && isInfected[j]) {
    // console.log("the black block super fast rate is running");
    animateTimer = 4;
    individualAlphaValues[j] += 0.19;
  }

  // ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

  //FOR TESTING.
  // ctx.fillStyle = "pink";

  // ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);
  // console.log("With j = "+j+" fillRect only called with xArray[j]: "+xArray[j]+" and yArray[j]: "+yArray[j]);

  // console.log("animateIndividualInfection() is right before setTimeout for j: "+j+" with individualAlphaValues[j]: "+individualAlphaValues[j]+" and isInfected[j]: "+isInfected[j]);
  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (individualAlphaValues[j] < 0.95 && individualAlphaValues[j] !== 0) {
    // console.log("current animateTimer: "+animateTimer);
    animateIndividualInfection(j);
  }
  else if (individualAlphaValues[j] >= 0.95) {
  // else if (individualAlphaValues[j] >= 0.95 && individualAlphaValues[j] < 1)   {
    // console.log("current animateTimer: "+animateTimer);
    // console.log("individualAlphaValue[j]: "+individualAlphaValues[j]+" for j: "+j+" is about to get turned to 1");
    individualAlphaValues[j] = 1;
    // console.log("individualAlphaValues[j] for j: "+j+" is now: "+individualAlphaValues[j]);

    // ctx.fillStyle = "rgba(255, 0, 0," + individualAlphaValues[j] + ")";

    // ctx.clearRect(xArray[j], yArray[j], blockLength, blockLength);
    // ctx.fillRect(xArray[j], yArray[j], blockLength, blockLength);
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
      //The coefficient that determines whether the script searches for an uninfected block in the upward or downward direction.
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

          //Coefficient sign change that allows the script to look for an adjacent block above the infected block in the second itiration of this for loop.
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
  //         //Coefficient sign change that allows the script to look for an adjacent block above the infected block in the second itiration of this for loop.
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
      // else if (timer > 2000) {
      //   timer -= 250;
      // }
      else if (numberOfFullyInfectedBlocks.length >= 3 && numberOfTimerResets == 0) {
        timer = 1500;
        // console.log("TIMER RESET");
        numberOfTimerResets++;
      }
      else if (timer > 2000) {
        timer -= 550;
      }
      else if (timer > 1600) {
        timer -= 250;
      }
      else if (timer > 450) {
        timer -= 50;
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

var errorOpacity;
var errorInnerHTML;

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
  // console.log("curedBlockLength: "+curedBlockLength);

  var scaledxArray = xArray.slice();
  var scaledyArray = yArray.slice();

  var secondBlockCured = false;

  for (var h=0; h < scaledxArray.length; h++) {
    scaledxArray[h] = scaledxArray[h] / setCanvasScalingFactor();
  }
  for (var g=0; g < scaledyArray.length; g++) {
    scaledyArray[g] = scaledyArray[g] / setCanvasScalingFactor();
  }

  //Clicked block cured, now this checks surrounding blocks to see if they're infectious (globalAlpha value == 1) and adjacent.
  // function mouseTimeout(i) {
  //   var reInfectedArray = [];
  //
  //   window.setTimeout(function() {
  //     //if there is NO infected squares, start over with one random infected square.
  //     if (isInfected.indexOf(true) == -1) {
  //       infectedInitialIndex = Math.floor(Math.random()*xArray.length);
  //       isInfected[infectedInitialIndex] = true;
  //
  //       infect(infectedInitialIndex);
  //
  //       //No need to look for surrounding infectious blocks if there aren't any.
  //       return;
  //     }
  //
  //     //Starts at the leftmost column and finishes at the rightmost.
  //     for (var k = -1; k < 2; k++) {
  //       //Coefficient variable that changes which way (downward/upward) the script searches for infectious blocks.
  //       var c = 1;
  //
  //         //First checks to see if the block two spaces to the left of the newly cured block is on the same row and whether its infectious.
  //         if (yArray[i+k] - yArray[i] == 0 && individualAlphaValues[i+k] == 1) {
  //           //Adds the index value of the infectious block to an array.
  //           reInfectedArray.push(i+k);
  //         }
  //           //First checks the block two spaces left, one space down followed by the block two spaces left, two spaces down. Followed by upward direction.
  //           for (var z = 0; z < 2; z++) {
  //             if (xArray[i + (c*numberOfColumns) + k] - xArray[i + k] == 0 && individualAlphaValues[i + (c*numberOfColumns) + k] == 1) {
  //               reInfectedArray.push(i + (c*numberOfColumns) + k);
  //             }
  //
  //             c = -c;
  //           } //End of inner for loop.
  //     } //End of outer for loop.
  //
  //     for (var k = 0; k < reInfectedArray.length; k++) {
  //       // isInfected[reInfectedArray[k]] = true;
  //
  //       // infect(reInfectedArray[k]);
  //     }
  //   }, 1800);
  // } //End of mouseTimeout

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
        // console.log("This is LASTBLOCKCOLORCOMPARISON after its modified by the i = " + i + " instance of cure(i) ");
        // console.log(lastBlockColorComparison);
        // console.log(JSON.stringify(lastBlockColorComparison));

        lastBlockIndexComparison.push(i);

        if (lastBlockIndexComparison.length == 2 && lastBlockIndexComparison[1] == lastBlockIndexComparison[0]) {
          // console.log("Selected block as same index as previous block, cure() stops here. lastBlockIndexComparison NOT cleared, but pop() used.");
          //Gets rid of the last value for the two comparison arrays, otherwise lastBlockColorComparison continues to get infinitely larger.
          lastBlockIndexComparison.pop();
          lastBlockColorComparison.pop();

          // console.log("errorBlock() called");
          showErrorBlock(i);

          return;
        }
        else if (lastBlockIndexComparison.length == 2 && lastBlockIndexComparison[1] !== lastBlockIndexComparison[0]) {
          // console.log("Selected block is NOT same index as previous block, cure() continues. lastBlockIndexComparison cleared for i: "+i)
          lastBlockIndexComparison = [];
        }

        // console.log("This is lastBlockColorComparison after selecting an infected block.");
        // console.log(lastBlockColorComparison);
        //Compare the last two blocks selected to see if they're the same color.
        if (lastBlockColorComparison.length == 1 && individualAlphaValues[i] < 1) {
          // console.log("lastBlockColorComparison had 1 value. ");
          // console.log(lastBlockColorComparison);
          // lastBlockColorComparison = [];
          // return;
          passedTheCheck = true;
        }
        else if (lastBlockColorComparison.length == 2 && lastBlockColorComparison[1] == lastBlockColorComparison[0] && individualAlphaValues[i] < 1) {
          lastBlockColorComparison = [];
          // console.log("Previous block's color matched and lastBlockColorComparison cleared. "+lastBlockColorComparison);
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
          // console.log("secondBlockCured is: "+secondBlockCured);
        }
        else if (lastBlockColorComparison.length == 2 && lastBlockColorComparison[1] !== lastBlockColorComparison[0] && individualAlphaValues[i] == 1) {
          // console.log("Blocks didn't match, selected block was fully infected, and the last value has been removed from lastBlockColorComparison");
          lastBlockColorComparison.pop();
          // return;
        }
        else if (lastBlockColorComparison.length == 2 && individualAlphaValues[i] !== 1) {
          // console.log("The selected block does NOT match the previous color and has now been fully infected. lastBlockColorComparison has been cleared as well.");

          individualAlphaValues[i] = 1;
          // ctx.fillStyle = "rgba(255,0,0," + individualAlphaValues[i] + ")";
          //make sure to change individual alpha values and isinfected to true
          // ctx.clearRect(xArray[i], yArray[i], blockLength, blockLength);
          // ctx.fillRect(xArray[i], yArray[i], blockLength, blockLength);

          lastBlockColorComparison = [];
          // console.log(lastBlockColorComparison.length);
          infect(i);

          if (blockColorArray[i] == normalGreen) {
            var greenIndexToBeReplaced = greenColorArray.indexOf(false);
            if (greenIndexToBeReplaced !== -1) {
              greenColorArray.splice(greenIndexToBeReplaced, 1);
              // console.log("one false value has been removed from greenColorArray");
              // console.log(greenColorArray);
            }
          }
          else if (blockColorArray[i] == normalBlue) {
            var blueIndexToBeReplaced = blueColorArray.indexOf(false);
            if (blueIndexToBeReplaced !== -1) {
              blueColorArray.splice(blueIndexToBeReplaced, 1);
              // console.log("one false value has been removed from blueColorArray");
              // console.log(blueColorArray);
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

      // console.log("blockColorAndIndexCheck called for i: "+i);
      blockColorAndIndexCheck(i);
      // console.log("blockColorAndIndexCheck called for i: "+i);

      if (passedTheCheck == false) {
        updateChosen(i);

        return;
      }

      //Restores uninfected status to cured blocks and clears the area to restore the block as its original color.
      // console.log("The selected block has just been cured through the regular cure for i: "+i)
      // ctx.fillStyle = blockColorArray[i];
      // ctx.clearRect(xArray[i], yArray[i], blockLength, blockLength);
      // ctx.fillRect(xArray[i], yArray[i], blockLength, blockLength);

      individualAlphaValues[i] = 0;

      isInfected[i] = false;

      //Calls the function that will check for infectious blocks surrounding the newly cured blocks.
      // mouseTimeout(i);

      //Cooldown that prevents cure spam.
      // cooldownReady = false;
      // cooldown();

      wasPreviouslyInfected = true;

      function updateChosen(i) {
        if (blockColorArray[i] == normalGreen && lastBlockColorComparison.length == 0) {
          // console.log("negative condition chosen");
          chosenClassList.remove("greenBlock");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else if (blockColorArray[i] == normalBlue && lastBlockColorComparison.length == 0) {
          // console.log("0th condition chosen");
          chosenClassList.remove("greenBlock");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else if (blockColorArray[i] == normalGreen && secondBlockCured == false) {
          // console.log("first updateChosen condition chosen");
          chosenClassList.remove("emptyBlock");
          chosenClassList.add("greenBlock");

          chosen.innerHTML = "";
        }
        else if (blockColorArray[i] == normalBlue && secondBlockCured == false) {
          // console.log("second updateChosen condition chosen");
          chosenClassList.remove("emptyBlock");
          chosenClassList.add("blueBlock");

          chosen.innerHTML = "";
        }
        else if (blockColorArray[i] == normalGreen && secondBlockCured) {
          // console.log("third updateChosen condition chosen");
          chosenClassList.remove("greenBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else {
          // console.log("fourth updateChosen condition chosen");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
      }

      function checkBlockCureOrder(i) {
        updateChosen(i);

        if (blockColorArray[i] == normalGreen && totalScoreGreen < 32 && secondBlockCured) {
          totalScoreGreen *= greenPointsScored;

          totalScore += totalScoreGreen;

          totalScoreBlue = 1;
        }
        else if (blockColorArray[i] == normalBlue && totalScoreBlue < 32 && secondBlockCured) {
          totalScoreBlue *= bluePointsScored;

          totalScore += totalScoreBlue;

          totalScoreGreen = 1;
        }

        if (secondBlockCured) {
          scoreFade(i);
          // console.log("scorefade called for i: "+i);
          return;
        }

        blockFeedbackContainer[i].classList.remove("weakWhiteBackground");
        blockFeedbackContainer[i].classList.remove("strongWhiteBackground");

        blockFeedbackContainer[i].classList.add("whiteBackground");
        blockFeedbackContainer[i].style.opacity = 1;

        window.setTimeout(function() {
          blockFeedbackContainer[i].style.opacity = 0;
        }, 450);
      }

      checkBlockCureOrder(i);

      // console.log("This is lastBlockColorComparison at the very end of cure for i: "+i);
      // console.log(lastBlockColorComparison);
    }
    else if (selectX >= scaledxArray[i] && selectX <= scaledxArray[i]+curedBlockLength && selectY >= scaledyArray[i] && selectY <= scaledyArray[i]+curedBlockLength && isInfected[i] == false) {
      // lastBlockColorComparison = [];
      // lastBlockColorComparison.push(blockColorArray[i]);
      // console.log("This is lastBlockColorComparison after selecting a non-infected block")
      // console.log(lastBlockColorComparison);
      totalScoreGreen = 1;
      totalScoreBlue = 1;

      // scoreFade(i);
    }
  } //End of for loop.

  function showErrorBlock(i) {
    var isFullOpacity = false;

    if (blockFeedbackContainer[i].style.opacity == 0) {
      blockFeedbackContainer[i].classList.remove("weakWhiteBackground");
      blockFeedbackContainer[i].classList.remove("whiteBackground");
      blockFeedbackContainer[i].classList.remove("whiteText");

      blockFeedbackContainer[i].classList.add("strongWhiteBackground");
      blockFeedbackContainer[i].classList.add("redText");

      blockFeedbackContainer[i].innerHTML = "X";

      blockFeedbackContainer[i].style.opacity = 1;
      isFullOpacity = true;
    }

    if (isFullOpacity) {
      errorOpacity = window.setTimeout(function() {
        blockFeedbackContainer[i].style.opacity = 0;
      }, 450);

      errorInnerHTML = window.setTimeout(function() {
        blockFeedbackContainer[i].innerHTML = "";
      }, 700);
    } else {
      window.clearTimeout(errorOpacity);
      window.clearTimeout(errorInnerHTML);

      errorOpacity = window.setTimeout(function() {
        blockFeedbackContainer[i].style.opacity = 0;
      }, 450);

      errorInnerHTML = window.setTimeout(function() {
        blockFeedbackContainer[i].innerHTML = "";
      }, 700);
    }
  }

  function scoreFade(i) {
    // console.log("scorefade active for i: "+i);
    blockFeedbackContainer[i].classList.remove("whiteBackground");
    blockFeedbackContainer[i].classList.remove("strongWhiteBackground");
    blockFeedbackContainer[i].classList.remove("redText");

    blockFeedbackContainer[i].classList.add("weakWhiteBackground");
    blockFeedbackContainer[i].classList.add("whiteText");

    blockFeedbackContainer[i].style.opacity = 1;

    window.setTimeout(function() {
      blockFeedbackContainer[i].style.opacity = 0;
    }, 450);

    window.setTimeout(function() {
      blockFeedbackContainer[i].innerHTML = "";
    }, 700)

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

    // secondBlockCured = false;
  } //End of scoreFade()
}
aParent.ontouchmove = function(event) {
  event.preventDefault();
}

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

// var canvasBoundingClientRect = canvas.getBoundingClientRect();

positionBlocks();
generateBlockColors();
// generateEasyColors();
drawBlocks();
createBlockFeedbackContainers();
positionBlockFeedbackContainers();

(function countDown() {
  var countDownElement = document.getElementById("countDown");
  var counter = 6;

  blockFeedbackText.classList.add("noDisplay");
  blockFeedbackText.classList.remove("regularDisplay");

  blockFeedbackContainerWrapper.classList.remove("whiteText");
  blockFeedbackContainerWrapper.classList.add("transparentText");

  var countDownInterval = setInterval(function() {
    if (counter > 1) {
      counter--;
      blockFeedbackContainerWrapper.classList.add("whiteText");
      blockFeedbackContainerWrapper.classList.remove("transparentText");

      countDownElement.classList.remove("noDisplay");
      countDownElement.classList.add("regularDisplay");
      countDownElement.innerHTML = counter;

      fadeAway();
    } else {
      countDownElement.classList.add("noDisplay");
      countDownElement.classList.remove("regularDisplay");
      clearInterval(countDownInterval);
    }
  }, 1000);

  function fadeAway() {
    setTimeout(function() {
      blockFeedbackContainerWrapper.classList.remove("whiteText");
      blockFeedbackContainerWrapper.classList.add("transparentText");
    }, 625);
  }

  setTimeout(function() {
    infectionOrigins();
  }, 6000);
})();

} //END OF INITIALIZEGAME

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

function positionBlocks() {
  xArray = [];
  yArray = [];

  var xCenterOfCanvas = Math.round(canvas.width/2);
  var yCenterOfCanvas = Math.round(canvas.height/2);

  var xCoefficient = -(numberOfColumns/2);
  var yCoefficient = -(numberOfRows/2);

  for (var i=0; i < numberOfRows; i++) {
    for (var j=0; j < numberOfColumns; j++) {
      // if (window.screen.width >= 1200) {
      //   var x = xCenterOfCanvas + 2*j + (xCoefficient*blockLength);
      //   var y = yCenterOfCanvas + 2*i + (yCoefficient*blockLength);
      // } else {
      //   var x = xCenterOfCanvas + 2*j + (xCoefficient*blockLength);
      //   var y = yCenterOfCanvas + 2*i + (yCoefficient*blockLength);
      // }
      var x = xCenterOfCanvas + 2*j + (xCoefficient*blockLength);
      var y = yCenterOfCanvas + 2*i + (yCoefficient*blockLength);

      xArray.push(x);
      yArray.push(y);

      xCoefficient++;
    }
    xCoefficient = -(numberOfColumns/2);
    yCoefficient++;
  }
}

function positionBlockFeedbackContainers() {
  var scoreBlockLength = blockLength / setCanvasScalingFactor();

  for (var i=0; i < xArray.length; i++) {
    blockFeedbackContainer[i].style.left = xArray[i]/setCanvasScalingFactor() + "px";
    blockFeedbackContainer[i].style.top = yArray[i]/setCanvasScalingFactor() + "px";

    blockFeedbackContainer[i].style.width = scoreBlockLength + "px";
    blockFeedbackContainer[i].style.height = scoreBlockLength + "px";
  }
}

function setDimensions(event) {
  pixelRatio = setCanvasScalingFactor();

  if (event) {
    // console.log("this is the event type: "+event.type);
  }

  if (window.innerHeight > window.innerWidth) {
    if (window.innerWidth > 768) {
      var width = Math.round(0.45 * window.innerWidth);
      blockFeedbackText.style.fontSize = "125%";
      // console.log("width is 55% innerWidth");
    }
    else if (window.innerWidth > 576) {
      var width = Math.round(0.65 * window.innerWidth);
      blockFeedbackText.style.fontSize = "130%";
      // console.log("width is 65% innerWidth");
    } else {
      var width = Math.round(0.8 * window.innerWidth);
      blockFeedbackText.style.fontSize = "140%";
      // console.log("width is 80% innerWidth");
    }
  }
  else {
    if (window.innerHeight > 768) {
      var width = Math.round(0.45 * window.innerHeight);
      blockFeedbackText.style.fontSize = "125%";
      // console.log("width is 55% innerHeight");
    }
    else if (window.innerHeight > 576) {
      var width = Math.round(0.65 * window.innerHeight);
      blockFeedbackText.style.fontSize = "130%";
      // console.log("width is 65% innerHeight");
    }
    else {
      var width = Math.round(0.8 * window.innerHeight);
      blockFeedbackText.style.fontSize = "140%";
      // console.log("width is 80% innerHeight");
    }
  }

  var height = width;
  // console.log("width: "+width);
  // console.log("height: "+height);

  mainWrapper.style.width = width + "px";

  // aParent.style.width = width + "px";
  // aParent.style.height = height + "px";

  blockFeedbackContainerWrapper.style.width = width + "px";
  blockFeedbackContainerWrapper.style.height = height + "px";

  // console.log(blockFeedbackContainerWrapper.style.marginTop);
  blockFeedbackContainerWrapper.style.fontSize = 0.05 * width + "px";

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  blockLength = Math.round(0.85 * (canvas.width/numberOfRows));
  // console.log("this is blockLength: "+blockLength);
}

var canvasBoundingClientRect;
function setBoundingClient() {
  canvasBoundingClientRect = canvas.getBoundingClientRect();
}

function getStyleValue(elem, prop) {
  return window.getComputedStyle(elem).getPropertyValue(prop);
}

setDimensions();
setBoundingClient();

// window.addEventListener("deviceorientation", setDimensions, false);
window.addEventListener("resize", function() {
  setBoundingClient();
  setDimensions(event);

  if (gameInitialized) {
    positionBlocks();
    positionBlockFeedbackContainers();
  }
}, false);
window.addEventListener("scroll", function() {
  setBoundingClient();
}, false)
aParent.addEventListener("click", initializeGame, false);

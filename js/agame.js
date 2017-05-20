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

chosenClassList.remove("greenBlock");
chosenClassList.remove("blueBlock");
chosenClassList.add("emptyBlock");
chosen.innerHTML = "?";

gameInitialized = true;

var individualAlphaValues = [];
var isInfected = [];

var infectedInitialIndex;
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
  //The coefficients that help center each individual block. This value is multiplied by the length of a small block and either added or subtracted from the x center of the canvas. Small blocks are drawn starting from the top left corners.

  var listOfColors = [normalGreen, normalBlue];

  var localArrayBothColors = [];

  var preventEasyShapes = [];

  for (var b=0, v=1; b < 0.5*(numberOfRows * numberOfColumns); b++, v+=2) {
    localArrayBothColors.push(normalGreen);
    localArrayBothColors.push(normalBlue);
  }

  //Two for loops that build the big block row by row. xCoefficient is reset after each row's completion while yCoefficient is increased.
  for (var i=0; i < numberOfRows; i++) {
    for (var j=0; j < numberOfColumns; j++) {
      var actualRandomIndex = Math.floor(Math.random()*(localArrayBothColors.length));

      preventEasyShapes.push(localArrayBothColors[actualRandomIndex]);

      //Prevents 3 adjacent blocks of the same color in either the horizontal or vertical direction.
      if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-3] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-3] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalGreen) {
        if (localArrayBothColors.indexOf(normalBlue) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalBlue);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalBlue);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns*2] && xArray[(preventEasyShapes.length-1)] - xArray[(preventEasyShapes.length-1)-numberOfRows*2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalGreen) {
        if (localArrayBothColors.indexOf(normalBlue) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalBlue);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalBlue);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-3] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-3] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalBlue) {
        if (localArrayBothColors.indexOf(normalGreen) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalGreen);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalGreen);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1) - numberOfColumns*2] && xArray[(preventEasyShapes.length-1)] - xArray[(preventEasyShapes.length-1)-numberOfRows*2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalBlue) {
        if (localArrayBothColors.indexOf(normalGreen) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalGreen);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalGreen);
      }
      //Prevents squares of 4 adjacent blocks of the same color from forming.
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1)-numberOfRows] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-2)-numberOfRows] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalBlue) {
        if (localArrayBothColors.indexOf(normalGreen) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalGreen);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalGreen);
      }
      else if (preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[preventEasyShapes.length-2] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-1)-numberOfRows] && preventEasyShapes[preventEasyShapes.length-1] == preventEasyShapes[(preventEasyShapes.length-2)-numberOfRows] && yArray[preventEasyShapes.length-1] - yArray[preventEasyShapes.length-2] == 0 &&  preventEasyShapes[preventEasyShapes.length-1] == normalGreen) {
        if (localArrayBothColors.indexOf(normalBlue) !== -1) {
          actualRandomIndex = localArrayBothColors.indexOf(normalBlue);
        }

        preventEasyShapes.splice(preventEasyShapes.length-1, 1, normalBlue);
      }

      var blockColorArrayIndex = localArrayBothColors[actualRandomIndex];

      localArrayBothColors.splice(actualRandomIndex, 1);

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
}

function drawBlocks() {
  // positionBlocks();

  var animationRequest;

  var numberOfFullyInfectedBlackBlocks = blackIndividualAlphaValues.filter(function(para) {
    return para == 1;
  });

  ctx.clearRect(0,0, canvas.width, canvas.height);

  for (var i=0; i < xArray.length; i++) {
    if (blackIsInfected[i]) {
      ctx.fillStyle = "rgba(0,0,0,"+blackIndividualAlphaValues[i]+")";
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
  }
}

function createBlockFeedbackContainers() {
  for (var i=0; i < xArray.length; i++) {
    var newChild = document.createElement("div");

    newChild.classList.add("blockFeedbackContainer");

    newChild.classList.add("weakWhiteBackground");
    newChild.classList.add("whiteText");

    blockFeedbackContainerWrapper.appendChild(newChild);
  }
}

var animateBlackSquareCounter = 0;

function animateBlackSquares(j) {
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

  function animateBlackSquaresCycle(j) {
  if (blockColorArray[j] == normalGreen) {
    for (var i=0; i < greenColorArray.length; i++) {
      blackIndividualAlphaValues[greenColorArray[i]] += 0.04;
    }
  }
  else if (blockColorArray[j] == normalBlue) {
    for (var i=0; i < blueColorArray.length; i++) {
      blackIndividualAlphaValues[blueColorArray[i]] += 0.04;
    }
  }

  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (blackIndividualAlphaValues[j] < 0.95) {
    animateBlackSquaresCycle(j);
  }
  else if (blackIndividualAlphaValues[j] >= 0.95)   {
    if (blockColorArray[j] == normalGreen) {
      greenColorArray.push(true);

      for (var i=0; i < greenColorArray.length-1; i++) {
        blackIndividualAlphaValues[greenColorArray[i]] = 1;
      }
    }
    else if (blockColorArray[j] == normalBlue) {
      blueColorArray.push(true);

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
  }
  }, 120);

  } //end of animateBlackSquaresCycle()
  animateBlackSquaresCycle(j);
} //end of animateBlackSquares()

function animateIndividualInfection(j) {
  var animateTimer = 180;
  var internalIndividualAlphaValues = individualAlphaValues.filter(function(parameter) {
    return parameter == 1;
  });

  if (greenColorArray.indexOf(true) == -1 && blueColorArray.indexOf(true) == -1 && isInfected[j]) {
    if (internalIndividualAlphaValues.length > individualAlphaValues.length/2) {
      individualAlphaValues[j] += 0.14;
    }
    else if (internalIndividualAlphaValues.length > individualAlphaValues.length/3) {
      individualAlphaValues[j] += 0.02;
    }
    else {
      individualAlphaValues[j] += 0.01;
    }
  }
  else if (greenColorArray.indexOf(true) !== -1 || blueColorArray.indexOf(true) !== -1 && isInfected[j]) {
    animateTimer = 4;
    individualAlphaValues[j] += 0.19;
  }

  window.setTimeout(function() {
  //Makes sure it isn't 0, because if it is, this function should be called by ANOTHER function to make sure infections spread correctly.
  if (individualAlphaValues[j] < 0.95 && individualAlphaValues[j] !== 0) {
    animateIndividualInfection(j);
  }
  else if (individualAlphaValues[j] >= 0.95) {
    individualAlphaValues[j] = 1;

    if (blockColorArray[j] == normalGreen) {
      var greenIndexToBeReplaced = greenColorArray.indexOf(false);

      if (greenIndexToBeReplaced !== -1) {
        greenColorArray.splice(greenIndexToBeReplaced, 1);
      }

      if (greenColorArray.indexOf(false) == -1) {
        animateBlackSquares(j);
        return;
      }
    }
    else if (blockColorArray[j] == normalBlue) {
      var blueIndexToBeReplaced = blueColorArray.indexOf(false);

      if (blueIndexToBeReplaced !== -1) {
        blueColorArray.splice(blueIndexToBeReplaced, 1);
      }

      if (blueColorArray.indexOf(false) == -1) {
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
  }
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
        return;
      }
      else if (numberOfFullyInfectedBlocks.length >= 3 && numberOfTimerResets == 0) {
        timer = 1500;

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

      for (var i=0; i < isInfected.length; i++) {
        if (isInfected[i] == false) {
          falseIndexArray.push(i);
        }
      }

      var lerandom = Math.floor(Math.random()*falseIndexArray.length);

      infectedInitialIndex = falseIndexArray[lerandom];

      isInfected[infectedInitialIndex] = true;

      infect(infectedInitialIndex);

      subsequentOrigins();
    }, timer);
  }
  subsequentOrigins();
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

  //Determines which infected square's been clicked on.
  for (var i = 0; i < isInfected.length; i++) {
    if (selectX >= scaledxArray[i] && selectX <= scaledxArray[i]+curedBlockLength && selectY >= scaledyArray[i] && selectY <= scaledyArray[i]+curedBlockLength && isInfected[i] && individualAlphaValues[i] < 1) {
      var passedTheCheck = false;

      function blockColorAndIndexCheck(i) {
        lastBlockColorComparison.push(blockColorArray[i]);
        lastBlockIndexComparison.push(i);

        if (lastBlockIndexComparison.length == 2 && lastBlockIndexComparison[1] == lastBlockIndexComparison[0]) {
          //Gets rid of the last value for the two comparison arrays, otherwise lastBlockColorComparison continues to get infinitely larger.
          lastBlockIndexComparison.pop();
          lastBlockColorComparison.pop();

          showErrorBlock(i);

          return;
        }
        else if (lastBlockIndexComparison.length == 2 && lastBlockIndexComparison[1] !== lastBlockIndexComparison[0]) {
          lastBlockIndexComparison = [];
        }

        //Compare the last two blocks selected to see if they're the same color.
        if (lastBlockColorComparison.length == 1 && individualAlphaValues[i] < 1) {
          passedTheCheck = true;
        }
        else if (lastBlockColorComparison.length == 2 && lastBlockColorComparison[1] == lastBlockColorComparison[0] && individualAlphaValues[i] < 1) {
          lastBlockColorComparison = [];

          passedTheCheck = true;
          secondBlockCured = true;
        }
        else if (lastBlockColorComparison.length == 2 && lastBlockColorComparison[1] !== lastBlockColorComparison[0] && individualAlphaValues[i] == 1) {
          lastBlockColorComparison.pop();
        }
        else if (lastBlockColorComparison.length == 2 && individualAlphaValues[i] !== 1) {
          individualAlphaValues[i] = 1;

          lastBlockColorComparison = [];
          infect(i);

          if (blockColorArray[i] == normalGreen) {
            var greenIndexToBeReplaced = greenColorArray.indexOf(false);
            if (greenIndexToBeReplaced !== -1) {
              greenColorArray.splice(greenIndexToBeReplaced, 1);
            }
          }
          else if (blockColorArray[i] == normalBlue) {
            var blueIndexToBeReplaced = blueColorArray.indexOf(false);
            if (blueIndexToBeReplaced !== -1) {
              blueColorArray.splice(blueIndexToBeReplaced, 1);
            }
          }

          if (greenColorArray.indexOf(false) == -1) {
            animateBlackSquares(i);
          }
          else if (blueColorArray.indexOf(false) == -1) {
            animateBlackSquares(i);
          }
        }
      }

      blockColorAndIndexCheck(i);

      if (passedTheCheck == false) {
        updateChosen(i);

        return;
      }

      individualAlphaValues[i] = 0;

      isInfected[i] = false;

      wasPreviouslyInfected = true;

      function updateChosen(i) {
        if (blockColorArray[i] == normalGreen && lastBlockColorComparison.length == 0) {
          chosenClassList.remove("greenBlock");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else if (blockColorArray[i] == normalBlue && lastBlockColorComparison.length == 0) {
          chosenClassList.remove("greenBlock");
          chosenClassList.remove("blueBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else if (blockColorArray[i] == normalGreen && secondBlockCured == false) {
          chosenClassList.remove("emptyBlock");
          chosenClassList.add("greenBlock");

          chosen.innerHTML = "";
        }
        else if (blockColorArray[i] == normalBlue && secondBlockCured == false) {
          chosenClassList.remove("emptyBlock");
          chosenClassList.add("blueBlock");

          chosen.innerHTML = "";
        }
        else if (blockColorArray[i] == normalGreen && secondBlockCured) {
          chosenClassList.remove("greenBlock");
          chosenClassList.add("emptyBlock");

          chosen.innerHTML = "?";
        }
        else {
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
    }
    else if (selectX >= scaledxArray[i] && selectX <= scaledxArray[i]+curedBlockLength && selectY >= scaledyArray[i] && selectY <= scaledyArray[i]+curedBlockLength && isInfected[i] == false) {
      totalScoreGreen = 1;
      totalScoreBlue = 1;
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
  } //End of scoreFade()
}

aParent.addEventListener("touchstart", cure, false);
aParent.addEventListener("mousedown", cure, false);

positionBlocks();
generateBlockColors();
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

  if (window.innerHeight > window.innerWidth) {
    if (window.innerWidth > 768) {
      var width = Math.round(0.45 * window.innerWidth);
      blockFeedbackText.style.fontSize = "125%";
    }
    else if (window.innerWidth > 576) {
      var width = Math.round(0.65 * window.innerWidth);
      blockFeedbackText.style.fontSize = "130%";
    } else {
      var width = Math.round(0.8 * window.innerWidth);
      blockFeedbackText.style.fontSize = "140%";
    }
  }
  else {
    if (window.innerHeight > 768) {
      var width = Math.round(0.45 * window.innerHeight);
      blockFeedbackText.style.fontSize = "125%";
    }
    else if (window.innerHeight > 576) {
      var width = Math.round(0.65 * window.innerHeight);
      blockFeedbackText.style.fontSize = "130%";
    }
    else {
      var width = Math.round(0.8 * window.innerHeight);
      blockFeedbackText.style.fontSize = "140%";
    }
  }

  var height = width;
  mainWrapper.style.width = width + "px";

  blockFeedbackContainerWrapper.style.width = width + "px";
  blockFeedbackContainerWrapper.style.height = height + "px";

  blockFeedbackContainerWrapper.style.fontSize = 0.05 * width + "px";

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  blockLength = Math.round(0.85 * (canvas.width/numberOfRows));
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

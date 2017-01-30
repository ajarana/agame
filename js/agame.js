var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var xArray = [];
var yArray = [];
var blockWidth, blockHeight;

function blockPositions() {
  var numberOfBlocks = 6;
  var numberOfRows = 3;
  var numberOfColumns = 4;

  blockWidth = canvas.width * 0.08;
  blockHeight = blockWidth;

  //Calculates an exact and equal gap distance between each row or column depending on the total number of rows or columns n. Denominator is n - 1.
  var horizontalGapWidth = (canvas.width/1.2 - (numberOfColumns * blockWidth)) / (numberOfColumns - 1);
  var verticalGapWidth = (canvas.height/1.2 - (numberOfRows * blockHeight)) / (numberOfRows - 1);

  //Fills an xArray with length = numberOfRows * numberOfColumns. X values eventually repeat by the time the next row is reached.
  for (var i=0; i<numberOfRows; i++) {
    for (var k=0; k<numberOfColumns; k++) {
      if (k==0) {
        xArray.push((canvas.width - (canvas.width/1.2))/2);
        //The line below works exactly like the line above this comment. Don't know why.
        // xArray.push((canvas.height - (canvas.height/1.2)));
      }
      else {
        xArray.push(xArray[k-1] + blockWidth + horizontalGapWidth);
      }
    }
  }

  //Fills a yArray with length = numberOfRows * numberOfColumns. Y values for each row are equal, and increase according to verticalGapWidth, canvas height, and block height. CANNOT just use the method for filling the xArray to fill the yArray. For example, you can either have a combination of an [0, 0, 1, 1] xArray / [0, 1, 0 , 1] yArray OR a [0, 1, 0, 1] xArray / [0, 0, 1, 1] yArray to get this to work. But you CAN'T have either a [0, 0, 1, 1] xArray / [0, 0, 1, 1] yArray OR a [0, 1, 0, 1] xArray / [0, 1, 0 ,1] yArray, because in this case you'll get both repeating x and y values and subsequent unwatned stacking of blocks.
  for (var i=0; i < numberOfRows; i++) {
    if (i == 0) {
      yArray[i] = (canvas.height - (canvas.height/1.2))/2;
      // yArray.push((canvas.width - (canvas.width/1.2)));
      // yArray[i+1] = yArray[i] + blockHeight + verticalGapWidth;
    } else {
      yArray.push(yArray[yArray.length-1] + blockHeight + verticalGapWidth);
    }
    for (var k=1; k<numberOfColumns; k++) {
      yArray.splice(yArray.indexOf(yArray[yArray.length-1]), 0, yArray[yArray.length-1]);
    }
  }

  // //Spits out the vertical gap widths as well as the distance between the first row and the top border and the last row and the bottom border.
  // console.log("Difference between the top of the canvas and the first row is " + ( yArray[0] ));
  // for (var i=0; i<numberOfRows*numberOfColumns-numberOfColumns; i+=numberOfColumns) {
  //   difference = yArray[i+numberOfColumns]-yArray[i];
  //   console.log("Difference between subsequent yArray indexes is " + difference);
  // }
  // console.log("Difference between last row and the bottom of the canvas is " + (canvas.height-blockHeight-yArray[yArray.length-1]));
  //
  // //Spits out the horizontal gap widths as well as the distance between the first column and the left border and the last column and the right border.
  // console.log("Difference between the left canvas border and the first column is " + ( xArray[0] ));
  // for (var i=0; i<numberOfColumns-1; i++) {
  //   difference = xArray[i+1]-xArray[i];
  //   console.log("Number "+[i+1] + " difference between subsequent xArray indexes is " + difference);
  // }
  // console.log("Difference between the right canvas border and the last column is " + (canvas.width-blockWidth-xArray[xArray.length-1]));
}

// var rows, columns;
//
// function blockPositions() {
//   rows = 6;
//   columns = 4;
//
//   blockWidth = window.screen.availWidth * 0.04;
//   blockHeight = blockWidth;
//
//   for (var i=0; i<rows; i++) {
//     for (var j=0; j<columns; j++) {
//       ctx.fillStyle = "rgb(" + 50*j + "," + 100*i + "," + 30*j + ")"
//       ctx.fillRect((i*blockHeight), (j*blockHeight), blockWidth, blockHeight);
//     }
//   }
// }

function blockColors() {
  for (var i=0; i < xArray.length-2; i+=3) {
    // ctx.beginPath();
    ctx.fillStyle = "red";
    // ctx.fill(path1);
    ctx.fill();
    // ctx.closePath();
  }
}

function drawBlocks() {
  // ctx.strokeStyle = "#bbb";
  // for (var i=0; i < xArray.length; i++) {
  //   // ctx.beginPath();
  //   ctx.strokeStyle = "#bbb";
  //   // ctx.strokeRect(xArray[i], yArray[i], blockWidth, blockHeight);
  //   ctx.rect(xArray[i], yArray[i], blockWidth, blockHeight);
  //   // ctx.closePath();
  //   // console.log(lul);
  // }
  // // path1 = new Path2D();
  // // path1.rect(xArray[4], yArray[4], blockWidth, blockHeight);
  //
  // ctx.stroke();
  var numberColumns = 28;
  var numberRows = 4;
  var xCoefficient = -(numberColumns/2);
  var yCoefficient = -(numberRows/2);

  for (var i=0; i < numberRows; i++) {
    for (var j=0; j < numberColumns; j++) {
      ctx.fillStyle = "rgba(" + 20*i + "," + 20*j + ", 50, 1";
      ctx.fillRect(canvas.width/2 + xCoefficient*25, canvas.height/2 + yCoefficient*25, 25, 25);
      xCoefficient++;
    }
    xCoefficient = -(numberColumns/2);
    yCoefficient++;
  }
}

function setDimensions() {
  canvas.width = window.screen.availWidth * 0.4;
  // blockPositions();
  // canvas.width = blockWidth * rows;
  canvas.height = canvas.width / 2;

  blockPositions();
  drawBlocks();
  blockColors();
}

setDimensions();
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

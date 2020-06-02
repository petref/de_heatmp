"use strict";

if (typeof module !== "undefined") module.exports = simpleheat;

function simpleheat(canvas) {
  if (!(this instanceof simpleheat)) return new simpleheat(canvas);

  this._canvas = canvas =
    typeof canvas === "string" ? document.getElementById(canvas) : canvas;

  this._ctx = canvas.getContext("2d");
  this._width = canvas.width;
  this._height = canvas.height;

  this._max = 1;
  this._data = [];
}

simpleheat.prototype = {
  defaultRadius: 25,

  defaultGradient: {
    0.4: "blue",
    0.6: "cyan",
    0.7: "lime",
    0.8: "yellow",
    1.0: "red",
  },

  data: function (data) {
    this._data = data;
    return this;
  },

  max: function (max) {
    this._max = max;
    return this;
  },

  add: function (point) {
    this._data.push(point);
    return this;
  },

  clear: function () {
    this._data = [];
    return this;
  },

  radius: function (r, blur) {
    blur = blur === undefined ? 15 : blur;

    // create a grayscale blurred circle image that we'll use for drawing points
    var circle = (this._circle = this._createCanvas()),
      ctx = circle.getContext("2d"),
      r2 = (this._r = r + blur);

    circle.width = circle.height = r2 * 2;

    ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
    ctx.shadowBlur = blur;
    ctx.shadowColor = "blue";
    
    ctx.beginPath();
    ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    let circleCharact =[r2, r]

    // ctx.beginPath();
    // ctx.font = "30px  Lato";
    // ctx.textAlign = "center";
    // ctx.fillStyle="red";
    // ctx.closePath();
    // ctx.fillText('2', 25, 35);
    
    
    
    return this;
  },

  resize: function () {
    this._width = this._canvas.width;
    this._height = this._canvas.height;
  },

//   gradient: function (grad) {
//     // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
//     var canvas = this._createCanvas(),
//       ctx = canvas.getContext("2d"),
//       gradient = ctx.createLinearGradient(0, 0, 0, 256);

//     canvas.width = 1;
//     canvas.height = 256;

//     for (var i in grad) {
//       gradient.addColorStop(+i, grad[i]);
//     }

//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, 1, 256);

//     this._grad = ctx.getImageData(0, 0, 1, 256).data;

//     return this;
//   },

  draw: function (minOpacity) {
    if (!this._circle) this.radius(this.defaultRadius);
    // if (!this._grad) this.gradient(this.defaultGradient);

    // console.log(this._circle)
    var ctx = this._ctx;
    for (var i = 0, len = this._data.length, p; i < len; i++) {
      p = this._data[i];
    ctx.clearRect(p[0] - this._r-60, p[1] - this._r-60, this._r+200, this._r+300);
    
    }
    // draw a grayscale heatmap by putting a blurred circle at each data point
    for (var i = 0, len = this._data.length, p; i < len; i++) {
      p = this._data[i];
    //   ctx.globalAlpha = Math.max(
    //     p[2] / this._max,
    //     minOpacity === undefined ? 0.05 : minOpacity
    //   );



    
      ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);

      ctx.save()
      ctx.beginPath();
      ctx.font = "30px  Lato";
      ctx.textAlign = "center";
    
      if(i<4){
        ctx.fillStyle="red";
      }else{
        ctx.fillStyle="yellow";
      }

      ctx.closePath();


      ctx.fillText(i+1, p[0] - this._r +25, p[1] - this._r + 34);

    }

    

    // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
    // var colored = ctx.getImageData(0, 0, this._width, this._height);
    // this._colorize(colored.data, this._grad);
    // ctx.putImageData(colored, 0, 0);

    return this;
  },
//   addplayer: function (playerNumber) {
//     var number = (this._circle = this._createCanvas()),
//       ctx = number.getContext("2d");

//     ctx.beginPath();
//     ctx.arc(100, 75, 50, 0, 2 * Math.PI);
//     ctx.strokeStyle = "#FF0000";
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.fillStyle = "black";
//     ctx.font = "30px Arial";
//     ctx.fillText("Hello World", 10, 50);
//   },
//   _colorize: function (pixels, gradient) {
//     console.log(this);
//     for (var i = 0, len = pixels.length, j; i < len; i += 4) {
//       j = pixels[i + 3] * 4; // get gradient color from opacity value

//       if (j) {
//         pixels[i] = gradient[j];
//         pixels[i + 1] = gradient[j + 1];
//         pixels[i + 2] = gradient[j + 2];
//       }
//     }
//   },

  _createCanvas: function () {
    if (typeof document !== "undefined") {
      return document.createElement("canvas");
    } else {
      // create a new canvas instance in node.js
      // the canvas class needs to have a default constructor without any parameter
      return new this._canvas.constructor();
    }
  },
};

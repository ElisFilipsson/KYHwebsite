function Color(c) {
  'use strict';
  this.color = c;

  /**
   * Splits the entered colour and generates r, g and b methods attatched to
   * the object for ever class.
   */
  this.splitChannels = function() {
    // var length = this.color.length;
    var hexReg = /^(#|)([0-9a-f]{3}){1,2}$/i;
    var rgbReg = /^rgb\((([01]?\d\d?|2[0-4]\d|25[0-5])(,\s?)){2}(([01]?\d\d?|2[0-4]\d|25[0-5])\))$/i;
    var notNumberOrComma = /[^,0-9]+/g;
    var color;

    // check if color is RGB, if is, continue
    if (this.color.match(rgbReg)) {
      color = this.color.replace(notNumberOrComma, '');
      color = color.split(',');
      this.r = color[0];
      this.g = color[1];
      this.b = color[2];
    }

    if (this.color.match(hexReg)) {
      // remove hash from start of string
      color = this.color.replace('#', '');
      if (color.length === 6) {
        this.r = parseInt(color.substr(0, 2), 16);
        this.g = parseInt(color.substr(2, 2), 16);
        this.b = parseInt(color.substr(4, 2), 16);
      } else if (color.length === 3) {
        this.r = parseInt(color.substr(0, 1) + color.substr(0, 1), 16);
        this.g = parseInt(color.substr(1, 1) + color.substr(1, 1), 16);
        this.b = parseInt(color.substr(2, 1) + color.substr(2, 1), 16);
      }
    }
  };

  /**
   * utput the colour in rgb(x,x,x) format for simple use in for example
   * css, indipendent of the colour format used to initiate the object.
   * RGB values are outputted into an array and then joined together,
   * this makes the code extandable should I want to build alpha
   * value support later.
   * @return {string} rgb() formated color value
   */
  this.getRGB = function() {
    var rgb = [this.r, this.g, this.b];
    return 'rgb(' + rgb.join(',') + ')';
  };

  /**
   * Colours are manipulated according to w3 standards, and luminance is
   * outputted in a range bewteen 1 and 22, where 22 is white and 1
   * is black. Calculations are based on sRGB as suggested by w3.
   * @return {number} the perceived luminance of this color
   */
  this.getLuminance = function() {
    /**
     * Calculates the relative luminance of a colour using an algorythm
     * by w3 for calculating ratio between values. The website
     * can be found here: http://www.w3.org/TR/WCAG20/
     * and is repeted per channel
     * @param {n} nubmer RGB channel value.
     */
    function lum(n) {
      n = n / 255;

      // if luminance is bellow maximum darkness of sRGB, divide by 12.92,
      // otherwise perform more complex algorythm.
      if (n <= 0.03928) {
        return n / 12.92;
      }

      return Math.pow((n + 0.055) / 1.055, 2.4);
    }

    var luminance = 0.2126 * lum(this.r) +
      0.7152 * lum(this.g) +
      0.0722 * lum(this.b);

    this.luminance = luminance;

    // The full luminance of this colour is returned
    return this.luminance;
  };
}

function getReadableColor(color) {
  var c = new Color(color);
  c.splitChannels();

  if (c.getLuminance() < 0.5) {
    return '#f2f2f2';
  } else {
    return '#333';
  }
}

function stringToColor(s) {
  function hashCode(str) { // java String#hashCode
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
  }

  function intToRGB(i) {
      var c = (i & 0x00FFFFFF)
          .toString(16);

      return "00000".substring(0, 6 - c.length) + c;
  }

  return '#';
  // return '#' + intToRGB(hashCode(s.trim()));
}

/**
 * UNPURE FUNCTIONS
 */
function colorizeCalendar() {
  var el = document.getElementsByClassName('fc-content');

  for (var i = 0; i < el.length; i++) {
    el[i].style.backgroundColor = stringToColor(el[i].textContent);
    el[i].style.color = getReadableColor(stringToColor(el[i].textContent));
  }
}

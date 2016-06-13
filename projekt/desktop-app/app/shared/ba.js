function stringToColor(s) {
  function hashCode(str) { // java String#hashCode
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
  }

  function intToRGB(i){
      var c = (i & 0x00FFFFFF)
          .toString(16);

      return "00000".substring(0, 6 - c.length) + c;
  }

  return '#' + intToRGB(hashCode(s));
}

function colorizeCalendar() {
  var el = document.getElementsByClassName('fc-content');

  for (var i = 0; i < el.length; i++) {
    console.log(el[i].querySelector('.fc-title'));
    el[i].style.backgroundColor = stringToColor(el[i].querySelector('.fc-title').innerHTML);
  }

  console.log('colorizeCalendar() is running!!!');
  console.log(el);
}

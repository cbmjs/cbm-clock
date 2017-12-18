this.foreColor = '#000';
this.bgColor = '#666666';
this.width = 400;

this.container = document.getElementById('clock');
this.container.style.fontcolor = this.foreColor;

this.panel = document.createElement('div');
this.panel.style.borderRadius = '50%';
this.panel.style.backgroundColor = this.bgColor;
this.panel.style.border = 'solid 3px #6C7B8B';
this.panel.style.width = this.width + 'px';
this.panel.style.height = this.width + 'px';
this.panel.style.position = 'relative';
this.container.appendChild(this.panel);

let ul = document.createElement('ul');
ul.style.height = '100%';

ul.style.padding = '0';
ul.style.margin = '0';
ul.style.listStyle = 'none';
ul.style.position = 'absolute';
ul.style.width = 40 + 'px';
ul.style.top = 0;
ul.style.left = this.width / 2 - 20 + 'px';
ul.style.color = this.foreColor;
this.panel.appendChild(ul);

for (let i = 0; i <= 5; i++) {
  let list = document.createElement('li');
  list.style.padding = '0';
  list.style.margin = '0';
  list.style.position = 'absolute';
  list.style.textAlign = 'center';
  list.style.width = '40px';
  list.style.height = this.width + 'px';
  list.style.fontSize = this.width / 10 + 'px';
  ul.appendChild(list);

  list.style.transform = 'rotate(' + 360 / 12 * (i + 1) + 'deg)';

  let numTop = document.createElement('div');
  numTop.style.width = '100%';
  numTop.style.position = 'absolute';
  numTop.style.textAlign = 'center';
  numTop.innerHTML = i + 1;
  if (this.width < 100) {
    numTop.innerHTML = '●';
  }
  list.appendChild(numTop);

  numTop.style.transform = 'rotate(' + -360 / 12 * (i + 1) + 'deg)';

  let numBottom = document.createElement('div');
  numBottom.style.width = '100%';
  numBottom.style.position = 'absolute';
  numBottom.style.textAlign = 'center';
  numBottom.style.bottom = '0';
  numBottom.innerHTML = i + 7;
  if (this.width < 100) {
    numBottom.innerHTML = '●';
  }
  list.appendChild(numBottom);

  numBottom.style.transform = 'rotate(' + -360 / 12 * (i + 1) + 'deg)';
}

// hour hand
let hour = document.createElement('div');
let hourWidth = this.width * 0.02;
let hourTop = this.width * 0.25 - (hourWidth * 0.5);
let hourleft = this.width * 0.5 - hourWidth * 0.5;
hour.style.width = hourWidth + 'px';
hour.style.height = hourWidth + 'px';
hour.style.position = 'absolute';
hour.style.border = 'solid 0px transparent';
hour.style.left = hourleft + 'px';
hour.style.top = hourTop + 'px';
hour.style.borderTop = 'solid ' + (this.width * 0.5 - hourTop) + 'px #458B74';
hour.style.borderBottomWidth = (this.width * 0.5 - hourTop) + 'px';
this.panel.appendChild(hour);

// minute hand
let min = document.createElement('div');
let minWidth = this.width * 0.01;
let minTop = this.width * 0.1 - (minWidth * 0.5);
let minleft = this.width * 0.5 - minWidth * 0.5;
min.style.width = minWidth + 'px';
min.style.height = minWidth + 'px';
min.style.position = 'absolute';
min.style.border = 'solid 0px transparent';
min.style.left = minleft + 'px';
min.style.top = minTop + 'px';
min.style.borderTop = 'solid ' + (this.width * 0.5 - minTop) + 'px #66CDAA';
min.style.borderBottomWidth = (this.width * 0.5 - minTop) + 'px';
this.panel.appendChild(min);

// second hand
let sec = document.createElement('div');
let secWidth = 1;
let secTop = this.width * 0.05;
sec.style.width = secWidth + 'px';
sec.style.height = secWidth + 'px';
sec.style.position = 'absolute';
sec.style.border = 'solid 0px transparent';
sec.style.left = (this.width * 0.5 - secWidth) + 'px';
sec.style.top = secTop + 'px';
sec.style.borderTop = 'solid ' + (this.width * 0.5 - secTop) + 'px #00FA9A';
sec.style.borderBottomWidth = (this.width * 0.5 - secTop) + 'px';
this.panel.appendChild(sec);

// the center point
let point = document.createElement('div');
let pointWidth = this.width * 0.05;
point.style.width = pointWidth + 'px';
point.style.height = pointWidth + 'px';
point.style.position = 'absolute';
point.style.backgroundColor = this.foreColor;
point.style.left = this.width * 0.5 - (pointWidth * 0.5) + 'px';
point.style.top = this.width * 0.5 - (pointWidth * 0.5) + 'px';
point.style.borderRadius = '50%';
this.panel.appendChild(point);
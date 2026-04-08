/*
Sparkle Trail and Dust Cursor - Modernized
Original: https://codepen.io/sarahwfox/pen/pNrYGb
*/

const colour = "random"; // "random" or any valid CSS color
const sparkles = 80;

let x = 400, y = 400;
let ox = 400, oy = 300;

const colours = [
  '#ff8686', '#99ff99', '#ffffff', '#f0a9f0', 
  '#efd39f', '#ecf392', '#adf1ad', '#ffffff', '#f09cf0'
];

const n = 10;
const dots = [];
const tiny = [];
const star = [];
const starv = [];
const starx = [];
const stary = [];
const tinyx = [];
const tinyy = [];
const tinyv = [];

// Create trailing dots
for (let i = 0; i < n; i++) {
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.top = '0px';
  dot.style.left = '0px';
  dot.style.width = i / 2 + 'px';
  dot.style.height = i / 2 + 'px';
  dot.style.background = '#ff0000';
  dot.style.fontSize = i / 2 + 'px';
  dot.style.pointerEvents = 'none';
  document.body.appendChild(dot);
  dots[i] = dot;
}

// Animate trailing dots
function animate() {
  for (let i = 0; i < n; i++) {
    const randcolour = colours[Math.floor(Math.random() * colours.length)];
    dots[i].style.background = randcolour;

    if (i < n - 1) {
      dots[i].style.top = dots[i + 1].style.top;
      dots[i].style.left = dots[i + 1].style.left;
    } else {
      dots[i].style.top = y + 'px';
      dots[i].style.left = x + 'px';
    }
  }
  setTimeout(animate, 10);
}

// Create sparkle elements
function init() {
  for (let i = 0; i < sparkles; i++) {
    // Create tiny particle
    const tinyDiv = createDiv(3, 3);
    tinyDiv.style.visibility = 'hidden';
    tinyDiv.style.zIndex = '999';
    document.body.appendChild(tinyDiv);
    tiny[i] = tinyDiv;
    starv[i] = 0;
    tinyv[i] = 0;

    // Create star particle
    const starDiv = createDiv(5, 5);
    starDiv.style.backgroundColor = 'transparent';
    starDiv.style.visibility = 'hidden';
    starDiv.style.zIndex = '999';

    const rlef = createDiv(1, 5);
    const rdow = createDiv(5, 1);
    starDiv.appendChild(rlef);
    starDiv.appendChild(rdow);

    rlef.style.top = '2px';
    rlef.style.left = '0px';
    rdow.style.top = '0px';
    rdow.style.left = '2px';

    document.body.appendChild(starDiv);
    star[i] = starDiv;
  }
  sparkle();
}

function sparkle() {
  if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
    ox = x;
    oy = y;
    for (let c = 0; c < sparkles; c++) {
      if (!starv[c]) {
        star[c].style.left = (starx[c] = x) + 'px';
        star[c].style.top = (stary[c] = y + 1) + 'px';
        star[c].style.clip = 'rect(0px, 5px, 5px, 0px)';
        const starColour = colour === "random" ? newColour() : colour;
        star[c].childNodes[0].style.backgroundColor = starColour;
        star[c].childNodes[1].style.backgroundColor = starColour;
        star[c].style.visibility = 'visible';
        starv[c] = 50;
        break;
      }
    }
  }
  for (let c = 0; c < sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }
  setTimeout(sparkle, 40);
}

function update_star(i) {
  if (--starv[i] === 25) {
    star[i].style.clip = 'rect(1px, 4px, 4px, 1px)';
  }
  if (starv[i]) {
    stary[i] += 1 + Math.random() * 3;
    starx[i] += (i % 5 - 2) / 5;
    if (stary[i] < window.innerHeight + window.pageYOffset) {
      star[i].style.top = stary[i] + 'px';
      star[i].style.left = starx[i] + 'px';
    } else {
      star[i].style.visibility = 'hidden';
      starv[i] = 0;
      return;
    }
  } else {
    tinyv[i] = 50;
    tiny[i].style.top = (tinyy[i] = stary[i]) + 'px';
    tiny[i].style.left = (tinyx[i] = starx[i]) + 'px';
    tiny[i].style.width = '2px';
    tiny[i].style.height = '2px';
    tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
    star[i].style.visibility = 'hidden';
    tiny[i].style.visibility = 'visible';
  }
}

function update_tiny(i) {
  if (--tinyv[i] === 25) {
    tiny[i].style.width = '1px';
    tiny[i].style.height = '1px';
  }
  if (tinyv[i]) {
    tinyy[i] += 1 + Math.random() * 3;
    tinyx[i] += (i % 5 - 2) / 5;
    if (tinyy[i] < window.innerHeight + window.pageYOffset) {
      tiny[i].style.top = tinyy[i] + 'px';
      tiny[i].style.left = tinyx[i] + 'px';
    } else {
      tiny[i].style.visibility = 'hidden';
      tinyv[i] = 0;
      return;
    }
  } else {
    tiny[i].style.visibility = 'hidden';
  }
}

function createDiv(height, width) {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.height = height + 'px';
  div.style.width = width + 'px';
  div.style.overflow = 'hidden';
  div.style.pointerEvents = 'none';
  return div;
}

function newColour() {
  const c = [255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  c.sort(() => 0.5 - Math.random());
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

// Event listeners
document.addEventListener('mousemove', (e) => {
  y = e.pageY;
  x = e.pageX;
});

// Start animations
window.addEventListener('load', () => {
  init();
  animate();
});
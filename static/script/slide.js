const root = document.documentElement;

//Theme actions button
const ThemeBtn = document.getElementById("theme-btn")
const ThemeBackBtn = document.getElementById("theme-back-btn")
const ThemeSection = document.getElementById("theme-section")

ThemeBtn.addEventListener('click', () => {
  ThemeSection.style.transform = 'translateY(0)'
})

ThemeBackBtn.addEventListener('click', () => {
  ThemeSection.style.transform = 'translateY(60rem)'
})

//Save button actions
const SavesBtn = document.getElementById("save-quote-btn")
const SavesBackBtn = document.getElementById("save-back-btn")
const SaveSection = document.getElementById("save-section")

function saveSectionCalled() {
  SaveSection.style.transform = 'translate(0)'
}

SavesBackBtn.addEventListener('click', () => {
  SaveSection.style.transform = 'translateY(60rem)'
})

// theme test
var mainContainer = document.getElementById('container');
var containerImgBg = 'linear-gradient(57deg, RGB(113, 72, 252), RGB(65, 203, 191))';

var colors = ["red", "green", "blue", "yellow", "grey", "#0C121C", "#0A3342"];


var colorContainer = document.getElementById('theme-current-cards');

for (var i = 0; i < colors.length; i++) {
    var colorBox = document.createElement('div');
    colorBox.className = 'theme-cards';
    // if (colors[i] == containerImgBg) {
    //   colorBox.classList.add('active')
    // }
    // colorBox.innerHTML = "<span class='checkmark'><i class='fa-solid fa-check'></i></span>"
    colorBox.style.backgroundColor = colors[i];
    colorBox.onclick = function() {
        changeColor(this);
    };
    colorContainer.appendChild(colorBox);
}

function changeColor(element) {
  var colorBoxes = document.getElementsByClassName('theme-cards');

  if (element.classList.contains('active')) {
    element.classList.remove('active');
    mainContainer.style.backgroundImage = containerImgBg;
  } else {
    for (var i = 0; i < colorBoxes.length; i++) {
      if (colorBoxes[i] == element) {
        //do nothing
      } else {
        colorBoxes[i].classList.remove('active');
      }
    }

    element.classList.add('active');
    
    // Get the background color of the clicked color box
    var color = window.getComputedStyle(element).getPropertyValue('background-color');

    // Set the background color of the mainContainer
    mainContainer.style.backgroundColor = color;
    mainContainer.style.backgroundImage = 'none';
  }
}

const canvas = document.getElementById('myCanvas');
const mainFont = getComputedStyle(root).getPropertyValue('--font');

function saveFuntion(quote, author) {
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = containerImgBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const mainQuoteText = `${quote}`;
  const mainQuoteFont = `1.2rem ${mainFont}`;

  // Define the author text
  const authorText = `${author}`;
  const authorFont = `italic 16px ${mainFont}`;
}

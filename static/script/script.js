
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBS8iE7b2xub46xmcahqM-v6dCX9ksU4UU",
//   authDomain: "test-84dc0.firebaseapp.com",
//   projectId: "test-84dc0",
//   storageBucket: "test-84dc0.appspot.com",
//   messagingSenderId: "961280524207",
//   appId: "1:961280524207:web:aacc7391f2892e013eb95a",
//   measurementId: "G-YDJQC9B4PN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const bodyColor = document.getElementById('container')

const quoteSect = document.getElementById('quotes-sect')
const container = document.getElementById('quotes');

const nextButton = document.getElementById('next-area');
const backButton = document.getElementById('back-area');

const quoteText = document.getElementById('main');
const quoteAuthor = document.getElementById('author');

// var inWord = quoteText.inn

let touchStartX = 0;
let touchMoveX = 0;
let isSwiping = false;
let initialTranslateX = 0;

// Create an empty array to store the response data
let responseData = [];
let randomizedData = [];
let history = [];
let currentIndex = 0;
let swipeThreshold = 50;

const url = "api/external_data/";
var options = {
  method: 'GET',
  redirect: 'follow'
};

// Make the fetch request
const getQuotes = () => {
  fetch(url, options)
    .then(response => response.json()) // Assuming the response is JSON
    .then(data => {
      // Save the response data to the variable
      responseData = data;
      randomizedData = [...responseData]; // Create a copy of the response data
      for (let i = randomizedData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomizedData[i], randomizedData[j]] = [randomizedData[j], randomizedData[i]];
      }

      // console.log(randomizedData)

      for (const item of randomizedData) {
        const element = document.createElement('div');
        element.className = 'main-contained';
        element.id = 'contained-main';
        // element.addEventListener('dblclick', likeFunction(this));
        element.innerHTML =`<div class="main" ondblclick="likeFunction(this)">
                              <h3 id="main-quote">${item.content}</h3>
                              <div class="quote-lower">
                                <p>~<i id="author">${item.author}</i></p>
                              </div>
                              <div class="heart-fade">
                                <i class="fa-solid fa-heart"></i>
                              </div>
                              <div class="icon-fav">
                                <ul>
                                  <li>
                                    <button class="share" onclick="saveSectionCalled()">
                                      <i class="fa-solid fa-arrow-up-from-bracket download"></i>
                                    </button>
                                  </li>
                                  <li>
                                    <button class="hearts"
                                    onclick="iconFunction(this)">
                                      <i class="fa-regular fa-heart"></i>
                                    </button>
                                  </li>
                                  <li>
                                    <button class="bookmarks" onclick="iconFunction(this)">
                                      <i class="fa-regular fa-bookmark"></i>
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>`

        container.appendChild(element);
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
  }

document.addEventListener('DOMContentLoaded', function() {
    getQuotes()
})

//<button class="share" shareFunction('${item.text}', '${item.author}')>

function likeFunction(heart) {
  // Toggle heart icon
  // var heartFade = e.querySelector(".main");
  // var mainHeart = e.querySelector(".hearts")
  // iconFunction(mainHeart)
  console.log(heart)


  // Show the heart-fade element
  var heartFade = heart.querySelector(".heart-fade");
  heartFade.classList.add('active')

  heartFade.addEventListener('animationend', () => {
    heartFade.classList.remove('active')
  })

  var icon = heart.querySelector("button i.fa-heart");
  // var mainBody = button.parentElement
  // console.log("Like button clicked")

  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    // Do nothing
  }

  console.log('like submitted')
}

function BtnIcons (e)  {
  if (e.classList.contains('fa-regular')) {
    e.classList.remove('fa-regular')
    e.classList.add('fa-solid')
  } else {
    e.classList.add('fa-regular')
    if (e.classList.contains('fa-solid')) {
      e.classList.remove('fa-solid')
    }
  }
}

const allHearts = document.querySelectorAll('.hearts')
const bookmarks = document.querySelectorAll('.bookmarks')


function iconFunction(button) {
  var icon = button.querySelector("i");
  var mainBody = button.parentElement
  console.log("Like button clicked")

  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
}




// setInterval(BtnChecked, 500);




container.addEventListener('touchstart', function(event) {
  touchStartX = event.touches[0].clientX;
  touchMoveX = touchStartX;
  isSwiping = true;
  initialTranslateX = getCurrentTranslateX();
});

container.addEventListener('touchmove', function(event) {
  if (!isSwiping) return;

  touchMoveX = event.touches[0].clientX;
  // updateContainerPosition();
});

container.addEventListener('touchend', function(event) {
  if (isSwiping) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
    isSwiping = false;
  }
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    // Swipe right
    previousSlide();
  } else if (swipeDistance < -swipeThreshold) {
    // Swipe left
    nextSlide();
  } else {
    // Reset to current slide
    updateSlide();
  }
}

function previousSlide() {
  currentIndex = currentIndex - 100;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  // updateContainerPosition();
  updateSlide();
}

function nextSlide() {
  currentIndex = currentIndex + 100;
  if (currentIndex % 4900 == 0) {
    getQuotes()
  }
  // Add logic to handle reaching the end of slides if needed
  // updateContainerPosition();
  updateSlide();
}

function updateSlide() {
  // console.log(currentIndex)
  container.style.transform = `translateX(-${currentIndex}%)`;
}

function getCurrentTranslateX() {
  const style = window.getComputedStyle(container);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return matrix.m41;
}

let isDragStart = false, prevPageX, prevScrollLeft;

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = container.scrollLeft;
}

const dragging = (e) => {
  if(!isDragStart) return;
  e.preventDefault();
  let positionDiff = e.pageX - prevPageX;
  container.scrollLeft = prevScrollLeft - positionDiff;
  movement = prevScrollLeft - positionDiff;
  // console.log(movement)
}

const dragStop = () => {
  isDragStart = false;
}

container.addEventListener('mousedown', dragStart);
container.addEventListener('mousemove', dragging);
container.addEventListener('mouseup', dragStop)
//Attach event listeners to the buttons
nextButton.addEventListener('click', nextSlide);
backButton.addEventListener('click', previousSlide);

handleSwipe()
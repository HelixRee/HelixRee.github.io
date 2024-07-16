var lightSize = 20;
// Background grid filler
document.addEventListener('DOMContentLoaded', function () {
  
  checkLag();
  
  createLights();
  createBannerText("Procedural Animation!");
  // createBannerText("Haha Penis");
  document.querySelectorAll('.banner-text > div > div > div').forEach(function (div) {
    // Make the DIV element draggable:
    DragElement(div);
  });
});

window.addEventListener('resize', function () {
    // Redo light creation
    removeLights();
    createLights();

    // checkLag();

});

function checkLag() {
  var time = performance.now();
  requestAnimationFrame(function() {
    var newTime = performance.now();
    var elapsedTime = (newTime - time) / 1000;
  
    // console.log(1/elapsedTime);
  
    if ((1 / elapsedTime) < 30)
      resizeLights(40);
    else
      resizeLights(20);
  });
}

function resizeLights(newLightSize) {
  removeLights();
  lightSize = newLightSize;
  document.querySelector('.background-grid').style.gridTemplateColumns = "repeat(auto-fill, " + lightSize + "px)";
  document.querySelector('.background-grid').style.gridTemplateRows = "repeat(auto-fill, " + lightSize + "px)";
  createLights();
} 

function createLights() {
    // Get all instances of bg grid
    document.querySelectorAll('.background-grid').forEach(function(div) {
      var container = document.querySelector('.background-grid');
      var containerWidth = Math.floor(container.offsetWidth / lightSize),
          containerHeight = Math.ceil(container.offsetHeight / lightSize);
      var squareAmount = containerWidth * containerHeight;
      for (var i = 0; i < squareAmount; i++) {
        let box = document.createElement('div');
        div.appendChild(box);
        let light = document.createElement('div');
        light.classList.add("background-grid-light");
        box.appendChild(light);
      }
    });
  }
  
function removeLights() {
    // Get all instances of bg grid
    document.querySelectorAll('.background-grid').forEach(function(div) {
        var container = document.querySelector('.background-grid');
        var containerWidth = Math.floor(container.offsetWidth / lightSize),
            containerHeight = Math.ceil(container.offsetHeight / lightSize);
        var squareAmount = containerWidth * containerHeight;
        for (var i = 0; i < squareAmount; i++) {
          div.querySelectorAll('div').forEach(function(box) {
            box.remove();
          });}
      });
}

function createBannerText(displayText) {
    // Get instances of banner text container
    document.querySelectorAll('.banner-text').forEach(function(div) {
      for (var i = 0; i < displayText.length; i++) {
        let char = displayText.charAt(i);
        let charContainer = document.createElement('div');
        div.appendChild(charContainer);
        let charWrapper = document.createElement('div');
        charContainer.appendChild(charWrapper);
        let dragContainer = document.createElement('div');
        charWrapper.appendChild(dragContainer);
        let charBox = document.createElement('h1');
        dragContainer.appendChild(charBox);
        if (char == " ") char = "&nbsp";
        charBox.innerHTML = char;

      }
    });
}


function DragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  element.addEventListener('mousedown', DragMouseDown);
  element.addEventListener('touchstart', DragMouseDown);

  function DragMouseDown(e) {
    if (e.clientX != null)
    {
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    else
    {
      DisableScroll();
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clienty;
    }
    document.addEventListener('mouseup', CloseDragElement);
    document.addEventListener('touchend', CloseDragElement);
    // call a function whenever the cursor moves:
    document.addEventListener('mousemove', ElementDrag);
    document.addEventListener('touchmove', ElementDrag);
    document.addEventListener("touchmove", preventBehavior, {passive: false});
  }

  function ElementDrag(e) {
    if (e.clientX != null)
      {
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

      }
      else
      {
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      }
      let vMin = Math.min(window.innerHeight, window.innerWidth) * 0.01;
      let vW = window.innerWidth * 0.01;

      if (element.getBoundingClientRect().top - pos2 + window.scrollY < (115 - (2 * vW))) pos2 = element.getBoundingClientRect().top - (115 - (2 * vW)) + window.scrollY;
      if (element.getBoundingClientRect().bottom - pos2 + window.scrollY > (vMin * 75 + 25 + (2 * vW))) pos2 = element.getBoundingClientRect().bottom - (vMin * 75 + 25 + (2 * vW)) + window.scrollY;
      if (element.getBoundingClientRect().left - pos1 < 10) pos1 = element.getBoundingClientRect().left - 10;
      if (element.getBoundingClientRect().right - pos1 > (window.innerWidth - 20)) pos1 = element.getBoundingClientRect().right - (window.innerWidth - 20);

    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function CloseDragElement() {
    // stop moving when mouse button is released:
    document.removeEventListener('mouseup', CloseDragElement);
    document.removeEventListener('mousemove', ElementDrag);
    
    EnableScroll();
    document.removeEventListener("touchmove", preventBehavior);
    document.removeEventListener('touchend', CloseDragElement);
    document.removeEventListener('touchmove', ElementDrag);
  }
}

// Disable Scroll (Pls Remove)
function DisableScroll() {
  var x = window.scrollX || document.documentElement.scrollLeft;
  var y = window.scrollY || document.documentElement.scrollTop;
  window.onscroll = function() {
    window.scrollTo(x, y);
  };
}
// Enable Scroll
function EnableScroll() {
  window.onscroll = function() {};
}

var resetButton = document.querySelector('#banner-reset-button');
resetButton.addEventListener('click', function() {
    document.querySelectorAll('.banner-text > div > div > div').forEach(function(div) {
      if (!div.classList.contains("animated"))
        requestAnimationFrame(function() {
          var top = div.style.top;
          var left = div.style.left;
          var time = performance.now();
          ReturnToOrigin(div, top, left, time);
        });

        
    });
});

function ReturnToOrigin(element, olderTop, olderLeft, startTime)
{
  var time = performance.now();
  var elapsedTime = (time - startTime) / 1000;
  // console.log(elapsedTime);
  element.classList.add("animated");
  // var spf = 1 / 30;
  var damping = 12;
  var bounce = 0.9;

  var top = parseFloat(element.style.top);
  if (isNaN(top)) top = 0;
  element.style.top = Lerp(top, 0, (1 - bounce) * damping * elapsedTime) + "px";
  element.style.top = ((1 + bounce) * parseFloat(element.style.top) - bounce * olderTop) + "px";

  olderTop = top;

  var left = parseFloat(element.style.left);
  if (isNaN(left)) left = 0;
  element.style.left = Lerp(left, 0, (1 - bounce) * damping * elapsedTime) + "px";
  element.style.left = ((1 + bounce) * parseFloat(element.style.left) - bounce * olderLeft) + "px";

  olderLeft = left;

  if (Math.abs(parseFloat(element.style.top)) > 0.1 || Math.abs(parseFloat(element.style.left) > 0.1))
    requestAnimationFrame(function() {
      ReturnToOrigin(element, olderTop, olderLeft, time);
    });
  else
    {
      element.classList.remove("animated");
      element.style.left = "0px";
      element.style.top = "0px";
    }
    
}

function Lerp(value1, value2, t)
{
  var output = (value1 * (1 - t)) + (value2 * t);
  return output;
}

function preventBehavior(e) {
  e.preventDefault(); 
}

var banner = document.querySelector('.banner-text');
banner.addEventListener("touchmove", preventBehavior, {passive: false});

var currentPage = 1;
// var contentNavbar = document.querySelector(".content-navbar");
var timeOfPageSwap = 0;
displayPage();

function switchPage() 
{
  resetPages();
  showPage();
  
  hidePages();
  displayPage();
}

function resetPages() {
  document.querySelectorAll(".page-icon").forEach(function(div) {
    div.style.flexGrow = 0;
  });
}

function showPage() {
  var pageID = "#page" + currentPage;
  var selectedPage = document.querySelector(pageID);
  selectedPage.style.flexGrow = 1;
}


function nextPage() {
  var currentTime = performance.now();
  var timeSinceLastSwap = currentTime - timeOfPageSwap;
  timeOfPageSwap = currentTime;
  if (timeSinceLastSwap < 50) 
    return;

  currentPage = currentPage % 3 + 1;
  console.log(currentPage);
  console.log("Next page");
  switchPage();
}

function prevPage() {
  var currentTime = performance.now();
  var timeSinceLastSwap = currentTime - timeOfPageSwap;
  timeOfPageSwap = currentTime;
  if (timeSinceLastSwap < 50) 
    return;

  currentPage = currentPage - 1;
  if (currentPage == 0)
    currentPage = 3;
  console.log(currentPage);
  console.log("Prev page");
  switchPage();
}

var contentNavbar = document.querySelector(".content-navbar");
var nextPageBtn = document.querySelector("#nxt-page-btn");
nextPageBtn.addEventListener("click", nextPage);
// nextPageBtn.addEventListener("click", function() {
//   if (!contentNavbar.classList.contains("animated"))
//   {
//     contentNavbar.classList.add("animated");
//     requestAnimationFrame(function () {
//       contentNavbar.classList.remove("animated");
//       nextPage();
//     })
//   }
// });

var prevPageBtn = document.querySelector("#prev-page-btn");
// prevPageBtn.addEventListener("click", function() {
//   if (!contentNavbar.classList.contains("animated"))
//   {
//     contentNavbar.classList.add("animated");
//     requestAnimationFrame(function() {
//       contentNavbar.classList.remove("animated");
//       prevPage();
//     })
//   }
// });
prevPageBtn.addEventListener("click", prevPage);

var page1Btn = document.querySelector("#page1");
page1Btn.addEventListener("click", function() {
  currentPage = 1;
  switchPage();
});

var page2Btn = document.querySelector("#page2");
page2Btn.addEventListener("click", function() {
  currentPage = 2;
  switchPage();
});

var page3Btn = document.querySelector("#page3");
page3Btn.addEventListener("click", function() {
  currentPage = 3;
  switchPage();
});

function hidePages() {
  document.querySelectorAll('.page-content').forEach(function(div) {
    div.classList.remove('active-page');
  });
}

function displayPage() {
  var element = document.querySelector('#page' + currentPage + '-content');
  element.classList.add('active-page');
}
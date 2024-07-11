// Background grid filler
document.addEventListener('DOMContentLoaded', function () {
    createLights();
    createBannerText("Procedural Animation!");
    document.querySelectorAll('.banner-text > div > div > div').forEach(function (div) {
      // Make the DIV element draggable:
      DragElement(div);
    });
});
window.addEventListener('resize', function () {
    // Redo light creation
    removeLights();
    createLights();
});

function createLights() {
    // Get all instances of bg grid
    document.querySelectorAll('.background-grid').forEach(function(div) {
      var container = document.querySelector('.background-grid');
      var containerWidth = Math.floor(container.offsetWidth / 20),
          containerHeight = Math.ceil(container.offsetHeight / 20);
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
        var containerWidth = Math.floor(container.offsetWidth / 20),
            containerHeight = Math.ceil(container.offsetHeight / 20);
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

// Disable Scroll
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
          ReturnToOrigin(div, top, left);
        });

        
    });
});

function ReturnToOrigin(element, olderTop, olderLeft)
{
  element.classList.add("animated");
  var spf = 1 / 30;
  var damping = 12;
  var bounce = 0.9;

  var top = parseFloat(element.style.top);
  if (isNaN(top)) top = 0;
  element.style.top = Lerp(top, 0, (1 - bounce) * damping * spf) + "px";
  element.style.top = ((1 + bounce) * parseFloat(element.style.top) - bounce * olderTop) + "px";

  olderTop = top;

  var left = parseFloat(element.style.left);
  if (isNaN(left)) left = 0;
  element.style.left = Lerp(left, 0, (1 - bounce) * damping * spf) + "px";
  element.style.left = ((1 + bounce) * parseFloat(element.style.left) - bounce * olderLeft) + "px";

  olderLeft = left;

  if (Math.abs(parseFloat(element.style.top)) > 0.1 || Math.abs(parseFloat(element.style.left) > 0.1))
    requestAnimationFrame(function() {
      ReturnToOrigin(element, olderTop, olderLeft);
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
};

var banner = document.querySelector('.banner-text');
banner.addEventListener("touchmove", preventBehavior, {passive: false});
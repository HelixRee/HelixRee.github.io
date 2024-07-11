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
        charContainer.appendChild(charWrapper)
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
  }

  function ElementDrag(e) {
    if (e.clientX != null)
      {
        // let withinBoundsX = true;
        // if (e.clientX < 20)
        //   withinBoundsX = false;
        // else if (e.clientX > window.innerWidth - 20)
        //   withinBoundsX = false;

        // let withinBoundsY = true;
        // if (e.clientY < 120)
        //   withinBoundsY = false;
        
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // if (!withinBoundsX) { pos1 = 0;}
        // if (!withinBoundsY) { pos2 = 0;}
        let vMin = Math.min(window.innerHeight, window.innerWidth) * 0.01;
        let vW = window.innerWidth * 0.01;

        if (element.getBoundingClientRect().top - pos2 < (115 - (2 * vW))) pos2 = element.getBoundingClientRect().top - (115 - (2 * vW));
        if (element.getBoundingClientRect().bottom - pos2 > (vMin * 75 + 25 + (2 * vW))) pos2 = element.getBoundingClientRect().bottom - (vMin * 75 + 25 + (2 * vW));
        if (element.getBoundingClientRect().left - pos1 < 10) pos1 = element.getBoundingClientRect().left - 10;
        if (element.getBoundingClientRect().right - pos1 > (window.innerWidth - 20)) pos1 = element.getBoundingClientRect().right - (window.innerWidth - 20);
      }
      else
      {
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      }

    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function CloseDragElement() {
    // stop moving when mouse button is released:
    document.removeEventListener('mouseup', CloseDragElement);
    document.removeEventListener('mousemove', ElementDrag);

    EnableScroll();
    document.removeEventListener('touchend', CloseDragElement);
    document.removeEventListener('touchmove', ElementDrag);
  }
}


// Disable Scroll
function DisableScroll() {
  x = window.scrollX || document.documentElement.scrollLeft;
  y = window.scrollY || document.documentElement.scrollTop;
  window.onscroll = function() {
    window.scrollTo(x, y);
  };
}
// Enable Scroll
function EnableScroll() {
  window.onscroll = function() {};
}
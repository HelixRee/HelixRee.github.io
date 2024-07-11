// Background grid filler
document.addEventListener('DOMContentLoaded', function () {
    createLights();
    createBannerText("Procedural Animation!");
    document.querySelectorAll('.banner-text > div > div > div').forEach(function (div) {
      // Make the DIV element draggable:
      dragElement(div);
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


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.addEventListener('mousedown', dragMouseDown);
  elmnt.addEventListener('touchstart', dragMouseDown);

  function dragMouseDown(e) {
    if (e.clientX != null)
    {
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    else
    {
      disable_scroll();
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clienty;
    }
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('touchend', closeDragElement);
    // call a function whenever the cursor moves:
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('touchmove', elementDrag);
  }

  function elementDrag(e) {
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
      
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);

    enable_scroll();
    document.removeEventListener('touchend', closeDragElement);
    document.removeEventListener('touchmove', elementDrag);
  }
}

// PREVENT DEFAULT HANDLER
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

// DISABLE SCROLL
function disable_scroll() {

  
  x = window.scrollX || document.documentElement.scrollLeft;
  y = window.scrollY || document.documentElement.scrollTop;
  window.onscroll = function() {
    window.scrollTo(x, y);
  };

}
// ENABLE SCROLL
function enable_scroll() {
  window.onscroll = function() {};
}
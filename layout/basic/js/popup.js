window.addEventListener('load', function() {
    setResizePopup();
});

/**
 * Resizing Popup
 */
function setResizePopup() {
    var ePopup = document.querySelector('#popup');
    
    var iWrapWidth = ePopup.offsetWidth;
    var iWrapHeight = ePopup.offsetHeight;

    var iWindowWidth = window.innerWidth;
    var iWindowHeight = window.innerHeight;
    
    window.resizeBy(iWrapWidth - iWindowWidth, iWrapHeight - iWindowHeight);
    
    // Mobile Device
    var isMobile = detectMobileDevice(window.navigator.userAgent);
    if (isMobile) {
      var popup = document.querySelector('#popup');
      popup.style.width = '100%';
    } 
}

/**
 * Detech Mobile Device
 */
function detectMobileDevice(agent) {
  var mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]

  for (var i=0; i < mobileRegex.length; i++) {
      if (mobileRegex[i].test(agent)){
          return true;
      }
  }
  return false;
}

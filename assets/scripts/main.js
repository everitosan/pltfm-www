//
// Main JavaScript file
// --------------------------------------------------------
var PLTFRM = {
  init: function () {
    (window.innerWidth < 768) ? PLTFRM.Sliders.init() : PLTFRM.Clicker.init();
    this.Resizer.init();
    this.Retina.init();
  },

  Clicker: {
    init: function () {
      document.querySelector(this.data.selector).classList.add('active');
      this.data.swipe = Swipe(PLTFRM.Phones.clickEl, PLTFRM.Sliders.options);
      this.addListeners();
    },
    data: {
      selector: '.functionality',
      swipe: null
    },
    addListeners: function () {
      var triggers = document.querySelectorAll(this.data.selector);
      var triggers_l= triggers.length;
      for(var i = 0; i < triggers_l; i++) {
        triggers[i].setAttribute('data-index', i);
        triggers[i].addEventListener('click', this.handleClick, false);
      }
    },
    handleClick: function () {
      PLTFRM.Clicker.removeActive(index);
      var index = this.getAttribute('data-index');
      PLTFRM.Clicker.goToPhone(index);
      this.classList.add('active');
    },
    removeActive: function() {
      document.querySelector(this.data.selector+'.active').classList.remove('active');
    },
    goToPhone: function(index) {
      this.data.swipe.slide(index, 500);
    }

  },

  Phones: {
    swipeEl: document.querySelector("#slider"),
    clickEl: document.querySelector('#bigPhonePic')
  },

  Sliders: {
    init: function () {
       this.data.swipe = Swipe(PLTFRM.Phones.swipeEl, PLTFRM.Sliders.options);
    },
    data: {
      swipe: null
    },
    options: {
      startSlide: 0,
      speed: 400,
      draggable: false,
      continuous: false,
      disableScroll: false,
      stopPropagation: true,
      callback: function(index, elem, dir) {},
      transitionEnd: function(index, elem) {}

    }
  },

  Resizer: {
    init: function () {
      window.onresize = function () {
        if(window.innerWidth < 768 && PLTFRM.Sliders.data.swipe === null) {
          PLTFRM.Clicker.data.swipe.kill();
          PLTFRM.Clicker.data.swipe = null;
          PLTFRM.Sliders.init();
        } else if(window.innerWidth >= 768 && PLTFRM.Clicker.data.swipe === null) {
          setTimeout(function() {
            PLTFRM.Sliders.data.swipe.kill();
            PLTFRM.Sliders.data.swipe = null;
          }, 100);
          PLTFRM.Clicker.init();
        }
      }
    }
  },

  Retina: {
    init: function() {
      if (window.devicePixelRatio > 1) {
        var images  = document.querySelectorAll('img');
        var images_l = images.length;
        for (var i = 0; i < images_l; i++) {
          var splitedImages = images[i].src.split(".");
          if(splitedImages[1] == "jpg" || splitedImages[1] == "png") {
            images[i].src = splitedImages[0]+"@2x."+splitedImages[1];
          }
        }
      }
    }
  }

}

PLTFRM.init()

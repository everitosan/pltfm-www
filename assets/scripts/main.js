//
// Main JavaScript file
// --------------------------------------------------------
var PLTRFM = {
  init: function () {
    (window.innerWidth < 768) ? PLTRFM.Sliders.init() : PLTRFM.Clicker.init();
  },

  Clicker: {
    init: function () {
      document.querySelector(this.data.selector).classList.add('active');
      this.data.swipe = Swipe(PLTRFM.Phones.clickEl, PLTRFM.Sliders.options);
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
      PLTRFM.Clicker.removeActive(index);
      var index = this.getAttribute('data-index');
      PLTRFM.Clicker.goToPhone(index);
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
       Swipe(PLTRFM.Phones.swipeEl, PLTRFM.Sliders.options);
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
  }
}

PLTRFM.init()

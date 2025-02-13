/*!
 * luxy.js v0.1.0: Inertia scroll and parallax effect plugin in Vanilla.js
 * (c) 2018 Mineo Okuda
 * MIT License
 * git+ssh://git@github.com:min30327/luxy.js.git
 */

/**
 * Written by Mineo Okuda on 01/03/18.
 *
 * Mineo Okuda - development + design
 * https://willstyle.co.jp
 * https://github.com/min30327
 *
 * MIT license.
 */

const defaults = {
  wrapper: '#luxy',
  targets: '.luxy-el',
  wrapperSpeed: 0.08,
  targetSpeed: 0.02,
  targetPercentage: 0.1
};

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

/**
* Merge two or more objects. Returns a new object.
* @param {Object}   objects  The objects to merge together
* @returns {Object}          Merged values of defaults and options
*/
const extend = function () {
  // Variables
  let extended = {};
  // let deep = false;
  let i = 0;
  let length = arguments.length;

  // Merge the object into the extended object
  const merge = function (obj) {
      for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              extended[prop] = obj[prop];
          }
      }
  };

  // Loop through each object and conduct a merge
  for (; i < length; i++) {
      let obj = arguments[i];
      merge(obj);
  }

  return extended;
};

class Luxy {
  constructor() {
      this.Targets = [];
      this.TargetsLength = 0;
      this.wrapper = '';
      this.windowHeight = 0;
      this.wapperOffset = 0;
      this.isAnimate = false;
      this.isResize = false;
      this.scrollId = "";
      this.resizeId = "";
  }

  init(options) {
      this.settings = extend(defaults, options || {});
      this.wrapper = document.querySelector(this.settings.wrapper);

      if (!this.wrapper) {
          return false;
      }

      this.targets = document.querySelectorAll(this.settings.targets);
      document.body.style.height = this.wrapper.clientHeight + 'px';

      this.windowHeight = window.innerHeight;
      this.attachEvent();
      this.apply(this.targets, this.wrapper);
      this.animate();
      this.resize();
  }

  apply(targets) {
      this.wrapperInit();

      this.targetsLength = targets.length;
      for (let i = 0; i < this.targetsLength; i++) {
          let attr = {
              offset: targets[i].getAttribute('data-offset'),
              speedX: targets[i].getAttribute('data-speed-x'),
              speedY: targets[i].getAttribute('data-speed-Y'),
              percentage: targets[i].getAttribute('data-percentage'),
              horizontal: targets[i].getAttribute('data-horizontal')
          };
          this.targetsInit(targets[i], attr);
      }
  }

  wrapperInit() {
      this.wrapper.style.width = '100%';
      this.wrapper.style.position = 'fixed';
  }

  targetsInit(elm, attr) {
      this.Targets.push({
          elm: elm,
          offset: attr.offset ? attr.offset : 0,
          horizontal: attr.horizontal ? attr.horizontal : 0,
          top: 0,
          left: 0,
          speedX: attr.speedX ? attr.speedX : 1,
          speedY: attr.speedY ? attr.speedY : 1,
          percentage: attr.percentage ? attr.percentage : 0
      });
  }

  scroll() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.wrapperUpdate(this.scrollTop);
      for (let i = 0; i < this.Targets.length; i++) {
          this.targetsUpdate(this.Targets[i]);
      }
  }

  animate() {
      this.scroll();
      this.scrollId = requestAnimationFrame(this.animate.bind(this));
  }

  wrapperUpdate() {
      this.wapperOffset += (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed;
      this.wrapper.style.transform = 'translate3d(0, ' + Math.round(-this.wapperOffset * 100) / 100 + 'px, 0)';
  }

  targetsUpdate(target) {
      target.top += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedY) - target.top) * this.settings.targetPercentage;
      target.left += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedX) - target.left) * this.settings.targetPercentage;
      let targetOffsetTop = (parseInt(target.percentage) - target.top - parseInt(target.offset));
      let offsetY = Math.round(targetOffsetTop * -100) / 100;
      let offsetX = 0;
      if (target.horizontal) {
          let targetOffsetLeft = (parseInt(target.percentage) - target.left - parseInt(target.offset));
          offsetX = Math.round(targetOffsetLeft * -100) / 100;
      }
      target.elm.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
  }

  resize() {
      this.windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0);
      if (parseInt(this.wrapper.clientHeight) != parseInt(document.body.style.height)) {
          document.body.style.height = this.wrapper.clientHeight + 'px';
      }
      this.resizeId = requestAnimationFrame(this.resize.bind(this));
  }

  attachEvent() {
      window.addEventListener('resize', () => {
          if (!this.isResize) {
              cancelAnimationFrame(this.resizeId);
              cancelAnimationFrame(this.scrollId);
              this.isResize = true;
              setTimeout(() => {
                  this.isResize = false;
                  this.resizeId = requestAnimationFrame(this.resize.bind(this));
                  this.scrollId = requestAnimationFrame(this.animate.bind(this));
              }, 200);
          }
      });
  }
}

const luxy = new Luxy();

export default luxy;
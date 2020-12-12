/*!-----------------------------------------------------------------
    Name: Mimilism - Minimal and Modern Portfolio HTML Template
    Version: 1.0.0
    Author: dexad
    Website: https://dkcoder.info/
    Purchase: https://themeforest.net/user/unvab/portfolio
    Support: https://dkcoder.info/
    License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
    Copyright 2018.
-------------------------------------------------------------------*/
    /******/ (function(modules) { // webpackBootstrap
    "use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
var $ = jQuery;
var tween = window.TweenMax;
var isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var isFireFox = typeof InstallTrigger !== 'undefined';
var isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

// add 'is-mobile' or 'is-desktop' classname to html tag
$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

/**
 * window size
 */
var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var wndW = 0;
var wndH = 0;
var docH = 0;
function getWndSize() {
    exports.wndW = wndW = $wnd.width();
    exports.wndH = wndH = $wnd.height();
    exports.docH = docH = $doc.height();
}
getWndSize();
$wnd.on('resize load orientationchange', getWndSize);

/**
 * Debounce resize
 */
var resizeArr = [];
var resizeTimeout = void 0;
function debounceResized() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        if (resizeArr.length) {
            for (var k = 0; k < resizeArr.length; k++) {
                resizeArr[k]();
            }
        }
    }, 50);
}
$wnd.on('ready load resize orientationchange', debounceResized);
debounceResized();

function debounceResize(func) {
    if (typeof func === 'function') {
        resizeArr.push(func);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */
var hideOnScrollList = [];
var didScroll = void 0;
var lastST = 0;

$wnd.on('scroll load resize orientationchange', function () {
    if (hideOnScrollList.length) {
        didScroll = true;
    }
});

function hasScrolled() {
    var ST = $wnd.scrollTop();

    var type = ''; // [up, down, end, start]

    if (ST > lastST) {
        type = 'down';
    } else if (ST < lastST) {
        type = 'up';
    } else {
        type = 'none';
    }

    if (ST === 0) {
        type = 'start';
    } else if (ST >= docH - wndH) {
        type = 'end';
    }

    hideOnScrollList.forEach(function (item) {
        if (typeof item === 'function') {
            item(type, ST, lastST, $wnd);
        }
    });

    lastST = ST;
}

setInterval(function () {
    if (didScroll) {
        didScroll = false;
        window.requestAnimationFrame(hasScrolled);
    }
}, 250);

function throttleScroll(callback) {
    hideOnScrollList.push(callback);
}

/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
var bodyOverflowEnabled = void 0;
var isBodyOverflowing = void 0;
var scrollbarWidth = void 0;
var originalBodyPadding = void 0;
var $headerContent = $('.dk-header > *');
function isBodyOverflowed() {
    return bodyOverflowEnabled;
}
function bodyGetScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'dk-body-scrollbar-measure';
    $body[0].appendChild(scrollDiv);
    var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild(scrollDiv);
    return result;
}
function bodyCheckScrollbar() {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}
function bodySetScrollbar() {
    if (typeof originalBodyPadding === 'undefined') {
        originalBodyPadding = $body.css('padding-right') || '';
    }

    if (isBodyOverflowing) {
        $body.add($headerContent).css('paddingRight', scrollbarWidth + 'px');
    }
}
function bodyResetScrollbar() {
    $body.css('paddingRight', originalBodyPadding);
    $headerContent.css('paddingRight', '');
}
function bodyOverflow(enable) {
    if (enable && !bodyOverflowEnabled) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css('overflow', 'hidden');
    } else if (!enable && bodyOverflowEnabled) {
        bodyOverflowEnabled = 0;
        $body.css('overflow', '');
        bodyResetScrollbar();
    }
}

/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function isInViewport($item, returnRect) {
    var rect = $item[0].getBoundingClientRect();
    var result = 1;

    if (rect.right <= 0 || rect.left >= wndW) {
        result = 0;
    } else if (rect.bottom < 0 && rect.top <= wndH) {
        result = 0;
    } else {
        var beforeTopEnd = Math.max(0, rect.height + rect.top);
        var beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
        var afterTop = Math.max(0, -rect.top);
        var beforeBottom = Math.max(0, rect.top + rect.height - wndH);
        if (rect.height < wndH) {
            result = 1 - (afterTop || beforeBottom) / rect.height;
        } else if (beforeTopEnd <= wndH) {
            result = beforeTopEnd / wndH;
        } else if (beforeBottomEnd <= wndH) {
            result = beforeBottomEnd / wndH;
        }
        result = result < 0 ? 0 : result;
    }
    if (returnRect) {
        return [result, rect];
    }
    return result;
}

/**
 * Scroll To
 */
function scrollTo($to, callback) {
    var scrollPos = false;
    var speed = this.options.scrollToAnchorSpeed / 1000;

    if ($to === 'top') {
        scrollPos = 0;
    } else if ($to === 'bottom') {
        scrollPos = Math.max(0, docH - wndH);
    } else if (typeof $to === 'number') {
        scrollPos = $to;
    } else {
        scrollPos = $to.offset ? $to.offset().top : false;
    }

    if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
        tween.to($wnd, speed, {
            scrollTo: {
                y: scrollPos,

                // disable autokill on iOs (buggy scrolling)
                autoKill: !isIOs
            },
            ease: Power2.easeOut,
            overwrite: 5
        });
        if (callback) {
            tween.delayedCall(speed, callback);
        }
    } else if (typeof callback === 'function') {
        callback();
    }
}

exports.$ = $;
exports.tween = tween;
exports.isIOs = isIOs;
exports.isMobile = isMobile;
exports.isFireFox = isFireFox;
exports.isTouch = isTouch;
exports.$wnd = $wnd;
exports.$doc = $doc;
exports.$body = $body;
exports.wndW = wndW;
exports.wndH = wndH;
exports.docH = docH;
exports.debounceResize = debounceResize;
exports.throttleScroll = throttleScroll;
exports.bodyOverflow = bodyOverflow;
exports.isBodyOverflowed = isBodyOverflowed;
exports.isInViewport = isInViewport;
exports.scrollTo = scrollTo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
    parallaxSpeed: 0.8,
    scrollToAnchorSpeed: 700,

    templates: {
        secondaryNavbarBackItem: 'Back',

        instagram: '<div class="col-4">\n                <a href="{{link}}" target="_blank">\n                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">\n                </a>\n            </div>',
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter: '<div class="nk-twitter">\n                <span class="nk-twitter-icon fab fa-twitter"></span>\n                <div class="nk-twitter-name">\n                      <a href="https://twitter.com/{{screen_name}}" target="_blank">@{{screen_name}}</a>\n                </div>\n                <div class="nk-twitter-date">\n                    <span>{{date}}</span>\n                </div>\n                <div class="nk-twitter-text">\n                   {{tweet}}\n                </div>\n            </div>',
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php'
    }
};

exports.options = options;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Plugins */


var _options = __webpack_require__(1);

var _utility = __webpack_require__(0);

var _setOptions2 = __webpack_require__(6);

var _initNavbar2 = __webpack_require__(7);

var _initCount2 = __webpack_require__(8);

var _initBtnLoad2 = __webpack_require__(9);

var _initPortfolio2 = __webpack_require__(10);

var _initBlog2 = __webpack_require__(11);

var _initPluginStickyNavbar2 = __webpack_require__(12);

var _initPluginStickySidebar2 = __webpack_require__(13);

var _initPluginImagesLoaded2 = __webpack_require__(14);

var _initPluginIsotope2 = __webpack_require__(15);

var _initPluginJarallax2 = __webpack_require__(16);

var _initPluginSwiper2 = __webpack_require__(17);

var _initPluginOFI2 = __webpack_require__(18);

var _initPluginLightGallery2 = __webpack_require__(19);

var _initPluginJqueryform2 = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*------------------------------------------------------------------

  Mimilism Class

-------------------------------------------------------------------*/
var MIMILISM = function () {
    function MIMILISM() {
        _classCallCheck(this, MIMILISM);

        this.options = _options.options;
    }

    _createClass(MIMILISM, [{
        key: 'init',
        value: function init() {
            // prt:sc:dm
            // TODO: see how this can be improved
            setTimeout(() => {
                this.initNavbar();
                this.initCount();
                this.initBtnLoad();
                this.initPortfolio();
                this.initBlog();
                this.initPluginJarallax();
                this.initPluginStickySidebar();
                this.initPluginStickyNavbar();
                this.initPluginImagesLoaded();
                this.initPluginIsotope();
                this.initPluginSwiper();
                this.initPluginOFI();
                this.initPluginLightGallery();
                this.initPluginJqueryform();
            }, 500);

            return this;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(newOpts) {
            return _setOptions2.setOptions.call(this, newOpts);
        }
    }, {
        key: 'debounceResize',
        value: function debounceResize(func) {
            return _utility.debounceResize.call(this, func);
        }
    }, {
        key: 'throttleScroll',
        value: function throttleScroll(callback) {
            return _utility.throttleScroll.call(this, callback);
        }
    }, {
        key: 'bodyOverflow',
        value: function bodyOverflow(type) {
            return _utility.bodyOverflow.call(this, type);
        }
    }, {
        key: 'isInViewport',
        value: function isInViewport($item, returnRect) {
            return _utility.isInViewport.call(this, $item, returnRect);
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo($to, callback) {
            return _utility.scrollTo.call(this, $to, callback);
        }
    }, {
        key: 'initNavbar',
        value: function initNavbar() {
            return _initNavbar2.initNavbar.call(this);
        }
    }, {
        key: 'initCount',
        value: function initCount() {
            return _initCount2.initCount.call(this);
        }
    }, {
        key: 'initBtnLoad',
        value: function initBtnLoad() {
            return _initBtnLoad2.initBtnLoad.call(this);
        }
    }, {
        key: 'initPortfolio',
        value: function initPortfolio() {
            return _initPortfolio2.initPortfolio.call(this);
        }
    }, {
        key: 'initBlog',
        value: function initBlog() {
            return _initBlog2.initBlog.call(this);
        }
    }, {
        key: 'initPluginStickySidebar',
        value: function initPluginStickySidebar() {
            return _initPluginStickySidebar2.initPluginStickySidebar.call(this);
        }
    }, {
        key: 'initPluginStickyNavbar',
        value: function initPluginStickyNavbar() {
            return _initPluginStickyNavbar2.initPluginStickyNavbar.call(this);
        }
    }, {
        key: 'initPluginImagesLoaded',
        value: function initPluginImagesLoaded() {
            return _initPluginImagesLoaded2.initPluginImagesLoaded.call(this);
        }
    }, {
        key: 'initPluginIsotope',
        value: function initPluginIsotope() {
            return _initPluginIsotope2.initPluginIsotope.call(this);
        }
    }, {
        key: 'initPluginJarallax',
        value: function initPluginJarallax($context) {
            return _initPluginJarallax2.initPluginJarallax.call(this, $context);
        }
    }, {
        key: 'initPluginSwiper',
        value: function initPluginSwiper() {
            return _initPluginSwiper2.initPluginSwiper.call(this);
        }
    }, {
        key: 'initPluginOFI',
        value: function initPluginOFI() {
            return _initPluginOFI2.initPluginOFI.call(this);
        }
    }, {
        key: 'initPluginLightGallery',
        value: function initPluginLightGallery() {
            return _initPluginLightGallery2.initPluginLightGallery.call(this);
        }
    }, {
        key: 'initPluginJqueryform',
        value: function initPluginJqueryform() {
            return _initPluginJqueryform2.initPluginJqueryform.call(this);
        }
    }]);

    return MIMILISM;
}();

/*------------------------------------------------------------------

  Init Mimilism

-------------------------------------------------------------------*/


window.Mimilism = new MIMILISM();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setOptions = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/
function setOptions(newOpts) {
    var self = this;

    var optsTemplates = _utility.$.extend({}, this.options.templates, newOpts && newOpts.templates || {});

    self.options = _utility.$.extend({}, self.options, newOpts);
    self.options.templates = optsTemplates;
}

exports.setOptions = setOptions;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    var $navbar = (0, _utility.$)('nav.dk-navbar:first');
    var $navbarFullscreen = $navbar.next('.dk-navbar-fullscreen');
    var $navbarDropdown = $navbar.find('.dk-dropdown:first');

    if (!$navbar.length && !$navbarFullscreen.length) {
        console.error('Navbar was not found');
        return;
    } else{
        console.log('Navbar found')
    }
    $navbar.each(function () {
        var $this = (0, _utility.$)(this);
        var $body = (0, _utility.$)('body');

        if ($navbarFullscreen.find('.dk-nav-content')) {
            $this.find('.dk-nav').clone().appendTo($navbarFullscreen.find('.dk-nav-content'));
        } else {
            $this.find('.dk-nav').clone().appendTo($navbarFullscreen);
        }

        // Scroll
        if ($navbar.hasClass('dk-navbar-fixed') || $navbar.hasClass('dk-navbar-sticky')) {
            (0, _utility.$)(window).on('scroll', function () {
                (0, _utility.throttleScroll)(function () {
                    var toTop = (0, _utility.$)(document).scrollTop();

                    if (toTop > 200) {
                        $this.addClass('dk-navbar-scroll');
                    } else {
                        $this.removeClass('dk-navbar-scroll');
                    }
                });
            });
        }

        // Transparent
        if ($navbar.hasClass('dk-navbar-transparent')) {
            (0, _utility.$)(window).on('scroll', function () {
                (0, _utility.throttleScroll)(function () {
                    var toTop = (0, _utility.$)(document).scrollTop();

                    if (toTop > 200) {
                        $this.removeClass('dk-navbar-transparent');
                    } else {
                        $this.addClass('dk-navbar-transparent');
                    }
                });
            });
        }

        // Dropdown
        var $dropItem = $navbarFullscreen.find('.dk-drop-item');

        if ($dropItem.find('.dk-dropdown-multi').length) {
            $dropItem.find('.dk-dropdown-multi').find('.dk-dropdown').unwrap().find('li').unwrap().wrapAll("<div class='dk-dropdown'></div>");
        }
        var $dropdown = $dropItem.find('.dk-dropdown');

        if ((0, _utility.$)($dropdown).length) {
            $dropdown.prepend('<li class="back"><a href="#">Back</a></li>');
            var $back = $dropItem.find('.back > a');

            $back.on('click', function (e) {
                var $thisBack = (0, _utility.$)(this);
                e.preventDefault();
                $thisBack.closest('.dk-dropdown').removeClass('drop');
                $thisBack.closest('.dk-drop-item').removeClass('drop');
            });
            $dropItem.find('a:first').on('click', function (e) {
                var $thisDrop = (0, _utility.$)(this).closest('.dk-drop-item');
                e.preventDefault();
                $thisDrop.addClass('drop');
                $thisDrop.find('.dk-dropdown:first').addClass('drop');
            });
        }

        // (0, _utility.$)('<div class="dk-navbar-burger"><span></span><span></span><span></span></div>').appendTo($this.find('[class*="container"]').add($navbarFullscreen.find('[class*="container"]')));

        // var $burger = $navbar.add($navbarFullscreen).find('.dk-navbar-burger');
        // $burger.on('click', function () {
        //     console.log('Click!');
        //     $body.add($burger).add($navbarFullscreen).toggleClass('dk-open-fullscreen');
        //     $dropItem.removeClass('drop');
        //     $dropdown.removeClass('drop');
        // });
    });

    // Dropdown Position
    $navbarDropdown.each(function () {
        var $this = (0, _utility.$)(this);
        var $dropdownPositionRight = (0, _utility.$)(window).width() - $this.offset().left - $this.width();
        var $dropdownPositionLeft = $this.offset().left;

        // Position
        if ($dropdownPositionRight <= 20) {
            $this.css({ left: 'auto', right: '0' });
        }
        if ($dropdownPositionLeft <= 20) {
            $this.css({ left: '0', right: 'auto' });
        }
        if ($dropdownPositionRight <= 20 && $dropdownPositionLeft <= 20) {
            $this.css({ left: '-50%', right: '-50%', width: 'calc(100vw - 40px)' });
        }
    });
}

exports.initNavbar = initNavbar;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initCount = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Count

-------------------------------------------------------------------*/
function initCount() {
    (0, _utility.throttleScroll)(function () {
        (0, _utility.$)('.dk-count:not(.dk-count-stop)').each(function () {
            var $this = (0, _utility.$)(this);
            var $count = $this.find('.dk-count-number');
            var $countProgress = $this.find('.dk-count-progress');
            var $speed = $this.attr('data-count-speed');

            if ((0, _utility.isInViewport)($this) > 0) {
                $count.prop('Counter', 0).animate({
                    Counter: $count.text()
                }, {
                    duration: Number($speed),
                    easing: 'swing',
                    step: function step(now) {
                        $count.text(Math.ceil(now));
                        $countProgress.css({ width: Math.ceil(now) + '%' });
                    }
                });

                $this.addClass('dk-count-stop');
            }
        });
    });
}

exports.initCount = initCount;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initBtnLoad = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Btn Load

-------------------------------------------------------------------*/
function initBtnLoad() {
    (0, _utility.$)('.dk-btn-load').each(function () {
        var $this = (0, _utility.$)(this);

        $this.on('click', function (e) {
            e.preventDefault();
            $this.addClass('dk-btn-loading');

            setTimeout(function () {
                $this.removeClass('dk-btn-loading');

                if ($this.hasClass('dk-btn-post')) {
                    $this.text('all posts shown');
                }
                if ($this.hasClass('dk-btn-work')) {
                    $this.text('all works shown');
                }

                $this.addClass('dk-btn-loaded');
            }, 2000);
        });
    });
}

exports.initBtnLoad = initBtnLoad;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPortfolio = undefined;

var _utility = __webpack_require__(0);

/* Portfolio */
function initPortfolio() {
    // Grid
    (0, _utility.$)('.dk-portfolio-grid-item').each(function () {
        var _this = this;

        (0, _utility.debounceResize)(function () {
            var $this = (0, _utility.$)(_this);
            var $item = $this.children('div');
            var $offsetLeft = $this.offset().left;
            var $offsetRight = _utility.wndW - ($this.offset().left + $this.innerWidth());
            var $positionLeft = $item.position().left;
            var $positionRight = $this.width() - ($item.position().left + $item.innerWidth());

            if ($offsetRight < $offsetLeft) {
                $item.css({ 'margin-right': -$offsetRight, 'margin-left': 0 });

                if ($positionRight > 0) {
                    $item.css({ 'margin-right': -$offsetLeft - $positionRight, 'margin-left': -$positionRight });
                }
            } else {
                $item.css({ 'margin-left': -$offsetLeft, 'margin-right': 0 });

                if ($positionLeft > 0) {
                    $item.css({ 'margin-left': -$offsetLeft - $positionLeft, 'margin-right': -$positionLeft });
                }
            }
            if ($offsetRight === $offsetLeft) {
                $item.css({ 'margin-left': -$offsetLeft, 'margin-right': -$offsetRight });

                if ($positionRight > 0 && $positionLeft > 0) {
                    $item.css({ 'margin-left': -$offsetLeft - $positionRight, 'margin-right': -$offsetRight - $positionLeft });
                }
            }
        });
    });

    // Size
    (0, _utility.$)('.dk-portfolio-item').each(function () {
        var $size = (0, _utility.$)(this).find('[data-portfolio-size]');

        if ($size) {
            $size.css({ 'padding-top': $size.attr('data-portfolio-size') });
        }
    });
}

exports.initPortfolio = initPortfolio;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initBlog = undefined;

var _utility = __webpack_require__(0);

/* Blog */
function initBlog() {
    // Size
    (0, _utility.$)('.dk-blog-grid').each(function () {
        var $size = (0, _utility.$)(this).find('[data-blog-size]');

        if ($size) {
            $size.css({ 'padding-top': $size.attr('data-blog-size') });
        }
    });
}

exports.initBlog = initBlog;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPluginStickyNavbar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin Sticky Navbar

-------------------------------------------------------------------*/
function initPluginStickyNavbar() {
  (0, _utility.$)('.dk-navbar-sticky').stick_in_parent();
}

exports.initPluginStickyNavbar = initPluginStickyNavbar;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginStickySidebar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/
function initPluginStickySidebar() {
    (0, _utility.$)(window).on('load', function () {
        if (typeof _utility.$.fn.stick_in_parent === 'undefined') {
            return;
        }

        (0, _utility.$)('.dk-sticky').stick_in_parent();
    });
}

exports.initPluginStickySidebar = initPluginStickySidebar;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginImagesLoaded = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin ImagesLoaded

-------------------------------------------------------------------*/
function initPluginImagesLoaded() {
    var $grid = (0, _utility.$)('.dk-isotope-grid').isotope({
        itemSelector: '.dk-isotope-grid-item',
        layoutMode: 'masonry'
    });

    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });
}

exports.initPluginImagesLoaded = initPluginImagesLoaded;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginIsotope = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin Isotope

-------------------------------------------------------------------*/
function initPluginIsotope() {
    var $grid = (0, _utility.$)('.dk-isotope-grid').isotope({
        itemSelector: '.dk-isotope-grid-item',
        layoutMode: 'masonry'
    });

    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function numberGreaterThan50() {
            var number = (0, _utility.$)(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },

        // show if name ends with -ium
        ium: function ium() {
            var name = (0, _utility.$)(this).find('.name').text();
            return name.match(/ium$/);
        }
    };
    // bind filter button click
    (0, _utility.$)('.dk-isotope-filter').on('click', 'li', function () {
        var filterValue = (0, _utility.$)(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    (0, _utility.$)('.dk-isotope-filter').each(function (i, buttonGroup) {
        var $buttonGroup = (0, _utility.$)(buttonGroup);
        $buttonGroup.on('click', 'li', function () {
            $buttonGroup.find('.active').removeClass('active');
            (0, _utility.$)(this).addClass('active');
        });
    });
}

exports.initPluginIsotope = initPluginIsotope;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginJarallax = undefined;

var _utility = __webpack_require__(0);

/* Jarallax */
function initPluginJarallax() {
    if (typeof _utility.$.fn.jarallax === 'undefined') {
        return;
    }

    // primary parallax
    (0, _utility.$)('.bg-image-parallax').jarallax({
        speed: this.options.parallaxSpeed
    });
}

exports.initPluginJarallax = initPluginJarallax;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginSwiper = undefined;

var _utility = __webpack_require__(0);

/* Swiper */
function initPluginSwiper() {
    // Main
    var swiperSearch = (0, _utility.$)('.swiper-container');
    swiperSearch.each(function () {
        var $this = (0, _utility.$)(this);
        var swiperSlides = Number($this.attr('data-swiper-slides'));
        var swiperSlidesAuto = $this.attr('data-swiper-slidesAuto');
        var swiperGrabCursor = $this.attr('data-swiper-grabCursor');
        var swiperLazy = $this.attr('data-swiper-lazy');
        var swiperBreakpoints = $this.attr('data-swiper-breakpoints');
        var swiperArrows = $this.attr('data-swiper-arrows');
        var swiperFullscreen = $this.attr('data-swiper-fullscreen');
        var swiperPagination = $this.attr('data-swiper-pagination');
        var swiperPaginationDynamic = $this.attr('data-swiper-pagination-dynamic');
        var swiperSpeed = $this.attr('data-swiper-speed');
        var swiperSpace = $this.attr('data-swiper-space');
        var swiperPlay = $this.attr('data-swiper-autoPlay');
        var swiperHeight = $this.attr('data-swiper-autoHeight');
        var swiperFree = $this.attr('data-swiper-freeMode');
        var swiperLoop = $this.attr('data-swiper-loop');
        var conf = {};

        if (swiperSlides) {
            conf.slidesPerView = swiperSlides;
        }
        if (swiperSlidesAuto === 'true') {
            conf.slidesPerView = 'auto';
            conf.centeredSlides = true;
        }
        if (swiperArrows === 'true') {
            conf.navigation = { prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' };
        }
        if (swiperGrabCursor === 'true') {
            conf.grabCursor = true;
        }
        if (swiperLazy === 'true') {
            conf.lazy = true;
        }
        if (swiperPagination === 'true') {
            conf.pagination = { el: '.swiper-pagination', type: 'bullets', clickable: true };
        }
        if (swiperFullscreen === 'true') {
            conf.pagination = {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function renderBullet(index, className) {
                    return '<span class="' + className + '">' + '0' + (index + 1) + '</span>';
                }
            };
            conf.direction = 'vertical';
            conf.mousewheel = true;
        }
        if (swiperPaginationDynamic === 'true') {
            conf.pagination = { el: '.swiper-pagination', dynamicBullets: true, clickable: true };
        }
        if (swiperHeight === 'true') {
            conf.autoHeight = swiperHeight;
        }
        if (swiperFree === 'true') {
            conf.freeMode = swiperFree;
        }
        if (swiperSpeed) {
            conf.speed = Number(swiperSpeed);
        }
        if (swiperSpace) {
            conf.spaceBetween = Number(swiperSpace);
        }
        if (swiperPlay) {
            conf.autoplay = { delay: swiperPlay, disableOnInteraction: false };
        }
        if (swiperLoop) {
            conf.loop = swiperLoop;
        }
        if (swiperBreakpoints === 'true' && swiperSlides) {
            var numberOfPoints = 5;
            var points = [576, 768, 992, 1200, 1920];
            var breaks = {};

            while (swiperSlides > 0 && numberOfPoints > 0) {
                breaks[points[numberOfPoints - 1]] = { slidesPerView: swiperSlides };

                swiperSlides--;
                numberOfPoints--;
            }
            conf.breakpoints = breaks;
        }

        // eslint-disable-next-line
        new window.Swiper(this, conf);
    });
}

exports.initPluginSwiper = initPluginSwiper;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/* Object-Fit-Image */
function initPluginOFI() {
    if (typeof window.objectFitImages !== 'undefined') {
        window.objectFitImages();
    }
}

exports.initPluginOFI = initPluginOFI;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* LightGallery */
function initPluginLightGallery() {
    if ($('.dk-gallery').length) {
        $(document).ready(function () {
            $('.dk-gallery').lightGallery({
                selector: '.dk-gallery-item'
            });
        });
    }
    if ($('.dk-gallery-video').length) {
        $(document).ready(function () {
            $('.dk-gallery-video').lightGallery({
                selector: '.dk-gallery-video-item'
            });
        });
    }
}

exports.initPluginLightGallery = initPluginLightGallery;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginJqueryform = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Count

-------------------------------------------------------------------*/
function initPluginJqueryform() {
    if ((0, _utility.$)('.dk-form').length) {
        (0, _utility.$)('.dk-form').ajaxForm({
            target: '.dk-form-result'
        });
    }
}

exports.initPluginJqueryform = initPluginJqueryform;

/***/ })
/******/ ]);

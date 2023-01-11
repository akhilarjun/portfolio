var _timeToRead = function (noOfWords) {
    var totalTimeReqdRaw = noOfWords / 200;
    var minsLeft = Math.floor(totalTimeReqdRaw);
    var secondsLeft = (totalTimeReqdRaw - minsLeft) * 0.60;
    secondsLeft > 0 ? secondsLeft = 1.0 : secondsLeft = 0;
    var timeReqd = minsLeft + secondsLeft;
    return timeReqd;
};

//Finding Parent browserwise
var _parentElem = null;
if ((browser.name == 'IE' || browser.name == 'MSIE' || browser.name == 'Firefox')) {
    _parentElem = jQuery('html');
} else {
    _parentElem = jQuery('html, body');
}

//Progress bar Load
var loadProgressBar = function () {
    jQuery('.progress-bar').each(function (index, el) {
        var elem = jQuery(el);
        var progressBar = elem.find('i');
        var progressValue = progressBar.find('span');
        var progressBarWidth = progressBar.attr('data-progress');
        progressBar.animate({
            width: progressBarWidth + '%'
        }, 500);
        jQuery({ initialLoad: 0 }).animate(
            {
                initialLoad: progressBarWidth
            },
            {
                duration: 500,
                progress: function () {
                    progressValue.text(Math.ceil(this.initialLoad) + '%');
                }
            });
    });
};

//Social Page Navigation
jQuery('.social-icon').click(function (e) {
    var elem = jQuery(e.target).parent();
    if (elem.hasClass('github')) {
        window.open('https://github.com/akhilarjun');
    } else if (elem.hasClass('facebook')) {
        window.open('https://facebook.com/akhilarjun');
    } else if (elem.hasClass('linkedin')) {
        window.open('https://www.linkedin.com/in/akhilarjun');
    }
});

//Scroll Effect
var progressBarLoaded = false;
var scrolled = false;
jQuery(window).bind('mousewheel DOMMouseScroll touchmove scroll', function (e) {
    var leftBar = jQuery('.left-bar');
    var windowWidth = jQuery(this).width();
    var scrollTopLimit = _parentElem.scrollTop();
    setTimeout(function () {
        if (windowWidth > 600) {
            if (!leftBar.hasClass('aside') && scrollTopLimit > 0) {
                leftBar.addClass('aside');
                loadProgressBar();
                if (!scrolled) {
                    _parentElem.animate({
                        scrollTop: '100px'
                    });
                }
            } else if (jQuery('body').scrollTop() == 0) {
                //leftBar.removeClass('aside');
            }
        } else {
            if (!progressBarLoaded) {
                progressBarLoaded = true;
                loadProgressBar();
            }
        }
    }, 1);
});

//click Scroll here
var setAside = function () {
    var leftBar = jQuery('.left-bar');
    var windowWidth = jQuery(this).width();
    if (windowWidth > 600) {
        leftBar.addClass('aside');
        loadProgressBar();
    }
};

//Navigation
jQuery('.menu').click(function () {
    var idToScroll = jQuery(this).attr('href');
    if (idToScroll) {
        var elemToScrollTo = jQuery(idToScroll);
        scrolled = true;
        _parentElem.animate({
            scrollTop: (elemToScrollTo.offset().top - 50) + 'px'
        }, 500);
    }
});

//Get my CV
jQuery('.get-my-cv button').click(function () {
    window.open('http://www.akhilarjun.com/Akhil_Arjun_Resume_latest.pdf');
});

//Time to read the CV
var totalText = jQuery('body').text().replace(/\s/gm, '');
jQuery('#minsToRead').text(_timeToRead(totalText.length));

//hack to fix the jump issue in mobileBrowsers
var moo = function (event) {
    //It's a Moo Point - 'Joey Tribbiani'
};
jQuery(window).resize(moo);

//welcoming you
var boldStyle = 'font-weight:bold;color:#333;',
    blank = '',
    emailStyle = 'color:#39c;text-decoration:underline;',
    consoleStyle = 'padding:1px 5px;border-radius:3px;background:#333;color:#eee;';
window.console.log('%cHey There!%c ' +
    '\n\nSo you love %cConsole%c too. Cool ! ' +
    '\nIf you have any suggestions regarding the site or maybe wanna talk about any project, ' +
    'feel free to drop a mail at %cakhilparjun@gmail.com%c ' +
    '\n\nRegards, \n%cAkhil Arjun%c',
    boldStyle, blank,
    consoleStyle, blank,
    emailStyle, blank,
    boldStyle, blank);

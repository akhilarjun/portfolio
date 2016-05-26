var _timeToRead = function(noOfWords){
    var totalTimeReqdRaw = noOfWords/200;
    var minsLeft = Math.floor(totalTimeReqdRaw);
    var secondsLeft = (totalTimeReqdRaw-minsLeft)*0.60;
    secondsLeft > 0 ? secondsLeft = 1.0 : secondsLeft = 0; 
    var timeReqd = minsLeft+secondsLeft;
    return timeReqd;
};

//Finding Parent browserwise
var _parentElem = null;
if((browser.name == 'IE' || browser.name == 'MSIE' || browser.name == 'Firefox')){
    _parentElem = jQuery('html');
} else {
    _parentElem = jQuery('body');
}

//Progress bar Load
var loadProgressBar = function(){
    jQuery('.progress-bar').each(function(index,el){
        var elem = jQuery(el);
        var progressBar = elem.find('i');
        var progressValue = progressBar.find('span');
        var progressBarWidth = progressBar.attr('data-progress');
        progressBar.animate({
            width : progressBarWidth+'%'
        },500);
        jQuery({initialLoad : 0}).animate(
            {
                initialLoad : progressBarWidth
            },
        {
            duration : 500,
            progress : function(){
                progressValue.text(Math.ceil(this.initialLoad)+'%');
            }
        });
    });
};

//Social Page Navigation
jQuery('.social-icon').click(function(e){
    var elem = jQuery(e.target).parent();
    if(elem.hasClass('github')){
        window.open('https://github.com/akhilarjun');
    } else if(elem.hasClass('facebook')){
        window.open('https://facebook.com/akhilarjun');
    } else if(elem.hasClass('linkedin')){
        window.open('https://www.linkedin.com/in/akhilarjun');
    }
});

//Scroll Effect
var progressBarLoaded = false;
var scrolled = false;
jQuery(window).bind('mousewheel DOMMouseScroll touchmove scroll',function(e){
    var heroSection = jQuery('.hero-section');
    var windowWidth = jQuery(this).width();
    var scrollTopLimit = _parentElem.scrollTop();
    setTimeout(function(){
        if(windowWidth > 600){
            if(!heroSection.hasClass('aside') && scrollTopLimit > 0){
                heroSection.addClass('aside');
                loadProgressBar();
                if(!scrolled){
                    _parentElem.animate({
                        scrollTop: '100px'
                    });
                }
            } else if(jQuery('body').scrollTop() == 0){
                //heroSection.removeClass('aside');
            }
        } else {
            if(!progressBarLoaded){
                progressBarLoaded = true;
                loadProgressBar();
            }
        }
    },1);
});

//click Scroll here
var setAside = function(){
    var heroSection = jQuery('.hero-section');
    var windowWidth = jQuery(this).width();
    if(windowWidth > 600){
        heroSection.addClass('aside');
        loadProgressBar();
    }
};

//Type Effect
jQuery('#typing-letters').typed({
    strings : ["I am a <strong>Blogger</strong>",
               "^500 <strong>Designer</strong>",
               "^500 And also...",
               "^500 <strong>Web Developer</strong>"],
    typeSpeed : 0,
    loop : true
});

//Navigation
jQuery('.menu').click(function(){
    var idToScroll = jQuery(this).attr('href');
    if(idToScroll){
        var elemToScrollTo = jQuery(idToScroll);
        scrolled = true;
        _parentElem.animate({
            scrollTop : elemToScrollTo.offset().top+'px'
        },500);
    }
});

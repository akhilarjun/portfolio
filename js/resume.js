var _timeToRead = function(noOfWords){
    var totalTimeReqdRaw = noOfWords/200;
    var minsLeft = Math.floor(totalTimeReqdRaw);
    var secondsLeft = (totalTimeReqdRaw-minsLeft)*0.60;
    secondsLeft > 0 ? secondsLeft = 1.0 : secondsLeft = 0; 
    var timeReqd = minsLeft+secondsLeft;
    return timeReqd;
};

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
jQuery(window).bind('mousewheel DOMMouseScroll touchmove scroll',function(e){
    var heroSection = jQuery('.hero-section');
    setTimeout(function(){
        if(!heroSection.hasClass('aside') && jQuery('body').scrollTop() > 0){
            heroSection.addClass('aside');
            loadProgressBar();
        } else if(jQuery('body').scrollTop() == 0){
            heroSection.removeClass('aside');
        }
    },1);
});

//Type Effect
jQuery('#typing-letters').typed({
    strings : ["I am a <strong>Blogger</strong>",
               "^500 <strong>Designer</strong>",
               "^500 And also...",
               "^500 <strong>Web Developer</strong>"],
    typeSpeed : 0,
    loop : false
});
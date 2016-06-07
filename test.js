var li_lists = [];

var casper = require('casper').create({
	logLevel : "debug",
	verbose : true
});


//1. 라즈베리파이
//2. 리눅스


casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36');

function getLiList() {
	var tempArray = document.querySelectorAll('div#list_for_view ol li a span strong.mail_title');
	return tempArray;
}

casper.start('https://www.google.co.kr/webhp?hl=ko', function() {
	this.echo('########## START ##########');
	this.fill('form#frmNIDLogin', {
        id : 'lakeonthesky',
        pw : 'Kwontaejin1!'
    }, false);
});

casper.then(function() {
    this.echo('1111111111111111111111111');
    this.click('input.int_jogin');
});

casper.waitForUrl('mail\.naver\.com', function() {
    this.echo('222222222 -> ' + this.getCurrentUrl());
    li_lists = this.evaluate(getLiList);
    this.echo('333333333 -> ' + li_lists.length);
});

casper.run();
var casper = require('casper').create({
	logLevel : "debug",
	verbose : true
});

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36');

casper.start('https://member.ssg.com/m/member/login.ssg?retURL=http%3A%2F%2Fm.ssg.com%2F&t=login', function() {
	this.echo('########## START ##########');
	this.fill('form#login_form', {
        mbrLoginId : '',
        password : ''
    }, true);
});

casper.waitForUrl('/ssgGnbAjax\.ssg$', function() {
    this.echo('####### login success, current url : ' + this.getCurrentUrl());
});
//http://m.ssg.com/comm/ssgGnbAjax.ssg?callback=jQuery191033101685950532556_1465140646666&_=1465140646667

casper.then(function() {
   this.fill('form#m_sch_top_form', {
       query : 'water'
   }, true); 
});

casper.waitForUrl('/search\.ssg$', function() {
   this.echo('33333333333333, -----> ' + this.getCurrentUrl()); 
});

casper.run();
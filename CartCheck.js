function checkCartItem() {
    var chkBoxList = document.querySelectorAll('input[name="cbCartId"]');
    for(var x = 0; x < chkBoxList.length; x++) {
        chkBoxList[x].checked = true;
    }
}


var casper = require('casper').create({
	logLevel : "debug",
	verbose : true,
    pageSettings : {
        loadImages : false,
        loadPlugins : false,
        userAgent : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36", 
    }
});

//casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36');

var _id = casper.cli.get("id");
var _pw = casper.cli.get("pw");

casper.echo("id is --> " + _id)
        .echo("pw is --> " + _pw);

casper.start('https://member.ssg.com/m/member/login.ssg?retURL=http%3A%2F%2Fm.ssg.com%2F&t=login', function() {
	this.echo('########## START ##########');
	this.fill('form#login_form', {
        mbrLoginId : _id,
        password : _pw
    }, false);
    this.click('button.bn_pnk');
});

// casper.start();

// casper.open("https://member.ssg.com/m/member/login.ssg?retURL=http%3A%2F%2Fm.ssg.com%2F&t=login", {
//    encoding : "utf8" 
// });

// casper.then(function() {
//     this.echo('########## START ##########');
// 	this.fill('form#login_form', {
//         mbrLoginId : _id,
//         password : _pw
//     }, false);
//     this.click('button.bn_pnk');
// });

casper.waitForUrl('http://m.ssg.com', function() {
    this.echo('####### login success, current url : ' + this.getCurrentUrl());
}, 10000);
//http://m.ssg.com/comm/ssgGnbAjax.ssg?callback=jQuery191033101685950532556_1465140646666&_=1465140646667

casper.then(function() {
    this.echo('####### #######');
    this.fill('form#m_sch_top_form', {
        query : '생수'
    }, false);
    this.click('form#m_sch_top_form > div.m_head_srh > div.m_head_inparea > span > button.mcom_b_def');
});

casper.waitForUrl('http://m.ssg.com/search.ssg?query=생수', function() {
    this.echo('2222222222222222222222222, -----> ' + this.getCurrentUrl());
    this.click('button.spi.btn_cart');
}, 10000);

casper.waitForAlert(function(response) {
    this.echo("Alert received : " + response.data);
    if(response.data === '장바구니에 상품이 담겼습니다.') {
        this.click('a.b_cart');
    } else {
        //TODO 실패시 처리
    }
});

casper.waitForUrl('http://pay.ssg.com/m/cart/dmsShpp.ssg', function() {
    this.echo("333333333333333333333333333333 ----> " + this.getCurrentUrl());
    this.evaluate(checkCartItem);
    this.click('a[name="btDelChekItemAll"]');
    this.waitForAlert(function(response) {
        this.echo("44444444444444444444444444 --> " + response.data);
    });
});


casper.run();
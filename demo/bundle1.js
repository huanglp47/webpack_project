/**
 * Created by Administrator on 2016/8/3.
 */
//css
require('./bundle1.css');

//js
require('./widget1.js');

//img()
var img1 = require('./shenzhen.jpg');
$('#img1').attr('src',img1);

//json
var jsonData = require('./demo.json'),
    _html = "";
for(var i= 0,len=jsonData.length;i<len;i++){
    _html+='<li>'+jsonData[i].name+'</li>'
}
$('#jsonRender').html(_html);

//html
var importHtml = require('./compoment/compomentA.html');

$('#importHtml').html(importHtml);


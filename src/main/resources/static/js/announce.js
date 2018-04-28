/**
 * 
 */
var data = '{"a_title":"商业街景观设计专题：商业步行街","a_view":4396,"isSticky":true,"a_ID":"GG01","a_date":1523927947000,"a_author":"任兵兵","a_content":"'+
'<p>步行街中的一种，城市中商业活动集中的街道，由大量的零售业、服务业商店作为主体，集中于一定的地区，构成有一定长度的街区。 商业步行街是指城市的商业集中区。它集中了一定数量的商店和市场。使人们能够步行选购商品和得到服务。</p>'+
'<p> 商业步行街--城市形象的代表和名片，从立项到建设，都是由政府主导或参与，他的成败将直接影响区域经济的增长。</p><img src=roll1.jpg/>'+
'<p>商业步行街发源于中国，唐代时期，长安就有著名的商业街：东市和西市。到了宋代，清明上河图就是典型的商业街。大到一个城市，小到一个小镇，都在尝试着开发富有特色商业步行街。毋庸置疑，商业步行街已经成为美丽的城市会客厅。从“街”到“商业街”，从“商业街”到“商业步行街”，三个概念的跳跃产生了从“走路、购物”到“休闲购物、享受生活”的变迁。商业步行街是城市的商业文化名片，是城市繁荣的象征，是城市运营的点睛之笔。因此堪称“城市客厅”。对商业步行街的兴趣，是时尚女性生活中不可缺少的一部分，也是旅行爱好者重要的旅游内容之一。</p>'+
'<br/><p>中国十大商业步行街：1北京王府井2上海南京路3香港铜锣湾4成都春熙路5武汉光谷步行街6台北西门町7哈尔滨中央大街8南京湖南路9广州北京路10重庆解放碑</p><img src=roll2.jpg/>'+
'"}';
var a = eval('(' + data + ')');
console.log(a);
$(".a-title").html('<h3>'+a.a_title+"</h3>");
$(".a-info").html(
		'<span>'+(new Date(a.a_date)).format("yyyy年MM月dd日 hh:mm")+'</span>&nbsp;&nbsp;&nbsp;<span>作者：'+
		a.a_author+'</span>&nbsp;&nbsp;&nbsp;<span>浏览数：'+a.a_view+'</span>'
);
$(".a-content").html(a.a_content);


window.onload = function(){
	Pace.stop();
}  
$.ajax({
	async: false,
	type: "GET",
	cache:false, 
	dataType: 'json',
	url: "/",
	timeout: 3000,
	contentType: "application/json;utf-8",
	success: function(msg) {
		data=msg;
	}});
/**
 * 
 */
$('#myCarousel').carousel({interval:2000});

var data = '[{"title":"第一个公告","sticky":true,"a_ID":"GG01","date":1523927947000},'+
	'{"title":"第二个公告","sticky":true,"a_ID":"GG02","date":1523927947000},'+
	'{"title":"第a个公告","sticky":true,"a_ID":"GG0a","date":1523927947000},'+
	'{"title":"第b个公告","sticky":true,"a_ID":"GG0b","date":1523927947000},'+
	'{"title":"第三个公告所得到的阿三大叔大叔大叔大多多多多多多多","sticky":false,"a_ID":"GG03","date":1523927947000},'+
	'{"title":"第四个公告","sticky":false,"a_ID":"GG04","date":1523927947000}]';
var announceHTML = "";
var a = eval('(' + data + ')');
//if(a.length<=5){
	$(".box-footer").hide();
//}

for(var i=0;i<a.length;i++){
	announceHTML+='<li><input type="hidden" value="'+a[i].a_ID+'"/><a class="announce-a" href="/Announce">';
	announceHTML+=a[i].title+'</a>'+
	'<span class="pull-right">'+(new Date(a[i].date)).format("yy-MM-dd")+'</span></li>';
}
$(".ui-sortable").html(announceHTML);

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
var mList;
$.ajax({
    async: false,
    type: "GET",
    cache:false, 
    dataType: 'json',
    url: "/getMarkets",
    timeout: 3000,
    contentType: "application/json;utf-8",
    success: function(msg) {
    	console.log(msg);
    	mList=msg;	
    },
    error:function(XMLHttpRequest, textStatus, errorThrown){ //请求失败时被调用的函数。3个参数：XMLHttpRequest对象、错误信息、捕获的错误对象
    	console.log(textStatus+":"+errorThrown);
    	layer.msg("请求未成功" , {anim: 6 });
    }
  });

var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
var radom_color = function(){
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
};
var labels= [],data=[];
var pieData=[];
for(var i=0;i<mList.length;i++){
	var name = mList[i].m_name;
	if(name.length>6)
		name = name.substring(0,6)+"...";
	labels[i]=name;
	data[i]=mList[i].m_view;
	var dataset = {
		name:name,
		value:mList[i].m_view
	};
	pieData[i]=dataset;
}
console.log(labels);
var option2 = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} {b}: {c} ({d}%)"
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {}
	        }
	    },
	    legend: {
	    	orient:'vertical',
	        x: 'left',
	        data:labels
	    },
	    series: [
	        {
	            name:'店铺：',
	            type:'pie',
	            radius: ['50%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:pieData
	        }
	    ]
	}



var option1 = {
		tooltip : {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            label: {
	                backgroundColor: '#6a7985'
	            }
	        }
	    },
	    toolbox: {
	        feature: {
	            saveAsImage: {}
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : labels
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	        	type:'line',
	        	 stack: '总量',
	        	 symbolSize: 20,
	             data:data
	        }]
}

window.onload = function(){
	Pace.stop();
	var dom1 = document.getElementById("a-chart");
	var myChart1 = echarts.init(dom1);
	myChart1.setOption(option1, true);
	
	var dom2 = document.getElementById("b-chart");
	var myChart2 = echarts.init(dom2);
	myChart2.setOption(option2, true);
	
}
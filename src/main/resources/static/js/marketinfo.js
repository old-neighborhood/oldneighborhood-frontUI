/**
 * 
 */
window.onload = function(){
	init();
	Pace.stop();
}  
var msg;
$.ajax({
	async: false,
	type: "GET",
	cache:false, 
	dataType: 'json',
	url: "/getMarket",
	timeout: 3000,
	contentType: "application/json;utf-8",
	success: function(data) {
		msg=data;
	}});
var map;
function init(){
	$.ajax({
		async: false,
		type: "GET",
		cache:false, 
		dataType: 'json',
		url: "/getMarket",
		timeout: 3000,
		contentType: "application/json;utf-8",
		success: function(data) {
			msg=data;
		}});
	var center =  new qq.maps.LatLng(msg.m_address.split(",")[1],msg.m_address.split(",")[2]);
	console.log(center);
  map = new qq.maps.Map(document.getElementById("container"),{
        center:  center,
        zoom: 13
    });
  map = new qq.maps.Map(document.getElementById("plusMap"),{
      center:  center,
      zoom: 13
  });
      var marker=new qq.maps.Marker({
          position:center,
			animation:qq.maps.MarkerAnimation.DROP,
          map:map
      });
 
}


$(document).on('click',".dropdown-menu>li",function(e){ 
	var txt = $(this).text()+'<span class="caret"></span>';
	$(this).parent().parent().find(".dropdown-toggle").html(txt);
});
$(document).on('click',"[name='image']",function(e){   
			  var src=$(this).attr("src");
		   var large_image = "<img src='" + src + "'/>";
		   $('#large-image').html($(large_image).animate({ height: '100%', width: '100%' }, 500));
		  });	
	
	 
		    	var state='<label>状态：</label>';
		    	if(msg.m_state=="zhuxiao"){
		    		state+='正在注销';
		    		$("#hasBtn").html(
		    			'<input type="button" data-toggle="modal" data-target="#recoverModal" class="btn btn-primary" name="recoverMarket" value="恢复" style="margin-top:25px;margin-right:15px;"/>');
		    	}
		    	else if(msg.m_state=="shenqing")
		    		state+='正在申请';
		    	else if(msg.m_state=="zhengchang"){
		    		state+='正常运行';
		    		$("#hasBtn").html(
		    			'<input type="button" class="btn btn-primary" name="modMarket" value="修改" style="margin-top:25px;margin-right:15px;"/>'+
						'<input type="button" data-toggle="modal" data-target="#delMarketModal" name="delMarket" class="btn btn-danger" value="注销" style="margin-top:25px;"/>');		    		
		    	}
		    	var type;
		    	if(msg.m_type=="food")
		    		type="美食";
		    	else if(msg.m_type=="hotel")
		    		type="酒店";
		    	else if(msg.m_type=="shop")
		    		type="商店";
		    	
		    	$("#plus-address").html("<label>地址：</label>"+msg.m_address.split(",")[0]);
		    	$("#m_name").text(msg.m_name);
		    	$("#head").attr("src",msg.m_image);
		    	$("#m_address").html("<br/><label>地址：</label>"+msg.m_address.split(",")[0]);
		    	$("#m_tele").html("<label>电话：</label>"+msg.m_tele);
		    	$("#m_email").html("<label>邮箱：</label>"+msg.m_email);
		    	$("#m_type").html("<label>类型：</label>"+type);
		    	$("#m_intro").html("<label>介绍：</label>"+msg.m_intro);
		    	$("#m_state").html(state);
		    	$("#m_date").html( "<label>创建时间：</label>"+(new Date(parseFloat(msg.m_date))).format("yyyy-MM-dd hh:mm:ss"));
		    	var h = '<div class="pull-left" style="margin-left:20px;">';
		    	for(var j=0;j<5;j++){
		    		if(j<parseInt(msg.m_score/100)){
		    			h+='<i class="fa fa-star text-primary"></i>';
		    		}
		    		else{
		    			h+='<i class="fa fa-star-o text-primary"></i>';
		    		}
		    	}
		    	
		    	h+='</div><div class="col-md-offset-2">1235条评论</div>';
		    	$("#star").html(h);
	 
	
	 
	 $.ajax({
		    async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/getGoods",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	if(msg.length==0){
		    		$("#card").html('<div style="text-align:center"><p style="color:grey;margin-top:15px;">暂无商品信息</p></div>');
		    		return;
		    	}
		    	var content = '';
		    	content+='<div class="row">';
		    	for(var i=0;i<Math.ceil(msg.length/7);i++){
		    		for(var j=0;7*i+j<msg.length&&j<7;j++){
		    			content+='<div class="col-md-2" style="margin-bottom:20px;width:165px;"><div class="card card-block">'+
		    			'<input type="hidden" value="'+msg[7*i+j].g_ID+'"/>'+
		    			'<div onmouseover="show(this)" onmouseout="hide(this)"><div class="func"  style="position:absolute;top:10%;left:20%;">'+
		    			'<a data-toggle="modal" data-target="#modModal" href="#" name="modGood" class="btn btn-primary btn-sm" style="width:100px;margin-top:15px;">修改</a><br/>'+
		    			'<a href="#" data-toggle="modal" data-target="#delModal" name="delGood" class="btn btn-danger btn-sm" style="width:100px;margin-top:15px;">删除</a>'+
		    			'</div>'+
		    			'<img name="image"'+
		    			'class="bg-primary m-1 block"'+
		    			' src="'+msg[7*i+j].g_image+
		    			'" height="100px" width="100%" style="position:relative;" /></div>'+
		    			'<h5 class="card-title text-center"><a data-toggle="modal" data-target="#showModal" name="showGood" href="#">'+msg[7*i+j].g_name+'</a></h5>'+
		    			/*'<p class="card-text">'+msg[7*i+j].g_intro+'</p>'+*/
		    			'</div></div>';
		    		}
		    	}
		    	content+='</div>';
		    	$("#card").html(content);
		    }
	 });
	
	 function show(thisObj)  
	  {  
		 $(thisObj).find("img").addClass("beDark");
	    $(thisObj).find(".func").css("display","block");  
	  } 
	 
	 function hide(thisObj)  
	  {  
		 $(thisObj).find("img").removeClass("beDark");
		 $(thisObj).find(".func").css("display","none");  
	  } 
	 
	 $("#confirmAdd").click(function (e) {
		
			
			 $.ajax({
				    type: "POST",
				    async: false,
		             cache: false,
		             dataType:"json",
				    url: "/addGood",
				    contentType:"application/json",
				     data: JSON.stringify({
		            	'g_name':$("#addName").val(),
		    			'g_price':$("#addPrice").val(),
		    			'g_amount':$("#addAmount").val(),
		    			'g_image':$("#addImg").attr("src"),
		    			'g_type':"food",
		    			'g_intro':$("#addIntro").val()
		            }), 
				    timeout: 3000,
				  // contentType: "application/jsonp;utf-8",
				    success:function(data){
				    	layer.msg("添加成功" , {anim: 6 });
		            	 setTimeout('window.location.href="MarketInfo"',1000);
		                 //window.location.href="marketList.html";
				    },
				    error: function(){
	    				alert("error");
	    	    		//请求出错处理
	    	    				}
			 }); 
	 });
	 
	 $(document).on('click',"[name='showGood']",function(e){ 
			id = $(this).parents(".card").find("input").val();
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    url: "/setG_ID",
			    data: {"g_ID":id},
			    timeout: 3000,
			    contentType: "application/json;utf-8",
			  // contentType: "application/jsonp;utf-8",
			    success:function(data){
			    }});
			
			 $.ajax({
				    async: false,
				    type: "GET",
				    cache:false, 
				    dataType: 'json',
				    url: "/getGood",
				    timeout: 3000,
				    contentType: "application/json;utf-8",
				    success: function(msg) {
				    	$("#showName").text(msg.g_name);
				    	
				    	$("#showPrice").text(msg.g_price);
				    	$("#showImg").attr("src",msg.g_image);
				    	$("#showAmount").text(msg.g_amount);
				    	$("#showIntro").text(msg.g_intro);
				    }
			 });
		});
	 
	 $(document).on('click',"[name='modGood']",function(e){ 
			id = $(this).parents(".card").find("input").val();
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    url: "/setG_ID",
			    data: {"g_ID":id},
			    timeout: 3000,
			    contentType: "application/json;utf-8",
			  // contentType: "application/jsonp;utf-8",
			    success:function(data){
			    }});
			 $.ajax({
				    async: false,
				    type: "GET",
				    cache:false, 
				    dataType: 'json',
				    url: "/getGood",
				    timeout: 3000,
				    contentType: "application/json;utf-8",
				    success: function(msg) {
				    	$("#modName").val(msg.g_name);
				    	
				    	$("#modPrice").val(msg.g_price);
				    	$("#modImg").attr("src",msg.g_image);
				    	$("#modAmount").val(msg.g_amount);
				    	$("#modIntro").val(msg.g_intro);
				    }
			 });
			
		});
	 $("#confirmMod").click(function (e) {
		 $.ajax({
			    type: "POST",
			    async: false,
	             cache: false,
	             dataType:"json",
			    url: "/modifyGood",
			    contentType:"application/json",
			     data: JSON.stringify({
	            	'g_name':$("#modName").val(),
	    			'g_price':$("#modPrice").val(),
	    			'g_amount':$("#modAmount").val(),
	    			'g_image':$("#modImg").attr("src"),
	    			'g_intro':$("#modIntro").val()
	            }), 
			    timeout: 3000,
			  // contentType: "application/jsonp;utf-8",
			    success:function(data){
			    	layer.msg("修改成功" , {anim: 6 });
	            	 setTimeout('window.location.href="MarketInfo"',1000);
	                 //window.location.href="marketList.html";
			    },
			    error: function(){
 				alert("error");
 	    		//请求出错处理
 	    				}
		 }); 
	 });
	 
	 $(document).on('click',"[name='delGood']",function(e){ 
			id = $(this).parents(".card").find("input").val();
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    url: "/setG_ID",
			    data: {"g_ID":id},
			    timeout: 3000,
			    contentType: "application/json;utf-8",
			  // contentType: "application/jsonp;utf-8",
			    success:function(data){
			    }});
	 });
	 
	 $("#confirmDel").click(function (e) {
		 $.ajax({
			    type: "GET",
			    async: false,
		         cache: false,
		         data:{"g_ID":id},
		         dataType:"json",
			    url: "/deleteGood",
			    contentType:"application/json",
			    timeout: 3000,
			  // contentType: "application/jsonp;utf-8",
			    success:function(data){
			    	layer.msg("删除成功" , {anim: 6 });
		          	 setTimeout('window.location.href="/MarketInfo"',1000);
		            //window.location.href="marketList.html";
			    },
			    error: function(){
					alert("error");
		    		//请求出错处理
		    				}
		 }); 
	 });
	 
	 $(document).on('click',"#confirmDelMarket",function(e){ 
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    timeout: 3000,
			    url: "/deleteMarket",
			    contentType:"application/json;utf-8",
			  // contentType: "application/jsonp;utf-8",
			    success:function(data){
			    	layer.msg("注销成功" , {anim: 6 });
		          	 setTimeout('window.location.href="MarketInfo"',1000);
		            //window.location.href="marketList.html";
			    },
			    error: function(){
					alert("error");
		    		//请求出错处理
		    				}
		 }); 
		});
	 
	 $(document).on('click',"#confirmRecoverMarket",function(e){ 
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    timeout: 3000,
			    url: "/recoverMarket",
			    contentType:"application/json;utf-8",
			  // contentType: "application/jsonp;utf-8",
			    success:function(data){
			    	layer.msg("恢复成功" , {anim: 6 });
		          	 setTimeout('window.location.href="MarketInfo"',1000);
		            //window.location.href="marketList.html";
			    },
			    error: function(){
					alert("error");
		    		//请求出错处理
		    				}
		 }); 
		});
	 
	 $(document).on('click',"[name='modMarket']",function(e){ 
			
			window.location.href = "/ModifyMarket";
		});
	 
	 function upImg(obj){  
	     var imgFile = obj.files[0];  
	    var img = new Image();  
	    var fr = new FileReader();  
	    fr.onload = function(){  
	        document.getElementById("addImg").src=fr.result;
	        document.getElementById("modImg").src=fr.result;
	    }  
	    fr.readAsDataURL(imgFile);  
	}
	 
	 
	 function initFileInput(ctrlName) {      
	        var control = $('#' + ctrlName);   
	        control.fileinput({  
	            language: 'zh', //设置语言  
	            showUpload: false, //是否显示上传按钮  
	            showPreview : false,
	            showRemove:true,  
	             dropZoneEnabled: false,  
	            showCaption: true,//是否显示标题  
	            allowedPreviewTypes: ['image'],  
	                allowedFileTypes: ['image'],  
	                allowedFileExtensions:  ['jpg', 'png'],  
	                maxFileSize : 2000,  
	            maxFileCount: 1,  
	            //initialPreview: [   
	                    //预览图片的设置  
	              //      "<img src='http://127.0.0.1:8080/NewsManageSys/plugin/umeditor1_2_2/jsp/upload/20161030/55061                       477813913474.jpg' class='file-preview-image' alt='肖像图片' title='肖像图片'>",  
	            //],  
	              
	        }).on("filebatchselected", function(event, files) {  
	            $(this).fileinput("upload");  
	            })  
	            .on("fileuploaded", function(event, data) {  
	                $("#path").attr("value",data.response);  
	        });  
	    }  
	      
	    $(function () {    
	        initFileInput("addImage");  
	        initFileInput("modImage");  
	    })  
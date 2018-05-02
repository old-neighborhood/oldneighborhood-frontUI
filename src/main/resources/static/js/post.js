/**
 * 
 */
window.onload=function(){
	Pace.stop();
}

$().ready(function() {
	var page_size = 10;
	var currentPage=1;
	var totalpage;
	var sort = "date";
	var forum;
	$.ajax({
		async: false,
	    type: "GET",
	    cache:false, 
	    dataType: 'json',
	    url: "/totalposts",
	    timeout: 3000,
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	totalpage = Math.ceil(msg/page_size);
	    	var html = '<li class="pre"><a href="#">&laquo;</a></li>';
	    	for(var i=0;i<totalpage;i++)
	    		html+='<li class="page_'+(i+1)+'"><a href="#">'+(i+1)+'</a></li>';
	    	html+='<li class="next"><a href="#">&raquo;</a></li>';
	    	$(".pagination").html(html);
	    	$(".pagination").find(".page_"+currentPage).addClass("active");
	    	if(msg=="0")
	    		$(".pagination").hide();
	    }
});
	var salerInfo;
	$.ajax({
		async: false,
	    type: "GET",
	    cache:false, 
	    dataType: 'json',
	    url: "/info",
	    timeout: 3000,
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	salerInfo = msg;
	    }
	});
	$.ajax({
		async: false,
	    type: "GET",
	    cache:false, 
	    url: "/forumdetail",
	    timeout: 3000,
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	console.log(msg);
	    	forum = eval('(' + msg + ')');
	    	console.log(forum);
	    }
	});
	var firstInfo;
	if(forum!=null){
	$.ajax({
		async: false,
	    type: "POST",
	    cache:false, 
	    dataType: 'json',
	    url: "/getInfo",
	    timeout: 3000,
	    data:JSON.stringify({
	    	"ID":forum.user_ID,
	    	"type":forum.user_type
	    }),
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	firstInfo = eval('(' + msg + ')');
	    }
	});
	}
	
	function getPostList(){
		var postList;
	$.ajax({
		async: false,
	    type: "POST",
	    cache:false, 
	    dataType: 'json',
	    url: "/postlist",
	    timeout: 3000,
	    data:JSON.stringify({
	    	"current_page":currentPage,
	    	"page_size":page_size,
	    	"sort_term":sort
	    }),
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	postList = eval('(' + msg + ')');
	    	console.log(postList);
	    	
	    }
	});
	
	var html = '';
	html+='<div class="headder"><h4 class="title">'+forum.f_title+'</h4>';
	if(salerInfo.s_ID == forum.user_ID)
		html+='<button class="btn btn-danger pull-right del">删除</button>';
	var isCollect;
	$.ajax({
		async: false,
	    type: "POST",
	    cache:false, 
	    dataType: 'json',
	    url: "/isCollect",
	    timeout: 3000,
	    data:JSON.stringify({
	    	"userID":salerInfo.s_ID,
	    	"userType":"saler",
	    	"f_ID":forum.f_ID
	    }),
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	isCollect = msg;
	    	
	    }
	});
	if(isCollect)
		html+='<button class="btn btn-info pull-right like">取消收藏</button></div>';
	else
		html+='<button class="btn pull-right like">收藏</button></div>';
	if(currentPage=="1"){
		html+='<div class="row" style="margin:0px;">'+
		'<div class="head">'+
		'<div class="host"></div>';
			if(forum.user_type == "saler")
				html+='<img class="headImg" src="'+firstInfo.s_image+'"/>'+
					'<div class="hostname"><a>'+firstInfo.s_name+'</a></div>';
			else if(forum.user_type == "user")
				html+='<img class="headImg" src="'+firstInfo.u_image+'"/>'+
					'<div class="hostname"><a>'+firstInfo.u_name+'</a></div>';
			else if(forum.user_type == "admin")
				html+='<img class="headImg" src="'+firstInfo.ad_image+'"/>'+
					'<div class="hostname"><a>'+firstInfo.ad_name+'</a></div>';
		html+='</div>'+
		'<div class="content">'+
			forum.f_content+
		'</div><div class="pull-right content-footer">'+
		'楼主&nbsp;&nbsp;'+(new Date(forum.f_date.time)).format("yy-MM-dd hh:mm:ss")+
	'</div></div>';
	}
	for(var i=0;i<postList.length;i++){
		$.ajax({
			async: false,
		    type: "POST",
		    cache:false, 
		    dataType: 'json',
		    url: "/getInfo",
		    timeout: 3000,
		    data:JSON.stringify({
		    	"ID":postList[i].user_ID,
		    	"type":postList[i].user_type
		    }),
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	var obj = eval('(' + msg + ')');
		    	html+='<div class="row" style="margin:0px;border-top: 1px solid #e7e9eb;">'+
				'<div class="head"><input type="hidden" value="'+postList[i].p_ID+'"/>';
		    	if(postList[i].user_ID == forum.user_ID)
		    		html+='<div class="host"></div>';
					if(postList[i].user_type == "saler")
						html+='<img class="headImg" src="'+obj.s_image+'"/>'+
							'<div class="hostname"><a>'+obj.s_name+'</a></div>';
					else if(postList[i].user_type == "user")
						html+='<img class="headImg" src="'+obj.u_image+'"/>'+
							'<div class="hostname"><a>'+obj.u_name+'</a></div>';
					else if(postList[i].user_type == "admin")
						html+='<img class="headImg" src="'+obj.ad_image+'"/>'+
							'<div class="hostname"><a>'+obj.ad_name+'</a></div>';
				html+='</div>'+
				'<div class="content">'+
					postList[i].p_content+
				'</div><div class="pull-right content-footer">';
				if(postList[i].user_ID==salerInfo.s_ID)
					html+='<a href="#" name="delPost">删除</a>&nbsp;&nbsp;';
				html+=(i+1+(currentPage-1)*10)+'楼&nbsp;&nbsp;'+
					(new Date(postList[i].p_date.time)).format("yy-MM-dd hh:mm:ss")+
			'</div></div>';
		    }
		});
	}
	$(".postList").html(html);
	
	}
	getPostList();
	

	$(document).on('click',"#savePost",function(e){ 
		$.ajax({
			async: false,
		    type: "POST",
		    cache:false, 
		    dataType: 'json',
		    url: "/newpost",
		    timeout: 3000,
		    data:JSON.stringify({
		    	"p_content":$(".textarea").val(),
		    	"p_image":"/image",
		    	"f_ID":forum.f_ID,
		    	"user_ID":salerInfo.s_ID,
		    	"user_type":"saler"
		    }),
		    contentType: "application/json;utf-8",
		    beforeSend:function(XMLHttpRequest){
				index = layer.msg('努力上传中...',{time:10*1000},  {
					  icon: 16, 
					  shade: 0.08,
					  offset: '20px'
					});
			},
		    complete:function(XMLHttpRequest , textStatus){ //请求完成后调用的回调函数（请求成功或失败时均调用）
		    	layer.close(index);
		    },
		    success: function(msg) {
		    	layer.close(index);
		    	document.getElementsByClassName("wysihtml5-sandbox")[0].contentWindow.document.body.innerText = "";
		    	$("#imgList").html(
		    			"<div class='addImg'>"+
				        "<div class='upReviewImage'> "+
				        "<input type='file' class='upReviewImg' id='wysiwyg_image_picture'/></div>"+
				        "</div>"		
		    	);
		    	layer.msg("发表成功" , {anim: 6 });
		    	setTimeout(getPostList(),1000);
		    }
		});
	});
	
	$(document).on('click',".empty",function(e){ 
    	document.getElementsByClassName("wysihtml5-sandbox")[0].contentWindow.document.body.innerHTML = "";
	});
	
	$(document).on('click',".pagination>li",function(e){ 
		//console.log("id:"+$(this).attr("id"));
		if($(this).attr("class")=="pre"&&currentPage!=1){
			$(".page_"+currentPage).removeClass("active");
			currentPage--;
			$(".page_"+currentPage).addClass("active");
			//console.log('a');
		}else if($(this).attr("class")=="next"&&currentPage!=totalpage){
			$(".page_"+currentPage).removeClass("active");
			currentPage++;
			$(".page_"+currentPage).addClass("active");
			//console.log('b');
		}else if($(this).attr("class")!="pre"&&$(this).attr("class")!="next"){
			$(".page_"+currentPage).removeClass("active");
			var cla ="."+ $(this).attr("class");
			$(cla).addClass("active");
			currentPage = $(this).text();
			//console.log('c');
		}
		
		getPostList();
		
		//console.log(currentPage);
		if(currentPage==1){
			$(".pre").addClass("disabled");
		}
		else{
			$(".pre").removeClass("disabled");
		}
		
		if(currentPage==totalpage){
			$(".next").addClass("disabled");
		}
		else{
			$(".next").removeClass("disabled");
		}
	});
	
	$(document).on('click',".like",function(e){ 
		if($(this).text()=="收藏"){
			$(this).text("取消收藏");
			$(this).addClass("btn-info");
			$.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    dataType: 'json',
			    url: "/newCollect",
			    timeout: 3000,
			    data:JSON.stringify({
			    	"userID":salerInfo.s_ID,
			    	"userType":"saler",
			    	"f_ID":forum.f_ID,
			    }),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	
			    }
			});
		}else{
			$(this).text("收藏");
			$(this).removeClass("btn-info");
			$.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    dataType: 'json',
			    url: "/deleteCollect",
			    timeout: 3000,
			    data:JSON.stringify({
			    	"userID":salerInfo.s_ID,
			    	"userType":"saler",
			    	"f_ID":forum.f_ID,
			    }),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	
			    }
			});
		}
	});
		
	$(document).on('click',".del",function(e){ 
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/deleteforum",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	layer.msg("删除成功" , {anim: 6 });
             	 setTimeout('window.location.href="/Forum"',1000);
		    }
		});
	});
		
	$(document).on('click',"[name=delPost]",function(e){ 
		var p_ID = $(this).parent().parent().find("input").val();
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    url: "/setP_ID",
		    timeout: 3000,
		    data:{"p_ID":p_ID},
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    //	window.location.href = "/Post";
		    }
		});
		
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/deletepost",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	layer.msg("删除成功" , {anim: 6 });
             	 setTimeout(getPostList(),1000);
		    }
		});
	});
	
	
});
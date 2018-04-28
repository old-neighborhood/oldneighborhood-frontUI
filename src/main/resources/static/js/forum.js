/**
 * 
 */
 window.onload = function(){
        	Pace.stop();
        }  

$().ready(function() {
	var page_size = 10;
	var currentPage=1;
	var totalpage;
	var sort = "date";
	$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/totalrows",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	totalpage = Math.ceil(msg/page_size);
		    	var html = '<li id="pre"><a href="#">&laquo;</a></li>';
		    	for(var i=0;i<totalpage;i++)
		    		html+='<li id="page_'+(i+1)+'"><a href="#">'+(i+1)+'</a></li>';
		    	html+='<li id="next"><a href="#">&raquo;</a></li>';
		    	$(".pagination").html(html);
		    	$(".pagination").find("#page_"+currentPage).addClass("active");
		    }
	});
	
	function getForumList(){
		var obj;
	$.ajax({
		async: false,
	    type: "POST",
	    cache:false, 
	    dataType: 'json',
	    url: "/forumlist",
	    timeout: 3000,
	    data:JSON.stringify({
	    	"current_page":currentPage,
	    	"page_size":page_size,
	    	"sort_term":sort
	    }),
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	obj = eval('(' + msg + ')'); 
	    	console.log(obj);
	    }
});
	var html = '';
	
	
	
	for(var i=0;i<obj.length;i++){
		var date = (new Date(obj[i].f_date.time)).format("yy-MM-dd hh:mm:ss");
		if(obj[i].isSticky){
			var posts = obj[i].posts;
			if(posts>=100)
				posts="99+";
			var userInfo;
			$.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    dataType: 'json',
			    url: "/getInfo",
			    timeout: 3000,
			    data:JSON.stringify({
			    	"ID":obj[i].user_ID,
			    	"type":obj[i].user_type
			    }),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	userInfo = eval('(' + msg + ')');
			    }});
			var totalCollect;
			$.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    url: "/totalCollect",
			    timeout: 3000,
			    data:JSON.stringify({"f_ID":obj[i].f_ID}),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	totalCollect = msg;
			    }});
			
			
			var name;
			if(obj[i].user_type == "saler")
				name = userInfo.s_name;
			else if(obj[i].user_type == "user")
				name = userInfo.u_name;
			else if(obj[i].user_type == "admin")
				name = userInfo.ad_name;
		html+='<tr><td class="comment"><label class="bubble">'+posts+'</label></td>'+
			'<td style="max-width:600px;min-width:600px;"><input type="hidden" value="'+obj[i].f_ID+'"/>'+
		'<a href="#" name="forumTitle" title="'+obj[i].f_title+'"><p><strong style="color:red;">[置顶]</strong><strong>'+obj[i].f_title+'</strong></p></a></td><td><i class="fa fa-user"></i>&nbsp;'+name+
		'</td><td>'+totalCollect+'/'+obj[i].f_view+'</td><td>'+date+'</td></tr>';
		}
	}
	for(var i=0;i<obj.length;i++){
		var date = (new Date(obj[i].f_date.time)).format("yy-MM-dd hh:mm:ss");
		if(!obj[i].isSticky){
			var posts = obj[i].posts;
			if(posts>=100)
				posts="99+";
			var userInfo;
			$.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    dataType: 'json',
			    url: "/getInfo",
			    timeout: 3000,
			    data:JSON.stringify({
			    	"ID":obj[i].user_ID,
			    	"type":obj[i].user_type
			    }),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	userInfo = eval('(' + msg + ')');
			    }});
			var totalCollect;
			$.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    url: "/totalCollect",
			    timeout: 3000,
			    data:JSON.stringify({"f_ID":obj[i].f_ID}),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	totalCollect = msg;
			    }});
			var name;
			if(obj[i].user_type == "saler")
				name = userInfo.s_name;
			else if(obj[i].user_type == "user")
				name = userInfo.u_name;
			else if(obj[i].user_type == "admin")
				name = userInfo.ad_name;
		html+='<tr><td class="comment"><label class="bubble">'+posts+'</label></td>'+
			'<td style="max-width:600px;min-width:600px;"><input type="hidden" value="'+obj[i].f_ID+'"/>'+
		'<a href="#" name="forumTitle" title="'+obj[i].f_title+'"><p>'+obj[i].f_title+'</p></a></td><td><i class="fa fa-user"></i>&nbsp;'+name+
		'</td><td>'+totalCollect+'/'+obj[i].f_view+'</td><td>'+date+'</td></tr>';
		}
	}
	$("#posts").html(html);
	}
	
	getForumList();
	
	if(currentPage==1){
		$("#pre").addClass("disabled");
		$("#pre>a").attr('disabled',true);
	}
	else{
		$("#pre").removeClass("disabled");
		$("#pre>a").attr('disabled',false);
	}
	
	if(currentPage==totalpage){
		$("#next").addClass("disabled");
		$("#next>a").attr('disabled',true);
	}
	else{
		$("#next").removeClass("disabled");
		$("#next>a").attr('disabled',false);
	}
	
	$(document).on('click',".pagination>li",function(e){ 
		//console.log("id:"+$(this).attr("id"));
		if($(this).attr("id")=="pre"&&currentPage!=1){
			$("#page_"+currentPage).removeClass("active");
			currentPage--;
			$("#page_"+currentPage).addClass("active");
			//console.log('a');
		}else if($(this).attr("id")=="next"&&currentPage!=totalpage){
			$("#page_"+currentPage).removeClass("active");
			currentPage++;
			$("#page_"+currentPage).addClass("active");
			//console.log('b');
		}else if($(this).attr("id")!="pre"&&$(this).attr("id")!="next"){
			$("#page_"+currentPage).removeClass("active");
			$(this).addClass("active");
			currentPage = $(this).text();
			//console.log('c');
		}
		
		getForumList();
		
		//console.log(currentPage);
		if(currentPage==1){
			$("#pre").addClass("disabled");
		}
		else{
			$("#pre").removeClass("disabled");
		}
		
		if(currentPage==totalpage){
			$("#next").addClass("disabled");
		}
		else{
			$("#next").removeClass("disabled");
		}
	});
	
	$(document).on('click',"a[name='forumTitle']",function(e){
		var f_ID = $(this).parent().find("input").val();
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    url: "/setF_ID",
		    timeout: 3000,
		    data:{"f_ID":f_ID},
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    //	window.location.href = "/Post";
		    }
		});
		var forumDetail;
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    url: "/forumdetail",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	forumDetail = eval('(' + msg + ')');
		    }
		});
		console.log(forumDetail.f_view+1);
		$.ajax({
			async: false,
		    type: "POST",
		    cache:false, 
		    url: "/editforum",
		    timeout: 3000,
		    data:JSON.stringify({
		    	"f_title":forumDetail.f_title,
		    	"f_content":forumDetail.f_content,
		    	"f_image":forumDetail.f_image,
		    	"f_view":forumDetail.f_view+1
		    }),
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	window.location.href = "/Post";
		    }
		});
	});
	$(document).on('click',".dropdown-menu>li",function(e){ 
		var txt = $(this).text()+'<span class="caret"></span>';
		var chooseSort = $(this).parent().parent().find(".dropdown-toggle");
		chooseSort.html(txt);
		if($(this).text()=="回复时间排序")
			sort = "date";
		else if($(this).text()=="按热度排序")
			sort = "hot";
		getForumList();
	});
	
	
	
});
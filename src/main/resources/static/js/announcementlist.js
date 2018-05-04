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
		var sort = true;
		$.ajax({
			async: false,
		    type: "POST",
		    cache:true, 
		    dataType: 'json',
		    url: "/announcementList",
		    timeout: 3000,
		    data:JSON.stringify({
		    	"current_page":1,
		    	"page_size":200,
		    	"desc_sort":sort
		    }),
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	var t =obj = eval('(' + msg + ')');
		    	totalpage = Math.ceil(t.length/page_size);
		    	var html = '<li id="pre"><a href="#">&laquo;</a></li>';
		    	for(var i=0;i<totalpage;i++)
		    		html+='<li id="page_'+(i+1)+'"><a href="#">'+(i+1)+'</a></li>';
		    	html+='<li id="next"><a href="#">&raquo;</a></li>';
		    	$(".pagination").html(html);
		    	$(".pagination").find("#page_"+currentPage).addClass("active");
		    }
	});
			   
		
		function getAnnounceList(){
			var obj;
		$.ajax({
			async: false,
		    type: "POST",
		    cache:true, 
		    dataType: 'json',
		    url: "/announcementList",
		    timeout: 3000,
		    data:JSON.stringify({
		    	"current_page":currentPage,
		    	"page_size":page_size,
		    	"desc_sort":sort
		    }),
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	obj = eval('(' + msg + ')'); 
		    }
	});
		var html = '';
		for(var i=0;i<obj.length;i++){
			var date = (new Date(obj[i].a_date.time)).format("yy-MM-dd hh:mm:ss");
			if(obj[i].isSticky){
			html+='<tr>'+
				'<td style="max-width:600px;min-width:600px;"><input type="hidden" value="'+obj[i].a_ID+'"/>'+
			'<a href="#" name="announceTitle" title="'+obj[i].a_title+'"><p><strong style="color:red;">[置顶]</strong><strong>'+obj[i].a_title+'</strong></p></a></td><td><i class="fa fa-user"></i>&nbsp;'+obj[i].a_author+
			'</td><td>'+obj[i].a_view+'</td><td>'+date+'</td></tr>';
			}
		}
		for(var i=0;i<obj.length;i++){
			var date = (new Date(obj[i].a_date.time)).format("yy-MM-dd hh:mm:ss");
			if(!obj[i].isSticky){
			html+='<tr>'+
				'<td style="max-width:600px;min-width:600px;"><input type="hidden" value="'+obj[i].a_ID+'"/>'+
			'<a href="#" name="announceTitle" title="'+obj[i].a_title+'"><p>'+obj[i].a_title+'</p></a></td><td><i class="fa fa-user"></i>&nbsp;'+obj[i].a_author+
			'</td><td>'+obj[i].a_view+'</td><td>'+date+'</td></tr>';
			}
		}
		$("#announces").html(html);
		}
		
		getAnnounceList();
		
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
			
			getAnnounceList();
			
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
		
		$(document).on('click',"a[name='announceTitle']",function(e){
			var a_ID = $(this).parent().find("input").val();
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    url: "/setA_ID",
			    timeout: 3000,
			    data:{"a_ID":a_ID},
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	window.location.href = "/Announce";
			    }
			});
			
		});
		$(document).on('click',".dropdown-menu>li",function(e){ 
			var txt = $(this).text()+'<span class="caret"></span>';
			var chooseSort = $(this).parent().parent().find(".dropdown-toggle");
			chooseSort.html(txt);
			if($(this).text()=="时间顺序排序")
				sort = true;
			else if($(this).text()=="时间倒序排序")
				sort = false;
			getAnnounceList();
		});
		
		
		
	});
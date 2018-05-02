/**
 * 
 */


$(document).on('click',"#head",function(e){   
	  var src=$(this).attr("src");
 var large_image = "<img src=" + src + "/>";
 $('#large-image').html($(large_image).animate({ height: '70%', width: '70%' }, 500));
	  console.log(src);
});	

	$().ready(function() {
		
			 $.ajax({
				    async: false,
				    type: "GET",
				    cache:true, 
				    dataType: 'json',
				    url: "/info",
				    timeout: 3000,
				    contentType: "application/json;utf-8",
				    success: function(msg) {
			 			var infoTable = $('#infoTable');
			 			var info = msg;
				     	var salerId = info.s_ID;
						var salerName = info.s_name;
						var salerPassword = info.s_password;
						var salerImage = info.s_image;
						var salerTele = info.s_tele;
						var salerEmail = info.s_email;
						if(info.s_email==null){
							salerEmail="";
						}
						var salerAddress = info.s_address;
						var salerSignature = info.s_signature;
						var salerDate = (new Date(parseFloat(info.s_date))).format("yyyy-MM-dd hh:mm:ss");
						var salerScore = info.s_score;
						infoTable.html(
								 '<tbody>'
								+'<tr><td>头像</td><td>'
								+'<img data-toggle="modal" data-target="#myModal" alt="头像" id="head"'
								+' class="img-circle" height="50" width="50" src="'+ salerImage
								+ '"/></td></tr>'
								+'<tr><td>用户名：</td><td>'+ salerName + '</td></tr>'
								+'<tr><td>密码：</td><td>'+ salerPassword + '</td></tr>'
								+'<tr><td>电话号码：</td><td>'+ salerTele + '</td></tr>'
								+'<tr><td>邮箱：</td><td>'+ salerEmail + '</td></tr>'
								+'<tr><td>地址：</td><td>'+ salerAddress + '</td></tr>'
								+'<tr><td>个人签名：</td><td>'+ salerSignature + '</td></tr>'
								+'<tr><td>注册日期：</td><td>'+ salerDate + '</td></tr>'
								+'<tr><td>积分：</td><td>'+ salerScore + '</td></tr>'
								+'</tbody>'
						);
				    },
				    error:function(XMLHttpRequest, textStatus, errorThrown){ // 请求失败时被调用的函数。3个参数：XMLHttpRequest对象、错误信息、捕获的错误对象
				    	console.log(textStatus+":"+errorThrown);
				    	layer.msg("请求未成功" , {anim: 6 });
				    }
				  });
			 
			
	});
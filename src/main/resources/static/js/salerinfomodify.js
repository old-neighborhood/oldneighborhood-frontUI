/**
 * 
 */

		var salerId = null;
	$().ready(function() {
		
		
		
			 $.ajax({
				    async: false,
				    type: "GET",
				    cache:false, 
				    dataType: 'json',
				    url: "/info",
				    timeout: 3000,
				   contentType: "application/json;utf-8",
				    success: function(msg) {
				     	console.log(msg);
				     	var info = msg;
			 			var infoTable = $('#infoTable');
				     	salerId = info.s_ID;
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
								+'<tr><td>头像：</td><td><div class="row"><div class="col-md-2"><img id="head" data-toggle="modal" data-target="#myModal" class="img-circle" height="50" width="50" src="'+ salerImage+'"/></div>'
								+'<div class="col-md-10" style="padding-top:10px;"><input type="file" id="upImg" onchange="upImg(this)" name="uploadImg"/></div></div></td></tr>'
								+'<tr><td>用户名：</td><td><input class="form-control" type="text" id="name" value="'+ salerName + '"/></td></tr>'
								+'<tr><td>密码：</td><td><input class="form-control" type="text" id="password" value="'+ salerPassword + '"/></td></tr>'
								+'<tr><td>电话号码：</td><td><input class="form-control" type="text" id="tele" value="'+ salerTele + '"/></td></tr>'
								+'<tr><td>邮箱：</td><td><input class="form-control" type="text" id="email" value="'+ salerEmail + '"/></td></tr>'
								+'<tr><td>地址：</td><td><input class="form-control" type="text" id="address" value="'+ salerAddress + '"/></td></tr>'
								+'<tr><td>个人签名：</td><td><textarea class="form-control" id="signature" rows="5">'+ salerSignature + '</textarea></td></tr>'
								+'</tbody>'
						);
				    },
				    error:function(XMLHttpRequest, textStatus, errorThrown){ //请求失败时被调用的函数。3个参数：XMLHttpRequest对象、错误信息、捕获的错误对象
				    	console.log(textStatus+":"+errorThrown);
				    	layer.msg("请求未成功" , {anim: 6 });
				    }
				  });
	});
	
	
	
	$(document).on('click',"#save",function(e){   
		var fd = new FormData();
		 var file_obj = document.getElementById('upImg').files[0];
		//console.log(document.getElementById('upImg').value!=null);
        fd.append('id',salerId);
		fd.append('name', document.getElementById('name').value);
		if(document.getElementById('upImg').value!="")
       	 fd.append('img', document.getElementById("head").src);
        fd.append('password',document.getElementById('password').value);
		fd.append('tele',document.getElementById('tele').value);
		fd.append('email',document.getElementById('email').value);
		fd.append('address',document.getElementById('address').value);
		fd.append('signature',document.getElementById('signature').value);
		 $.ajax({
             url: 'modify',
             type: 'POST',
             data: JSON.stringify({
            	 'id':salerId,
            	 'name': document.getElementById('name').value,
            	 'img':document.getElementById("head").src,
            	 'password':document.getElementById('password').value,
            	 'tele':document.getElementById('tele').value,
            	 'email':document.getElementById('email').value,
            	 'address':document.getElementById('address').value,
            	 'signature':document.getElementById('signature').value
             }),
             async: false,
             cache: false,
             contentType: "application/json;utf-8",
             processData: false,
             dataType: "json",//问题就在这里，如果用了jsonp，那么后台就接收不到文件流，无法获得文件流，就没办法把文件写入服务器。如果不指定，就是注释掉，虽然ajax提交之后，还是跑到error那里去，但是文件已经是成功写入服务器的了。
             
             success: function() {
            	 layer.msg("保存成功" , {anim: 6 });
            	 setTimeout('window.location.href="/SalerInfo"',1000);
                 //window.location.href="salerInfo.html";
                // alert("success");
             },
             error: function(returndata) {
                 console.log(returndata);
                // layer.msg("保存成功" , {anim: 6 });
             }
         });
		
		
		
		
	}) ; 
		  $(document).on('click',"#head",function(e){   
			  var src=$(this).attr("src");
		   var large_image = "<img src='" + src + "'/>";
		   $('#large-image').html($(large_image).animate({ height: '70%', width: '70%' }, 500));
		  });
	
	function upImg(obj){  
	    var imgFile = obj.files[0];  
	    console.log(imgFile);
	    var img = new Image();  
	    var imgURL = ""; 
	    var fr = new FileReader();  
	    fr.onload = function(){  
	        document.getElementById("head").src=fr.result;
	    console.log(fr.result);
	    }  
	    fr.readAsDataURL(imgFile); 
	    console.log(obj.value);
	    
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
        initFileInput("upImg");  
          
    })  
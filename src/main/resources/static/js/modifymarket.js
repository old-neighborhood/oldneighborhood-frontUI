/**
 * 
 */
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
  
      var marker=new qq.maps.Marker({
          position:center,
			animation:qq.maps.MarkerAnimation.DROP,
          map:map
      });
 
}

$().ready(function() {
		
		$.ajax({
		    async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/getMarket",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	console.log(msg.m_ID);
		    	$("#m_name").val(msg.m_name);
		    	$("#m_address").val(msg.m_address.split(",")[0]);
		    	$("#m_tele").val(msg.m_tele);
		    	$("#m_email").val(msg.m_email);
		    	$("#m_type").val(msg.m_type);
		    	$("#head").attr("src",msg.m_image);
		    	$("#m_intro").val(msg.m_intro);
		    }
		});
		
		 $(document).on('click',"#head",function(e){   
			  var src=$(this).attr("src");
		   var large_image = "<img src='" + src + "'/>";
		   $('#large-image').html($(large_image).animate({ height: '70%', width: '70%' }, 500));
			  //console.log(src);
		  });	
		 
		 $(document).on('click',"#saveMarket",function(e){
			  $.ajax({
				    type: "POST",
				    async: false,
		             cache: false,
		             dataType:"json",
				    url: "/modifyMarket",
				    contentType:"application/json",
				     data: JSON.stringify({
		            	'm_name':$("#m_name").val(),
		    			'm_address':$("#m_address").val()+","+map.getCenter(),
		    			'm_tele':$("#m_tele").val(),
		    			'm_email':$("#m_email").val(),
		    			'm_image':$("#head").attr("src"),
		    			'm_intro':$("#m_intro").val()
		            }), 
				    timeout: 3000,
				  // contentType: "application/jsonp;utf-8",
				    success:function(data){
				    	
				    	layer.msg("保存成功" , {anim: 6 });
				    	setTimeout("window.location.href='/MarketInfo'",1000);
		                // window.location.href="marketList.html";
				    },
				    error: function(){
	    				alert("error");
	    	    		//请求出错处理
	    	    				}
			 }); 
	});
	});
		 function upImg(obj){  
		     var imgFile = obj.files[0];  
		    var img = new Image();  
		    var fr = new FileReader();  
		    fr.onload = function(){  
		        document.getElementById("head").src=fr.result;
		   // console.log(fr.result);
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
		        initFileInput("upImg");  
		          
		    })  
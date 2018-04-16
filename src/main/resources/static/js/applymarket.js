/**
 * 
 */
$(document).on('click',"#saveMarket",function(e){
		
			  $.ajax({
				    type: "POST",
				    async: false,
		             cache: false,
		             dataType:"json",
				    url: "/addMarket",
				    contentType:"application/json",
				     data: JSON.stringify({
		            	'm_name':$("#m_name").val(),
		    			'm_address':$("#m_address").val(),
		    			'm_tele':$("#m_tele").val(),
		    			'm_email':$("#m_email").val(),
		    			'm_type':$("#m_type").find("option:selected").val(),
		    			'm_image':$("#head").attr("src"),
		    			'm_intro':$("#m_intro").val()
		            }), 
				    timeout: 3000,
				  // contentType: "application/jsonp;utf-8",
				    success:function(data){
				    	layer.msg("保存成功" , {anim: 6 });
		            	 setTimeout('window.location.href="/MarketList"',1000);
		                 //window.location.href="marketList.html";
				    },
				    error: function(){
	    				alert("error");
	    	    		//请求出错处理
	    	    				}
			 }); 
	});
	
	 $(document).on('click',"#head",function(e){   
			  var src=$(this).attr("src");
		   var large_image = "<img src='" + src + "'/>";
			  $('#large-image').html($(large_image).animate({ height: '70%', width: '70%' }, 500));
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
            showRemove:true,  
            showPreview : false,
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
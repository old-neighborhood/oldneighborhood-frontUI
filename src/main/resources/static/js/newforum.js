/**
 * 
 */
$().ready(function() {
	var csrf_token = $('meta[name=csrf-token]').attr('content');
	  var csrf_param = $('meta[name=csrf-param]').attr('content');
	  var customTemplates = {
	    image : function(context) {
	      var locale = context.locale;
	      var options = context.options;
	      return "<li>" +
	        "<div class='bootstrap-wysihtml5-insert-image-modal modal fade' data-wysihtml5-dialog='insertImage'>" +
	        "<div class='modal-dialog'>" +
	        "<div class='modal-content'>" +
	        "<div class='modal-header' style='padding-bottom:5px;'>" +
	        " <a class='close' data-dismiss='modal'>×</a>" +
	        "<p style='font-size:20px;'>插入图片 </p>" +
	        "</div>" +
	        "<div class='modal-body'>" +
	        "<div class='upload-picture'>" +
	        "<form accept-charset='UTF-8' class='form-horizontal' id='wysiwyg_image_upload_form' method='post' enctype='multipart/form-data'>"+
	        "<div class='form-group' id='imgList'>" +
	        "<div class='addImg'>"+
	        "<div class='upReviewImage'> "+
	        "<input type='file' class='upReviewImg' id='wysiwyg_image_picture'/></div>"+
	        "</div>"+
	      //  "<input class='btn btn-primary' style='width:100%;' id='wysiwyg_image_submit' name='commit' type='bytton' value='上传'></input>"+
	       
	        "</div>" +
	        "</form>"+
	        "</div>"+
	        "<div class='form-group'>" +
	        "<input type='hidden' value='http://' id='bootstrap-wysihtml5-picture-src' class='bootstrap-wysihtml5-insert-image-url form-control' data-wysihtml5-dialog-field='src'>"+
	        "</div>" +
	        "<div id='wysihtml5_upload_notice'>"+
	        "</div>"+
	        "</div>" +
	        "<div class='modal-footer'>" +
	        "<a href='#' class='btn btn-default' data-dismiss='modal'> 取消 </a>" +
	        "<input class='btn btn-primary' id='wysiwyg_image_submit' name='commit' type='button' value='清空'></input>"+
	        "<a class='btn btn-primary' id='insert' data-dismiss='modal'href='#'> 插入图片</a>"+
	        "</div>" +
	        "</div>" +
	        "</div>" +
	        "</div>" +
	        "<a class='btn btn-sm btn-default' data-wysihtml5-command='insertImage' title='" + locale.image.insert + "' tabindex='-1'><span class='glyphicon glyphicon-picture'></span></a>" +
	        "</li>";
	    }
	  };
	  $('.textarea').each(function(i, elem) {
	    $(elem).wysihtml5({
	      toolbar: {
	        "color": true,
	        "size": 'sm',
	        "height":"auto"
	      },
	      "locale" : 'zh-CN',
	      customTemplates: customTemplates
	    });
	  });
	//$('.textarea').wysihtml5();
	  var imgHTML = '';
	  var imgCount = 0;
	  var textHTML = '';
	  $(document).on('change',".upReviewImg",function(e){ 
		  upload();
	  });
	  
	  $(document).on('click',"#wysiwyg_image_submit",function(e){ 
		  imgHTML="";
		  textHTML = '';
		  imgCount = 0;
		  $("#imgList").html(imgHTML+
		    		"<div class='addImg'>"+
			        "<div class='upReviewImage'> "+
			        "<input type='file' class='upReviewImg' id='wysiwyg_image_picture'/></div>"+
			        "</div>"
		    );
	  });
	  function upload(){ 
		  var obj =$(".upReviewImg");
		 var imgFile = obj[0].files[0];
		    var imgSrc=''; 
		    var fr = new FileReader();  
		    fr.onload = function(){  
		    $("#bootstrap-wysihtml5-picture-src").val(fr.result);
		    
		    imgHTML+='<div class="addImg"><img style="width:120px;height:120px;" src="'+fr.result+'"/></div>';
		    imgCount++;
		    if(imgCount<4)
		    $("#imgList").html(imgHTML+
		    		"<div class='addImg'>"+
			        "<div class='upReviewImage'> "+
			        "<input type='file' class='upReviewImg' id='wysiwyg_image_picture'/></div>"+
			        "</div>"
		    );
		    else
		    	 $("#imgList").html(imgHTML);
		    var name = '';
		    $.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    dataType: 'json',
			    url: "/postImg",
			    timeout: 3000,
			    data:JSON.stringify({
			    	"src":fr.result,
			    }),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	name=msg;
			    }
			    });
		    textHTML += '<img src="/post/'+name+'"/>';
		    $("#wysiwyg_image_picture").val("");
		    $(".file-caption-name").val("");
		    }  
		    if(imgFile!=null)
		    fr.readAsDataURL(imgFile); 
		 
	  }
	  
	  $(document).on('click',"#insert",function(e){ 
		  var textarea = document.getElementsByClassName("wysihtml5-sandbox")[0].contentWindow.document.body;
		  if(textarea.innerHTML == "Enter text ...")
			  textarea.innerHTML ='<p>'+ textHTML+'</p>'; 
		  else
			  textarea.p.innerHTML += textHTML;
	  });
	  
	  $(document).on('click',"#saveForum",function(e){
		  $("#show").html($(".textarea").val());
		  var info='';
		  $.ajax({
			    async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    url: "/info",
			    timeout: 3000,
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	info=msg;
			    }});
		  
		  $.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    dataType: 'json',
			    url: "/newforum",
			    timeout: 3000,
			    data:JSON.stringify({
			    	"f_title":$("#f_title").val(),
			    	"f_content":$(".textarea").val(),
			    	"f_image":info.s_image,
			    	"user_ID":info.s_ID,
			    	"user_type":"saler"
			    }),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	layer.msg("发表成功" , {anim: 6 });
			    	setTimeout('window.location.href="/Forum"',1000);
			    }
			    });
	  });
});

  
 
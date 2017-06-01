
 		var from_author = "";
		var has_qa = "true";
		var actives = "";
		var total_qa_count = 0;
		var qa_rcount = "0";
		if(qa_rcount != ""){
			qa_rcount = Number(qa_rcount);
		}else{
			qa_rcount = 0; 
		}
		var qa_right_count = 0;	
		var finish_time = "6";
		if(Number(finish_time) > 0){
			act_require_message = "观看"+finish_time+"分钟的视频";
		}
	 	father_need_point = "";
		
		var stud_video_tiem = "0";
		var user_id = "c8070788e8504aa3b4b58a053af2fca5";
		var videoTimeStep = Number(1);
		var lastTime = Number(1);
		var interval_time = Number(5);//默认五分钟执行一次
		var video_alltime=0;
		var old_pro_over = "";
		if((stud_video_tiem == null && stud_video_tiem == "") ||(old_pro_over == "Y" || old_pro_over == "100")) 
		{
			stud_video_tiem = 0;
		} else {
			stud_video_tiem = Number(stud_video_tiem);
		}
		
		if(finish_time == null || finish_time == "") {
			finish_time = 0;
		} else {
			finish_time = Number(finish_time);
		}
		var qaMap = new Object();
		//创建一个播放器 
		var vflashvars = {};
		vflashvars["file"]				   	= 'E0ZjpfoD2ObufwVUA688KdFyWlOviaZECigGaXRdsFA9Gau61t8QvfTpCZc4szq9kxwJxeFgGy4tCWc2TxOB5qM0pMwkZngJ8KGs9tY9fgZ6zqxc7gwFpyZswmunY6Xxy81a7Kx6qvnSyJj8/XwmvxrvQHz/TrFEMl6xwXrUP9+KFjIma367cmYMheg8XZsClSXufazvWem5sxRR2pdovvF598mvPT9zopB4sxxKfquloe4i7omvNENXjfGM3l7xI80o/2Sb3jlRkgy0uaMDkg==';
		vflashvars["skinpath"]				= "assets/xuelijiaoyu_yinbai.swf"
		vflashvars["controlbar.enabled"] 	= "true";					//禁用控制条，直至播放器准备完毕再启用
		vflashvars["doubleClickEnabled"]     = true;
		//其它数据
		vflashvars["start"] = stud_video_tiem * 60;
		if("Y" == 'Y'){
			vflashvars["jumppath"] = "";
		} else {
			vflashvars["jumppath"] = "";
		}
		vflashvars["plugins"] = "expandControl|activity|broadband|notification";
		vflashvars["time_notification"]  = 60; //时间通知间隔
		if(has_qa == "true"){
			vflashvars["keyframeFiltrateText"] = "暂未开放,请先参与前面题目";   //活动限制后显示文字 
		}
		if("Y" == 'Y'){
			vflashvars["activityHidePoint"] = false;
		}else{
			vflashvars["activityHidePoint"] = true;
		} 
		
		// 检测是否安装swf及版本是否符合要求
		var vswfVerNum = swfobject.getFlashPlayerVersion().major;
		if (vswfVerNum<1) {
			var vhtmlStr = "<div class=\"no_data\" style=\"margin-top:25%;*top:35%;\">";
			vhtmlStr += "<div class=\"center_outer\">";
			vhtmlStr += "<div class=\"center_inner\">";
			vhtmlStr += "本视频播放需要安装flash，请先安装<a href='http://get.adobe.com/cn/flashplayer/' target='view_window' style='color:red'>视频插件</a>，安装完成之后请刷新页面！";
			vhtmlStr += "</div>";
			vhtmlStr += "</div>";
			vhtmlStr += "</div>";		
			$("#actContent").html(vhtmlStr);
		} else if(vswfVerNum>1 && vswfVerNum<10) {
			var vhtmlStr = "<div class=\"no_data\" style=\"margin-top:25%;*top:35%;\">";
			vhtmlStr += "<div class=\"center_outer\">";
			vhtmlStr += "<div class=\"center_inner\">";
			vhtmlStr += "你的flash版本过低，请先先升级<a href='http://get.adobe.com/cn/flashplayer/' target='view_window' style='color:red'>视频插件</a>，完成之后请刷新页面！";
			vhtmlStr += "</div>";
			vhtmlStr += "</div>";
			vhtmlStr += "</div>";		
			$("#actContent").html(vhtmlStr);
		}
		
		hasCaption = "N";
		
		
	   var qaStatus = new Object();
	   
	   function updateQaStatus(){
	   		total_qa_count = 0;
	   		for(var i in qaStatus[0])
			{
				total_qa_count = total_qa_count + 1;
				if(qaStatus[0][i]["IS_RIGHT"] == "Y"){
					if(videoplayer != null && !videoplayer.isDestory){
						videoplayer.updateActivity(i,3, true);
					}
					if(qa_rcount > 0){
						qa_right_count = qa_right_count + 1;
					}
				}else if(qaStatus[0][i]["IS_RIGHT"] == "N"){
					if(videoplayer != null && !videoplayer.isDestory){
						videoplayer.updateActivity(i,2,true);
					}
				}
			}
			if(qa_rcount > 0){
				act_require_message = act_require_message +"，答题正确率达到"+Math.floor(Number(qa_rcount/total_qa_count)*100)+"%";
			}
	   }
	   
 	   function qaRecord(type)
 	   {
			if(!$.isEmptyObject(qaStatus)){
 	   			updateQaStatus();
 	   		}else{
				var postData = "formMap.ENTITY_ID=56c192b47f0000012862355c3bcc8310&formMap.USER_ID="+user_id+"&time="+new Date().getTime();
				$.ajax({
					type:"post", 
					url:"/video/student/getUserQaRecord.do",
					data: postData, 
					success:function(resultData)
					{
						if(resultData!="") 
						{
							qaStatus = eval(resultData);
							updateQaStatus();
						}
						if(type != null && type != "" && type == "over"){
							vlasttip();
						}
					}
				});
			}
 	   }
 	     
 	   //更新状态
		function updVedioTime(videoTime,clickType) 
		{

			if(old_pro_over!="Y")
			{
				if (videoTime==null || videoTime=="") 
				{
					videoTime = videoplayer.getPosition()/60+"";
				}
				var re1 = /([0-9]+\.[0-9]{2})[0-9]*/;
				videoTime = (Number(videoTime)+"").replace(re1,"$1");
				
				if(Number(videoTime)>=Number(stud_video_tiem))
				{
                    stud_video_tiem=videoTime;
					var stuActPercent = (videoTime/finish_time)*100;
					var re = /([0-9]+\.[0-9]{1})[0-9]*/;
					stuActPercent = Math.round(Number((stuActPercent+"").replace(re,"$1")));
					if (videoTime >= finish_time) 
					{
						stuActPercent = "Y";
					}else
					{
						if(stuActPercent>=100)
						{
							stuActPercent=99;
						}
					}
					
					$.ajax({
						type:"post", 
						url:"/video/student/updateStudVideoTime.do",
						data: "formMap.PARAMETER_STR=53C411B0DD68D15B99518208F652C926962E2A586B5B3C5403116B95F71CB96EC9655644E186CBB047B28ACC6E420C9721B033682CB5B4A1475D416C62A931CCBD95EED23DA2ACD629F8BF6572B15E30F9844823CC9F743F29D894FDCFCA9F40EC210CCADFFF3708A9D6C1144D0FCD4DF7114E4A11C6CC1CC26064C3D69D944E21565823C32E4A053385FAC94D47C1D9E4CE63BF89C2C278DB60004E152F2861789E14F875A6E816&formMap.NEED_POINT=&formMap.VIDEO_TIME="+encode64(videoTime)+"&formMap.FINISH_TIME="+finish_time+"&formMap.STUD_VIDEO_TIME="+stud_video_tiem+"&formMap.INTERVAL_TIME="+interval_time+"&formMap.CLICKTYPE="+clickType+"&formMap.USER_ID="+user_id+"&formMap.VIDEO_ALLTIME="+video_alltime, 
						dataType:"text",
						success:function(resultData)
						{
							var needPoint = 0;
							if(resultData != null && resultData!="")
							{
								if(resultData!=9999&&resultData!=8888&&resultData!=7777&&resultData!=6666&&resultData!=5555&&resultData>0)
								{

								    if(resultData==100)
								    {
									  old_pro_over = "Y";
									  needPoint = '';
								    }

									
									if (videoplayer!=null && videoplayer!="") {
										if(stud_video_tiem>=finish_time && !videoplayer.isDestory) 
										{
										  videoplayer.removeFiltrate();
										  videoplayer.setActivityEnabled(true);
								      	}
									}
							      	
							      	if('Y' != "" && 'Y' == 'Y')
									{
										changeStatus('56c192b47f0000012862355c3bcc8310',resultData, needPoint, 'Y');
									}else
									{
										changeMainActStatus('56c192b47f0000012862355c3bcc8310',resultData, '', needPoint, 'Y');
									}
								}else if(resultData==9999)
								{
									if(clickType=="1")
									{
										videoplayer.pause();
									}
									userOpen("抱歉，参数传递错误，为了不影响学习记录，请重新登录学习！");
								}else if (resultData==8888)	
								{
									resultData=100;
									old_pro_over = "Y";
									needPoint = '';
									if('Y' != "" && 'Y' == 'Y')
									{
										changeStatus('56c192b47f0000012862355c3bcc8310',resultData, needPoint, 'Y');
									}else
									{
										changeMainActStatus('56c192b47f0000012862355c3bcc8310',resultData, '', needPoint, 'Y');
									}
								}else if (resultData==7777)
								{
									videoplayer.pause();
									userOpen("登录超时，请退出学习平台，请重新登录！");
								}else if (resultData==6666)
								{
									videoplayer.pause();
									userOpen("系统检测到当前登录用户是：邓林安，与本页面用户信息不一致，为了避免影响学习记录，请不要在同一个浏览器窗口中同时登录多个学员账号！");
								}else if (resultData==5555)
								{
									videoplayer.pause();
									userOpen("系统检测到您的账号已经在其他地方登录，如非本人操作，请及时修改密码，确保账号安全！");
								}
							}
						},
					   	error: function (XMLHttpRequest, textStatus, errorThrown) 
					   	{
							if (videoTime!=null && videoTime!="") 
							{
								
								if(textStatus == 'error')
								{
									var str=XMLHttpRequest.status;
									if(str!=""&&str!=null&&(str.indexOf("40")>-1||str.indexOf("50")>-1))
									{										
										try
										{
											addErrorLog("视频计时提交报错-页面",XMLHttpRequest.status+"==="+XMLHttpRequest.readyState+"==="+errorThrown,"56c192b47f0000012862355c3bcc8310");
										}catch(e){}
									}
								}else
								{
									var error_str="";
									videoplayer.pause();
							    	this; // 调用本次AJAX请求时传递的options参数
							    	if(textStatus == 'timeout')
							    	{
							    		error_str="记时出错002";
							    		alert("抱歉，您与服务器失去连接，请重新登录！错误代码001");
							    	}else if(textStatus == 'notmodified')
							    	{
							    		error_str="记时出错003";
										alert("抱歉，您与服务器失去连接，请重新登录！错误代码003");
									}else if(textStatus == 'parsererror')
									{
										error_str="记时出错004";
										alert("抱歉，您与服务器失去连接，请重新登录！错误代码004");
									}else
									{
										error_str="记时出错005";
										alert("抱歉，您与服务器失去连接，请重新登录！");
									}
									
									try
									{
										addErrorLog("视频计时提交报错-页面",error_str,"56c192b47f0000012862355c3bcc8310");
									}catch(e){}
									
							    	window.open("","_self").close();
								}
						    }
						}
			   		});
		   		}
	   		}
		}
		
		function getVideoTotalTime(){
 	   		var userVideoTime = "0";
 	   		var re = /([0-9]+\.[0-9]{0})[0-9]*/;
 	   		if(videoplayer != null && !videoplayer.isDestory){
 	   			userVideoTime = Number(videoplayer.getPosition());
				return Number((Math.floor(userVideoTime/60)+"").replace(re,"$1"))+"分"+Number(((userVideoTime%60)+"").replace(re,"$1"))+"秒";
 	   		}else{
 	   			userVideoTime = userVideoTime * 60;
 	   			return Number((Math.floor(userVideoTime/60)+"").replace(re,"$1"))+"分"+Number(((userVideoTime%60)+"").replace(re,"$1"))+"秒";
 	   		}
 	   }
 	   
 	   function getUserVideoTime(){
 	   		var userVideoTime = "0";
 	   		if(videoplayer != null && !videoplayer.isDestory)
 	   		{
 	   			var re1 = /([0-9]+\.[0-9]{2})[0-9]*/;
 	   			userVideoTime = (Number(videoplayer.getPosition()/60)+"").replace(re1,"$1");	
 	   		}
 	   		return userVideoTime;
 	   }
		
		//视频播放完 提示信息
 	   	function vlasttip()
 	   	{
 	   		var user_videoTime =getUserVideoTime();
 	   		$("#prompt_wrapper").hide();
 	   		$("#test_layer").show();
 	   		if('Y' != "" && 'Y' == 'Y'){
 	   			$("#videoover").show();
 	   		}else{
				$("#boardover").show();
			}
			var tip_needpoint = $("#act_point").find(".fraction").html();
			var actid = $("#comment_act_id").val();
			var nodoCount = 0;
			
			if(qaStatus[0] != ""){
				for(var m in qaStatus[0]){
					if(qaStatus[0][m]["IS_RIGHT"] !="" && qaStatus[0][m]["IS_RIGHT"]=="Y")
					{
						nodoCount ++;
					}
				}
			}
			
			var getPoint = 0;
			if("" != "" && "" != "0" && old_pro_over == 'Y'){
				getPoint = "";
			}
			
			var overHmtl = "";
			
			if('Y'== "" || 'Y' != 'Y'){
				overHmtl ="<div class=\"test_header\">"+
						  "<h1>完成情况</h1>";
				overHmtl = overHmtl + "</div>"+
						"<div class=\"test_maincontent\">";
			}
			overHmtl = overHmtl+"<div class=\"test_wrapper\">"+
						"<div class=\"content\">"+
						"<div class=\"score_container\">"+
                		"<div class=\"score_box top20\" style=\"*height:auto;\">"+
                		"<div class=\"center_inner\" style=\"*display: inline;left: 0px;top: 0px;\">"+
                		"<div class=\"typeset score_overview\">";
            if(old_pro_over !="Y" ){
                  overHmtl = overHmtl + "<div class=\"fixed\"><img src=\"http://css.eenet.com/course_platform_v5/student/latest/icon/ico_failure.png\" /></div>";
                  overHmtl = overHmtl + "<div class=\"adaptive\"><p class=\"score_overview\"><span class=\"important_field failure\">未完成</span></p></div>";
            }else{
            	overHmtl = overHmtl + "<div class=\"fixed\"><img src=\"http://css.eenet.com/course_platform_v5/student/latest/icon/ico_success.png\" /></div>";
                overHmtl = overHmtl + "<div class=\"adaptive\"><p class=\"score_overview\"><span class=\"important_field pass\">已完成</span></p></div>";
            }
            overHmtl = overHmtl + "</div>";
            overHmtl = overHmtl + "</div>";
      		overHmtl = overHmtl + "<div class=\"btns_bar margin_b20\">"+
                    	"<a href=\"javascript:;\" class=\"btn_lightgray\" onclick=\"reStudyKnow('video');\"><i class=\"icon ico_reset bg_png\"></i>重学一次</a>"+
                    	"</div>"+
                    	"</div>"+
            			"<div style=\"text-align:left;\">";
			
            if(finish_time > 0 || qa_rcount > 0)
            {        	
				overHmtl = overHmtl + "<div class=\"test_sorttitle\">"+
						"<h2>完成情况</h2>"+
						"</div>"+
						"<div class=\"result_wrapper\">"+
						"<dl class=\"videopanel_list task_achievement\">";
						if(Number(finish_time) > 0){
	                        overHmtl = overHmtl +"<dd>"+
	                        	"<div class=\"result\">";
	                        overHmtl = overHmtl +"<p><span class=\"icon ico_ok\"></span></p>"+
	                        				"<p class=\"success\">已完成</p>";
	                        overHmtl = overHmtl +"</div>"+
	                        		"<h4><span class=\"text_field\">要求观看"+finish_time+"分钟的视频</span></h4>"+
	                        		"</dd>";
	                    }
	                    if(qa_rcount > 0 && total_qa_count > 0){
	                        overHmtl = overHmtl +"<dd>"+
	                        	"<div class=\"result\">";
	                        if(nodoCount>=qa_rcount){
	                        	overHmtl = overHmtl +"<p><span class=\"icon ico_ok\"></span></p>"+
	                        				"<p class=\"success\">已完成</p>";
	                        }else{
	                        	overHmtl = overHmtl +"<p><span class=\"icon ico_prompt\"></span></p>"+
	                        				"<p class=\"failure\">未完成</p>";
	                        }
	                        overHmtl = overHmtl +"</div>"+
	                        	"<h4><span class=\"text_field\">要求答题正确率达到"+Math.floor(Number(qa_rcount/total_qa_count)*100)+"%</span></h4>"+
	                        	"</dd>";
	                    }
                 overHmtl = overHmtl +"</dl></div>";
			}else{
				overHmtl = overHmtl + "<div class=\"test_sorttitle\">"+
						"<h2>完成情况</h2>"+
						"</div>"+
						"<div class=\"result_wrapper\">"+
						"<dl class=\"videopanel_list task_achievement\">"+
						"<dd>"+
	                    "<div class=\"result\">";
                        if(old_pro_over == "Y"){
                        	overHmtl = overHmtl +"<p><span class=\"icon ico_ok\"></span></p>"+
                        				"<p class=\"success\">已完成</p>";
                        }else{
                        	overHmtl = overHmtl +"<p><span class=\"icon ico_prompt\"></span></p>"+
                        				"<p class=\"failure\">未完成</p>";
                        }
                        overHmtl = overHmtl +"</div>"+
                        		"<h4><span class=\"text_field\">你已观看视频时长为："+getVideoTotalTime()+"</span></h4>"+
                        		"</dd>"+
                        		"</dl></div>";
			}
			
			if(qa_rcount > 0 && total_qa_count > 0){
            	overHmtl = overHmtl +"<div class=\"test_sorttitle\">"+
						"<h2>答题情况</h2>"+
						"</div>"+
                    	"<div class=\"result_wrapper clearfix\">"+
                        "<table cellpadding=\"0\" cellspacing=\"0\" class=\"table_basic\">"+
                        "<thead>"+
                        "<tr>"+
                        "<th align=\"center\">题目</th>"+
                        "<th width=\"10%\" align=\"center\">题型</th>"+
                        "<th width=\"10%\" align=\"center\">状态</th>"+
                        "</tr>"+
                        "</thead>"+
                        "<tbody>";
                 for(var j in qaStatus[0]){
                 	overHmtl = overHmtl +"<tr>"+
                 			"<td align=\"center\">"+qaStatus[0][j]["QASTORE_CONTENT"]+"</td>"+
                        	"<td align=\"center\">"+getQaTypeName(qaStatus[0][j]["QASTORE_TYPE"])+"</td>";
                    if(qaStatus[0][j]["IS_RIGHT"] == 'Y'){
                    	overHmtl = overHmtl + "<td align=\"center\" class=\"blue\"><span class=\"icon ico_right\"></span></td>";
                    }else{
                    	overHmtl = overHmtl + "<td align=\"center\" class=\"blue\"><span class=\"icon ico_error\"></span></td>";
                    }
                    overHmtl = overHmtl +"</tr>";
                 }
                overHmtl = overHmtl + "</tbody>"+
                        "</table>"+
                    	"</div>";
             }       	
			overHmtl = overHmtl + "</div>"+
						"</div>"+
						"</div>";
			
		    if('Y' != "" && 'Y' == 'Y'){
 	   			$("#test_maincontent1").css("z-index", -1);
 	   			$("#videoover").html(overHmtl);
 	   			goOnButton();
				$("#videoover").height($(".left_side").height()-51-52);
				setSlider($("#videoover"));
 	   		}else{
 	   			overHtml = overHmtl + "</div>";
				$("#boardover").html(overHmtl);
				$("#boardover").height($(".left_side").height()-52);
				$("#boardover").width($(".left_side").width());
				if(nextKonwId != ""){
					$("#boardover .test_maincontent").height($(".left_side").height()-51-52);
				}else{
					$("#boardover .test_maincontent").height($(".left_side").height()-52);
				}
				nextActButton();
				setSlider($("#boardover .test_maincontent"));
			}
		    setWindowSize();
 	   	}
		
		
		function initVideo()
		{
			
			if(hasCaption == "Y" || hasCaption == "C"){
				$("#captionDiv").show();
				$(".captions_in_video .fixed").height($(".left_side").height()-52);
				$(".tab_content_sub").height($(".captions_in_video .fixed").height()-40);
				if($("#test_header").css("display") != 'none'){
					videoplayer = new Wskeee.PCoursePlayer("videoPlay",$(".captions_in_video .adaptive").width(),$(".left_side").height()-51-52,vflashvars,null,"http://eefile.download.eenet.com//configdata/wskeee/pcourseplayer/");
					$("#captionDiv").css("height",$(".left_side").height()-51-52);
					$(".caption").css("height",$("#captionDiv").height()-40);
					$(".tabcontent_captions").css("height",$("#captionDiv").height()-40);
				}else{
					videoplayer = new Wskeee.PCoursePlayer("videoPlay",$(".captions_in_video .adaptive").width(),$(".left_side").height()-52,vflashvars,null,"http://eefile.download.eenet.com//configdata/wskeee/pcourseplayer/");
					$("#captionDiv").css("height",$(".left_side").height()-52);
					$(".caption").css("height",$("#captionDiv").height()-40);
					$(".tabcontent_captions").css("height",$("#captionDiv").height()-40);
				}
			}else{
				$("#captionDiv").hide();
				if($("#test_header").css("display") != 'none'){
					videoplayer = new Wskeee.PCoursePlayer("videoPlay",$(".captions_in_video .adaptive").width(),$(".left_side").height()-51-52,vflashvars,null,"http://eefile.download.eenet.com//configdata/wskeee/pcourseplayer/");
				}
				else{
					videoplayer = new Wskeee.PCoursePlayer("videoPlay",$(".captions_in_video .adaptive").width(),$(".left_side").height()-52,vflashvars,null,"http://eefile.download.eenet.com//configdata/wskeee/pcourseplayer/");
				}
			}
			
			videoplayer.addEventListener("ready",function(evt)
	        {
				 var re1 = /([0-9]+\.[0-9]{2})[0-9]*/;
				 video_alltime=videoplayer.getDuration()/60+"";
				 video_alltime = (Number(video_alltime)+"").replace(re1,"$1");
				 
				 if((finish_time !=null && finish_time != "" 
	             	 && finish_time >  stud_video_tiem 
	             		&& old_pro_over != "Y" && old_pro_over != "100"))
	             {
	             	var maxTime = Math.floor(videoplayer.getDuration()/60) % 60+":"+(Math.floor(videoplayer.getDuration())%60+1);
	             	if (videoplayer.getDuration()>=3600) {
	             		maxTime = Math.floor(videoplayer.getDuration()/60/60)+":"+Math.floor(videoplayer.getDuration()/60) % 60+":"+(Math.floor(videoplayer.getDuration())%60+1);
	             	}
	             	if (from_author == "author") {
		             	videoplayer.addFiltrate("视频要求观看"+finish_time+"分钟，在未完成观看要求前，不允许拖动或快进！","00:00", maxTime, false, null ,5);
					} else {
		             	videoplayer.addFiltrate("视频要求观看"+finish_time+"分钟，在未完成观看要求前，不允许拖动或快进！","00:00", maxTime, true, null ,5);
					}
					videoplayer.setActivityEnabled(false);
				 } else if (Number(video_alltime)<=1 && old_pro_over != "Y" && old_pro_over != "100") {
				 	var maxTime = Math.floor(videoplayer.getDuration()/60) % 60+":"+(Math.floor(videoplayer.getDuration())%60+1);
	             	if (videoplayer.getDuration()>=3600) {
	             		maxTime = Math.floor(videoplayer.getDuration()/60/60)+":"+Math.floor(videoplayer.getDuration()/60) % 60+":"+(Math.floor(videoplayer.getDuration())%60+1);
	             	}
					if (from_author == "author") {
						videoplayer.addFiltrate("视频要求观看全部视频，在未完成观看要求前，不允许拖动或快进！","00:00", maxTime, false, null ,5);
					} else {
						videoplayer.addFiltrate("视频要求观看全部视频，在未完成观看要求前，不允许拖动或快进！","00:00", maxTime, true, null ,5);
					}
				 	videoplayer.setActivityEnabled(false);
				 } else {
					videoplayer.setActivityEnabled(true);
				 }
				 		
				 // 当要求完成时长大于视频总时长处理
				 if(Number(finish_time)>Number(video_alltime)) {
				 	var c_errorInfo = "要求完成时长："+finish_time+",视频总时长："+video_alltime+",视频侦信息："+videoplayer.getMetadata();
				 	finish_time = video_alltime;
				 	
				 	var num = c_errorInfo.replace(/[^\x00-\xFF]/g,'**').length;
				 	if (num>=4000) {
				 		c_errorInfo = c_errorInfo.substring(0,3900);
				 	}
				 }
				 
				 //播放器准备完毕再启用
				 videoplayer.setControlbarEnabled(true);
	        });
	        
			videoplayer.addEventListener("activityReady",function(evt)
	        {
	        	//题目参数
	             actives = [{id:"785d47b7d81741ab8cc0bba9b224bdb4",type:2,state:1,time:"00:07:04.099",qa_type:"radio"}];
	             if(actives != ""){
	             	videoplayer.initActivity(eval(actives));
	             	if(has_qa == "true"){
	             		qaRecord();
	             	}
	             }
	        });
			
			videoplayer.addEventListener("time_notification",function(evt)
	        {
	            var position = evt.data["position"];//视频当前时间
				var nowTime = Math.round(Number(position)/60);
				if(stud_video_tiem <= finish_time && (old_pro_over != "Y" || old_pro_over !="100")) 
				{
					if(nowTime > finish_time) {
						nowTime=finish_time;
					}
  				  	if(nowTime>=stud_video_tiem&&nowTime>=lastTime) 
  				  	{
						updVedioTime(nowTime,"1"); // 更新进度   	
						lastTime = nowTime+videoTimeStep;
						if(lastTime> finish_time)
						{
							lastTime=finish_time;
						}
					}
				}
				if(finish_time!=null && finish_time!="" && nowTime>=finish_time) 
				{
				  videoplayer.removeFiltrate();
		      	  videoplayer.setActivityEnabled(true);
		      	}
	        });
			
			videoplayer.addEventListener("showActivityOverview",function(evt)
			{
				tipsShow(evt.data.id,evt.data["pos"].x, evt.data["state"]);
			});
			
			videoplayer.addEventListener("hideActivityOverview",function(evt)
			{
				$(".tips_layer").hide();
			});
			
			videoplayer.addEventListener("activityActivate",function(evt)
			{
				if(evt.data.type == 0){
					//字幕
					$(".tabcontent_captions").find("li").removeClass("cur");
					$(".tabcontent_captions").find("li").find("a").attr("title","播放");
					$("."+evt.data.id).find("a").attr("title","正在播放");
					$("."+evt.data.id).addClass("cur");
					$("."+evt.data.id).each(function(){
						var sliderHeigth = $(this).parents(".caption").find('.scroll-content').height()-$(this).parents(".caption").height();
						var currentPostion = $(this).position().top;
						var currentsliderVal = ((sliderHeigth-currentPostion)/sliderHeigth) * 100;
						$(this).parents(".caption").find(".slider-vertical").slider("value", currentsliderVal);
					});
				}else if(evt.data.type == 2){
					setTimeout(function() {
						openDetail(evt.data.id)
					}, 100);
				}
			});
			
			videoplayer.addEventListener("activityCompleted",function(evt)
			{
				if(old_pro_over!="Y")
				{
					var complVideoTime =videoplayer.getPosition()/60;
					if(Number(complVideoTime)-Number(video_alltime)<=0.5
						||Number(video_alltime)-Number(complVideoTime)<=0.5)
					{
						complVideoTime=video_alltime;
					}
					updVedioTime(complVideoTime,"2");
					if(qa_right_count >= qa_rcount){
						old_pro_over="Y";
					}
				}
				vlasttip();
			});
			
			videoplayer.addEventListener("state",function(evt)
	        {
	            var newState = evt.data["newState"];
	            switch(newState)
	            {
	                case "PLAYING":
	                	
	                	if(old_pro_over==""||old_pro_over==null)
	                	{	
	                		updVedioTime("","1");
	                	}
	                    break;
	                case "PAUSED":
	
	                    break;
	                case "SEEK":
						break;	    
	                case "BUFFERING":
	    
	                    break;
	                case "COMPLETED":
	                    break;
	                case "IDLE":
	                    break;
	            }   
	        });
	        //视频播放错误
	        videoplayer.addEventListener("error",function(evt)
	        {
				try
				{
					addErrorLog("视频播放报错-页面",evt.data.code,"56c192b47f0000012862355c3bcc8310");
				}catch(e){}
	        });
	        
	        videoplayer.addEventListener("network_feedback",function(evt)
	        {
				try
				{
					addErrorLog("视频加载报错-页面",evt.data.code,"56c192b47f0000012862355c3bcc8310");
				}catch(e){}
	        });
		}
		
		$("#schedule_bg_png").hide();
		
		$(function(){
			$("#test_maincontent1").css("background-color","transparent");
			if(old_pro_over == "Y" && !isReStudyKnow){
				if(has_qa == "true"){
					qaRecord("over");
				}
				vlasttip();
			}else{
				initVideo();
			}
			$(".captionMenu").find("a").die().live("click",function(){
				$(".caption").addClass("hide");
				$(".captionMenu").find("a").removeClass("cur");
				$(this).addClass("cur");
				$("#"+$(this).attr("id")+"_caption").removeClass("hide");
				setSlider($("#"+$(this).attr("id")+"_caption"));
				$("#"+$(this).attr("id")+"_caption").find("li").each(function(){
					if($(this).hasClass("cur")){
						var cid = $(this).attr("class");
						cid = cid.substring(0,32);
						$("."+cid).each(function(){
							var sliderHeigth = $(this).parents(".caption").find('.scroll-content').height()-$(this).parents(".caption").height();
							var currentPostion = $(this).position().top;
							var currentsliderVal = ((sliderHeigth-currentPostion)/sliderHeigth) * 100;
							$(this).parents(".caption").find(".slider-vertical").slider("value", currentsliderVal);
						});
						return true;
					}
				});
			});
			if($("#vocabulary_div").length > 0){
				setSlider($("#vocabulary_div"));
			}
			setSlider($('#en_caption'));
		});
		
		function setQaMap(qkey,qvalue){
			qaMap[qkey] = qvalue;
		}
		
		function getQaTypeName(qa_type){
			var qa_type_name = "";
			if(qa_type == "radio"){
				qa_type_name = "单选题";
			}else if(qa_type == "whether"){
				qa_type_name = "是非题";
			}else if(qa_type == "checkbox"){
				qa_type_name = "多选题";
			}else if(qa_type == "pronounce"){
				qa_type_name = "发音题";
			}else if(qa_type="fill"){
				qa_type_name = "填空题";
			}
			return qa_type_name;
		}
	
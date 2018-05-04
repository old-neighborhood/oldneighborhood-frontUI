  
    /**    
    * @Title: AnnouncementController.java  
    * @Package com.example.demo.controller  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年5月4日  
    * @version V1.0    
    */  
    
package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.AnnouncementService;

/**  
    * @ClassName: AnnouncementController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年5月4日  
    *    
    */
@Controller
public class AnnouncementController {
	@Resource
	private AnnouncementService announcementService;
	
	@RequestMapping("/setA_ID")
	@ResponseBody
	public String setA_ID(String a_ID,HttpSession session) {
		System.out.println("bbb:"+ a_ID);
		session.setAttribute("a_ID", a_ID);
		return "{\"result\":\"success\"}";
	}
	
	
	@RequestMapping("/announcementList")
	@ResponseBody
	public String list(@RequestBody Map<String, Object> reqMap) {
		return announcementService.list(reqMap);
	}
	
	@RequestMapping("/announcementDetail")
	@ResponseBody
	public String detail(HttpSession session) {
		System.out.println("aaa:"+ session.getAttribute("a_ID").toString());
		Map<String, Object> reqMap = new HashMap<String, Object>();
		reqMap.put("a_ID", session.getAttribute("a_ID").toString());
		return announcementService.detail(reqMap);
	}
	
}

  
    /**    
    * @Title: ForumController.java  
    * @Package com.example.demo.controller  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月16日  
    * @version V1.0    
    */  
    
package com.example.demo.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.ForumService;

/**  
    * @ClassName: ForumController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月16日  
    *    
    */
@Controller
public class ForumController {
	@Resource
	private ForumService forumService;
	
	@RequestMapping("/setF_ID")
	@ResponseBody
	public String setF_ID(String f_ID,HttpSession session) {
		session.setAttribute("f_ID", f_ID);
		return "{\"result\":\"success\"}";
	}
	
	@RequestMapping("/setP_ID")
	@ResponseBody
	public String setP_ID(String p_ID,HttpSession session) {
		session.setAttribute("p_ID", p_ID);
		return "{\"result\":\"success\"}";
	}
	
	@RequestMapping(path= {"/totalrows"})
	@ResponseBody
	public String totalrows() {
		return forumService.totalrows();
	}
	
	@RequestMapping("/forumlist")
	@ResponseBody
	public String forumlist(@RequestBody Map<String, Object> reqMap) {
		return forumService.forumlist(reqMap);
	}
	
	@RequestMapping(path= {"/totalposts"})
	@ResponseBody
	public String totalposts(HttpSession session) {
		System.out.println("f_ID:"+session.getAttribute("f_ID").toString());
		return forumService.totalposts(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/postlist")
	@ResponseBody
	public String postlist(@RequestBody Map<String, Object> reqMap,HttpSession session) {
		reqMap.put("f_ID", session.getAttribute("f_ID").toString());
		return forumService.postlist(reqMap);
	}
	
	@RequestMapping("/forumdetail")
	@ResponseBody
	public String forumdetail(HttpSession session) {
		return forumService.forumdetail(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/newforum")
	@ResponseBody
	public String newforum(@RequestBody Map<String, Object> reqMap) {
		return forumService.newforum(reqMap);
	}
	
	@RequestMapping("/editforum")
	@ResponseBody
	public String editforum(@RequestBody Map<String, Object> reqMap,HttpSession session) {
		reqMap.put("f_ID", session.getAttribute("f_ID").toString());
		return forumService.editforum(reqMap);
	}
	
	@RequestMapping("/strickform")
	@ResponseBody
	public String strickform(HttpSession session) {
		return forumService.stickforum(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/unstrickform")
	@ResponseBody
	public String unstrickform(HttpSession session) {
		return forumService.unstickforum(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/deleteforum")
	@ResponseBody
	public String deleteform(HttpSession session) {
		return forumService.deleteforum(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/newpost")
	@ResponseBody
	public String newpost(@RequestBody Map<String, Object> reqMap) {
		return forumService.newpost(reqMap);
	}
	
	@RequestMapping("/editpost")
	@ResponseBody
	public String editpost(@RequestBody Map<String, Object> reqMap,HttpSession session) {
		reqMap.put("p_ID", session.getAttribute("p_ID").toString());
		return forumService.editpost(reqMap);
	}
	
	@RequestMapping("/deletepost")
	@ResponseBody
	public String deletepost(HttpSession session) {
		return forumService.deletepost(session.getAttribute("p_ID").toString());
	}
	
	@RequestMapping("/totalCollect")
	@ResponseBody
	public String totalCollect(@RequestBody Map<String, Object> reqMap) {
		return forumService.totalCollect(reqMap.get("f_ID").toString())+"";
	}
	
	@RequestMapping("/isCollect")
	@ResponseBody
	public boolean isCollect(@RequestBody Map<String, Object> reqMap) {
		return forumService.isCollect(reqMap);
	}
	
	@RequestMapping("/newCollect")
	@ResponseBody
	public boolean newCollect(@RequestBody Map<String, Object> reqMap) {
		return forumService.newCollect(reqMap);
	}
	
	@RequestMapping("/deleteCollect")
	@ResponseBody
	public boolean deleteCollect(@RequestBody Map<String, Object> reqMap) {
		return forumService.deleteCollect(reqMap);
	}
	

	@RequestMapping("/postImg")
	@ResponseBody
	public String postImg(@RequestBody Map<String, Object> reqMap) {
		return forumService.postImg(reqMap);
	}
}

  
    /**    
    * @Title: GoodController.java  
    * @Package com.example.demo.controller  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
    * @version V1.0    
    */  
    
package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.GoodService;

/**  
    * @ClassName: GoodController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Controller
public class GoodController {
	@Resource
	private GoodService goodService;
	
	@RequestMapping("/setG_ID")
	@ResponseBody
	public String setM_ID(String g_ID,HttpSession session) {
		session.setAttribute("g_ID", g_ID);
		return "{\"result\":\"success\"}";
	}
	
	@RequestMapping("/getGoods")
	@ResponseBody
	public List<Object> getGoodList(HttpSession session){
		return goodService.getGoods(session.getAttribute("m_ID").toString());
	}
	
	@RequestMapping("/getGood")
	@ResponseBody
	public Object getGood(HttpSession session){
		return goodService.getGood(session.getAttribute("g_ID").toString());
	}
	
	@RequestMapping("/modifyGood")
	@ResponseBody
	public String modifyGood(@RequestBody Map<String,Object> reqMap,HttpSession session) {
		reqMap.put("g_ID",session.getAttribute("g_ID").toString());
		return goodService.modifyGood(reqMap);
	}
	
	@RequestMapping("/addGood")
	@ResponseBody
	public String addGood(@RequestBody Map<String,Object> reqMap,HttpSession session) {
		reqMap.put("m_ID", session.getAttribute("m_ID").toString());
		return goodService.addGood(reqMap);
	}
	
	@RequestMapping("/deleteGood")
	@ResponseBody
	public String deleteGood(HttpSession session) {
		return goodService.deleteGood(session.getAttribute("g_ID").toString());
	}
}

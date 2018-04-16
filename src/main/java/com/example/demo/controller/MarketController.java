  
    /**    
    * @Title: MarketController.java  
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

import com.example.demo.service.MarketService;

/**  
    * @ClassName: MarketController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Controller
public class MarketController {
	@Resource
	private MarketService marketService;
	
	
	
	@RequestMapping("/setM_ID")
	@ResponseBody
	public String setM_ID(String m_ID,HttpSession session) {
		session.setAttribute("m_ID", m_ID);
		return "{\"result\":\"success\"}";
	}
	
	@RequestMapping("/getMarkets")
	@ResponseBody
	public List<Object> getMarketList(HttpSession session){
		return marketService.getMarketList(session.getAttribute("ID").toString());
	}
	
	@RequestMapping("/getMarket")
	@ResponseBody
	public Object getMarket(HttpSession session){
		return marketService.getMarket(session.getAttribute("m_ID").toString());
	}
	
	@RequestMapping("/modifyMarket")
	@ResponseBody
	public String modifyMarket(@RequestBody Map<String,Object> reqMap,HttpSession session) {
		reqMap.put("m_ID", session.getAttribute("m_ID").toString());
		return marketService.modifyMarket(reqMap);
	}
	
	@RequestMapping("/addMarket")
	@ResponseBody
	public String addMarket(@RequestBody Map<String,Object> reqMap,HttpSession session) {
		reqMap.put("s_ID", session.getAttribute("ID").toString());
		return marketService.addMarket(reqMap);
	}
	
	@RequestMapping("/deleteMarket")
	@ResponseBody
	public String deleteMarket(HttpSession session) {
		return marketService.deleteMarket(session.getAttribute("m_ID").toString());
	}
	
	@RequestMapping("/recoverMarket")
	@ResponseBody
	public String recoverMarket(HttpSession session) {
		return marketService.recoverMarket(session.getAttribute("m_ID").toString());
	}
}

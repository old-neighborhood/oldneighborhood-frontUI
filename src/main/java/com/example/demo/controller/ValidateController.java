  
    /**    
    * @Title: ValidateController.java  
    * @Package com.example.demo.controller  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
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

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.ValidateService;



/**  
    * @ClassName: ValidateController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Controller
public class ValidateController {
	@Resource
	private ValidateService validateService;
	
	@RequestMapping("/")
	public String test1() {
		return "/login";
	}
	
	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "/login";
	}
	
	@RequestMapping("/login")
	@ResponseBody
	public String login(@RequestBody Map<String,Object> reqMap,HttpSession session) {
		JSONObject temp = JSONObject.parseObject(validateService.login(reqMap));
		session.setAttribute("ID", temp.get("ID"));
		return validateService.login(reqMap);
	}
	
	@RequestMapping("/getInfo")
	@ResponseBody
	public String getInfo(@RequestBody Map<String,Object> reqMap) {
		System.out.println("ID:"+reqMap.get("ID"));
		return validateService.getInfo(reqMap);
	}
	
	@RequestMapping("/MarketList")
	public String getMarkets() {
		return "/MarketList";
	}
	@RequestMapping("/ApplyMarket")
	public String applyMarket() {
		return "/ApplyMarket";
	}
	@RequestMapping("/ModifyMarket")
	public String modifyMarket() {
		return "/ModifyMarket";
	}
	@RequestMapping("/MarketInfo")
	public String getMarketInfo() {
		return "/MarketInfo";
	}
	
	@RequestMapping("/SalerInfo")
	public String salerInfo() {
		return "/SalerInfo";
	}
	@RequestMapping("/SalerInfoModify")
	public String salerInfoModify() {
		return "/SalerInfoModify";
	}
	@RequestMapping("/UserIndex")
	public String User() {
		return "/userIndex";
	}
	@RequestMapping("/SalerIndex")
	public String Saler() {
		return "/salerIndex";
	}
	@RequestMapping("/AdminIndex")
	public String Admin() {
		return "/adminIndex";
	}
	@RequestMapping("/Forum")
	public String Forum() {
		return "/forum";
	}
	@RequestMapping("/Post")
	public String Post() {
		return "/post";
	}
	@RequestMapping("/NewForum")
	public String NewForum() {
		return "/newforum";
	}
	
	@RequestMapping("/Announce")
	public String Announce() {
		return "/announce";
	}
	
	@RequestMapping("/Register")
	public String register() {
		return "/register";
	}
}

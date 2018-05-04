  
    /**    
    * @Title: AnnouncementService.java  
    * @Package com.example.demo.service  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年5月4日  
    * @version V1.0    
    */  
    
package com.example.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**  
    * @ClassName: AnnouncementService  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年5月4日  
    *    
    */
@FeignClient(value = "neighborhood-announcement-management-service")
public interface AnnouncementService {
	@RequestMapping(value="/oldneighborhood/announcement/list",method=RequestMethod.GET)
	public String list(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/announcement/announcedetail",method=RequestMethod.GET)
	public String detail(Map<String, Object> reqMap);
}

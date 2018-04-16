  
    /**    
    * @Title: SessionListener.java  
    * @Package com.example.demo.config  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
    * @version V1.0    
    */  
    
package com.example.demo.config;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**  
    * @ClassName: SessionListener  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@WebListener
public class SessionListener implements HttpSessionListener {

	/* (非 Javadoc)  
	*   
	*   
	* @param se  
	* @see javax.servlet.http.HttpSessionListener#sessionCreated(javax.servlet.http.HttpSessionEvent)  
	*/

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		System.out.println("==== Session is created ====");
        se.getSession().setMaxInactiveInterval(60*5);

	}

	/* (非 Javadoc)  
	*   
	*   
	* @param se  
	* @see javax.servlet.http.HttpSessionListener#sessionDestroyed(javax.servlet.http.HttpSessionEvent)  
	*/

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		System.out.println("==== Session is destroyed ====");
		
	}

}

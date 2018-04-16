  
    /**    
    * @Title: JSONConfig.java  
    * @Package com.example.demo.config  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
    * @version V1.0    
    */  
    
package com.example.demo.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

/**  
    * @ClassName: JSONConfig  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Configuration
public class FastjsonConfig {

	
	@Bean
	public WebMvcConfigurerAdapter webMvcConfigurerAdapter() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
				 //1. 需要定义一个converter转换消息的对象
		        FastJsonHttpMessageConverter fasHttpMessageConverter = new FastJsonHttpMessageConverter();
		        
		        //2. 添加fastjson的配置信息，比如:是否需要格式化返回的json的数据
		        FastJsonConfig fastJsonConfig = new FastJsonConfig();
		        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
		        
		        List<MediaType> mediaTypes = new ArrayList<>();
		        mediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
		        fasHttpMessageConverter.setSupportedMediaTypes(mediaTypes);
		        //3. 在converter中添加配置信息
		        fasHttpMessageConverter.setFastJsonConfig(fastJsonConfig);
		        HttpMessageConverter<?> converter = fasHttpMessageConverter;
		        
		        converters.add(converter);
			}
		};
	}
}
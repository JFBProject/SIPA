package com.cat.os.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	private static final Logger log = LoggerFactory.getLogger(HomeController.class);

	@Autowired
	private Environment environment;
	

	
	@GetMapping("home")
	public ModelAndView redirectHome() {
		ModelAndView mav = new ModelAndView();
//		String[] ps = environment.getActiveProfiles();
//		log.info("getActiveProfiles : "  + ps);
//		if(ArrayUtils.contains(ps, "ussd")) {
//			mav.setViewName("redirect:/ussd/os1001/init");
//		}
		log.info("Home");
		mav.addObject("armVo", new Object());
		mav.setViewName("index");
		
		return mav;
	}
	
	@GetMapping("/")
	public ModelAndView index() {
		return redirectHome();
	}
}

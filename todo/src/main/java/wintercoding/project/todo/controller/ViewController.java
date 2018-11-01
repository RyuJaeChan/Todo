package wintercoding.project.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import wintercoding.project.todo.schedule.ScheduleService;

@Controller
public class ViewController {
	@Autowired
	private ScheduleService scheduleService;
	
	@GetMapping("/test")
	public String test() {
		System.out.println(scheduleService.findAll());
		return "index";
	}
	
	@GetMapping("/mainpage")
	public String main() {
		return "mainpage";
	}
	
}

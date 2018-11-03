package wintercoding.project.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	
	@GetMapping("/test")
	public String test() {
		return "index";
	}
	
	@GetMapping("/mainpage")
	public String main() {
		return "mainpage";
	}
	
}

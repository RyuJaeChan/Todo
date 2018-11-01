package wintercoding.project.todo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import wintercoding.project.todo.schedule.Schedule;
import wintercoding.project.todo.schedule.ScheduleService;
import wintercoding.project.todo.util.ResultJson;
import wintercoding.project.todo.util.ItemList;

@RestController
public class RestApiController {
	
	@Autowired
	private ScheduleService scheduleService;
	
	//@DateTimeFormat(pattern = "yyyy-MM")
	@GetMapping(value = "/schedule/{date}")
	public List<Schedule> get(@PathVariable @DateTimeFormat(pattern = "yyyyMMdd") LocalDate date) {
		System.out.println("date : " + date);
		
		return scheduleService.findAll();
	}
	
	@GetMapping(value = "/schedule2/{date}")
	public List<Schedule> get2(@PathVariable @DateTimeFormat(pattern = "yyyyMM") LocalDate date) {
		System.out.println("date : " + date);
		
		return scheduleService.findAll();
	}
	
	@PostMapping(value = "/schedule", consumes = "application/json")
	public List<Schedule> test2(@RequestBody Map<String, String> params) {
		System.out.println("date : " + params);
		
		return scheduleService.findAll();
	}
}

package wintercoding.project.todo.controller;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import wintercoding.project.todo.schedule.Schedule;
import wintercoding.project.todo.schedule.ScheduleService;

@RestController
public class RestApiController {
	
	@Autowired
	private ScheduleService scheduleService;
	
	@GetMapping(value = "/schedule/{startDate}/{endDate}")
	public List<Schedule> get(@PathVariable @DateTimeFormat(pattern = "yyyyMMdd") LocalDate startDate,
							@PathVariable @DateTimeFormat(pattern = "yyyyMMdd") LocalDate endDate) {
		System.out.println("date : " + startDate + " " + endDate);
		List<Schedule> l = scheduleService.selectBetween(startDate, endDate);
		System.out.println("l : " + l);
		
		return scheduleService.selectBetween(startDate, endDate);
	}
	
	@GetMapping(value = "/schedule")
	public List<Schedule> findAll(@RequestParam(required = false) Long id) {
		System.out.println("find All : ");
		
		return scheduleService.selectAll();
	}
	
	@GetMapping(value = "/schedule/{id}")
	public Schedule findOne(@PathVariable Long id) {
		System.out.println("find One : " + scheduleService.selectOne(id));
		
		return scheduleService.selectOne(id);
	}
	
	@PostMapping(value = "/schedule", consumes = "application/json")
	public List<Schedule> test2(@RequestBody Schedule schedule) {
		System.out.println("schedule : " + schedule);
		
		scheduleService.insertOne(schedule);
		
		return scheduleService.selectAll();
	}
	
	@PutMapping(value = "/schedule/{id}")
	public Schedule update(@RequestBody Schedule schedule) {
		Schedule s = scheduleService.updateOne(schedule);
		System.out.println("update : " + s);
		return s;
	}
	
	@PutMapping(value = "/schedule", consumes = "application/json")
	public List<Schedule> updateAlert(@RequestBody List<Schedule> list) {
		System.out.println("lsit : " + list);
		List<Schedule> s = scheduleService.updateList(list);
		System.out.println("s : " + s);
		return s;
	}
	
	@GetMapping(value = "/today/{date}")
	public List<Schedule> today(@PathVariable @DateTimeFormat(pattern = "yyyyMMdd") LocalDate date) {
		
		List<Schedule> all = scheduleService.selectAlertYet(false, date);
		System.out.println("all : " + all);
		
		return all;
	}
	
}

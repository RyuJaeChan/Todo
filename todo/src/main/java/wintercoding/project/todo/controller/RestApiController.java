package wintercoding.project.todo.controller;

import java.time.LocalDate;
import java.util.List;

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
		
		return scheduleService.selectBetween(startDate, endDate);
	}
	
	@GetMapping(value = "/schedule")
	public List<Schedule> findAll(@RequestParam(required = false) Long id) {
		return scheduleService.selectAll();
	}
	
	@GetMapping(value = "/schedule/{id}")
	public Schedule findOne(@PathVariable Long id) {
		return scheduleService.selectOne(id);
	}
	
	@PostMapping(value = "/schedule", consumes = "application/json")
	public Schedule insert(@RequestBody Schedule schedule) {
		scheduleService.insertOne(schedule);
		
		return schedule;
	}
	
	@PutMapping(value = "/schedule/{id}")
	public Schedule update(@RequestBody Schedule schedule) {
		Schedule s = scheduleService.updateOne(schedule);
		return s;
	}
	
	@PutMapping(value = "/schedule", consumes = "application/json")
	public List<Schedule> updateAlert(@RequestBody List<Schedule> list) {
		List<Schedule> s = scheduleService.updateList(list);
		return s;
	}
	
	@GetMapping(value = "/today/{date}")
	public List<Schedule> today(@PathVariable @DateTimeFormat(pattern = "yyyyMMdd") LocalDate date) {
		return scheduleService.selectAlertYet(false, date);
	}
	
}

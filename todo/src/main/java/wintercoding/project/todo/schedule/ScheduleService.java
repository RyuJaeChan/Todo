package wintercoding.project.todo.schedule;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {
	@Autowired
	private ScheduleRepository scheduleRepository;
	
	public List<Schedule> selectAll() {
		return scheduleRepository.findAll();
	}
	
	public Schedule selectOne(Long id) {
		return scheduleRepository.findOne(id);
	}
	
	public List<Schedule> selectPrevDate(LocalDate date) {
		return scheduleRepository.findByDateLessThanEqual(date);
	}
	
	public List<Schedule> selectBetween(LocalDate s, LocalDate e) {
		return scheduleRepository.findByDateBetween(s, e);
	}
	
	public void insertOne(Schedule schedule) {
		scheduleRepository.save(schedule);
	}
	
	public Schedule updateOne(Schedule schedule) {
		return scheduleRepository.save(schedule);
	}
	
	public List<Schedule> selectAlertYet(Boolean alert, LocalDate date) {
		return scheduleRepository.findByAlertAndDateLessThan(alert, date);
	}
	
	public List<Schedule> updateList(List<Schedule> list) {
		return scheduleRepository.save(list);
	}
	
}

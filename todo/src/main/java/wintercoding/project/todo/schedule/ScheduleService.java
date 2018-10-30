package wintercoding.project.todo.schedule;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {
	@Autowired
	private ScheduleRepository scheduleRepository;
	
	public List<Schedule> findAll() {
		return scheduleRepository.findAll();
	}
	
}

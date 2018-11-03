package wintercoding.project.todo.schedule;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>{
	List<Schedule> findByDateBetween(LocalDate start, LocalDate end);
	List<Schedule> findByDateLessThanEqual(LocalDate date);
	List<Schedule> findByAlertAndDateLessThan(boolean alert, LocalDate today); 
}

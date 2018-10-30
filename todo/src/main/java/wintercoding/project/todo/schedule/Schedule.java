package wintercoding.project.todo.schedule;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "schedule")
@Data
public class Schedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "title", length = 45)
	private String title;

	@Column(name = "description", length = 90)
	private String description;

	@Column(name = "create_date")
	private LocalDateTime createDate;

	@Column(name = "modify_date")
	private LocalDateTime modifyDate;

	@Column(name = "due_date")
	private String dueDate;
}

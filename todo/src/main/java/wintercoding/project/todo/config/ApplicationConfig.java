package wintercoding.project.todo.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Controller;

@Configuration
@ComponentScan(basePackages = {"wintercondig.project.todo"}, excludeFilters = @Filter({Controller.class}))
@Import({DBConfig.class})
public class ApplicationConfig {

}
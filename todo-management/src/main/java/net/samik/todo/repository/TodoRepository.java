package net.samik.todo.repository;

import net.samik.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    // We need to pass JPA Entity name as well as the primary key type.
    // Here, it is Long
    // So, <Todo, Long>
}

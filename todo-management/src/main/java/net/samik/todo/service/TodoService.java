package net.samik.todo.service;

import net.samik.todo.dto.TodoDto;
import java.util.*;

public interface TodoService {

    // Build Add Todo REST API
    TodoDto addTodo(TodoDto todoDto);

    // Build Get Todo REST API
    TodoDto getTodo(Long id);

    // Build Get All Todos REST API
    List<TodoDto> getAllTodos();

    // Build Update Todo REST API
    TodoDto updateTodo(Long id, TodoDto todoDto);

    // Build Delete Todo REST API
    void deleteTodo(Long id);

    // Build Complete Todo REST API
    TodoDto completeTodo(Long id);

    // Build InComplete Todo REST API
    TodoDto incompleteTodo(Long id);
}

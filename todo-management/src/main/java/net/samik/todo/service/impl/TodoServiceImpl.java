package net.samik.todo.service.impl;

import lombok.AllArgsConstructor;
import net.samik.todo.dto.TodoDto;
import net.samik.todo.entity.Todo;
import net.samik.todo.exception.ResourceNotFoundException;
import net.samik.todo.repository.TodoRepository;
import net.samik.todo.service.TodoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;

    private ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {

        // Convert todoDto to ToDo JPA Entity
        /*Todo todo = new Todo();
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());*/

        Todo todo = modelMapper.map(todoDto, Todo.class);

        // ToDo Jpa Entity
        Todo savedTodo = todoRepository.save(todo);

        // Convert savedTodo Jpa entity to TodoDto object
        /*TodoDto savedTodoDto = new TodoDto();
        savedTodoDto.setId(savedTodo.getId());
        savedTodoDto.setTitle(savedTodo.getTitle());
        savedTodoDto.setDescription(savedTodo.getDescription());
        savedTodoDto.setCompleted(savedTodo.isCompleted());*/

        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);
        return savedTodoDto;
    }

    @Override
    public TodoDto getTodo(Long id) {
        Todo todo = todoRepository.findById(id).
                orElseThrow(() ->
                        new ResourceNotFoundException("Todo not found with the given id " + id));

        TodoDto savedTodoDto = modelMapper.map(todo, TodoDto.class);
        return savedTodoDto;
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<TodoDto> list = todoRepository.findAll().stream().map((todo) ->
                modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());
        return list;
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto todoDto) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Todo doesn't exist with the given id " + id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo savedTodo = todoRepository.save(todo);

        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);
        return savedTodoDto;
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()
                -> new ResourceNotFoundException("Todo doesn't exist with the given id " + id));
        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Todo doesn't exist with the given id " + id));
        todo.setCompleted(true);

        Todo savedTodo = todoRepository.save(todo);

        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);
        return savedTodoDto;
    }

    @Override
    public TodoDto incompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Todo doesn't exist with the given id " + id));
        todo.setCompleted(false);
        Todo updatedTodo = todoRepository.save(todo);

        TodoDto savedTodoDto = modelMapper.map(updatedTodo, TodoDto.class);
        return savedTodoDto;
    }
}

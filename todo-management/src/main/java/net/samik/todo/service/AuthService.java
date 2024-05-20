package net.samik.todo.service;

import net.samik.todo.dto.JwtAuthResponse;
import net.samik.todo.dto.LoginDto;
import net.samik.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}

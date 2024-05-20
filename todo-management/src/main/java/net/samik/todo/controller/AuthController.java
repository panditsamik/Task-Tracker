package net.samik.todo.controller;

import lombok.AllArgsConstructor;
import net.samik.todo.dto.JwtAuthResponse;
import net.samik.todo.dto.LoginDto;
import net.samik.todo.dto.RegisterDto;
import net.samik.todo.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;


    // Build Register REST API
    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Build Login REST API
    @PostMapping("login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        JwtAuthResponse jwtAuthResponse = authService.login(loginDto);

        /*JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);*/

        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }
}

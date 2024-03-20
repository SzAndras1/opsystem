package hu.personal.opsystem.controller;

import hu.personal.opsystem.UserApi;
import hu.personal.opsystem.model.UserDto;
import hu.personal.opsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@Controller
public class UserController implements UserApi {
    public static final String USER_API_PATH = "api/v1/user";

    private final UserService userService;

    @Override
    public ResponseEntity<UserDto> createUser(UserDto userDto) {
        UserDto savedUserDto = userService.createUser(userDto);

        URI location = ServletUriComponentsBuilder
                .fromPath(USER_API_PATH)
                .path("/{id}")
                .buildAndExpand(savedUserDto.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedUserDto);
    }
}

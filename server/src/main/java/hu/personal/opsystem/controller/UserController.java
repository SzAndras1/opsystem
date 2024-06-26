package hu.personal.opsystem.controller;

import hu.personal.opsystem.UserApi;
import hu.personal.opsystem.model.CreateUserDto;
import hu.personal.opsystem.model.UserDto;
import hu.personal.opsystem.service.UserAppService;
import hu.personal.opsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class UserController implements UserApi {
    public static final String USER_API_PATH = "api/v1/user";

    private final UserService userService;

    private final UserAppService userAppService;

    @Override
    public ResponseEntity<UserDto> createUser(CreateUserDto createUserDtouserDto) {
        UserDto savedUserDto = userService.createUser(createUserDtouserDto);

        URI location = ServletUriComponentsBuilder
                .fromPath(USER_API_PATH)
                .path("/{id}")
                .buildAndExpand(savedUserDto.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedUserDto);
    }

    @Override
    public ResponseEntity<List<UserDto>> getAllUser() {
        return ResponseEntity.ok(userService.getAll());
    }

    @Override
    public ResponseEntity<UserDto> getUser(UUID userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @Override
    public ResponseEntity<UserDto> install(UUID appId, UserDto userDto) {
        return ResponseEntity.ok(userAppService.connectUserWithApp(userDto, appId));
    }

    @Override
    public ResponseEntity<UserDto> createChild(UUID appId, CreateUserDto createUserDto) {
        return ResponseEntity.ok(userService.createChild(createUserDto, appId));
    }

    @Override
    public ResponseEntity<UserDto> updateUser(UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(userDto));
    }

    @Override
    public ResponseEntity<UserDto> deleteUser(UUID userId) {
        return ResponseEntity.ok(userService.deleteUser(userId));
    }
}

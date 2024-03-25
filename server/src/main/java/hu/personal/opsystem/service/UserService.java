package hu.personal.opsystem.service;

import hu.personal.opsystem.entity.User;
import hu.personal.opsystem.mapper.UserMapper;
import hu.personal.opsystem.model.CreateUserDto;
import hu.personal.opsystem.model.UserDto;
import hu.personal.opsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserDto createUser(CreateUserDto createUserDto) {
        UserDto userDto = new UserDto().username(createUserDto.getUsername()).role(UserDto.RoleEnum.PARENT);
        userDto.addWallpapersItem("default");
        User savedUser = userMapper.toEntity(userDto);
        return userMapper.toDto(userRepository.save(savedUser));
    }

    public List<UserDto> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    public UserDto createChild(CreateUserDto createUserDto, UUID userId) {
        User parentUser = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        if (parentUser.getRole() != UserDto.RoleEnum.PARENT) {
            throw new IllegalArgumentException();
        }
        UserDto userDto = new UserDto().username(createUserDto.getUsername()).role(UserDto.RoleEnum.CHILD);
        userDto.addWallpapersItem("default");
        User savedUser = userMapper.toEntity(userDto);
        return userMapper.toDto(userRepository.save(savedUser));
    }

    public UserDto updateUser(UserDto userDto) {
        User savedUser = userMapper.toEntity(userDto);
        return userMapper.toDto(userRepository.save(savedUser));
    }


    public UserDto deleteUser(UserDto userDto) {
        User savedUser = userMapper.toEntity(userDto);
        userRepository.delete(savedUser);
        return userMapper.toDto(savedUser);
    }
}

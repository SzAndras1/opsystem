import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateUserDto, UserDto, UserService} from "../generated";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AuthenticateService} from "../services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit {

  userForm!: FormGroup;
  isLogged = false;
  parentId: string = '';

  constructor(
    private userService: UserService,
    private authenticateService: AuthenticateService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.authenticateService.subjectIsLoggedIn.subscribe((value: boolean) => this.isLogged = value);
    this.authenticateService.currentUser.subscribe((userDto: UserDto) => this.parentId = userDto.id!);
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  createUser(): void {
    if (this.isLogged) {
      this.userService.createChild(this.parentId, this.userForm.value as CreateUserDto).subscribe((userDto: UserDto) => {
        console.log(userDto);
        this.router.navigate(['/apps']);
      });
    } else {
      this.userService.createUser(this.userForm.value as CreateUserDto).subscribe((userDto: UserDto) => {
        this.authenticateService.subjectIsLoggedIn.next(true);
        this.authenticateService.currentUser.next(userDto);
        console.log(userDto);
        this.router.navigate(['/apps']);
      });
    }
  }
}

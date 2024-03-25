import {Component, OnInit} from '@angular/core';
import {ApplicationDto, UserDto, UserService} from "../generated";
import {AuthenticateService} from "../services/authenticate.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Router} from "@angular/router";

@Component({
  selector: 'app-application-installed',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent
  ],
  templateUrl: './application-installed.component.html',
  styleUrls: ['./application-installed.component.scss', '../application-list/application-list.component.scss']
})
export class ApplicationInstalledComponent implements OnInit {
  applications: ApplicationDto[] = [];
  currentUser!: UserDto;
  constructor(private authenticateService: AuthenticateService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authenticateService.currentUser.subscribe((userDto: UserDto) => {
      this.currentUser = userDto;
      this.applications = userDto.applications!
    });
  }

  uninstall(index: number): void {
    this.currentUser.applications!.splice(index, 1);
    this.userService.updateUser(this.currentUser).subscribe((userDto: UserDto) => {
      console.log(userDto);
      this.authenticateService.currentUser.next(userDto);
    });
  }

  viewApp(appId: string): void {
    this.router.navigate([`/app/${appId}`])
  }
}

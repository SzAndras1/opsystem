import {Component, OnInit} from '@angular/core';
import {ApplicationDto, ApplicationService, UserDto, UserService} from "../generated";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {AuthenticateService} from "../services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatButton
  ],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.scss'
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationDto[] = []
  currentUser!: UserDto;
  isAppInstalled: boolean[] = [];
  constructor(private applicationService: ApplicationService,
              private userService: UserService,
              private authenticateService: AuthenticateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authenticateService.currentUser.subscribe((userDto: UserDto) => this.currentUser = userDto);
    this.applicationService.getAllApplication().subscribe((apps: ApplicationDto[]) => {
      this.applications = apps;
      const ids = this.currentUser?.applications?.map(i => i.id);
      apps.forEach(i => {
        if (ids?.includes(i.id)) {
          this.isAppInstalled.push(true);
        } else {
          this.isAppInstalled.push(false)
        }
      });
    });
  }

  checkIfAppInstalled(): void {
    this.isAppInstalled = [];
    const ids = this.currentUser?.applications?.map(i => i.id);
    this.applications.forEach(i => {
      if (ids?.includes(i.id)) {
        this.isAppInstalled.push(true);
      } else {
        this.isAppInstalled.push(false)
      }
    });
  }

  installApp(index: number): void {
    this.userService.install(index, this.currentUser).subscribe((userDto: UserDto) => {
      console.log(userDto);
      this.authenticateService.currentUser.next(userDto);
      this.checkIfAppInstalled();
    })
  }

  viewApp(appId: number): void {
    this.router.navigate([`/app/${appId}`])
  }

  uninstall(item: ApplicationDto, index: number): void {
    this.currentUser.applications = this.currentUser.applications!.filter(i => i.id != item.id);
    this.userService.updateUser(this.currentUser).subscribe((userDto: UserDto) => {
      console.log(this.currentUser);
      this.authenticateService.currentUser.next(userDto);
      this.isAppInstalled[index] = false;
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {AuthenticateService} from "../services/authenticate.service";
import {UserDto, UserService} from "../generated";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButton,
    MatIcon,
    MatIconButton,
    MatNavList,
    MatListItem,
    RouterLink,
    MatToolbarRow,
    MatToolbar,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  isLogged = false;
  currentUser!: UserDto
  constructor(private authenticateService: AuthenticateService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.authenticateService.subjectIsLoggedIn.subscribe((value: boolean) => this.isLogged = value);
    this.authenticateService.currentUser.subscribe((userDto: UserDto) => this.currentUser = userDto);
  }
}

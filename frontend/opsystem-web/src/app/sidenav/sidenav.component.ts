import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {AuthenticateService} from "../services/authenticate.service";
import {UserDto} from "../generated";

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
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  isLogged = false;
  username!: string
  constructor(private authenticateService: AuthenticateService) {
  }

  ngOnInit(): void {
    this.authenticateService.subjectIsLoggedIn.subscribe((value: boolean) => this.isLogged = value);
    this.authenticateService.currentUser.subscribe((userDto: UserDto) => this.username = userDto.username!);
  }
}

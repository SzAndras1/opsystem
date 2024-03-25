import {Component, OnInit} from '@angular/core';
import {ApplicationDto, ApplicationService, UserDto, UserService} from "../generated";
import {AuthenticateService} from "../services/authenticate.service";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Router} from "@angular/router";
import {ModifyApplicationDialog} from "../modify-application-dialog/modify-application-dialog";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-application-installed',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatIcon
  ],
  templateUrl: './application-installed.component.html',
  styleUrls: ['./application-installed.component.scss', '../application-list/application-list.component.scss']
})
export class ApplicationInstalledComponent implements OnInit {
  applications: ApplicationDto[] = [];
  currentUser!: UserDto;
  constructor(private authenticateService: AuthenticateService,
              private userService: UserService,
              private router: Router,
              public dialog: MatDialog,
              private applicationService: ApplicationService,
              private _snackBar: MatSnackBar) {
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

  openSnackBar(message: string, buttonLabel: string): void {
    this._snackBar.open(message, buttonLabel, {duration: 3 * 1000, verticalPosition: 'top'});
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, index: number): void {
    console.log(this.currentUser);
    const name: string = this.applications[index].name!;
    const matDialogRef = this.dialog.open(ModifyApplicationDialog, {
      width: '320px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.applications[index]
    });

    matDialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined && result !== '') {
        this.applications[index].name = result;
        this.applicationService.updateApplication(this.applications[index]).subscribe((app: ApplicationDto) => {
          this.openSnackBar(`Successfully renamed ${name} to ${app.name}`, "Close");
          this.userService.getUser(this.currentUser.id!).subscribe((userDto: UserDto) => {
            this.authenticateService.currentUser.next(userDto);
          });
        });
      }
    });
  }
}

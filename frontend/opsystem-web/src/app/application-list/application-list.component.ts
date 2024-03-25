import {Component, OnInit} from '@angular/core';
import {ApplicationDto, ApplicationService, UserDto, UserService} from "../generated";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {AuthenticateService} from "../services/authenticate.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {ModifyApplicationDialog} from "../modify-application-dialog/modify-application-dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    MatIcon
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
              private router: Router,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
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

  installApp(index: string): void {
    this.userService.install(index, this.currentUser).subscribe((userDto: UserDto) => {
      console.log(userDto);
      this.authenticateService.currentUser.next(userDto);
      this.checkIfAppInstalled();
    })
  }

  viewApp(appId: string): void {
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
          this.applicationService.getAllApplication().subscribe((apps: ApplicationDto[]) => {
            console.log(apps);
            this.userService.getUser(this.currentUser.id!).subscribe((userDto: UserDto) => {
              this.authenticateService.currentUser.next(userDto);
            });
          });
        });
      }
    });
  }
}

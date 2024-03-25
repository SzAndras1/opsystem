import {Component, Inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {AuthenticateService} from "../services/authenticate.service";
import {UserDto, UserService} from "../generated";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatError} from "@angular/material/form-field";
import {WallpaperService} from "../services/wallpaper.service";

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
              private userService: UserService,
              private wallpaperService: WallpaperService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.authenticateService.subjectIsLoggedIn.subscribe((value: boolean) => this.isLogged = value);
    this.authenticateService.currentUser.subscribe((userDto: UserDto) => this.currentUser = userDto);
    this.wallpaperService.wallpaper.subscribe((name: string) => {
      this.currentUser.wallpapers?.push(name);
      this.currentUser.currentWallpaperIndex = this.currentUser.wallpapers!.length - 1;
      this.userService.updateUser(this.currentUser).subscribe((userDto: UserDto) => console.log(userDto));
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogWallpaper, {
      width: '320px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      console.log('The dialog was closed');
      this.currentUser.currentWallpaperIndex = result;
      this.userService.updateUser(this.currentUser).subscribe((userDto: UserDto) => console.log(userDto));
    });
  }
}

@Component({
  selector: 'dialog-wallpaper',
  templateUrl: 'dialog.wallpaper.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormField, MatSelect, MatError, MatLabel, MatOption, FormsModule, MatInput, ReactiveFormsModule],
})
export class DialogWallpaper implements OnInit {
  form!: FormGroup;
  selectedValueIndex!: number;

  constructor(public matDialogRef: MatDialogRef<DialogWallpaper>,
              @Inject(MAT_DIALOG_DATA) public currentUser: UserDto,
              private fb: FormBuilder,
              private wallpaperService: WallpaperService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  addWallpaper(): void {
    this.wallpaperService.wallpaper.next(this.form.value.name);
  }
}

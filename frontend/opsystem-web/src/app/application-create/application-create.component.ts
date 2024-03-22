import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApplicationDto, ApplicationService} from "../generated";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-application-create',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './application-create.component.html',
  styleUrl: './application-create.component.scss'
})
export class ApplicationCreateComponent implements OnInit {

  appForm!: FormGroup;

  constructor(
    private applicationService: ApplicationService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit(): void {
    this.appForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  createApp(): void {
    this.applicationService.createApplication(this.appForm.value as ApplicationDto).subscribe((applicationDto: ApplicationDto) => {
      console.log(applicationDto);
      this.openSnackBar("Successfully created an App!", "Close")
      this.router.navigate(['apps']);
    });
  }

  openSnackBar(message: string, buttonLabel: string): void {
    this._snackBar.open(message, buttonLabel, {duration: 3 * 1000, verticalPosition: 'top'});
  }
}

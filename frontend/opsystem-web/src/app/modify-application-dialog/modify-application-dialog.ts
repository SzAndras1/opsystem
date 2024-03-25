import {Component, Inject} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApplicationDto} from "../generated";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'dialog-modify-application',
  templateUrl: 'modify-application-dialog.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    ReactiveFormsModule
  ]
})
export class ModifyApplicationDialog {
  formInput: string = '';

  constructor(public matDialogRef: MatDialogRef<ModifyApplicationDialog>,
              @Inject(MAT_DIALOG_DATA) public currentApp: ApplicationDto) {
  }
}

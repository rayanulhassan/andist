import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Position,
  enterpriseUserRoleId,
  premiumUserRoleId,
} from '@andist/directus';

@Component({
  selector: 'project-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './project-form.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class ProjectFormComponent {
  private _formBuilder = inject(UntypedFormBuilder);

  isPaidUser = input.required<boolean>();
  userRole = input.required<string>();
  totalPositions = input.required<number>();
  @Output() onPositonFormSubmit = new EventEmitter<
    Pick<Position, 'name' | 'description'>
  >();
  premiumUserRoleId = premiumUserRoleId;
  enterpriseUserRoleId = enterpriseUserRoleId;

  constructor(
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  projectForm: UntypedFormGroup = this._formBuilder.group({
    name: [null, [Validators.required]],
    description: [null],
    jobTitle: [null],
    companyName: [null],
    linkToJob: [null],
  });

  submitForm() {
    if (!this.projectForm.valid) return;
    this.onPositonFormSubmit.emit({
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
    });
  }
}

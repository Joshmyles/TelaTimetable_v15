import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  public dialogRef: MatDialogRef<ConfirmComponent> = inject(MatDialogRef);
  public data: string | null = inject(MAT_DIALOG_DATA);
}

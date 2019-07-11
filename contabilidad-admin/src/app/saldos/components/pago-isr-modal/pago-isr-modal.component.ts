import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sx-pago-isr-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pago-isr-modal.component.html',
  styleUrls: ['./pago-isr-modal.component.scss']
})
export class PagoIsrModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PagoIsrModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() {
    this.form = this.fb.group({
      utilidadFiscalAf: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}

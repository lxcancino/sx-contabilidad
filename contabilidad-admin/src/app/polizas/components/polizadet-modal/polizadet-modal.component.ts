import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CuentaContable } from 'app/cuentas/models';
import { PolizaDet } from '../../models';

@Component({
  selector: 'sx-polizadet-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './polizadet-modal.component.html',
  styleUrls: ['./polizadet-modal.component.scss']
})
export class PolizadetModalComponent implements OnInit {
  form: FormGroup;
  polizadet: Partial<PolizaDet>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PolizadetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.polizadet = data.polizadet;
    this.buildForm();
  }

  ngOnInit() {
    this.form.patchValue(this.polizadet);
  }

  private buildForm() {
    this.form = this.fb.group({
      cuenta: [null, Validators.required],
      debe: [0.0, [Validators.required]],
      haber: [0.0, [Validators.required]],
      asiento: [],
      sucursal: [],
      referencia: [],
      referencia2: []
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.form.valid) {
      const cuenta: CuentaContable = this.form.get('cuenta').value;
      const res = {
        ...this.form.value,
        cuenta,
        clave: cuenta.clave,
        descripcion: cuenta.descripcion
      };
      this.dialogRef.close(res);
    }
  }
}

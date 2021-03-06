import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Periodo } from 'app/_core/models/periodo';

import * as moment from 'moment';
import { CuentaContable } from 'app/cuentas/models';

@Component({
  selector: 'sx-auxiliar-bancos-dialog',
  template: `
  <h2 mat-dialog-title>Auxiliar contable</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <div layout>
      <mat-form-field >
        <input matInput [matDatepicker]="myDatepicker" placeholder="Fecha inicial" formControlName="fechaInicial">
        <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
        <mat-datepicker #myDatepicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field class="pad-left">
        <input matInput [matDatepicker]="myDatepicker2" placeholder="Fecha final" formControlName="fechaFinal">
        <mat-datepicker-toggle matSuffix [for]="myDatepicker2"></mat-datepicker-toggle>
        <mat-datepicker #myDatepicker2></mat-datepicker>
      </mat-form-field>
    </div>
    <div layout>
      <sx-cuenta-contable-field formControlName="cuenta" flex placeholder="Cuenta:" [detalle]="true">
      </sx-cuenta-contable-field>
    </div>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button (click)="closeDialog()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class AuxiliarBancosDialogComponent implements OnInit {
  periodo: Periodo;
  form: FormGroup;
  cuenta: CuentaContable;

  constructor(
    public dialogRef: MatDialogRef<AuxiliarBancosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.periodo = data.periodo || Periodo.mesActual();
    this.cuenta = data.cuenta;
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.periodo);
  }

  buildForm() {
    this.form = this.fb.group({
      fechaInicial: [this.periodo.fechaInicial, Validators.required],
      fechaFinal: [this.periodo.fechaInicial, Validators.required],
      cuenta: [this.cuenta, Validators.required]
    });
  }

  setPeriodo(event: Periodo) {
    console.log('Periodo');
  }

  closeDialog() {
    const params = { ...this.form.value };
    params.cuenta = this.form.get('cuenta').value;
    const f1 = moment(this.form.get('fechaInicial').value).toDate();
    const f2 = moment(this.form.get('fechaFinal').value).toDate();
    const periodo = new Periodo(f1, f2);
    params.periodo = periodo;
    this.dialogRef.close(params);
  }
}

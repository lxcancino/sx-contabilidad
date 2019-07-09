import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Periodo } from 'app/_core/models/periodo';

import * as moment from 'moment';

@Component({
  selector: 'sx-auxiliar-contable-dialog',
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
      <sx-cuenta-contable-field formControlName="cuentaInicial" flex placeholder="De la Cuenta:"></sx-cuenta-contable-field>
    </div>
    <div layout>
      <sx-cuenta-contable-field formControlName="cuentaFinal" flex placeholder="A la cuenta:"></sx-cuenta-contable-field>
    </div>
  </form>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Canelar</button>
    <button mat-button (click)="closeDialog()" [disabled]="form.invalid">Aceptar</button>
  </mat-dialog-actions>
`
})
export class AuxiliarContableDialogComponent implements OnInit {
  periodo: Periodo;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AuxiliarContableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.periodo = data.periodo || Periodo.mesActual();
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.periodo);
  }

  buildForm() {
    this.form = this.fb.group({
      fechaInicial: [this.periodo.fechaInicial, Validators.required],
      fechaFinal: [this.periodo.fechaInicial, Validators.required],
      cuentaInicial: [null, Validators.required],
      cuentaFinal: [null]
    });
  }

  setPeriodo(event: Periodo) {
    console.log('Periodo');
  }

  closeDialog() {
    const params = { ...this.form.value };
    params.cuentaInicial = this.form.get('cuentaInicial').value.id;
    if (this.form.get('cuentaFinal').value) {
      params.cuentaFinal = this.form.get('cuentaFinal').value.id;
    }
    const f1 = moment(this.form.get('fechaInicial').value).toDate();
    const f2 = moment(this.form.get('fechaFinal').value).toDate();
    const periodo = new Periodo(f1, f2);
    params.periodo = periodo;
    // params.fechaInicial = moment(f1).toISOString();
    // params.fechaFinal = moment(f2).toISOString();

    this.dialogRef.close(params);
  }
}

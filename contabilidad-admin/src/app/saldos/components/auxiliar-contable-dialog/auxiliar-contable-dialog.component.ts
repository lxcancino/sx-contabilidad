import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EjercicioMes } from '../../../models/ejercicio-mes';

@Component({
  selector: 'sx-auxiliar-contable-dialog',
  template: `
  <h2 mat-dialog-title>Auxiliar contable</h2>
  <mat-dialog-content>
  <form [formGroup]="form">
    <div layout>
      <sx-ejercicio-field [parent]="form" flex></sx-ejercicio-field>
      <sx-mes-field [parent]="form" class="pad-left" flex></sx-mes-field>
    </div>
    <div layout>
      <sx-cuenta-contable-field formControlName="cuenta" flex></sx-cuenta-contable-field>
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
  periodo: EjercicioMes;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AuxiliarContableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.periodo = data.periodo;
  }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue(this.periodo);
    this.form.valueChanges.subscribe(val => console.log('Value: ', val));
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [this.periodo.ejercicio, Validators.required],
      mes: [this.periodo.mes, Validators.required],
      cuenta: [null, Validators.required]
    });
  }

  closeDialog() {
    const params = { ...this.form.value };
    params.cuenta = this.form.get('cuenta').value.id;
    this.dialogRef.close(params);
  }
}

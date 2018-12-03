import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-poliza-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form [formGroup]="form">
    <span mat-dialog-title>Alta de póliza</span>
    <div mat-dialog-content>
      <div layout="column">
        <div layout>
          <mat-form-field flex>
            <input matInput placeholder="Ejercicio" formControlName="ejercicio" readonly="true">
          </mat-form-field>
          <mat-form-field flex class="pad-left">
            <input matInput placeholder="Mes" formControlName="mes">
          </mat-form-field>
        </div>
        <mat-form-field flex>
          <input matInput placeholder="Tipo" formControlName="tipo">
        </mat-form-field>
        <mat-form-field flex>
          <input matInput placeholder="Subtipo" formControlName="suptipo">
        </mat-form-field>
        <mat-form-field >
          <input matInput [matDatepicker]="myDatepicker" placeholder="Fecha" formControlName="fecha">
          <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
          <mat-datepicker #myDatepicker></mat-datepicker>
        </mat-form-field>
      </div>
    </div>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="form.value" [disabled]="form.invalid">Aceptar</button>
      <button mat-button mat-dialog-close type="button">Cancelar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class PolizaCreateComponent implements OnInit {
  form: FormGroup;
  config: {
    ejercicio: number;
    mes: number;
    tipo: string;
    subtipo: string;
    fecha: Date;
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.config = data.config;
  }

  ngOnInit() {
    this.buildForm();
    this.form.setValue(this.config);
  }

  buildForm() {
    this.form = this.fb.group({
      ejercicio: [null, [Validators.required]],
      mes: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      subtipo: [null, [Validators.required]],
      fecha: [null, [Validators.required]]
    });
  }
}

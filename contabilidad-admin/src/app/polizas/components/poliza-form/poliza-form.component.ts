import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';

import { Poliza } from '../../models';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { Update } from '@ngrx/entity';
import { PolizaDet } from 'app/polizas/models/poliza-det';
import { PolizaPartidasTableComponent } from '../poliza-partidas-table/poliza-partidas-table.component';

@Component({
  selector: 'sx-poliza-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poliza-form.component.html',
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 10px);
      }
    `
  ]
})
export class PolizaFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  poliza: Poliza;

  @Output()
  update = new EventEmitter();

  @Output()
  recalcular = new EventEmitter();

  @Output()
  cancel = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @Output()
  cerrar = new EventEmitter();

  @Output()
  print = new EventEmitter();

  subscription: Subscription;

  form: FormGroup;

  debe = new BehaviorSubject<number>(0.0);
  haber = 0.0;

  totales$ = new BehaviorSubject<{
    debe: number;
    haber: number;
    cuadre: number;
  }>({ debe: 0, haber: 0, cuadre: 0 });

  @ViewChild('partidasGrid')
  partidasGrid: PolizaPartidasTableComponent;

  constructor(private fb: FormBuilder, private chr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.poliza && changes.poliza.currentValue) {
      this.setPoliza();
      this.chr.detectChanges();
    }
  }

  setPoliza() {
    if (!this.form) {
      this.buildForm();
    }
    this.form.patchValue(this.poliza);
    this.cleanPartidas();
    this.poliza.partidas.forEach(det => {
      this.partidas.push(new FormControl(det));
    });

    // this.debe = _.sumBy(this.poliza.partidas, 'debe');
    const debe = _.sumBy(this.poliza.partidas, 'debe');
    const haber = _.sumBy(this.poliza.partidas, 'haber');
    const cuadre = debe - haber;

    this.totales$.next({ debe, haber, cuadre });

    if (this.poliza.cierre) {
      this.form.disable();
    }
  }

  private buildForm() {
    if (!this.form) {
      this.form = this.fb.group({
        // fecha: [new Date(), [Validators.required]],
        concepto: [null, [Validators.required]],
        manual: [false, [Validators.required]],
        partidas: this.fb.array([])
      });
    }
  }

  private cleanPartidas() {
    while (this.partidas.length !== 0) {
      this.partidas.removeAt(0);
    }
  }

  onSubmit() {
    if (this.form.valid && !this.form.disabled) {
      const changes = this.form.get('manual').value
        ? { ...this.form.value }
        : {};
      const entity: Update<Poliza> = {
        id: this.poliza.id,
        changes
      };
      console.log('Update: ', entity);
      this.update.emit(entity);
      this.form.markAsPristine();
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  onAgregarFactura(partida: PolizaDet) {
    this.partidas.push(new FormControl(partida));
    this.form.markAsDirty();
  }

  onDeleteRow(index: number) {
    this.partidas.removeAt(index);
    this.form.markAsDirty();
  }

  onUpdateRow(index: number) {}

  get cuadre() {
    // return this.debe - this.haber;
    return 0.0;
  }

  onTotales(event: { debe: number; haber: number }) {
    const cuadre = event.debe - event.haber;
    this.totales$.next({
      ...event,
      cuadre
    });
    this.chr.detectChanges();
  }

  onPrint() {
    this.partidasGrid.printGrid();
  }
}

import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges
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

import { Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';
import { PolizaDet } from 'app/polizas/models/poliza-det';

@Component({
  selector: 'sx-poliza-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poliza-form.component.html'
})
export class PolizaFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  poliza: Poliza;

  @Output()
  update = new EventEmitter();

  @Output()
  cancel = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  @Output()
  cerrar = new EventEmitter();

  subscription: Subscription;

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.buildForm();
    // this.setPoliza();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.poliza && changes.poliza.currentValue) {
      this.setPoliza();
    }
  }

  setPoliza() {
    console.log('Editando poliza:', this.poliza);
    if (!this.form) {
      this.buildForm();
    }
    this.form.patchValue(this.poliza);
    this.cleanPartidas();
    this.poliza.partidas.forEach(det => {
      this.partidas.push(new FormControl(det));
    });
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
      const entity: Update<Poliza> = {
        id: this.poliza.id,
        changes: {
          ...this.form.value
        }
      };
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

  get debe() {
    return _.sumBy(this.partidas.value, 'debe');
  }

  get haber() {
    return _.sumBy(this.partidas.value, 'haber');
  }

  get cuadre() {
    return this.debe - this.haber;
  }
}

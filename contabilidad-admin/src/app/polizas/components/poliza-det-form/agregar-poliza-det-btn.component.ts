import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Poliza } from 'app/polizas/models';

@Component({
  selector: 'sx-agregar-polizadet',
  template: `
    <button mat-button type="button" (click)="openSelector()" [disabled]="isDisabled()">
      <mat-icon>file_upload</mat-icon> {{label}}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgregarPolizadetBtnComponent implements OnInit {
  @Input()
  color = 'primary';

  @Input()
  label = 'Agregar partida';

  @Input()
  poliza: Poliza;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openSelector() {
    /*
    const ref = this.dialog.open(FacturaSelectorComponent, {
      data: { facturas: this.facturas },
      width: '750px'
    });
    ref.afterClosed().subscribe((selected: CuentaPorPagar[]) => {
      if (selected) {
        this.selected.emit(selected);
      }
    });
    */
  }

  isDisabled() {
    return !this.poliza.cierre && !this.poliza.manual;
  }
}

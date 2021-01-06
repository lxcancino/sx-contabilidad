import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "app/store";
import * as fromStore from "../../store";

import { Observable } from "rxjs";

import { Catalogo } from "../../models";
import { MatDialog } from "@angular/material";
import { EjercicioMesDialogComponent } from "app/_shared/components";
import { buildCurrentPeriodo, EjercicioMes } from "app/models/ejercicio-mes";

@Component({
  selector: "sx-catalogos",
  template: `
    <mat-card >
      <sx-search-title title="Bitácora de catálogos"></sx-search-title>
      <mat-divider></mat-divider>
      <ng-template
        tdLoading
        [tdLoadingUntil]="!(loading$ | async)"
        tdLoadingStrategy="overlay"
      >
        <sx-catalogos-table [catalogos]="catalogos$ | async"
          (select)="onSelect($event)"
          (download)="onDownload($event)"></sx-catalogos-table>
      </ng-template>
      <a mat-fab matTooltip="Nuevo clatáogo" matTooltipPosition="before" color="accent" class="mat-fab-position-bottom-right z-3"
          (click)="onCreate()">
        <mat-icon>add</mat-icon>
      </a>
      <mat-card-footer>

      </mat-card-footer>
    </mat-card>

  `,
  styles: [
    `
      .mat-card {
        width: calc(100% - 15px);
        height: calc(100% - 15px);
      }
    `
  ]
})
export class CatalogosComponent implements OnInit {
  search = "";
  catalogos$: Observable<Catalogo[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCatalogosLoading));
    this.catalogos$ = this.store.pipe(select(fromStore.getCatalogos));
  }

  onSelect(event: Catalogo) {
    // this.store.dispatch(
    //   new fromRoot.Go({ path: ["econta", "catalogos", event.id] })
    // );
    this.store.dispatch(new fromStore.MostrarCatalogoXml({ catalogo: event }));
  }

  onDownload(event: Catalogo) {
    this.store.dispatch(
      new fromStore.DescargarCatalogoXml({ catalogo: event })
    );
  }

  onCreate() {
    this.dialog
      .open(EjercicioMesDialogComponent, {
        data: {
          title: "Periodo para el clatáogo",
          periodo: buildCurrentPeriodo()
        }
      })
      .afterClosed()
      .subscribe((res: EjercicioMes) => {
        if (res) {
          this.store.dispatch(
            new fromStore.GenerarCatalogo({
              ejercicio: res.ejercicio,
              mes: res.mes
            })
          );
        }
      });
  }
}

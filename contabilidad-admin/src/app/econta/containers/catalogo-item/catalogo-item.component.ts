import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store, select } from "@ngrx/store";
import * as fromRoot from "app/store";
import * as fromStore from "../../store";

import { Observable } from "rxjs";

import { Catalogo } from "../../models";
import { MatDialog } from "@angular/material";

@Component({
  selector: "sx-catalogo-item",
  template: `
    <mat-card >
      <mat-card-header>
        <mat-card-title>
          Catalogo de cuentas
        </mat-card-title>
      </mat-card-header>
      <mat-divider></mat-divider>


      <mat-card-actions>
        <button mat-button (click)="toCatalogos()">
          <mat-icon>arrow_back</mat-icon>
          <mat-label>Regresar</mat-label>
        </button>
      </mat-card-actions>


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
export class CatalogoItemComponent implements OnInit {
  catalogo$: Observable<Catalogo>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromStore.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(fromStore.getCatalogosLoading));
  }

  onSelect(event: Catalogo) {
    this.store.dispatch(
      new fromRoot.Go({ path: ["econta", "catalogos", event.id] })
    );
  }

  onDownload(event: Catalogo) {
    this.store.dispatch(
      new fromStore.DescargarCatalogoXml({ catalogo: event })
    );
  }

  toCatalogos() {
    this.store.dispatch(new fromRoot.Go({ path: ["econta", "catalogos"] }));
  }
}

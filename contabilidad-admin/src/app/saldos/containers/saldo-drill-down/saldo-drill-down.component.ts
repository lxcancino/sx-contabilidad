import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sx-saldo-drill-down',
  template: `
    <h1>Drill-down SALDO POR CUENTA</h1>
    <section>
      Detalles para :
      <pre>
        {{saldo | json}}
      </pre>
    </section>
  `
})
export class SaldoDrillDownComponent implements OnInit {
  saldo: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot.data);
    this.saldo = this.route.snapshot.data.saldo;
    // this.route.data.subscribe(data => console.log(data))
  }
}

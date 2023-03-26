import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-shell';
  private cdr = inject(ChangeDetectorRef);

  products: any = null;
  productsInCart = false;
  products$ = fromEvent<CustomEvent>(window, 'ADD_TO_CART').pipe(
    map((event: CustomEvent) => {
      this.products = this.products ?? {};
      this.products[event.detail.id] = this.products[event.detail.id] ?? 0;
      this.products[event.detail.id]++;
      this.productsInCart = Object.keys(this.products).length > 0;
      return this.products;
    }),
    startWith({})
  );
}

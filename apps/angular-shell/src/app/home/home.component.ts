import { Component, Injector } from '@angular/core';
import { loadRemoteModule } from '../federation.utils';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(protected injector: Injector) {}

  ngOnInit() {
    loadRemoteModule({
      remoteEntry: 'http://localhost:5000/remoteEntry.js',
      remoteName: 'app2',
      exposedModule: 'ButtonComponent',
    }).then((federatedModule: any) => {
      console.log(federatedModule);
      const element = createCustomElement(federatedModule['ButtonComponent'], {
        injector: this.injector,
      });
      customElements.define('app-button', element);
    });
  }
}

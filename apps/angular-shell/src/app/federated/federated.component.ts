import {
  Component,
  ContentChildren,
  Injector,
  Input,
  QueryList,
  ViewChild,
  ViewContainerRef,
  ɵcreateInjector,
} from '@angular/core';
import { loadRemoteModule } from '../federation.utils';

@Component({
  selector: 'app-federated',
  templateUrl: './federated.component.html',
  styleUrls: ['./federated.component.scss'],
  standalone: true,
})
export class FederatedComponent {
  // return the ViewContainerRef instead of default elementRef
  @ViewChild('federatedComponent', { read: ViewContainerRef, static: true })
  federatedComponent: ViewContainerRef | null = null;
  @Input() componentName: string = '';
  @Input() text: string = '';

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    // load remote container & get component from container
    loadRemoteModule({
      remoteEntry: 'http://localhost:5000/remoteEntry.js',
      remoteName: 'app2',
      exposedModule: this.componentName,
    }).then((federatedModule: any) => {
      this.importStandaloneComponent(federatedModule);
    });
  }

  importStandaloneComponent(federatedModule: any) {
    // create component from component factory
    const componentRef = this.federatedComponent?.createComponent(
      federatedModule[this.componentName],
      {
        // give proxy component as injector
        injector: this.federatedComponent.injector,
      }
    );

    // pass input to component instance
    if (componentRef) {
      (<any>componentRef.instance).text = this.text;
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  // import ngmodule from container
  importComponentFromModule(federatedModule: any) {
    this.federatedComponent?.createComponent(
      federatedModule[this.componentName].exports.find(
        (e: any) => e.ɵcmp?.exportAs[0] === this.componentName
      ),
      {
        injector: ɵcreateInjector([this.componentName], this.injector),
      }
    );
  }
}

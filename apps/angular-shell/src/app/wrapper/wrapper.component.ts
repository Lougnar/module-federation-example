import {
  AfterContentInit,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadRemoteModule } from '../federation.utils';

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: [],
  standalone: true,
}) // Wrap other framework application in angular component
export class WrapperComponent implements AfterContentInit {
  // static true, container is not in a strctural directive, wrapper will be available in ngOnInit
  @ViewChild('wrapperComponent', { read: ElementRef, static: true })
  wrapperComponent: ElementRef | null = null;

  private route = inject(ActivatedRoute);

  async ngAfterContentInit(): Promise<void> {
    const { elementName, loadChildren } = this.route.snapshot.data;
    await loadChildren();
    const element = document.createElement(elementName);
    this.wrapperComponent?.nativeElement.appendChild(element);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatcher, UrlSegment } from '@angular/router';
import { loadRemoteModule } from './federation.utils';
import { HomeComponent } from './home/home.component';
import { WrapperComponent } from './wrapper/wrapper.component';

export function startWith(prefix: string): UrlMatcher {
  return (url: UrlSegment[]) => {
    const fullUrl = url.map((u) => u.path).join('/');
    if (fullUrl.startsWith(prefix)) {
      return { consumed: url };
    }
    return null;
  };
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'app2',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'app2',
        remoteEntry: 'http://localhost:5000/remoteEntry.js',
        exposedModule: 'App2',
      }).then((m: any) => m.FeatureModule),
  },
  {
    matcher: startWith('products'),
    component: WrapperComponent,
    data: {
      loadChildren: () => import('vuejs/App'),
      elementName: 'vuejs-app',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

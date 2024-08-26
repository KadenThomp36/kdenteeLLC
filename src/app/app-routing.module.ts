import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from '@layout/mainpage/mainpage.component';
import { AboutModule } from '@modules/about/about.module';
import { HomeModule } from '@modules/home/home.module';
import { ServicesModule } from '@modules/services/services.module';

const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@modules/home/home.module').then(
            (m): typeof HomeModule => m.HomeModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('@modules/about/about.module').then(
            (m): typeof AboutModule => m.AboutModule
          ),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('@modules/services/services.module').then(
            (m): typeof ServicesModule => m.ServicesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

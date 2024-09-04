import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from '@layout/mainpage/mainpage.component';
import { AboutModule } from '@modules/about/about.module';
import { HomeModule } from '@modules/home/home.module';
import { ServicesModule } from '@modules/services/services.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
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
        path: 'portfolio',
        loadChildren: () =>
          import('@modules/portfolio/portfolio.module').then(
            (m): typeof AboutModule => m.PortfolioModule
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

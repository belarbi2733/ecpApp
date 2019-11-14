import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { TrajetDetailPageModule } from '../tabs/trajet-detail/trajet-detail.module';
import {ModalRatingPageModule} from '../tabs/modal-rating/modal-rating.module';
import {ModalComplaintPageModule} from '../tabs/modal-complaint/modal-complaint.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'trajet',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/trajet/trajet.module').then(m => m.TrajetPageModule)
          },
          {
          path: 'session/:sessionId',
          loadChildren: () => import('../tabs/trajet-detail/trajet-detail.module').then(m => m.TrajetDetailPageModule)
        },
        {
          path: 'modal-rating',
          loadChildren: () => import('../tabs/modal-rating/modal-rating.module').then(m => m.ModalRatingPageModule)
        },
        {
          path: 'modal-complaint',
          loadChildren: () => import('../tabs/modal-complaint/modal-complaint.module').then(m => m.ModalComplaintPageModule)
        }

        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

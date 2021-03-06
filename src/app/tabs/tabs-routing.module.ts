import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { TrajetDetailPageModule } from '../tabs/trajet-detail/trajet-detail.module';
import {ModalRatingPageModule} from '../tabs/modal-rating/modal-rating.module';
import {ModalComplaintPageModule} from '../tabs/modal-complaint/modal-complaint.module';
import { StepDetailPageModule } from '../tabs/step-detail/step-detail.module';
import { QRCodePageModule } from '../tabs/qrcode/qrcode.module';


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
        path: 'logout',
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
          path: 'BddTraj/:bddId',
          loadChildren: () => import('../tabs/trajet-detail/trajet-detail.module').then(m => m.TrajetDetailPageModule)
        },
        {
        path: 'BddTour/:bddId',
        loadChildren: () => import('../tabs/step-detail/step-detail.module').then(m => m.StepDetailPageModule)
      },
        {
        path: 'BddTour/bddId/step/:bddId',
        loadChildren: () => import('../tabs/trajet-detail/trajet-detail.module').then(m => m.TrajetDetailPageModule)
        },
        {
          path: 'qrcode/:bddId',
          loadChildren: () => import('../tabs/qrcode/qrcode.module').then(m => m.QRCodePageModule)

        },
        {
          path: 'modal-rating',
          loadChildren: () => import('../tabs/modal-rating/modal-rating.module').then(m => m.ModalRatingPageModule)
        },
        {
          path: 'modal-complaint',
          loadChildren: () => import('../tabs/modal-complaint/modal-complaint.module').then(m => m.ModalComplaintPageModule)
        },
        {
          path: 'map/:idTour/:num/:bddId',
          loadChildren: () => import('../tabs/tab3/tab3.module').then(m => m.Tab3PageModule)
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

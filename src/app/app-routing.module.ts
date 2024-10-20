import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'access',
    pathMatch: 'full'
  },
  //---AUTH---
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/auth/access/access.module').then( m => m.AccessPageModule)
  },
  {
    path: 'register-selection',
    loadChildren: () => import('./pages/auth/registers/register-selection/register-selection.module').then( m => m.RegisterSelectionPageModule)
  },
  {
    path: 'register-company',
    loadChildren: () => import('./pages/auth/registers/register-company/register-company.module').then( m => m.RegisterCompanyPageModule)
  },
  {
    path: 'register-worker',
    loadChildren: () => import('./pages/auth/registers/register-worker/register-worker.module').then( m => m.RegisterWorkerPageModule)
  },
  {
    path: 'lost-password',
    loadChildren: () => import('./pages/auth/lost-password/lost-password.module').then( m => m.LostPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/auth/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  //---COMPANY---
  {
    path: 'tabs-company',
    loadChildren: () => import('./pages/company/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'options-profile-company',
    loadChildren: () => import('./pages/company/profile/options-profile-company/options-profile-company.module').then( m => m.OptionsProfileCompanyPageModule)
  },
  {
    path: 'edit-profile-company',
    loadChildren: () => import('./pages/company/profile/edit-profile-company/edit-profile-company.module').then( m => m.EditProfileCompanyPageModule)
  },
  //---WORKER---
  {
    path: 'tabs-worker',
    loadChildren: () => import('./pages/worker/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'options-profile-worker',
    loadChildren: () => import('./pages/worker/profile/options-profile-worker/options-profile-worker.module').then( m => m.OptionsProfileWorkerPageModule)
  },
  {
    path: 'edit-profile-worker',
    loadChildren: () => import('./pages/worker/profile/edit-profile-worker/edit-profile-worker.module').then( m => m.EditProfileWorkerPageModule)
  },
  {
    path: 'add-experience-worker',
    loadChildren: () => import('./pages/worker/profile/add-experience-worker/add-experience-worker.module').then( m => m.AddExperienceWorkerPageModule)
  },
  {
    path: 'edit-experience-worker',
    loadChildren: () => import('./pages/worker/profile/edit-experience-worker/edit-experience-worker.module').then( m => m.EditExperienceWorkerPageModule)
  },
  {
    path: 'add-education-worker',
    loadChildren: () => import('./pages/worker/profile/add-education-worker/add-education-worker.module').then( m => m.AddEducationWorkerPageModule)
  },
  {
    path: 'edit-education-worker',
    loadChildren: () => import('./pages/worker/profile/edit-education-worker/edit-education-worker.module').then( m => m.EditEducationWorkerPageModule)
  },
  {
    path: 'candidates',
    loadChildren: () => import('./pages/company/job/candidates/candidates.module').then( m => m.CandidatesPageModule)
  },
  {
    path: 'option-job',
    loadChildren: () => import('./pages/company/job/option-job/option-job.module').then( m => m.OptionJobPageModule)
  },
  {
    path: 'edit-job',
    loadChildren: () => import('./pages/company/job/edit-job/edit-job.module').then( m => m.EditJobPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

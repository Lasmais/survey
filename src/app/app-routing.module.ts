import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './survey-form/survey-form.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: SurveyFormComponent
  // },
  {
    path: 'form',
    component: SurveyFormComponent
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  }//,
  // {
  //   path: 'popover-question-selector',
  //   loadChildren: () => import('./popover-question-selector/popover-question-selector.module').then( m => m.PopoverQuestionSelectorPageModule)
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

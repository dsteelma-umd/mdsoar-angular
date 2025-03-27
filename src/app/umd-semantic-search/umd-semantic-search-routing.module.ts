import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';
import { I18nBreadcrumbsService } from '../core/breadcrumbs/i18n-breadcrumbs.service';
import { UmdSemanticSearchModule } from './umd-semantic-search.module';
import { UmdSemanticSearchComponent } from './umd-semantic-search.component';
import { ConfigurationSearchPageGuard } from '../search-page/configuration-search-page.guard';

@NgModule({
  imports: [
    UmdSemanticSearchModule,
    RouterModule.forChild([{
        path: '',
        resolve: { breadcrumb: I18nBreadcrumbResolver }, data: { title: 'search.title', breadcrumbKey: 'search' },
        children: [
          { path: '', component: UmdSemanticSearchComponent },
          { path: ':configuration', component: UmdSemanticSearchComponent, canActivate: [ConfigurationSearchPageGuard] }
        ]
      }]
    )
  ],
  providers: [
    I18nBreadcrumbResolver,
    I18nBreadcrumbsService
  ]
})
export class UmdSemanticSearchRoutingModule {
}

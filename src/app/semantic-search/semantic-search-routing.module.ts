import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';
import { I18nBreadcrumbsService } from '../core/breadcrumbs/i18n-breadcrumbs.service';
import { SemanticSearchModule } from './semantic-search.module';
import { SemanticSearchComponent } from './semantic-search.component';
import { ConfigurationSearchPageGuard } from '../search-page/configuration-search-page.guard';

@NgModule({
  imports: [
    SemanticSearchModule,
    RouterModule.forChild([{
        path: '',
        resolve: { breadcrumb: I18nBreadcrumbResolver }, data: { title: 'search.title', breadcrumbKey: 'search' },
        children: [
          { path: '', component: SemanticSearchComponent },
          { path: ':configuration', component: SemanticSearchComponent, canActivate: [ConfigurationSearchPageGuard] }
        ]
      }]
    )
  ],
  providers: [
    I18nBreadcrumbResolver,
    I18nBreadcrumbsService
  ]
})
export class SemanticSearchRoutingModule {
}

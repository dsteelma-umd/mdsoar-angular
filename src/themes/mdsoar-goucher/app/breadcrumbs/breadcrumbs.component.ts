import { Component } from '@angular/core';
import { BreadcrumbsComponent as BaseComponent } from '../../../mdsoar/app/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsService } from 'src/app/breadcrumbs/breadcrumbs.service';

/**
 * Component representing the breadcrumbs of a page
 */
@Component({
  selector: 'ds-breadcrumbs',
  templateUrl: '../../../mdsoar/app/breadcrumbs/breadcrumbs.component.html',
  styleUrls: [
    '../../../../app/breadcrumbs/breadcrumbs.component.scss',
    '../../../mdsoar/app/breadcrumbs/breadcrumbs.component.scss'
  ]
})
export class BreadcrumbsComponent extends BaseComponent {
  communityLogoPath = 'assets/mdsoar-goucher/images/community_logo.png';

  constructor(
    breadcrumbsService: BreadcrumbsService,
  ) {
    super(breadcrumbsService);
  }
}

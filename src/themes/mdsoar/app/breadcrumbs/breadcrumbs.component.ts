import { Component } from '@angular/core';
import { BreadcrumbsComponent as BaseComponent } from '../../../../app/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsService } from 'src/app/breadcrumbs/breadcrumbs.service';

/**
 * Component representing the breadcrumbs of a page
 */
@Component({
  selector: 'ds-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
//  styleUrls: ['./breadcrumbs.component.scss']
  styleUrls: ['../../../../app/breadcrumbs/breadcrumbs.component.scss', './breadcrumbs.component.scss']
})
export class BreadcrumbsComponent extends BaseComponent {
  communityLogoPath: string = null;

  constructor(
    breadcrumbsService: BreadcrumbsService,
  ) {
    super(breadcrumbsService);
  }
}

import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../mdsoar/app/footer/footer.component';
import { SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { KlaroService } from 'src/app/shared/cookies/klaro.service';

@Component({
  selector: 'ds-footer',
  styleUrls: ['../../../mdsoar/app/footer/footer.component.scss'],
  templateUrl: 'footer.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class FooterComponent extends BaseComponent implements OnInit {
  footerContent: SafeHtml = null;

  constructor(
    cookies: KlaroService,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(cookies);
  }

  ngOnInit(){
    this.http.get('/assets/k8s/mdsoar-frostburg/footer/footer.html', {responseType: 'text'}).pipe(
      take(1),
    ).subscribe((safeHtml: SafeHtml) => {
        this.footerContent = safeHtml;
        this.changeDetectorRef.detectChanges();
    });
  }
}

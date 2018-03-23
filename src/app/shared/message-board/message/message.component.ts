import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Bitstream } from '../../../core/shared/bitstream.model';
import { MessageService } from '../../../core/message/message.service';

@Component({
  selector: 'ds-message',
  styleUrls: ['./message.component.scss'],
  templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit {
  @Input()
  public m: Bitstream;
  @Input()
  isLast: boolean;
  public showUnread: boolean;
  @Input()
  public isSubmitter: boolean;
  @Output()
  private unRead = new EventEmitter<any>();
  public show = false;
  private _description = '';
  private loadingDescription = false;
  readMessageTxt = 'Show message...';

  constructor(public msgService: MessageService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    const type = this.m.findMetadata('dc.type');

    if (this.isLast &&
      ((this.isSubmitter && type === 'outbound')
        || (!this.isSubmitter && type === 'inbound'))
    ) {
      this.showUnread = true;
    } else {
      this.showUnread = false;
    }
  }

  toggleDescription() {
    this.show = !this.show;
    this.readMessageTxt = this.show ? 'Hide message...' : 'Show message...';
    this.cdr.detectChanges();
  }

  get description(): Observable<string> {
    if (this._description === '' && !this.loadingDescription) {
      this.loadingDescription = true;
      this.msgService.getMessageContent(this.m.content)
        .subscribe((res) => {
          this._description = res.payload || 'No content.';
          console.log('description=', this._description);
          this.loadingDescription = false;
        });
    }

    return Observable.of(this._description);
  }

  unReadLastMsg() {
    this.unRead.emit('unRead');
    this.showUnread = false;
  }

}

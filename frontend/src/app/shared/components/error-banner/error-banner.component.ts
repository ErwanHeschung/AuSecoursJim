import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ErrorBannerComponent {
  @Input() message = '';
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  hide() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  changeText(newMessage: string) {
    this.message = newMessage;
  }
}

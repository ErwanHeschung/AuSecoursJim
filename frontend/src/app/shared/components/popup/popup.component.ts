import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ICONS } from '../../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Output() close = new EventEmitter<void>();

  public crossIcon: IconDefinition = ICONS['cross'];

  onClose() {
    this.close.emit();
  }
}

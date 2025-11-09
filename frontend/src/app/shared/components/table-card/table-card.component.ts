import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupTable } from '../../../core/models/group-table.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})
export class TableCardComponent {
  @Input() table!: GroupTable;
  @Input() assignCount = 0;
  @Input() maxAllowed = 0;
  @Output() assignCountChange = new EventEmitter<number>();


  isFull() {
    return this.table.assignedCount >= this.table.capacity;
  }

  onInputChange(value: string) {
    let sanitized = value.replace(/\D/g, '');
    let numeric = sanitized ? Number(sanitized) : 0;
    numeric = Math.min(
      numeric,
      this.table.capacity - this.table.assignedCount,
      this.maxAllowed
    );

    this.assignCount = numeric;
    this.assignCountChange.emit(this.assignCount);
  }

  get maxAllowedClamped(): number {
    return Math.min(
      this.maxAllowed,
      this.table.capacity - this.table.assignedCount
    );
  }
}

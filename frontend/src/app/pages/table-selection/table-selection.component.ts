import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../shared/services/no-bff/group.service';
import { GroupTable } from '../../core/models/group-table.model';
import { ROUTES } from '../../core/utils/constant';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Group } from '../../core/models/group.model';
import { TableCardComponent } from '../../shared/components/table-card/table-card.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.scss'],
  imports: [TableCardComponent],
})
export class TableSelectionComponent implements OnInit {
  public tables: GroupTable[] = [];
  public assignCounts: Record<number, number> = {};
  public group!: Group | null;
  public maxAssignation!: number | null;

  constructor(
    private groupService: GroupService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.group = this.localStorageService.getItem('group');
    if (this.group) {
      this.groupService.getGroupTables(this.group.groupId).subscribe(tables => {
        this.tables = tables;
        console.log(tables);
        this.assignCounts = Array(this.tables.length).fill(0);
      });
    }

    this.maxAssignation =
      this.localStorageService.getItem<number>('myNumberOfPersons');
  }

  validateSelection() {
    if (!this.group) return;

    let totalAssigned = 0;

    const requests = this.tables
      .map(table => {
        let count = this.assignCounts[table.tableNumber] || 0;

        if (this.maxAssignation) {
          const remaining = this.maxAssignation - totalAssigned;
          if (remaining <= 0) count = 0;
          else if (count > remaining) count = remaining;
        }

        totalAssigned += count;

        if (count > 0) {
          return firstValueFrom(
            this.groupService.assignPeopleToTable(
              this.group!.groupId,
              table.tableNumber,
              count
            )
          );
        }
        return null;
      })
      .filter(r => r !== null) as Promise<any>[];

    Promise.all(requests).then(() => {
      this.router.navigate([ROUTES.orderTrackingQRcode]);
    });
  }

  get isValidateDisabled(): boolean {
    if (!this.assignCounts || !this.maxAssignation) return true;

    const totalAssigned = Object.values(this.assignCounts).reduce(
      (sum, c) => sum + (c || 0),
      0
    );

    return totalAssigned !== this.maxAssignation;
  }

  get remainingToPlace(): number {
    if (!this.maxAssignation || !this.assignCounts) return 0;

    const assignedTotal = Object.values(this.assignCounts).reduce(
      (sum, c) => sum + (c || 0),
      0
    );

    return Math.max(this.maxAssignation - assignedTotal, 0);
  }
}

import { Component, HostListener } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/utils/constant';
import { CounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import Keyboard from "simple-keyboard";
import { GroupService } from '../../shared/services/no-bff/group.service';
import { ErrorBannerComponent } from "../../shared/components/error-banner/error-banner.component";

@Component({
  selector: 'app-group-command',
  imports: [CounterComponent, ErrorBannerComponent],
  templateUrl: './group-command.component.html',
  styleUrl: './group-command.component.scss',
})
export class GroupCommandComponent {
  public numberOfPersons: number = 1;
  public groupId: string = '';
  public errorMessage!: string;
  public errorVisible: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private groupService: GroupService
  ) {
    this.localStorageService.clear();
  }

  private navigateToMenus(): void {
    this.router.navigate([ROUTES.menu]);
  }
  public joinGroup() {
    this.groupService.joinGroup(this.numberOfPersons, this.groupId).subscribe({
      next: group => {
        this.localStorageService.setItem('group', group);
        this.navigateToMenus();
        this.errorMessage = '';
        this.errorVisible = false;
        console.log(group)
      },
      error: err => {
        console.error('Error during group update :', err);
        this.errorMessage = err.error?.details || 'Une erreur est survenue';
        this.errorVisible = true;
      },
    });
  }

  onNumberOfPersonsChanged(newCount: number) {
    this.numberOfPersons = newCount;
  }

  private keyboard!: Keyboard;
  keyboardVisible: boolean = false;

  onInputFocus(currentValue: string) {
    if (this.keyboard) {
      this.keyboard.setInput(currentValue);
    }
    this.keyboardVisible = true;
  }

  hideKeyboard() {
    this.keyboardVisible = false;
  }

  ngAfterViewInit() {
    const container = document.querySelector('.simple-keyboard') as HTMLElement;
    if (!container) return;
    this.keyboard = new Keyboard({
      onChange: input => this.onKeyboardChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: {
        default: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0'],
      },
      theme: 'hg-theme-default hg-layout-numeric numeric-theme',
    });
  }

  onKeyboardChange(input: string) {
    this.groupId = input;
  }

  onKeyPress(button: string) {
    if (button === '{bksp}') {
      const input = this.keyboard.getInput();
      this.keyboard.setInput(input.slice(0, -1));
      this.onKeyboardChange(this.keyboard.getInput());
    }
  }

  ngOnDestroy() {
    this.keyboard = undefined as any;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (
      target.closest('.simple-keyboard-wrapper') ||
      target.classList.contains('input')
    ) {
      return;
    }

    this.hideKeyboard();
  }
}

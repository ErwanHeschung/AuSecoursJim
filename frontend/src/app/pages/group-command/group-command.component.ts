import { environment } from '../../../environments/environment';
import { Component, HostListener } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/utils/constant';
import { CounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import Keyboard from 'simple-keyboard';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group-command',
  imports: [CounterComponent],
  templateUrl: './group-command.component.html',
  styleUrl: './group-command.component.scss',
})
export class GroupCommandComponent {
  private apiUrl: string = environment.apiUrl + '/group/groups';
  numberOfPersons: number = 1;
  orderId: string = '';

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient
  ) {
    this.localStorageService.clear();
  }

  private navigateToMenus(): void {
    this.router.navigate([ROUTES.menu]);
  }

  private navigateToGroupItemSelection(): void {
    this.router.navigate([ROUTES.groupItemSelection]);
  }

  validateGroupOrder() {
    const url = `${this.apiUrl}/${this.orderId}/set-number`;
    const body = { numberOfPersons: this.numberOfPersons };

    this.http.post(url, body).subscribe({
      next: res => {
        console.log('API Response :', res);
        this.localStorageService.setItem('order', res);
        this.navigateToGroupItemSelection();
      },
      error: err => {
        console.error('Error during group update :', err);
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
    this.orderId = input;
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

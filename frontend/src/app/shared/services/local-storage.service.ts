import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem<T>(key: string, value: T): void {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  public getItem<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    if (!json) return null;
    try {
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}

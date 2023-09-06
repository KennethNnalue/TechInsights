import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataPersistenceService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data to local storage', e);
    }
  }

  get(key: string): unknown {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    } catch (e) {
      console.error('Error getting data to local storage', e);
      return null;
    }
  }
}

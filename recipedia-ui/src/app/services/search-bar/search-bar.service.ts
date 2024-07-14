import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  private searchQuery = new BehaviorSubject<string>('');
  public searchBarUpdate = new EventEmitter();
  currentSearchQuery: string | undefined;

  updateSearchQuery($event: any) {
    this.searchQuery.next($event.target.value);
    this.searchQuery.asObservable().subscribe({
      next: value => {
        this.currentSearchQuery = value;
        this.searchBarUpdate.emit();
      }
    });
  }
}

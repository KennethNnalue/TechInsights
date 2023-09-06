import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../authentication/store/reducers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ti-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });

  constructor(private store: Store) {}
}

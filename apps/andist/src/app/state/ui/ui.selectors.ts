import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UiState } from './ui.reducers';

export const selectUiState = (state: AppState) => state.ui;
export const selectIsSideNavbarOpen = createSelector(
  selectUiState,
  (state: UiState) => state.isSideNavbarOpen
);

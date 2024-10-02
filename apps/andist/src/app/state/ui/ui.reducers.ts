import { createReducer, on } from '@ngrx/store';
import { closeSideNavbar, openSideNavbar } from './ui.actions';

export interface UiState {
  isSideNavbarOpen: boolean;
}

export const initialState: UiState = {
  isSideNavbarOpen: false
};

export const uiReducer = createReducer(
  initialState,
  on(openSideNavbar, (state) => ({
    ...state,
    isSideNavbarOpen: true,
  })),
  on(closeSideNavbar, (state) => ({
    ...state,
    isSideNavbarOpen: false
  }))
);

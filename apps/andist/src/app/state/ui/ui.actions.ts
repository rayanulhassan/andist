import { createAction, props } from '@ngrx/store';

export const openSideNavbar = createAction(
  '[UI] OpenSideNavbar'
);
export const closeSideNavbar = createAction(
  '[UI] CloseSideNavbar'
);
// export const signOut = createAction('[User] SignOut');
// export const reset = createAction('[User] Reset');

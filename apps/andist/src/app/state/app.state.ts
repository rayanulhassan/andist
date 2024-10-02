import { AuthState } from "./auth/auth.reducers";
import { UiState } from "./ui/ui.reducers";
import { UserState } from "./user/user.reducers";

export interface AppState {
    auth:AuthState,
    user:UserState,
    ui:UiState
}
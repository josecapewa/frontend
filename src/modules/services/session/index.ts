import { useAppStore } from "../stores/app";
import { useSessionStore } from "../stores/session";

export class SessionService {
  removeSessionData() {
    const state = useSessionStore.getState();
    state?.removeSession();
    useAppStore.getState().setLoged(false);
  }
  set(user: User) {
    const state = useSessionStore.getState();
    state.setUser(user);
    useAppStore.getState().setLoged(true);
  }
}

export const sessionService = new SessionService();

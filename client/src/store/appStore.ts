import { create } from "zustand";

type Theme = "light" | "dark";

interface AppState {
  commandOpen: boolean;
  theme: Theme;
  activeOrganization: string;
  setCommandOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setOrganization: (organization: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  commandOpen: false,
  theme: "light",
  activeOrganization: "Acme Cloud Systems",
  setCommandOpen: (open) => set({ commandOpen: open }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setOrganization: (organization) => set({ activeOrganization: organization })
}));
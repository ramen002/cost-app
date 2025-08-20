import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SettingsStore = {
  adsEnabled: boolean;
  currency: string;
  premiumUnlocked: boolean;
  toggleAds: () => void;
  unlockPremium: () => void;
  setCurrency: (currency: string) => void;
};

// PersistStorage<T> に合うようにラップ
const asyncStoragePersistWrapper = <T>() => ({
  getItem: async (name: string): Promise<{ state: T } | null> => {
    const json = await AsyncStorage.getItem(name);
    if (!json) return null;
    try {
      const data = JSON.parse(json);
      return { state: data } as { state: T };
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: { state: T }) => {
    await AsyncStorage.setItem(name, JSON.stringify(value.state));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
});

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      adsEnabled: true,
      currency: 'JPY',
      premiumUnlocked: false,
      toggleAds: () => set((s) => ({ adsEnabled: !s.adsEnabled })),
      unlockPremium: () => set({ premiumUnlocked: true, adsEnabled: false }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'settings-storage',
      storage: asyncStoragePersistWrapper<SettingsStore>(),
    }
  )
);

import { create } from 'zustand';
import { HistoryItem } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

type HistoryStore = {
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  clearHistory: () => void;
};

// PersistStorage<T> 用のラッパー
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

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      addHistory: (item) => {
        const newItem: HistoryItem = {
          id: uuidv4(),
          createdAt: Date.now(),
          ...item,
        };
        set({ history: [newItem, ...get().history].slice(0, 10) }); // 最新10件保持
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'history-storage',
      storage: asyncStoragePersistWrapper<HistoryStore>(), // state ラップ済みラッパー
    }
  )
);

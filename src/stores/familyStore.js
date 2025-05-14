
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFamilyStore = create(
  persist(
    (set) => ({
      family: [], // Array of family member objects { id, name, avatar, ...otherDetails }
      currentProfileId: null,

      addMember: (member) =>
        set((state) => ({ family: [...state.family, { id: Date.now().toString(), ...member }] })),
      
      updateMember: (memberId, updatedInfo) =>
        set((state) => ({
          family: state.family.map((m) =>
            m.id === memberId ? { ...m, ...updatedInfo } : m
          ),
        })),

      removeMember: (memberId) =>
        set((state) => ({
          family: state.family.filter((m) => m.id !== memberId),
          currentProfileId: state.currentProfileId === memberId ? (state.family.length > 1 ? state.family.find(m => m.id !== memberId).id : null) : state.currentProfileId,
        })),
      
      setCurrentProfile: (memberId) => set({ currentProfileId: memberId }),

      // Example: Initialize with a default member if no family members exist
      // This could be called once when the app loads
      initializeDefaultMember: () => set((state) => {
        if (state.family.length === 0) {
          const defaultMember = { id: 'default-user', name: 'Demo User', avatar: 'https://images.unsplash.com/photo-1487637987171-9a3af0e6eb18' };
          return { family: [defaultMember], currentProfileId: defaultMember.id };
        }
        return {};
      }),
    }),
    {
      name: 'family-storage', // name of the item in the storage (must be unique)
    }
  )
);
  
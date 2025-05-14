import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // Chores state
      chores: [],
      lifetimePoints: 0,
      addChore: (chore) => set((state) => ({ chores: [...state.chores, { ...chore, id: Date.now() }] })),
      updateChore: (id, updates) => set((state) => {
        const prevChore = state.chores.find(chore => chore.id === id);
        let lifetimePoints = state.lifetimePoints;
        // If marking as completed for the first time, increment lifetimePoints
        if (updates.status === 'completed' && prevChore.status !== 'completed') {
          lifetimePoints += prevChore.points || 0;
        }
        // If reopening, do not decrement lifetimePoints
        return {
          chores: state.chores.map(chore => chore.id === id ? { ...chore, ...updates } : chore),
          lifetimePoints
        };
      }),
      deleteChore: (id) => set((state) => ({
        chores: state.chores.filter(chore => chore.id !== id)
      })),

      // Rewards state
      rewardHistory: [],
      redeemReward: (reward) => set((state) => {
        // Calculate available points from currently completed chores
        const completedPoints = state.chores.filter(c => c.status === 'completed').reduce((sum, c) => sum + (c.points || 0), 0);
        const spent = state.rewardHistory.reduce((sum, r) => sum + r.points, 0);
        const available = completedPoints - spent;
        if (available < reward.points) return {}; // Not enough points
        return {
          rewardHistory: [
            ...state.rewardHistory,
            { ...reward, redeemedAt: new Date().toISOString() }
          ]
        };
      }),
      getAvailablePoints: () => {
        const state = get();
        const completedPoints = state.chores.filter(c => c.status === 'completed').reduce((sum, c) => sum + (c.points || 0), 0);
        const spent = state.rewardHistory.reduce((sum, r) => sum + r.points, 0);
        return Math.max(completedPoints - spent, 0);
      },
      getLifetimePoints: () => {
        const state = get();
        return state.lifetimePoints;
      },

      // Budget state
      transactions: [],
      addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, { ...transaction, id: Date.now() }]
      })),
      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map(transaction => 
          transaction.id === id ? { ...transaction, ...updates } : transaction
        )
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(transaction => transaction.id !== id)
      })),

      // Meal planning state
      meals: [],
      addMeal: (meal) => set((state) => ({
        meals: [...state.meals, { ...meal, id: Date.now() }]
      })),
      updateMeal: (id, updates) => set((state) => ({
        meals: state.meals.map(meal => meal.id === id ? { ...meal, ...updates } : meal)
      })),
      deleteMeal: (id) => set((state) => ({
        meals: state.meals.filter(meal => meal.id !== id)
      })),

      // Family members state
      familyMembers: [],
      addFamilyMember: (member) => set((state) => ({
        familyMembers: [...state.familyMembers, { ...member, id: Date.now() }]
      })),
      updateFamilyMember: (id, updates) => set((state) => ({
        familyMembers: state.familyMembers.map(member => 
          member.id === id ? { ...member, ...updates } : member
        )
      })),
      deleteFamilyMember: (id) => set((state) => ({
        familyMembers: state.familyMembers.filter(member => member.id !== id)
      })),

      // Settings state
      settings: {
        theme: 'system',
        notifications: true,
        currency: 'USD',
        language: 'en'
      },
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      resetAll: () => set(() => ({
        chores: [],
        rewardHistory: [],
        lifetimePoints: 0,
        transactions: [],
        meals: [],
        familyMembers: [],
        settings: {
          theme: 'system',
          notifications: true,
          currency: 'USD',
          language: 'en'
        }
      }))
    }),
    {
      name: 'pushpsetu-storage',
      partialize: (state) => ({
        chores: state.chores,
        transactions: state.transactions,
        meals: state.meals,
        familyMembers: state.familyMembers,
        settings: state.settings,
        rewardHistory: state.rewardHistory,
        lifetimePoints: state.lifetimePoints
      })
    }
  )
);

export default useAppStore; 
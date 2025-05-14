
import React from 'react';

// Placeholder for chores API functions
// In a real app, this would interact with a backend (Supabase, Firebase, etc.)

export const getChores = async () => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Clean Kitchen", assignedTo: "Alice", dueDate: "2025-05-10", points: 20, status: "pending" },
        { id: 2, title: "Take out Trash", assignedTo: "Bob", dueDate: "2025-05-07", points: 10, status: "completed" },
      ]);
    }, 500);
  });
};

export const addChore = async (choreData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Adding chore:", choreData);
      resolve({ ...choreData, id: Date.now() });
    }, 500);
  });
};

export const updateChore = async (choreId, updatedData) => {
   return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Updating chore ${choreId}:`, updatedData);
      resolve({ id: choreId, ...updatedData });
    }, 500);
  });
};

export const deleteChore = async (choreId) => {
   return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Deleting chore ${choreId}`);
      resolve({ id: choreId });
    }, 500);
  });
};
  
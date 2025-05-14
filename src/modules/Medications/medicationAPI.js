
import React from 'react';

// Placeholder for medication API functions

export const getMedications = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Vitamin D", dosage: "1 tablet", frequency: "Daily", time: "Morning", forMember: "Alice" },
        { id: 2, name: "Metformin", dosage: "500mg", frequency: "Twice Daily", time: "8 AM, 8 PM", forMember: "Bob" },
      ]);
    }, 500);
  });
};

export const addMedication = async (medData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Adding medication:", medData);
      resolve({ ...medData, id: Date.now() });
    }, 500);
  });
};

export const updateMedication = async (medId, updatedData) => {
   return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Updating medication ${medId}:`, updatedData);
      resolve({ id: medId, ...updatedData });
    }, 500);
  });
};
  
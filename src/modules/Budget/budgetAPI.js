
import React from 'react';

// Placeholder for budget and expense API functions

export const getTransactions = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'expense', category: 'Groceries', amount: 75.50, date: '2025-05-05' },
        { id: 2, type: 'income', category: 'Salary', amount: 2500, date: '2025-05-01' },
      ]);
    }, 500);
  });
};

export const addTransaction = async (transactionData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Adding transaction:", transactionData);
      resolve({ ...transactionData, id: Date.now() });
    }, 500);
  });
};
  
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define the transaction type
export type Transaction = {
  id: string
  name: string
  amount: number
  date: string
  type: "expense" | "income"
  category: string
  status: "completed" | "pending" | "failed"
}

// Define the store type
type TransactionStore = {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void
  removeTransaction: (id: string) => void
  clearTransactions: () => void
}

// Create the store with persistence
export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: `T-${Math.floor(Math.random() * 10000)}`,
              date: new Date().toISOString().split("T")[0],
            },
            ...state.transactions,
          ].slice(0, 100), // Limit to 100 transactions
        })),
      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: "transaction-storage",
    },
  ),
)

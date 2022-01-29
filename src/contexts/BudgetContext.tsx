import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";

export const UNCATEGORIZED_ID = "UNCATEGORIZED";

export const budgetAtom = atomWithStorage<Budget[]>("budget", []);
export const expenseAtom = atomWithStorage<Expense[]>("expenses", []);
export const totalBudgetAtom = atom(
  (get) => get(budgetAtom).reduce((total, budget) => total + budget.max, 0)
);
export const totalExpensesAtom = atom(
  (get) => get(expenseAtom).reduce((total, expense) => total + expense.amount, 0)
);

export function getBudgetExpenses(budgetId: string | null) {
  return atom((get) => get(expenseAtom).filter((expense) => expense.budgetId === budgetId))
}

export function getBudgetSum(budgetId: string) {
  return atom((get) => get(getBudgetExpenses(budgetId)).reduce(
    (total, expense) => total + expense.amount,
    0
  ));
}

export const addBudgetAtom = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, { name, max }: Omit<Budget, "id">) => {
    // `update` is any single value we receive for updating this atom
    set(budgetAtom, [
      ...get(budgetAtom),
      {
        id: uuidv4(),
        name,
        max,
      },
    ])
});

export const addExpenseAtom = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, { budgetId, description, amount }: Omit<Expense, "id">) => {
    // `update` is any single value we receive for updating this atom
    set(expenseAtom, [
      ...get(expenseAtom),
      {
        id: uuidv4(),
        budgetId,
        description,
        amount,
      },
    ])
});

export const deleteExpenseAtom = atom(
  null,
  (get, set, expenseId: string) => {
    const prevExpenses = get(expenseAtom);
    set(expenseAtom, prevExpenses.filter((expense) => expense.id !== expenseId));
  }
);

export const deleteBudgetAtom = atom(
  null,
  (get, set, id: string) => {
    const prevExpenses = get(expenseAtom);
    const prevBudgets = get(budgetAtom);

    set(expenseAtom, prevExpenses.map((expense) => ({
      ...expense,
      budgetId: expense.budgetId === id ? UNCATEGORIZED_ID : expense.budgetId,
    })));

    set(budgetAtom, prevBudgets.filter((budget) => budget.id !== id));
  }
);

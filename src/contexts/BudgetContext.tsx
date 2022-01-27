import React, { useContext, createContext, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export const UNCATEGORIZED_ID = "UNCATEGORIZED";

type BudgetsContextType = {
  budgets: Budget[];
  expenses: Expense[];

  getBudgetExpenses: (budgetId: string) => Expense[];
  getBudgetSum: (budgetId: string) => number;

  addBudget: (name: string, max: number) => void;
  addExpense: (budgetId: string, description: string, amount: number) => void;

  deleteBudget: (id: string) => void;
  deleteExpense: (expenseId: string) => void;
};

const BudgetsContext = createContext<BudgetsContextType>({} as any);

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({
  children,
}: {
  children: ReactNode | undefined;
}) => {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>("budgets", []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

  function getBudgetExpenses(budgetId: string) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function getBudgetSum(budgetId: string) {
    return getBudgetExpenses(budgetId).reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }

  function addBudget(name: string, max: number) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }

      return [
        ...prevBudgets,
        {
          id: uuidv4(),
          name,
          max,
        },
      ];
    });
  }

  function addExpense(budgetId: string, description: string, amount: number) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {
          id: uuidv4(),
          budgetId,
          description,
          amount,
        },
      ];
    });
  }

  function deleteBudget(id: string) {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => ({
        ...expense,
        budgetId: expense.budgetId === id ? UNCATEGORIZED_ID : expense.budgetId,
      }))
    );

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense(expenseId: string) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== expenseId);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        getBudgetSum,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};

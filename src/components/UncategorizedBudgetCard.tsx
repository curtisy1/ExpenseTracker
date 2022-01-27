import React from "react";
import { UNCATEGORIZED_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

type Props = {
  onViewExpensesClick: () => void;
  onAddExpenseClick: () => void;
};

export default function UncategorizedBudgetCard({
  onViewExpensesClick,
  onAddExpenseClick,
}: Props) {
  const { getBudgetSum } = useBudgets();

  const amount = getBudgetSum(UNCATEGORIZED_ID);

  if (amount === 0) {
    return null;
  }

  return (
    <BudgetCard
      name="Uncategorized"
      amount={amount}
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
      gray
    />
  );
}

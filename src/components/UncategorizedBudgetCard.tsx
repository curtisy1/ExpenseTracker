import React from "react";
import {getBudgetSum, UNCATEGORIZED_ID} from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

type Props = {
  onViewExpensesClick: () => void;
  onAddExpenseClick: () => void;
};

export default function UncategorizedBudgetCard({
  onViewExpensesClick,
  onAddExpenseClick,
}: Props) {
  return (
    <BudgetCard
      name="Uncategorized"
      amountAtom={getBudgetSum(UNCATEGORIZED_ID)}
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
      gray
    />
  );
}

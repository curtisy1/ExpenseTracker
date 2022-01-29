import {useAtom} from "jotai";
import React from "react";
import { totalBudgetAtom, totalExpensesAtom } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const [max] = useAtom(totalBudgetAtom);

  if (max === 0) {
    return null;
  }

  return <BudgetCard name="Total" amountAtom={totalExpensesAtom} max={max} gray hideButtons/>;
}

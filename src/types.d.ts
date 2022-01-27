type Budget = {
  id: string;
  name: string;
  max: number;
};

type Expense = {
  id: string;
  budgetId: string;
  description: string;
  amount: number;
};

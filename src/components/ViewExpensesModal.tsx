import { useAtom } from "jotai";
import { Button, Modal, Stack } from "react-bootstrap";
import {
  budgetAtom,
  deleteBudgetAtom,
  deleteExpenseAtom,
  getBudgetExpenses,
  UNCATEGORIZED_ID
} from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";

type Props = {
  budgetId: string | null;
  handleClose: () => void;
};

export default function ViewExpensesModal({ budgetId, handleClose }: Props) {
  const [budgets] = useAtom(budgetAtom);
  const [, deleteBudget] = useAtom(deleteBudgetAtom);
  const [, deleteExpense] = useAtom(deleteExpenseAtom);
  const [expenses] = useAtom(getBudgetExpenses(budgetId))

  const budget =
    budgetId === UNCATEGORIZED_ID
      ? { name: "Uncategorized", id: UNCATEGORIZED_ID }
      : budgets.find(({ id }) => id === budgetId)!;

  function onDeleteBudgetClick() {
    deleteBudget(budgetId!);
    handleClose();
  }

  return (
    <Modal show={budgetId !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <span>Expenses - {budget?.name}</span>
        {budgetId !== UNCATEGORIZED_ID && (
          <Button
            variant="outline-danger"
            className="ms-2"
            onClick={onDeleteBudgetClick}
          >
            Delete
          </Button>
        )}
      </Modal.Header>
      <Modal.Body>
        {expenses.map(({ id, description, amount }) => (
          <Stack direction="horizontal" gap={3} key={id}>
            <div className="me-auto fs-4">{description}</div>
            <div className="fs-4">{currencyFormatter.format(amount)}</div>
            <Button
              size="sm"
              variant="outline-danger"
              className="ms-1"
              onClick={() => deleteExpense(id)}
            >
              &times;
            </Button>
          </Stack>
        ))}
      </Modal.Body>
    </Modal>
  );
}

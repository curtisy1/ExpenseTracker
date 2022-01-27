import classNames from "classnames";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

type Props = {
  name: string;
  amount: number;
  max?: number;
  gray?: boolean;
  hideButtons?: boolean;
  onAddExpenseClick?: () => void;
  onViewExpensesClick?: () => void;
};

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}: Props) {
  return (
    <Card
      className={classNames({
        "bg-light": gray,
        "bg-danger": max && amount > max,
        "bg-opacity-10": max && amount > max,
      })}
    >
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            min={0}
            now={amount}
            max={max}
            className="rounded-pill"
            variant={getProgressBarColor(amount, max)}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarColor(amount: number, max: number) {
  if (amount / max > 1) {
    return "danger";
  } else if (amount / max > 0.6) {
    return "warning";
  } else {
    return "success";
  }
}

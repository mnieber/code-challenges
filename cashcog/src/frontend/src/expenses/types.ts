import { EmployeeT } from 'src/employees/types';
import fx from 'money';

export type ExpenseResolutionStatusT = 'approved' | 'declined' | 'pending';

export type ExpenseResolutionT = {
  status: ExpenseResolutionStatusT;
  createdAt?: Date;
  reason?: string;
};

export type ExpenseT = {
  uuid: string;
  description: string;
  createdAt: Date;
  amount: number;
  currency: string;
  employee: EmployeeT;
  resolution: ExpenseResolutionT;
};

export type ExpenseByIdT = {
  [id: string]: ExpenseT;
};

export type ResolutionStatusByExpenseIdT = {
  [id: string]: ExpenseResolutionStatusT;
};

export const expenseStatus = (expense: ExpenseT) =>
  expense.resolution?.status ?? 'pending';

export const expenseAmountInEuro = (expense: ExpenseT) => {
  const hackConversion = true;
  return hackConversion
    ? expense.amount
    : fx(expense.amount).from(expense.currency).to('EUR');
};

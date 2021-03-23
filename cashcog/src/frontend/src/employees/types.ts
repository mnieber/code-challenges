export type EmployeeT = {
  uuid: string;
  firstName: string;
  lastName: string;
};

export const fullName = (employee: EmployeeT): string =>
  `${employee.firstName} ${employee.lastName}`;

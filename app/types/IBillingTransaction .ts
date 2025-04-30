export interface BillingTransaction {
  trans_flag: number;
  bill_type: string;
  branch_code: string;
  branch_name: string;
  doc_no: string;
  ar_code: string;
  ar_name: string;
  ar_credit_day: number;
  ar_group_code: string;
  ar_group_name: string;
  doc_date: Date; // ISO 8601 datetime string
  sum_debt_amount: string; // ตัวเลขเก็บเป็น string
  sum_pay_money: string;
  balance_debt_amount: string;
  billing_status: number;
  over_due_day: number;
  real_duedate: Date;
}

export interface IData {
  branch_code: string;
  branch_name: string;
  sum_debt_amount: number;
  sum_pay_money: number;
  balance_debt_amount: number;
  ar_code: string;
  ar_name: string;
  ar_group_code: string;
  ar_group_name: string;
  detail: BillingTransaction[];
}

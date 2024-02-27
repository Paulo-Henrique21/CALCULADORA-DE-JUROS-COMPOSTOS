export interface FormValues {
  period: number;
  interestRate: number | string;
  initialValue: number | string;
  monthlyValue: number | string;
  periodYearMonth: string;
  interestRateYearMonth: string;
}

export interface Calc {
  period: number;
  interestRate: number;
  initialValue: number;
  monthlyValue: number;
  periodYearMonth: string;
  interestRateYearMonth: string;
}

export interface CalculatorFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  isSubmitting: boolean;
}

export interface InvestmentData {
  month: number;
  fees: number;
  contribution: number;
  totalInvested: number;
  totalInterest: number;
  totalAccumulated: number;
}

export interface CardMoneyProps {
  finalTotalValueResult: Record<number, { [key: string]: any }>;
  info: string;
  title: string;
}

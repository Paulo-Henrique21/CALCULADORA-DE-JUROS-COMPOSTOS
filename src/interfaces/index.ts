export interface FormValues {
  periodo: number;
  taxaJuros: number | string;
  valorInicial: number | string;
  valorMensal: number | string;
  periodoAnoMes: string;
  taxaJurosAnoMes: string;
}
export interface Calc {
  periodo: number;
  taxaJuros: number;
  valorInicial: number;
  valorMensal: number;
  periodoAnoMes: string;
  taxaJurosAnoMes: string;
}

export interface CalculatorFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  isSubmitting: boolean;
}

export interface InvestmentData {
  mes: number;
  juros: number;
  aporte: number;
  totalInvestido: number;
  totalJuros: number;
  totalAcumulado: number;
}

export interface CardMoneyProps {
  finalTotalValueResult: Record<number, { [key: string]: any }>;
  info: string;
  title: string;
}

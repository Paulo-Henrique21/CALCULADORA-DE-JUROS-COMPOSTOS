export interface FormValues {
  periodo: number;
  taxaJuros: string;
  valorInicial: string;
  valorMensal: string;
  periodoAnoMes: string;
  taxaJurosAnoMes: string;
}

export interface CalculatorFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  isSubmitting: boolean;
}

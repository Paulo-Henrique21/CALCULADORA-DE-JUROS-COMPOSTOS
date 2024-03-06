import { Calc } from "@/interfaces";

const valorTotalFinal = async ({
  period,
  periodYearMonth,
  interestRate,
  interestRateYearMonth,
  initialValue,
  monthlyValue,
}: Calc) => {

  !initialValue && (initialValue = 0);
  !monthlyValue && (monthlyValue = 0);
  !interestRate && (interestRate = 0);
  !period && (period = 0);

  let monthlyInterestRate;
  let totalAccumulated = initialValue;
  let totalInterestAccumulated = 0;
  let table = [];

  if (interestRateYearMonth === "Anual") {
    monthlyInterestRate = (1 + interestRate / 100) ** (1 / 12) - 1;
  } else {
    monthlyInterestRate = interestRate / 100;
  }

  const numMeses = periodYearMonth === "Ano(s)" ? period * 12 : period;

  for (let month = 0; month <= numMeses; month++) {
    if (month > 0) {
      const fees = totalAccumulated * monthlyInterestRate;
      totalInterestAccumulated += fees;

      totalAccumulated += fees + monthlyValue;

      table.push({
        month: month,
        fees: Number(fees.toFixed(2)),
        contribution: Number(monthlyValue.toFixed(2)),
        totalInvested: Number((initialValue + monthlyValue * month).toFixed(2)), 
        totalInterest: Number(totalInterestAccumulated.toFixed(2)),
        totalAccumulated: Number(totalAccumulated.toFixed(2)),
      });
    } else {
      table.push({
        month: month,
        fees: 0,
        contribution: Number(monthlyValue.toFixed(2)),
        totalInvested: Number(initialValue.toFixed(2)),
        totalInterest: 0,
        totalAccumulated: Number(totalAccumulated.toFixed(2)),
      });
    }
  }

  return table;
};

export { valorTotalFinal };

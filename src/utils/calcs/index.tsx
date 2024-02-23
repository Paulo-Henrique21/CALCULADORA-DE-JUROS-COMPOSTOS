import { Calc } from "@/interfaces";

const valorTotalFinal = async ({
  periodo,
  periodoAnoMes,
  taxaJuros,
  taxaJurosAnoMes,
  valorInicial,
  valorMensal,
}: Calc) => {

  !valorInicial && (valorInicial = 0);
  !valorMensal && (valorMensal = 0);
  !taxaJuros && (taxaJuros = 0);
  !periodo && (periodo = 0);

  let taxaJurosMensal;
  let totalAcumulado = valorInicial;
  let totalJurosAcumulado = 0;
  let tabela = [];

  if (taxaJurosAnoMes === "Anual") {
    taxaJurosMensal = (1 + taxaJuros / 100) ** (1 / 12) - 1;
  } else {
    taxaJurosMensal = taxaJuros / 100;
  }

  const numMeses = periodoAnoMes === "Ano(s)" ? periodo * 12 : periodo;

  for (let mes = 0; mes <= numMeses; mes++) {
    if (mes > 0) {
      const juros = totalAcumulado * taxaJurosMensal;
      totalJurosAcumulado += juros;

      totalAcumulado += juros + valorMensal; // Adiciona também o aporte mensal

      tabela.push({
        mes: mes,
        juros: Number(juros.toFixed(2)),
        aporte: Number(valorMensal.toFixed(2)),
        totalInvestido: Number((valorInicial + valorMensal * mes).toFixed(2)), 
        totalJuros: Number(totalJurosAcumulado.toFixed(2)),
        totalAcumulado: Number(totalAcumulado.toFixed(2)),
      });
    } else {
      tabela.push({
        mes: mes,
        juros: 0,
        aporte: Number(valorMensal.toFixed(2)),
        totalInvestido: Number(valorInicial.toFixed(2)),
        totalJuros: 0,
        totalAcumulado: Number(totalAcumulado.toFixed(2)),
      });
    }
  }

  return tabela;
};

export { valorTotalFinal };

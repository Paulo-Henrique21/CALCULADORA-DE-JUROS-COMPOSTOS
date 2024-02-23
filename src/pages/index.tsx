import { Box, Divider, Flex, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { valorTotalFinal } from "@/utils/calcs";
import ChartLine from "@/components/ChartLine";
import TabsContent from "@/components/TabsContent";
import CardMoney from "@/components/Card";
import CalculatorForm from "@/components/CalculatorForm";
import { FormValues, InvestmentData } from "@/interfaces";
import TableValues from "@/components/TableValues";

export default function App() {
  const [finalTotalValueResult, setFinalTotalValueResult] = useState<
    InvestmentData[]
  >([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChart = async (
    periodo: number,
    taxaJuros: string,
    valorInicial: string,
    valorMensal: string,
    periodoAnoMes: string,
    taxaJurosAnoMes: string
  ) => {
    const periodoTratado = Number(periodo);
    const taxaJurosTratada = Number(taxaJuros.replace(",", "."));
    const valorMensalTratado = Number(
      valorMensal.replace(/[\s.]/g, "").replace(",", ".")
    );
    const valorInicialTratado = Number(
      valorInicial.replace(/[\s.]/g, "").replace(",", ".")
    );

    const response = await valorTotalFinal({
      periodo: periodoTratado,
      taxaJuros: taxaJurosTratada,
      valorInicial: valorInicialTratado,
      valorMensal: valorMensalTratado,
      taxaJurosAnoMes,
      periodoAnoMes,
    });
    console.log(response);

    setFinalTotalValueResult(response);
  };

  const onSubmit = async (values: FormValues) => {
    if (values.taxaJuros === "0" || values.taxaJuros === "0,") {
      console.error("Interest rate must be greater than zero");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const {
      periodo,
      taxaJuros,
      valorInicial,
      valorMensal,
      periodoAnoMes,
      taxaJurosAnoMes,
    } = values;
    handleChart(
      periodo,
      taxaJuros.toString(),
      valorInicial.toString(),
      valorMensal.toString(),
      periodoAnoMes,
      taxaJurosAnoMes
    );
    setIsSubmitting(false);
  };

  const listInfo = [
    { name: "totalJuros", title: "Total Juros" },
    { name: "totalInvestido", title: "Total Investido" },
    { name: "totalAcumulado", title: "Total Acumulado" },
  ];

  return (
    <Flex direction={"column"} align={"center"} p={10} minH={"100vh"}>
      <CalculatorForm onSubmit={onSubmit} isSubmitting={isSubmitting} />

      {Object.keys(finalTotalValueResult).length > 0 && (
        <>
          <Box w={"100%"} maxW={"5xl"}>
            <Divider my={4} />
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 4, lg: 3 }}
            >
              {listInfo.map((item, index) => (
                <CardMoney
                  key={index}
                  finalTotalValueResult={finalTotalValueResult}
                  info={item.name}
                  title={item.title}
                />
              ))}
            </SimpleGrid>
            <Box borderWidth={"1px"} borderRadius={"md"} mt={4} p={5}>
              <TabsContent
                contentChart={<ChartLine table={finalTotalValueResult} />}
                contentTable={<TableValues data={finalTotalValueResult} />}
              />
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
}

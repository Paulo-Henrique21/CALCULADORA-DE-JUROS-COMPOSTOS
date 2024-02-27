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
    period: number,
    interestRate: string,
    initialValue: string,
    monthlyValue: string,
    periodYearMonth: string,
    interestRateYearMonth: string
  ) => {
    const treatedPeriod = Number(period);
    const TreatedInterestRate = Number(interestRate.replace(",", "."));
    const valorMensalTratado = Number(
      monthlyValue.replace(/[\s.]/g, "").replace(",", ".")
    );
    const valorInicialTratado = Number(
      initialValue.replace(/[\s.]/g, "").replace(",", ".")
    );

    const response = await valorTotalFinal({
      period: treatedPeriod,
      interestRate: TreatedInterestRate,
      initialValue: valorInicialTratado,
      monthlyValue: valorMensalTratado,
      interestRateYearMonth,
      periodYearMonth,
    });

    setFinalTotalValueResult(response);
  };

  const onSubmit = async (values: FormValues) => {
    if (values.interestRate === "0" || values.interestRate === "0,") {
      console.error("Interest rate must be greater than zero");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const {
      period,
      interestRate,
      initialValue,
      monthlyValue,
      periodYearMonth,
      interestRateYearMonth,
    } = values;
    handleChart(
      period,
      interestRate.toString(),
      initialValue.toString(),
      monthlyValue.toString(),
      periodYearMonth,
      interestRateYearMonth
    );
    setIsSubmitting(false);
  };

  const listInfo = [
    { name: "totalInterest", title: "Total Juros" },
    { name: "totalInvested", title: "Total Investido" },
    { name: "totalAccumulated", title: "Total Acumulado" },
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

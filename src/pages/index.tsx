import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { valorTotalFinal } from "@/utils/calculos";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import ChartLine from "@/components/ChartLine";
import TabsContent from "@/components/TabsContent";
import CardMoney from "@/components/Card";
import CalculatorForm from "@/components/CalculatorForm";
import { FormValues } from "@/interfaces";
import TableValues from "@/components/TableValues";
import { PiFileText, PiFileTextBold } from "react-icons/pi";

interface TableItem {
  mes: number;
  juros: number;
  aporte: number;
  totalInvestido: number;
  totalJuros: number;
  totalAcumulado: number;
}

export default function App() {
  const [resultadoValorTotalFinal, setResultadoValorTotalFinal] = useState({});
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

    setResultadoValorTotalFinal(
      await valorTotalFinal({
        periodo: periodoTratado,
        taxaJuros: taxaJurosTratada,
        valorInicial: valorInicialTratado,
        valorMensal: valorMensalTratado,
        taxaJurosAnoMes,
        periodoAnoMes,
      })
    );
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
      taxaJuros,
      valorInicial,
      valorMensal,
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

  console.log(resultadoValorTotalFinal);

  return (
    <Flex
      direction={"column"}
      align={"center"}
      p={10}
      bg={"gray.50"}
      minH={"100vh"}
    >
      <CalculatorForm onSubmit={onSubmit} isSubmitting={isSubmitting} />

      {Object.keys(resultadoValorTotalFinal).length > 0 && (
        <>
          <Box w={"100%"} maxW={"5xl"} mt={5}>
            <Card>
              <CardHeader pb={2}>
                <Stack direction={"row"} alignItems={"center"}>
                  <IconButton
                    isRound={true}
                    aria-label="Done"
                    fontSize="20px"
                    icon={<PiFileTextBold />}
                  />
                  <Heading fontSize={"xl"}>RESULTADO</Heading>
                </Stack>
              </CardHeader>
              <CardBody px={10} pb={10}>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={{ base: 5, lg: 4 }}
                >
                  {listInfo.map((item, index) => (
                    <CardMoney
                      key={index}
                      resultadoValorTotalFinal={resultadoValorTotalFinal}
                      info={item.name}
                      title={item.title}
                    />
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
            <Card mt={5} p={0}>
              <CardBody px={1} py={3}>
                <TabsContent
                  contentChart={<ChartLine table={resultadoValorTotalFinal} />}
                  contentTable={
                    <TableValues
                      data={resultadoValorTotalFinal as TableItem[]}
                    />
                  }
                />
              </CardBody>
            </Card>

            {/* <ChartLine table={resultadoValorTotalFinal} />
            <TableValues data={resultadoValorTotalFinal as TableItem[]} /> */}
            {/*
            <SimpleGrid
              mt={7}
              columns={{ base: 1, md: 1 }}
              spacing={{ base: 5, lg: 4 }}
            >
              <Box bg="white" minHeight={"40rem"} borderRadius={"lg"}>
                 <Tabs
                  size="md"
                  isFitted
                  h={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <TabList fontSize={"lg"}>
                    <Tab
                    // _selected={{
                    //   color: "white",
                    //   bg: "purple.500",
                    //   borderTopLeftRadius: "md",
                    // }}
                    >
                      Gráfico
                    </Tab>
                    <Tab
                    // _selected={{
                    //   color: "white",
                    //   bg: "purple.500",
                    //   borderTopRightRadius: "md",
                    // }}
                    >
                      Tabela
                    </Tab>
                  </TabList>

                  <TabPanels h={"full"}>
                    <TabPanel h={"full"}>
                      <ChartLine table={resultadoValorTotalFinal} />
                    </TabPanel>
                    <TabPanel h={"full"} overflowY={"auto"} maxH={"587px"}>
                      <TableValues
                        data={resultadoValorTotalFinal as TableItem[]}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs> 
              </Box>
            </SimpleGrid>
              */}
          </Box>
        </>
      )}
    </Flex>
  );
}

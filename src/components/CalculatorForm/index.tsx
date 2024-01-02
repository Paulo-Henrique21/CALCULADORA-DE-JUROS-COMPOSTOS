import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { CalculatorFormProps } from "@/interfaces";
import { PiChartLineUpBold } from "react-icons/pi";

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const formik = useFormik({
    initialValues: {
      valorInicial: "",
      valorMensal: "",
      taxaJuros: "6,5",
      taxaJurosAnoMes: "Anual",
      periodo: 1,
      periodoAnoMes: "Ano(s)",
    },
    onSubmit: onSubmit,
  });

  const formatMoney = (inputValue: string) => {
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    })
      .format(Number(numericValue) / 100)
      .replace(/^R\$/u, "");

    return formattedValue;
  };

  const handleValueChange = (fieldName: string, inputValue: string) => {
    const formattedValue = formatMoney(inputValue);

    formik.handleChange({
      target: {
        name: fieldName,
        value: formattedValue,
      },
    });
  };

  return (
    <Box w={"100%"} maxW={"5xl"} >
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader pb={2}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                isRound={true}
                aria-label="Done"
                fontSize="20px"
                icon={<PiChartLineUpBold />}
              />
              <Heading fontSize={"xl"}>SIMULADOR DE JUROS COMPOSTOS</Heading>
            </Stack>
          </CardHeader>
          <CardBody px={10}>
            <Box bg={"#fff"} borderRadius={"md"}>
              <VStack spacing={2}>
                <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
                  <FormControl>
                    <FormLabel htmlFor="valorInicial">Valor inicial:</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="R$" />
                      <Input
                        id="valorInicial"
                        name="valorInicial"
                        type="text"
                        onChange={(e) =>
                          handleValueChange("valorInicial", e.target.value)
                        }
                        value={formik.values.valorInicial}
                        placeholder="0,00"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="valorMensal">Valor mensal:</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="R$" />
                      <Input
                        id="valorMensal"
                        name="valorMensal"
                        type="text"
                        onChange={(e) =>
                          handleValueChange("valorMensal", e.target.value)
                        }
                        value={formik.values.valorMensal}
                        placeholder="0,00"
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
                <Stack w={"full"} direction={{ base: "column", lg: "row" }}>
                  <Stack direction={"row"} w={"full"}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="taxaJuros">
                        Taxa de juros (%):
                      </FormLabel>
                      <InputGroup>
                        <InputLeftAddon children="%" />
                        <Input
                          id="taxaJuros"
                          name="taxaJuros"
                          type="text"
                          onChange={(e) => {
                            const formattedValue = e.target.value
                              .replace(/[^\d,]/g, "")
                              .replace(/,/g, (_, index, str) =>
                                str.indexOf(",") === index ? "," : ""
                              );

                            formik.handleChange({
                              target: {
                                name: "taxaJuros",
                                value: formattedValue,
                              },
                            });
                          }}
                          value={formik.values.taxaJuros}
                          placeholder="0,00"
                        />
                      </InputGroup>
                      {(formik.values.taxaJuros === "0" ||
                        formik.values.taxaJuros === "0,") && (
                        <FormHelperText color={"red.500"}>
                          Valor deve ser maior que zero
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Flex align={"end"}>
                      <Select
                        w={"110px"}
                        id="taxaJurosAnoMes"
                        name="taxaJurosAnoMes"
                        onChange={formik.handleChange}
                        value={formik.values.taxaJurosAnoMes}
                      >
                        <option value="Mensal">Mensal</option>
                        <option value="Anual">Anual</option>
                      </Select>
                    </Flex>
                  </Stack>
                  <Stack direction={"row"} w={"full"}>
                    <FormControl>
                      <FormLabel htmlFor="periodo">Período:</FormLabel>
                      <NumberInput
                        id="periodo"
                        name="periodo"
                        onChange={(valueString) =>
                          formik.handleChange({
                            target: {
                              name: "periodo",
                              value: Math.max(
                                1,
                                valueString !== "" ? parseInt(valueString) : 1
                              ),
                            },
                          })
                        }
                        value={formik.values.periodo}
                        min={1}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <Flex align={"end"}>
                      <Select
                        w={"110px"}
                        id="periodoAnoMes"
                        name="periodoAnoMes"
                        onChange={formik.handleChange}
                        value={formik.values.periodoAnoMes}
                      >
                        <option value="Ano(s)">Ano(s)</option>
                        <option value="Mes(es)">Mes(es)</option>
                      </Select>
                    </Flex>
                  </Stack>
                </Stack>
              </VStack>
            </Box>
          </CardBody>
          <CardFooter justifyContent={"end"} px={10} pt={0} pb={10}>
            <Button
              ml={2}
              type="button"
              colorScheme="gray"
              variant="link"
              px={4}
              onClick={() => {
                formik.resetForm({
                  values: {
                    valorInicial: "",
                    valorMensal: "",
                    taxaJuros: "",
                    taxaJurosAnoMes: "Anual",
                    periodo: 1,
                    periodoAnoMes: "Ano(s)",
                  },
                });
              }}
            >
              Limpar
            </Button>
            <Button
              isLoading={isSubmitting}
              type="submit"
              loadingText="Calculando..."
            >
              Calcular
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Box>
  );
};

export default CalculatorForm;

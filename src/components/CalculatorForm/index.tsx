import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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
    <Box w={"100%"} maxW={"5xl"}>
      <form onSubmit={formik.handleSubmit}>
        <Heading size={"lg"}>Calculadora de juros compostos</Heading>
        <Divider my={4} />
        <Box borderWidth={"1px"} borderRadius={"md"} p={5}>
          <VStack spacing={2}>
            <Stack
              w={"full"}
              direction={{
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
            >
              <FormControl>
                <FormLabel htmlFor="valorInicial" fontSize={"sm"}>
                  Valor inicial:
                </FormLabel>
                <InputGroup size={"sm"}>
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
                <FormLabel htmlFor="valorMensal" fontSize={"sm"}>
                  Valor mensal:
                </FormLabel>
                <InputGroup size={"sm"}>
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
            <Stack
              w={"full"}
              direction={{
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
              // bg={{
              //   base: "green",
              //   sm: "red",
              //   md: "blue",
              //   lg: "pink",
              //   xl: "purple",
              //   "2xl": "black",
              // }}
            >
              <Stack direction={"row"} w={"full"}>
                <FormControl isRequired>
                  <FormLabel
                    htmlFor="taxaJuros"
                    fontSize={"sm"}
                    whiteSpace={"nowrap"}
                  >
                    Taxa de juros (%):
                  </FormLabel>
                  <InputGroup size={"sm"}>
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
                    size={"sm"}
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
                  <FormLabel htmlFor="periodo" fontSize={"sm"}>
                    Período:
                  </FormLabel>
                  <NumberInput
                    size={"sm"}
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
                    max={1500}
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
                    size={"sm"}
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
          <Flex pt={3} justify={"end"}>
            <Button
              size={"sm"}
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
              size={"sm"}
              isLoading={isSubmitting}
              type="submit"
              loadingText="Calculando..."
            >
              Calcular
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default CalculatorForm;

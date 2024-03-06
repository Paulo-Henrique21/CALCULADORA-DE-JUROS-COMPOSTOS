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
  useColorMode,
} from "@chakra-ui/react";
import { CalculatorFormProps } from "@/interfaces";
import { GoSun, GoMoon } from "react-icons/go";

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const formik = useFormik({
    initialValues: {
      initialValue: "",
      monthlyValue: "",
      interestRate: "6,5",
      interestRateYearMonth: "Anual",
      period: 1,
      periodYearMonth: "Ano(s)",
    },
    onSubmit: onSubmit,
  });
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Flex w={"100%"} justifyContent={"space-between"}>
          <Heading size={"lg"}>Calculadora de juros compostos</Heading>
          <IconButton
            size={"sm"}
            onClick={toggleColorMode}
            aria-label="Search database"
            icon={colorMode === "dark" ? <GoSun /> : <GoMoon />}
          />
        </Flex>

        <Divider my={4} />
        <Box borderWidth={"1px"} borderRadius={"md"} p={5}>
          <VStack spacing={2}>
            <Stack
              w={"full"}
              direction={{
                base: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
            >
              <FormControl>
                <FormLabel htmlFor="initialValue" fontSize={"sm"}>
                  Valor inicial:
                </FormLabel>
                <InputGroup size={"sm"}>
                  <InputLeftAddon children="R$" />
                  <Input
                    id="initialValue"
                    name="initialValue"
                    type="text"
                    onChange={(e) =>
                      handleValueChange("initialValue", e.target.value)
                    }
                    value={formik.values.initialValue}
                    placeholder="0,00"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="monthlyValue" fontSize={"sm"}>
                  Valor mensal:
                </FormLabel>
                <InputGroup size={"sm"}>
                  <InputLeftAddon children="R$" />
                  <Input
                    id="monthlyValue"
                    name="monthlyValue"
                    type="text"
                    onChange={(e) =>
                      handleValueChange("monthlyValue", e.target.value)
                    }
                    value={formik.values.monthlyValue}
                    placeholder="0,00"
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack
              w={"full"}
              direction={{
                base: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
            >
              <Stack direction={{ base: "column", sm: "row" }} w={"full"}>
                <FormControl isRequired>
                  <FormLabel
                    htmlFor="interestRate"
                    fontSize={"sm"}
                    whiteSpace={"nowrap"}
                  >
                    Taxa de juros (%):
                  </FormLabel>
                  <InputGroup size={"sm"}>
                    <InputLeftAddon children="%" />
                    <Input
                      id="interestRate"
                      name="interestRate"
                      type="text"
                      onChange={(e) => {
                        const formattedValue = e.target.value
                          .replace(/[^\d,]/g, "")
                          .replace(/,/g, (_, index, str) =>
                            str.indexOf(",") === index ? "," : ""
                          );

                        formik.handleChange({
                          target: {
                            name: "interestRate",
                            value: formattedValue,
                          },
                        });
                      }}
                      value={formik.values.interestRate}
                      placeholder="0,00"
                    />
                  </InputGroup>
                  {(formik.values.interestRate === "0" ||
                    formik.values.interestRate === "0,") && (
                    <FormHelperText color={"red.500"}>
                      Valor deve ser maior que zero
                    </FormHelperText>
                  )}
                </FormControl>
                <Flex align={"end"}>
                  <Select
                    size={"sm"}
                    w={{ base: "100%", sm: "110px" }}
                    id="interestRateYearMonth"
                    name="interestRateYearMonth"
                    onChange={formik.handleChange}
                    value={formik.values.interestRateYearMonth}
                  >
                    <option value="Mensal">Mensal</option>
                    <option value="Anual">Anual</option>
                  </Select>
                </Flex>
              </Stack>
              <Stack direction={{ base: "column", sm: "row" }} w={"full"}>
                <FormControl>
                  <FormLabel htmlFor="period" fontSize={"sm"}>
                    Período:
                  </FormLabel>
                  <NumberInput
                    size={"sm"}
                    id="period"
                    name="period"
                    onChange={(valueString) =>
                      formik.handleChange({
                        target: {
                          name: "period",
                          value: Math.max(
                            1,
                            valueString !== "" ? parseInt(valueString) : 1
                          ),
                        },
                      })
                    }
                    value={formik.values.period}
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
                    w={{ base: "100%", sm: "110px" }}
                    id="periodYearMonth"
                    name="periodYearMonth"
                    onChange={formik.handleChange}
                    value={formik.values.periodYearMonth}
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
                    initialValue: "",
                    monthlyValue: "",
                    interestRate: "",
                    interestRateYearMonth: "Anual",
                    period: 1,
                    periodYearMonth: "Ano(s)",
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

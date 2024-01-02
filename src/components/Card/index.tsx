import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface CardMoneyProps {
  resultadoValorTotalFinal: Record<number, { [key: string]: any }>;
  info: string;
  title: string;
}

export default function CardMoney({
  resultadoValorTotalFinal,
  info,
  title
}: CardMoneyProps) {
  const numberOfEntries = Object.keys(resultadoValorTotalFinal).length;

  const totalValue = resultadoValorTotalFinal[numberOfEntries - 1][
    info
  ].toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  console.log(resultadoValorTotalFinal)

  return (
      
    <Box bg="white" height={"auto"} borderRadius={"lg"} p={5} borderWidth={'1px'}>
      <Flex justify={"center"}>

        <Text fontSize="md">{title}</Text>
      </Flex>
        <Flex justify={"center"}>
          <Heading fontWeight={'500'} fontSize={"3xl"} 
          >R${totalValue}</Heading>
        </Flex>
    </Box>
  );
}

import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CardMoneyProps } from "@/interfaces";

export default function CardMoney({
  finalTotalValueResult,
  info,
  title
}: CardMoneyProps) {
  const numberOfEntries = Object.keys(finalTotalValueResult).length;

  const totalValue = finalTotalValueResult[numberOfEntries - 1][
    info
  ].toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
      
    <Box bg="white" height={"auto"} borderRadius={"lg"} p={5} borderWidth={'1px'} w={'100%'}>
      <Flex justify={"center"} w={'100%'}>

        <Text fontSize="md">{title}</Text>
      </Flex>
        <Flex justify={"center"} w={'100%'}>
          <Heading fontWeight={'500'} fontSize={"3xl"} w={'100%'}
          textAlign={"center"}
          >R${totalValue}</Heading>
        </Flex>
    </Box>
  );
}

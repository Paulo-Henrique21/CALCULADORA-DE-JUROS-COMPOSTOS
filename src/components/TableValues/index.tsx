import { InvestmentData } from "@/interfaces";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

interface ColumnNames {
  [key: string]: string;
}

export default function TableValues({ data }: { data: InvestmentData[] }) {
  if (!data || data.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  const columnNames: ColumnNames = {
    month: "mês",
    fees: "taxas",
    contribution: "contribuição",
    totalInvested: "total investido",
    totalInterest: "juros totais",
    totalAccumulated: "total acumulado",
  };

  const columns = Object.keys(data[0]).map((column) => columnNames[column]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              {Object.keys(item).map((key) => (
                <Td key={key}>
                  {key === "month"
                    ? item[key as keyof InvestmentData]
                    : new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(item[key as keyof InvestmentData])}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

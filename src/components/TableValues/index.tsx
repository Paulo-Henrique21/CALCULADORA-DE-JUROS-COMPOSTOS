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

export default function TableValues({ data }: { data: InvestmentData[] }) {
  if (!data || data.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  const columns = Object.keys(data[0]);

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
              {columns.map((column) => (
                <Td key={column}>
                  {column === "month"
                    ? item[column as keyof InvestmentData]
                    : new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(item[column as keyof InvestmentData])}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

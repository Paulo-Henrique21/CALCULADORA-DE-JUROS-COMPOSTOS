import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

interface TableItem {
  mes: number;
  juros: number;
  aporte: number;
  totalInvestido: number;
  totalJuros: number;
  totalAcumulado: number;
}

export default function TableValues({ data }: { data: TableItem[] }) {
 
  if (!data || data.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  // Obtém as chaves da primeira entrada para criar dinamicamente as colunas
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
                  {column === "mes"
                    ? item[column as keyof TableItem]
                    : new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(item[column as keyof TableItem])}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

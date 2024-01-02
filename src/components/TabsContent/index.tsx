import {
  Heading,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { PiChartLineUpBold } from "react-icons/pi";

interface TabsContentProps {
  contentChart: ReactNode;
  contentTable: ReactNode;
}

export default function TabsContent({
  contentChart,
  contentTable,
}: TabsContentProps) {
  return (
    <Tabs variant="soft-rounded" colorScheme="gray">
      <TabList border={"none"} px={2}>
        <Tab justifyContent={"start"} p={2}>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton
              isRound={true}
              aria-label="Done"
              fontSize="20px"
              icon={<PiChartLineUpBold />}
            />
            <Heading fontSize={"xl"}>GRÁFICO</Heading>
          </Stack>
        </Tab>
        <Tab justifyContent={"start"} p={2}>
          <Stack direction={"row"} alignItems={"center"} mx={2}>
            <IconButton
              isRound={true}
              aria-label="Done"
              fontSize="20px"
              icon={<PiChartLineUpBold />}
            />
            <Heading fontSize={"xl"}>TABELA</Heading>
          </Stack>
        </Tab>
      </TabList>
      <TabPanels mt={4}>
        <TabPanel h={"587px"}>{contentChart}</TabPanel>
        <TabPanel h={"full"} overflowY={"auto"} maxH={"587px"}>
          {contentTable}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

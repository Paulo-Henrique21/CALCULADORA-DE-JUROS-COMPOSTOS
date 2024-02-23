import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface TabsContentProps {
  contentChart: ReactNode;
  contentTable: ReactNode;
}

export default function TabsContent({
  contentChart,
  contentTable,
}: TabsContentProps) {
  const bgTabsGroup = useColorModeValue("gray.100", "gray.900");
  const bgTabSelected = useColorModeValue("white", "black");
  const colorTabSelected = useColorModeValue("black", "white");
  const colorTabOffSelectedHover = useColorModeValue("gray.500", "gray.300");

  return (
    <Tabs position="relative" variant="unstyled" size={"sm"} maxH={"456px"}>
      <TabList>
        <Flex w={"100%"} justify={"start"}>
          <Flex bg={bgTabsGroup} p={1} borderRadius={"lg"}>
            <Tab
              _selected={{
                color: colorTabSelected,
                bg: bgTabSelected,
                borderRadius: "lg",
                _hover: { color: colorTabSelected },
              }}
              borderRadius={"lg"}
              color={"gray.400"}
              _hover={{ color: colorTabOffSelectedHover }}
            >
              Gráfico
            </Tab>
            <Tab
              _selected={{
                color: colorTabSelected,
                bg: bgTabSelected,
                borderRadius: "lg",
                _hover: { color: colorTabSelected },
              }}
              borderRadius={"lg"}
              color={"gray.400"}
              _hover={{ color: colorTabOffSelectedHover }}
            >
              Tabela
            </Tab>
          </Flex>
        </Flex>
      </TabList>
      <TabPanels mt={4}>
        <TabPanel p={0} h={"400px"} maxH={"400px"}>
          {contentChart}
        </TabPanel>
        <TabPanel p={0} overflowY={"auto"} h={"400px"} maxH={"400px"}>
          {contentTable}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

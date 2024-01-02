import { Box } from "@chakra-ui/react";
import _ from "lodash";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import StockTools from "highcharts/modules/stock-tools";
import Exporting from "highcharts/modules/exporting";
import ExportData from "highcharts/modules/export-data";
import { useEffect } from "react";

export default function ChartLine({ table }) {

  const colors = ['#0077bd', '#28a745']

  useEffect(() => {
    StockTools(Highcharts);
    Exporting(Highcharts);
    ExportData(Highcharts);
  }, []);

  const options = {
    chart: {
      type: "spline",
      backgroundColor: "#fff",
      zoomType: "x",
      scrollablePlotArea: {
        minWidth: 1,
      },
      style: {
        fontFamily: "Prompt",
      },
    },
    legend: {
      enabled: true,
      align: "center", // Align the legend items to the center
      verticalAlign: "top", // Align the legend to the top
      layout: "horizontal", // Display legend items horizontally
      x: 0,
      y: 0,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "number",
      lineWidth: 0,
      tickWidth: 0,
      title: {
        text: "Meses",
      },
    },
    yAxis: [
      {
        title: {
          text: "Investimento (R$)",
        },
        lineWidth: 0,
        gridLineWidth: 0,
      },
    ],
    plotOptions: {
      column: {
        borderRadius: 8, // Valor para controlar o arredondamento das barras
      },
    },

    tooltip: {
      backgroundColor: "#1a202cae",
      borderColor: "none",
      style: {
        fontSize: "14px",
        color: "#fff",
      },
      split: false,
      shared: true,
      valueDecimals: 2,
    },

    series: [
      {
        name: "Total Investido",
        data: table.map(function (item) {
          return item.totalInvestido;
        }),
        tooltip: {
            pointFormatter: function () {
              var point = this;
              var item = table[point.index];
          
              // Definindo a variável de cor
              
          
              // Formatação do número para o formato brasileiro
              var totalInvestidoFormatted = item.totalInvestido.toLocaleString(
                "pt-BR",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              );
          
              return (
                '<span style="color: ' + colors[0] + '">\u25CF</span> Total Investido: ' +
                totalInvestidoFormatted +
                "<br/>"
              );
            },
          },
        color: colors[0]
      },
      {
        name: "Total Juros",
        data: table.map(function (item) {
          return item.totalAcumulado;
        }),
        tooltip: {
          pointFormatter: function () {
            var point = this;
            var item = table[point.index];

            // Formatação do número para o formato brasileiro
            var totalJurosFormatted = item.totalJuros.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            return (
                '<span style="color: ' + colors[1] + '">\u25CF</span> Total Juros: ' +
              totalJurosFormatted +
              "<br/>"
            );
          },
        },
        color: colors[1]
      },
    ],

    exporting: {
      enabled: false,
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            "downloadCSV",
            "downloadXLS",
          ],
        },
      },
    },
  };

  return (
    <Box w={"100%"} height={"100%"} zIndex={0}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: "100%", width: "100%" } }}
      />
    </Box>
  );
}

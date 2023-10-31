import ReactApexChart from "react-apexcharts";

export const DashboardChart = ({ chartData }) => {
    const options = {
        chart: {
          type: "line",
          background: "transparent",
        },
        xaxis: {
          categories: chartData.labels,
        },
        yaxis: {
          title: {
            text: "Ganho de Peso (kg)",
          },
        },
        colors: ["#5D915D"], // Cor da linha
        dataLabels: {
          enabled: true,
        },
        title: {
          text: "Weight gain (kg)",
          align: "center",
          margin: 20,
          style: {
            fontSize: "24px",
          },
        },
      };    

    return (
        <ReactApexChart
        options={options}
        series={chartData.datasets}
        type={options.chart.type}
        height="350"
      />
        )
}


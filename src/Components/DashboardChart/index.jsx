import ReactApexChart from "react-apexcharts";
import "./styles.css";
import { useMediaQuery } from "@mui/material";

export const DashboardChart = ({ chartData, selectedBabyId }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const filteredChartData = {
    labels: chartData.labels,
    datasets: chartData.datasets.filter(
      (dataset) => dataset.baby_id === selectedBabyId
    ),
  };

  const options = {
    chart: {
      type: "line",
      background: "transparent",
      fontFamily: "Poppins",
    },
    xaxis: {
      categories: chartData.labels,
    },
    yaxis: {
      title: {
        text: "Weight Gain (kg)",
      },
      tickAmount: isSmallScreen ? 5 : 10,
    },
    colors: ["#5D915D"],
    dataLabels: {
      enabled: true,
    },
    title: {
      text: "Weight Gain",
      align: "center",
      margin: 10,
      style: {
        fontSize: "28px",
        fontWeight: "600",
      },
    },
  };

  return (
    <div className="chart-container">
      <ReactApexChart
        options={options}
        series={filteredChartData.datasets}
        type={options.chart.type}
        height={isSmallScreen ? 300 : 350}
      />
    </div>
  );
};

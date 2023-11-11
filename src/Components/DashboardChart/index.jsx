import ReactApexChart from "react-apexcharts";
import "./styles.css"

export const DashboardChart = ({ chartData }) => {
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
            text: "Ganho de Peso (kg)",
          },
        },
        colors: ["#5D915D"],
        dataLabels: {
          enabled: true,
        },
        title: {
          text: "Weight Gain",
          align: "center",
          margin: 20,
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
          series={chartData.datasets}
          type={options.chart.type}
          height="550"
        />
      </div>
        )
}


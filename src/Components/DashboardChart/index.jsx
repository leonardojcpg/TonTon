import ReactApexChart from "react-apexcharts";
import "./styles.css";

export const DashboardChart = ({ chartData }) => {
  // Certifique-se de que as datas estejam em um formato adequado para ordenação
  const formattedData = chartData.labels.map((data) => {
    const [day, month, year] = data.split('/');
    // Certifique-se de que o formato é YYYY-MM-DD para ordenação correta
    const formattedDate = `${year}-${month}-${day}`;
    return { formattedDate, originalDate: data };
  });

  // Ordene os dados com base na data formatada
  formattedData.sort((a, b) => (a.formattedDate > b.formattedDate ? 1 : -1));

  const options = {
    chart: {
      type: "line",
      background: "transparent",
      fontFamily: "Poppins",
    },
    xaxis: {
      categories: formattedData.map((data) => data.originalDate),
    },
    yaxis: {
      title: {
        text: "Weight Gain (kg)",
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
  );
};

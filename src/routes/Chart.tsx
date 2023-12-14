import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IOutletProps {
  coinId: string;
}

interface ICoinHistoryData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  //const coinId = useOutletContext() as IOutletProps;
  // 부모인 Coin.tsx에서 준 context를 받아서 사용 가능
  const { coinId } = useOutletContext<IOutletProps>();

  // isDarkAtom의 default value가 bool이므로 isDark의 타입도 bool이 됨
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<ICoinHistoryData[]>(
    ["chart", coinId],
    () => fetchCoinHistory(coinId)
  );

  console.log(isLoading, data);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",

              data: data?.map((price) => Number(price.close)) ?? [], // undefined면 빈 문자열 반환하겠다.
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              // type: "datetime",
              categories: data?.map((date) => {
                return new Date(date.time_close);
              }),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#2ecc71"],
                stops: [0, 100],
              },
            },
            colors: ["#2980b9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

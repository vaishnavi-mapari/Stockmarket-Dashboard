import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./Card";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../utils/api/stock-api";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from "../utils/helpers/date-helper";
import { chartConfig } from "../constants/config";

const Chart = () => {
  const [filter, setFilter] = useState("1W");
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);

  const formatData = (data) => {
    // Check if data is an array and has elements
    if (!Array.isArray(data) || data.length === 0) {
      console.error('No data available or data is not in expected format');
      return []; // Return an empty array or handle appropriately
    }
  
    // Proceed with mapping if data is valid
    return data.map((entry) => {
      return {
        time: entry.time,
        open: entry.open,
        high: entry.high,
        low: entry.low,
        close: entry.close,
        volume: entry.volume,
      };
    });
  };
  

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    // const updateChartData = async () => {
    //   try {
    //     const { startTimestampUnix, endTimestampUnix } = getDateRange();
    //     const resolution = chartConfig[filter].resolution;
    //     const result = await fetchHistoricalData(
    //       stockSymbol,
    //       resolution,
    //       startTimestampUnix,
    //       endTimestampUnix
    //     );
    //     setData(formatData(result));
    //   } catch (error) {
    //     setData([]);
    //     console.error("Failed to fetch historical data:", error);
    //   }
    // };

    const updateChartData = async () => {
      try {
        const historicalData = await fetchHistoricalData('MSFT', 'from_time', 'to_time');
    
        // Ensure data is valid before calling formatData
        if (!historicalData || historicalData.length === 0) {
          console.error('Failed to fetch or no data available');
          return; // Exit the function if data is not valid
        }
    
        // Format the data
        const formattedData = formatData(historicalData);
    
        // Continue with chart update logic
        if (formattedData.length > 0) {
          // Proceed with chart updates using formattedData
          console.log('Formatted Data:', formattedData);
          // Code to update your chart with formattedData
        } else {
          console.error('No formatted data to update the chart');
        }
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      }
    };
    

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => setFilter(item)}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
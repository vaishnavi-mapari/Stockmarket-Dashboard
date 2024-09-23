const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;


// export const fetchHistoricalData = async (symbol, from, to) => {
//   try {
//     const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=15&from=${from}&to=${to}&token=${API_KEY}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error('An error has occurred:', error);
//     throw error; // Re-throw error for handling in component
//   }
// };

export const fetchHistoricalData = async (symbol, from, to) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=UPPZVI8HS0XY8OXA`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    
    const data = await response.json();
    
    // Check if the response contains the required data
    const timeSeries = data['Time Series (15min)'];
    
    if (!timeSeries) {
      throw new Error('Unexpected response format: Missing Time Series (15min) data');
    }

    // Parse the data to fit your needs.
    const formattedData = Object.entries(timeSeries).map(([time, values]) => ({
      time,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'], 10),
    }));

    console.log(formattedData);
    return formattedData;
  } catch (error) {
    console.error('An error has occurred:', error);
    throw error; // Re-throw error for handling in component
  }
};





export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error has occurred:', error);
    throw error; // Re-throw error for handling in component
  }
};

export const fetchQuote = async (symbol) => {
  try {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error has occurred:', error);
    throw error; // Re-throw error for handling in component
  }
};

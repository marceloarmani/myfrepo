import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [prices, setPrices] = useState({
    bitcoin: null,
    gold: null,
    silver: null,
    usdbrl: null,
    us10y: null,
  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const [btc, gold, silver, usdbrl, us10y] = await Promise.all([
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"),
        axios.get("https://www.goldapi.io/api/XAU/USD", {
          headers: { 'x-access-token': 'goldapi-4czjlk1mmar2m084-io' },
        }),
        axios.get("https://www.goldapi.io/api/XAG/USD", {
          headers: { 'x-access-token': 'goldapi-4czjlk1mmar2m084-io' },
        }),
        axios.get("https://economia.awesomeapi.com.br/json/last/USD-BRL"),
        axios.get("https://query1.finance.yahoo.com/v8/finance/chart/^TNX?interval=1d")
      ]);

      setPrices({
        bitcoin: btc.data.bitcoin.usd,
        gold: gold.data.price,
        silver: silver.data.price,
        usdbrl: usdbrl.data.USDBRL.bid,
        us10y: (us10y.data.chart.result[0].meta.regularMarketPrice / 10).toFixed(2)
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Real-Time Asset Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        <AssetCard name="Bitcoin" value={prices.bitcoin} unit="USD" />
        <AssetCard name="Gold" value={prices.gold} unit="USD/oz" />
        <AssetCard name="Silver" value={prices.silver} unit="USD/oz" />
        <AssetCard name="USD/BRL" value={prices.usdbrl} unit="BRL" />
        <AssetCard name="US 10Y Yield" value={prices.us10y} unit="%" />
      </div>
    </div>
  );
}

function AssetCard({ name, value, unit }) {
  return (
    <div className="rounded-2xl shadow-md p-4 bg-gray-50 text-center">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-2xl font-bold">{value !== null ? `${value} ${unit}` : "Loading..."}</p>
    </div>
  );
}
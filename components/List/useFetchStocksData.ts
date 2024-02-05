import {useEffect, useMemo, useState} from 'react';
import {TItemList} from './List.types';

function useFetchStocksData() {
  const [stocks, setStocks] = useState<null | TItemList>();
  const [stocksFetching, setStocksFetching] = useState<boolean>(true);

  const {totalCurrentValue, totalInvestment, todaysTotalPNL} = useMemo(() => {
    if (!stocks) {
      return {
        todaysTotalPNL: 0,
        totalCurrentValue: 0,
        totalInvestment: 0,
      };
    }

    const currentV = stocks.reduce((prev, cv) => {
      return prev + cv.quantity * cv.ltp;
    }, 0);

    const totalI = stocks.reduce((prev, cv) => {
      return prev + cv.quantity * cv.avgPrice;
    }, 0);

    const todayPNL = stocks.reduce((prev, cv) => {
      return prev + (cv.close - cv.ltp) * cv.quantity;
    }, 0);

    return {
      totalCurrentValue: currentV,
      totalInvestment: totalI,
      todaysTotalPNL: todayPNL,
    };
  }, [stocks]);

  useEffect(() => {
    // fetching user stocks
    (async () => {
      try {
        const data = await fetch(
          'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8',
        );
        const response = await data.json();
        const userStocks = response.userHolding;
        setStocks(userStocks);
      } finally {
        setStocksFetching(false);
      }
    })();
  }, []);

  return {
    stocks,
    stocksFetching,
    totalCurrentValue,
    totalInvestment,
    todaysTotalPNL,
  };
}

export {useFetchStocksData};

const BASE_URL = `https://api.coinpaprika.com/v1`;

// 반드시 promise 객체를 리턴해야 함.
// promise 객체는 비동기 함수
export async function fetchCoins() {
  const jsonData = await (await fetch(`${BASE_URL}/coins`)).json();

  return jsonData.slice(0, 1);
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}
export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  return await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  ).json();
}

// 반드시 promise 객체를 리턴해야 함.
// promise 객체는 비동기 함수
export async function fetchCoins() {
  const jsonData = await (
    await fetch("https://api.coinpaprika.com/v1/coins")
  ).json();

  return jsonData.slice(0, 100);
}

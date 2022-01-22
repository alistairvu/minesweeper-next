import { set, get } from 'idb-keyval';

export const useGameAlert = () => {
  const getWinAlert = async (time: number) => {
    const wins = await get('win').then((value) => (value ? value : 0));
    const total = await get('total').then((value) => (value ? value : 0));
    const winPercentage = ((wins + 1) / (total + 1)) * 100;

    await set('win', wins + 1);
    await set('total', total + 1);

    const bestTime = await get('bestTime').then((value) =>
      value ? value : 99999
    );
    await set('bestTime', Math.min(bestTime, time));

    return `Congrats, you won!
Win percentage: ${winPercentage.toFixed(2)}% (${wins + 1} out of ${total + 1})
==========
${
  bestTime > time
    ? `NEW BEST TIME: ${time / 100} ${time === 100 ? 'second' : 'seconds'}`
    : `Time: ${time / 100} ${time === 100 ? 'second' : 'seconds'}
Best time: ${bestTime / 100} ${time === 100 ? 'second' : 'seconds'}`
}`;
  };

  const getLoseAlert = async () => {
    const wins = await get('win').then((value) => (value ? value : 0));
    const total = await get('total').then((value) => (value ? value : 0));
    const winPercentage = (wins / (total + 1)) * 100;

    await set('total', total + 1);

    return `You lost!
Win percentage: ${winPercentage.toFixed(2)}% (${wins} out of ${total + 1})`;
  };

  return { getWinAlert, getLoseAlert };
};

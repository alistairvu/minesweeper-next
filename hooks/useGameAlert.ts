import localforage from 'localforage';

const useGameAlert = () => {
  const getWinAlert = async (time: number) => {
    const wins = await localforage
      .getItem('wins')
      .then((value) => Number(value) || 0);

    const total = await localforage
      .getItem('total')
      .then((value) => Number(value) || 0);

    const winPercentage = ((wins + 1) / (total + 1)) * 100;

    const bestTime = await localforage
      .getItem('bestTime')
      .then((value) => Number(value) || 99999)
      .then((value) => Math.min(value, time));

    const message = `Congrats, you won!
Win percentage: ${winPercentage.toFixed(2)}% (${wins + 1} out of ${total + 1})
==========
${
  bestTime === time
    ? `NEW BEST TIME: ${time / 100} ${time === 100 ? 'second' : 'seconds'}`
    : `Time: ${time / 100} ${time === 100 ? 'second' : 'seconds'}
Best time: ${bestTime / 100} ${time === 100 ? 'second' : 'seconds'}`
}`;

    return { wins, total, bestTime, message };
  };

  const getLoseAlert = async () => {
    const wins = await localforage
      .getItem('wins')
      .then((value) => Number(value) || 0);

    const total = await localforage
      .getItem('total')
      .then((value) => Number(value) || 0);

    const winPercentage = (wins / (total + 1)) * 100;

    const message = `You lost!
Win percentage: ${winPercentage.toFixed(2)}% (${wins} out of ${total + 1})`;

    return { total, message };
  };

  return { getWinAlert, getLoseAlert };
};

export default useGameAlert;

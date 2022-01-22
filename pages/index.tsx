import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import Board from '../components/Board';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useGameAlert } from '../hooks/useGameAlert';
import { initializeBoard } from '../redux/slices/boardSlice';
import { countTrue } from '../utils/boardUtils';

const Home: NextPage = () => {
  const [time, setTime] = useState(0);

  const dispatch = useAppDispatch();

  const isOver = useAppSelector(({ board }) => board.isOver);
  const isWon = useAppSelector(({ board }) => board.isWon);
  const bombCount = useAppSelector(({ board }) => board.bombCount);
  const flagged = useAppSelector(({ board }) => board.flagged);
  const opened = useAppSelector(({ board }) => board.opened);
  const { getWinAlert, getLoseAlert } = useGameAlert();

  const isRunning = !(isOver || isWon) && countTrue(opened) > 0;

  useEffect(() => {
    if (isOver) {
      getLoseAlert().then((val) => window.alert(val));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver]);

  useEffect(() => {
    if (isWon) {
      getWinAlert(time).then((val) => window.alert(val));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWon]);

  useInterval(
    () => {
      setTime((prev) => prev + 1);
    },
    isRunning ? 10 : null
  );

  return (
    <div>
      <Head>
        <title>Minesweeper</title>
        <meta
          name="description"
          content="Simple minesweeper game, built with NextJS and Redux"
        />
      </Head>

      <main className="h-screen w-screen flex items-center justify-center flex-col">
        <h1 className="font-extrabold text-3xl sm:text-4xl py-2">
          MINESWEEPER
        </h1>

        <div className="flex justify-between w-80 py-2">
          <div className="flex  bg-gray-200 flex-col justify-center items-center rounded w-16 sm:w-24">
            <p className="text-sm"> 🚩</p>
            <p className="text-xl sm:text-2xl font-bold">
              {isWon ? 0 : Math.max(0, bombCount - countTrue(flagged))}
            </p>
          </div>

          <button
            className="my-2 py-2 px-3 bg-gray-200 rounded text-md sm:text-2xl cursor-pointer"
            onClick={() => {
              dispatch(initializeBoard());
              setTime(0);
            }}
          >
            {isWon ? <p>🤩 </p> : isOver ? <p>🥴</p> : <p>😊</p>}
          </button>

          <div className="flex bg-gray-200 flex-col justify-center items-center rounded w-16 sm:w-24">
            <p className="text-sm">🕚</p>
            <p className="text-xl sm:text-2xl font-bold">
              {Math.min(Math.floor(time / 100), 999)}
            </p>
          </div>
        </div>
        <Board />
      </main>
    </div>
  );
};

export default Home;

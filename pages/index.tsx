/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import localforage from 'localforage';
import Board from '../components/Board';
import ResultsAlert from '../components/ResultsAlert';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useGameAlert from '../hooks/useGameAlert';
import { initializeBoard } from '../redux/slices/boardSlice';
import { countTrue } from '../utils/boardUtils';

const Home: NextPage = () => {
  const [time, setTime] = useState(0);
  const [alertText, setAlertText] = useState('');
  const [isAlert, setIsAlert] = useState(false);

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
      getLoseAlert()
        .then(async ({ message, total }) => {
          await localforage.setItem('total', total + 1);
          setAlertText(message);
        })
        .then(() => setIsAlert(true));
    }
  }, [isOver]);

  useEffect(() => {
    if (isWon) {
      getWinAlert(time)
        .then(async ({ message, wins, total, bestTime }) => {
          await Promise.all([
            localforage.setItem('wins', wins + 1),
            localforage.setItem('total', total + 1),
            localforage.setItem('bestTime', bestTime),
          ]);
          setAlertText(message);
        })
        .then(() => setIsAlert(true));
    }
  }, [isWon]);

  useInterval(
    () => {
      setTime((prev) => prev + 1);
    },
    isRunning ? 10 : null
  );

  const buttonText = () => {
    if (isWon) {
      return <p>🤩</p>;
    }

    if (isOver) {
      return <p>🥴</p>;
    }

    return <p>😊</p>;
  };

  return (
    <div>
      <Head>
        <title>Minesweeper</title>
        <meta
          name="description"
          content="Simple minesweeper game, built with NextJS and Redux"
        />
      </Head>

      <ResultsAlert
        isAlert={isAlert}
        setIsAlert={setIsAlert}
        alertText={alertText}
        variant={isWon ? 'win' : 'lose'}
      />

      <main className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="py-2 text-3xl font-extrabold sm:text-4xl">
          MINESWEEPER
        </h1>

        <div className="flex justify-between py-2 w-80">
          <div className="flex flex-col items-center justify-center w-16 bg-gray-200 rounded sm:w-24">
            <p className="text-sm"> 🚩</p>
            <p className="text-xl font-bold sm:text-2xl">
              {isWon ? 0 : Math.max(0, bombCount - countTrue(flagged))}
            </p>
          </div>

          <button
            className="px-3 py-2 my-2 bg-gray-200 rounded cursor-pointer text-md sm:text-2xl"
            onClick={() => {
              dispatch(initializeBoard());
              setTime(0);
            }}
            type="button"
          >
            {buttonText()}
          </button>

          <div className="flex flex-col items-center justify-center w-16 bg-gray-200 rounded sm:w-24">
            <p className="text-sm">🕚</p>
            <p className="text-xl font-bold sm:text-2xl">
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

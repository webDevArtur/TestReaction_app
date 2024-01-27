import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [showButton, setShowButton] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [falseStart, setFalseStart] = useState(false);
  const [timer, setTimer] = useState<number | undefined>(undefined);

  const getFeedback = (time: number) => {
    if (time < 150) {
      return "Превосходно! Можно садиться за штурвал истребителя или болида Формулы 1.";
    } else if (time < 170) {
      return "Это пять с плюсом! Чемпионы мира по пинг-понгу и боксу смотрят на Вас как на конкурента.";
    } else if (time < 190) {
      return "Великолепно! Мастера спорта международного класса одобряют.";
    } else if (time < 200) {
      return "Хорошо! Мастер спорта у Вас в кармане.";
    } else if (time < 210) {
      return "Неплохо. КМС зачтен.";
    } else if (time < 230) {
      return "Нормально. Вы активны, можете лучше.";
    } else if (time < 270) {
      return "Средненько. Скорость реакции, как и у большинства людей.";
    } else if (time < 350) {
      return "Неуд.";
    } else if (time < 500) {
      return "Незачет.";
    } else {
      return "Вы вообще живы там? Лучше отдохните, попробуйте завтра.";
    }
  };

  const resetTest = () => {
    setShowButton(false);
    setStartTime(null);
    setEndTime(null);
    setReactionTime(null);
    setTestStarted(false);
    setFalseStart(false);
    clearTimeout(timer);
  };
  const startTest = () => {
    if (!testStarted) {
      setTestStarted(true);
      const delayTime = Math.floor(Math.random() * 5000) + 1000;
      setTimer(
        setTimeout(() => {
          setShowButton(true);
          setStartTime(performance.now());
        }, delayTime),
      );
    } else {
      setFalseStart(true);
      clearTimeout(timer);
    }
  };

  const handleButtonClick = () => {
    if (testStarted && showButton) {
      setEndTime(performance.now());
      setShowButton(false);
      setTestStarted(false);
    }
  };

  useEffect(() => {
    if (endTime && startTime) {
      setReactionTime(endTime - startTime);
    }
  }, [endTime]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>Test of your reaction</div>
      </div>
      <div className={styles["reaction-test"]}>
        <h1>Тест на скорость реакции</h1>
        <p>
          {"Ваше время реакции: " +
            (reactionTime ? reactionTime.toFixed(2) + " мс" : "")}
        </p>
        <p>{reactionTime ? getFeedback(reactionTime) : ""}</p>
        <p>Нажмите на кнопку, когда она поменяет цвет</p>
        <div className={styles["test-container"]}>
          {!showButton ? (
            <div className={styles.button}>
              {falseStart ? (
                <button
                  onClick={resetTest}
                  className={`${styles.button} ${styles["false-button"]}`}
                >
                  Вы поспешили, начните тест заново
                </button>
              ) : (
                <button
                  onClick={startTest}
                  className={`${styles.button} ${styles["start-button"]}`}
                >
                  {testStarted ? "Дождитесь зелёного цвета" : "Начать тест"}
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={handleButtonClick}
              className={`${styles.button} ${styles["react-button"]}`}
            >
              Нажмите!
            </button>
          )}
        </div>
        <table className={`${styles.table} table`}>
          <thead>
            <tr>
              <th>Время реакции (мс)</th>
              <th>Ваш результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0 - 150</td>
              <td>
                Превосходно! Можно садиться за штурвал истребителя или болида
                Формулы 1.
              </td>
            </tr>
            <tr>
              <td>150 - 170</td>
              <td>
                Это пять с плюсом! Чемпионы мира по пинг-понгу и боксу смотрят
                на Вас как на конкурента.
              </td>
            </tr>
            <tr>
              <td>170 - 190</td>
              <td>
                Великолепно! Мастера спорта международного класса одобряют.
              </td>
            </tr>
            <tr>
              <td>190 - 200</td>
              <td>Хорошо! Мастер спорта у Вас в кармане.</td>
            </tr>
            <tr>
              <td>200 - 210</td>
              <td>Неплохо. КМС зачтен.</td>
            </tr>
            <tr>
              <td>210 - 230</td>
              <td>Нормально. Вы активны, можете лучше.</td>
            </tr>
            <tr>
              <td>230 - 270</td>
              <td>Средненько. Скорость реакции, как и у большинства людей.</td>
            </tr>
            <tr>
              <td>270 - 350</td>
              <td>Неуд.</td>
            </tr>
            <tr>
              <td>350 - 500</td>
              <td>Незачет.</td>
            </tr>
            <tr>
              <td>500 и выше</td>
              <td>Вы вообще живы там? Лучше отдохните и попробуйте завтра.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

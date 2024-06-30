import { useEffect } from "react";
import { useIngredients } from "../context/IngredientsProvider";
import { useWeeks } from "../context/WeeksProvider";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faEquals,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

function IngredientsNavigation() {
  const { currentIngredient } = useIngredients();

  if (!currentIngredient) return null;

  return (
    <ul className="col-span-2 flex h-[500px] w-[85%] flex-col items-center justify-start self-center overflow-y-scroll rounded border border-blue-400 shadow-xl">
      {currentIngredient.precoSemana.map((el, ind, arr) => (
        <IngredientPriceDate
          key={el.semana}
          weekData={el}
          lastWeekData={ind === 0 ? null : arr[ind - 1]}
        />
      ))}
    </ul>
  );
}

function IngredientPriceDate({ weekData, lastWeekData }) {
  const { getAllWeeks, weeks } = useWeeks();
  const { numberToPriceString } = useIngredients();
  const { ingredientIdExterno } = useParams();

  useEffect(() => {
    getAllWeeks();
  }, [getAllWeeks]);

  if (!weeks) return null;

  const lastWeekPrice = lastWeekData?.preco;
  const week = weeks.find((el) => el._id === weekData.semana);
  const percentageDiff =
    ((weekData.preco - lastWeekPrice) / lastWeekPrice) * 100;

  return (
    <li className="relative w-full border-b border-gray-300 p-5">
      <p className="my-3 font-montserrat text-sm text-gray-700 drop-shadow-sm">
        {format(week?.intervalo.fim, "dd/MM/yyyy")}
      </p>
      <Link
        to={`/overview/ingredientes/${ingredientIdExterno}/preco?atWeek=${week._id}`}
        className="absolute right-4 top-4 text-gray-600"
      >
        <FontAwesomeIcon icon={faGear} />
      </Link>

      <div className="grid grid-cols-2 text-center font-noto text-blue-500">
        <p className="col-span-1">{numberToPriceString(weekData.preco)}</p>
        {!percentageDiff || (
          <div
            className={`col-span-1 flex flex-row items-center justify-center gap-3 ${percentageDiff < 0 ? "text-red-600" : "text-green-600"}`}
          >
            <p>
              {percentageDiff < 0 ? "-" : "+"} {percentageDiff.toFixed(2)}%
            </p>
            <FontAwesomeIcon
              icon={faAnglesUp}
              rotation={percentageDiff < 0 ? 180 : 0}
              className={`text-xl drop-shadow`}
            />
          </div>
        )}
        {!percentageDiff && (
          <div
            className={`col-span-1 flex flex-row items-center justify-center gap-3 text-gray-700`}
          >
            <p>0.00%</p>
          </div>
        )}
      </div>
    </li>
  );
}

export default IngredientsNavigation;

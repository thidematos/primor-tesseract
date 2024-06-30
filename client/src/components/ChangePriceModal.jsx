import {
  faCalendar,
  faCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../utils/Title";
import { useIngredients } from "../context/IngredientsProvider";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useWeeks } from "../context/WeeksProvider";
import { format } from "date-fns";
import Loader from "../utils/Loader";

function ChangePriceModal() {
  const { currentIngredient, status, updateSingleIngredient } =
    useIngredients();

  const { weeks } = useWeeks();

  const [searchParams] = useSearchParams();

  const { ingredientIdExterno } = useParams();

  const weekId = searchParams.get("atWeek");

  const [price, setPrice] = useState(
    currentIngredient.precoSemana.find((el) => el.semana === weekId).preco,
  );

  if (!weeks || !currentIngredient) return null;

  const currentWeek = weeks.find((el) => el._id === weekId);

  return (
    <>
      <Link
        to={`/overview/ingredientes/${ingredientIdExterno}`}
        className="absolute top-0 z-[9990] h-[100dvh] w-screen cursor-default bg-gray-500/75"
      ></Link>
      <div className="centerAbsolute absolute z-[9999] flex h-[45%] w-[30%] flex-col items-center justify-center gap-8 rounded-lg border border-gray-400 bg-gray-50 font-montserrat shadow-xl">
        <Link
          className="absolute right-5 top-5 cursor-pointer text-2xl text-blue-400 drop-shadow"
          to={`/overview/ingredientes/${ingredientIdExterno}`}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Link>

        <Title fontSize="text-xl">Alteração do preço de insumo</Title>

        <div className="flex flex-row items-center justify-center gap-6 text-gray-800">
          <h2 className="text-lg text-orange-500 drop-shadow-sm">
            {currentIngredient.nome}
          </h2>
          <div className="flex flex-row items-center justify-center gap-3">
            <p className="text-sm">
              {format(currentWeek.intervalo.inicio, "dd/MM/yyyy")}
            </p>
            <FontAwesomeIcon icon={faCircle} className="text-[6px]" />
            <p className="text-sm">
              {format(currentWeek.intervalo.fim, "dd/MM/yyyy")}
            </p>
          </div>
        </div>

        <div className="relative flex w-[40%] flex-col items-center justify-center">
          <input
            type="number"
            className="w-full rounded border border-blue-300 p-2 pl-10 font-noto text-gray-600 shadow outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p className="absolute left-2 top-2 text-gray-400">R$</p>
        </div>

        {status === "loading" ? (
          <Loader size={40} />
        ) : (
          <button
            className="rounded border border-gray-300 bg-blue-500 p-3 font-montserrat text-gray-50 shadow-lg"
            onClick={() =>
              updateSingleIngredient(ingredientIdExterno, weekId, price)
            }
          >
            ATUALIZAR
          </button>
        )}
      </div>
    </>
  );
}

export default ChangePriceModal;

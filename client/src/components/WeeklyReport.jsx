import { useEffect } from "react";
import { useProducts } from "../context/ProductsProvider";
import Loader from "../utils/Loader";
import Title from "../utils/Title";
import { format, getWeek } from "date-fns";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faFileArrowDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useProductPagination } from "../hooks/useProductPagination";
import { useIngredients } from "../context/IngredientsProvider";

function WeeklyReport() {
  const { getAllProducts, products, weeks: week, getWeeks } = useProducts();

  const { getIngredients, ingredients } = useIngredients();

  const { semanaId } = useParams();

  useEffect(() => {
    getAllProducts();
    getWeeks(semanaId);
    getIngredients();
  }, [getAllProducts, semanaId, getWeeks, getIngredients]);

  if (!products || !week || !ingredients)
    return <Loader position={"col-span-4"} />;

  return (
    <div className="markup col-span-4 py-10">
      <Header />
      <Product />
    </div>
  );
}

function Product() {
  const {
    currentPage,
    setCurrentPage,
    isLimit,
    isMinimum,
    currentPageZeroBased,
  } = useProductPagination();

  const { sortedProducts } = useProducts();

  const { semanaId } = useParams();

  const currentProduct = sortedProducts[currentPageZeroBased];

  const actualWeekIndex = currentProduct.ingredientesSemanais.findIndex(
    (semana) => semana.semana === semanaId,
  );

  const pastWeekInfo =
    actualWeekIndex === 0
      ? null
      : currentProduct.ingredientesSemanais[actualWeekIndex - 1];

  console.log(
    "Current week que está sendo loopada: ",
    currentProduct.ingredientesSemanais.at(actualWeekIndex).semana,
  );

  return (
    <div className="markup py-10">
      <Title gridProperty="text-center">
        {currentProduct.nome}
        <div className="grid grid-flow-row auto-rows-fr">
          <p>MACRO</p>
          {currentProduct.ingredientesSemanais
            .at(actualWeekIndex)
            .macro.map((insumo) => (
              <Insumo
                key={insumo.insumo}
                insumo={insumo}
                lastWeekID={pastWeekInfo ? pastWeekInfo.semana : null}
              />
            ))}
        </div>
      </Title>
    </div>
  );
}

function Insumo({ insumo, lastWeekID }) {
  const { ingredients, numberToPriceString } = useIngredients();

  if (ingredients.length === 0) return null;

  const currentIngredient = ingredients.find(
    (ingredient) => ingredient._id === insumo.insumo,
  );

  const priceLastWeek = currentIngredient.precoSemana.find(
    (semana) => semana.semana._id === lastWeekID,
  )?.preco;
  console.log("Last Week id: ", lastWeekID);
  console.log("Price Last week:", priceLastWeek);
  console.log("Incoming Macro insumo: ", insumo);

  return (
    <div className="grid grid-cols-7">
      <p className="markup col-span-1 text-xs">{currentIngredient.nome}</p>
      {/*LAST WEEK*/}
      {lastWeekID === null && (
        <p className="markup col-span-3 text-xs">
          Não há dados para a semana anterior.
        </p>
      )}
      {lastWeekID && (
        <>
          <p className="markup col-span-1 text-xs"> LASTWEEK KG</p>
          <p className="markup col-span-1 text-xs">
            {numberToPriceString(priceLastWeek)}
          </p>
          <p className="markup col-span-1 text-xs">LASTWEEK KG * R$</p>
        </>
      )}

      {/*CURRENT WEEK*/}
      <p className="markup col-span-1 text-xs">{insumo.qtdBatidaMil} KG</p>
      <p className="markup col-span-1 text-xs">
        {numberToPriceString(insumo.weeklyPreco)}
      </p>
      <p className="markup col-span-1 text-xs">
        {numberToPriceString(insumo.qtdBatidaMil * insumo.weeklyPreco)}
      </p>
    </div>
  );
}

function Header() {
  const { weeks: week, getWeekPdfs, download } = useProducts();

  return (
    <div className="markup flex w-full flex-row items-center justify-around py-5">
      <Title fontSize="text-2xl">RELATÓRIO SEMANAL</Title>
      <div className="flex flex-row items-center gap-8 font-noto text-gray-800">
        <p>VIGÊNCIA: </p>
        <p className="text-red-700">
          {format(week.intervalo.inicio, "dd MMM'. de' yyyy")}
        </p>
        <FontAwesomeIcon icon={faArrowRightLong} className="text-gray-600" />
        <p className="text-red-700">
          {format(week.intervalo.fim, "dd MMM'. de' yyyy")}
        </p>

        <FontAwesomeIcon
          className={`${download ? "animate-spin" : ""} cursor-pointer text-2xl text-blue-500`}
          icon={download ? faSpinner : faFileArrowDown}
          onClick={() => getWeekPdfs()}
        />
      </div>
    </div>
  );
}

export default WeeklyReport;

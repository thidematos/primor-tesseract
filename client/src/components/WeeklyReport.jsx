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

  const lastWeekProductInfo =
    actualWeekIndex === 0
      ? null
      : currentProduct.ingredientesSemanais[actualWeekIndex - 1];

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
                lastWeekProduct={
                  lastWeekProductInfo ? lastWeekProductInfo : null
                }
              />
            ))}
        </div>
      </Title>
    </div>
  );
}

function Insumo({ insumo, lastWeekProduct }) {
  const { ingredients, numberToPriceString } = useIngredients();

  if (ingredients.length === 0) return null;

  const currentIngredient = ingredients.find(
    (ingredient) => ingredient._id === insumo.insumo,
  );

  const lastWeekIngredientInfo = currentIngredient.precoSemana.find(
    (semana) => semana.semana._id === lastWeekProduct.semana,
  );

  const lastWeekUsedWeight = lastWeekProduct.macro.find(
    (macroEl) => macroEl.insumo === currentIngredient._id,
  ).qtdBatidaMil;

  return (
    <div className="grid grid-cols-7 py-4">
      <p className="col-span-1 border-b border-gray-200 text-xs">
        {currentIngredient.nome}
      </p>
      {/*LAST WEEK*/}
      {lastWeekProduct === null && (
        <p className="col-span-3 border-b border-gray-200 text-xs">
          Não há dados para a semana anterior.
        </p>
      )}
      {lastWeekProduct && (
        <>
          <p className="col-span-1 border-b border-gray-200 text-xs">
            {lastWeekUsedWeight} KG
          </p>
          <p className="col-span-1 border-b border-gray-200 text-xs">
            {numberToPriceString(lastWeekIngredientInfo.preco)}
          </p>
          <p className="col-span-1 border-b border-gray-200 text-xs">
            {numberToPriceString(
              lastWeekUsedWeight * lastWeekIngredientInfo.preco,
            )}
          </p>
        </>
      )}

      {/*CURRENT WEEK*/}
      <p className="col-span-1 border-b border-gray-200 text-xs">
        {insumo.qtdBatidaMil} KG
      </p>
      <p className="col-span-1 border-b border-gray-200 text-xs">
        {numberToPriceString(insumo.weeklyPreco)}
      </p>
      <p className="col-span-1 border-b border-gray-200 text-xs">
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

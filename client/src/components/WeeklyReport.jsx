import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsProvider";
import Loader from "../utils/Loader";
import Title from "../utils/Title";
import { format, getWeek } from "date-fns";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faFileArrowDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useIngredients } from "../context/IngredientsProvider";
import { useWeeks } from "../context/WeeksProvider";

function WeeklyReport() {
  const { getAllProducts, products } = useProducts();

  const { getWeek, currentWeek } = useWeeks();

  const { getIngredients, ingredients } = useIngredients();

  const { semanaId } = useParams();

  useEffect(() => {
    getAllProducts();
    getWeek(semanaId);
    getIngredients();
  }, [getAllProducts, semanaId, getWeek, getIngredients]);

  if (!products || !currentWeek || !ingredients.length)
    return <Loader position={"col-span-7"} />;

  return (
    <div className="col-span-6 h-full py-10">
      <Header />
      <Product />
    </div>
  );
}

function Header() {
  const { currentWeek, getWeekPdfs, download } = useWeeks();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex w-full flex-row items-center justify-around py-5">
      <Title fontSize="text-2xl">RELATÓRIO SEMANAL</Title>
      <div className="flex flex-row items-center gap-8 font-noto text-gray-800">
        <p>VIGÊNCIA: </p>
        <p className="text-red-700">
          {format(currentWeek.intervalo.inicio, "dd MMM'. de' yyyy")}
        </p>
        <FontAwesomeIcon icon={faArrowRightLong} className="text-gray-600" />
        <p className="text-red-700">
          {format(currentWeek.intervalo.fim, "dd MMM'. de' yyyy")}
        </p>
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon
            className={`${download ? "animate-spin" : ""} cursor-pointer text-3xl text-blue-500`}
            icon={download ? faSpinner : faFileArrowDown}
            onClick={() => getWeekPdfs()}
          />
          <p
            className={`${isHovered ? "visible opacity-100" : "collapse opacity-0"} absolute left-[150%] top-[-40%] z-30 w-[150px] rounded bg-red-600/85 p-2 text-center text-sm text-gray-50 shadow-xl duration-150`}
          >
            Baixar PDFs da semana
          </p>
        </div>
      </div>
    </div>
  );
}

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { sortedProducts, createSegment } = useProducts();

  const { semanaId } = useParams();

  const currentProductQuery = searchParams.get("produto");

  useEffect(() => {
    if (!sortedProducts.length || currentProductQuery) return;

    setSearchParams(`produto=${sortedProducts[0].idExterno}`);
  }, [sortedProducts, currentProductQuery, setSearchParams]);

  const currentProduct =
    sortedProducts.find(
      (produto) => produto.idExterno === Number(currentProductQuery),
    ) || sortedProducts[0];

  const actualWeekIndex = currentProduct.ingredientesSemanais.findIndex(
    (semana) => semana.semana === semanaId,
  );

  const lastWeekProductInfo =
    actualWeekIndex === 0
      ? null
      : currentProduct.ingredientesSemanais[actualWeekIndex - 1];

  const actualWeekProductInfo =
    currentProduct.ingredientesSemanais.at(actualWeekIndex);

  const macros = createSegment(
    "macro",
    lastWeekProductInfo,
    actualWeekProductInfo,
  );

  const micros = createSegment(
    "micro",
    lastWeekProductInfo,
    actualWeekProductInfo,
  );

  const outros = createSegment(
    "outros",
    lastWeekProductInfo,
    actualWeekProductInfo,
  );

  return (
    <div className="w-full text-center">
      <Title margin="mt-5">{currentProduct.nome}</Title>

      <div className="grid h-[700px] w-full grid-flow-row auto-rows-min overflow-y-scroll font-noto text-gray-800 2xl:h-[500px]">
        <TableHeader
          lastWeek={lastWeekProductInfo}
          actualWeek={actualWeekProductInfo}
        />
        <p className="row-span-1 border-b border-gray-300 py-5 2xl:text-sm">
          MACRO
        </p>

        {macros.map((macroInsumo) => (
          <Insumo
            key={macroInsumo.insumo}
            insumo={macroInsumo}
            lastWeek={lastWeekProductInfo?.macro}
            actualWeek={actualWeekProductInfo.macro}
          />
        ))}

        <p className="row-span-1 border-b border-gray-300 py-5 2xl:text-sm">
          MICRO
        </p>
        {micros.map((microInsumo) => (
          <Insumo
            key={microInsumo.insumo}
            insumo={microInsumo}
            lastWeek={lastWeekProductInfo?.micro}
            actualWeek={actualWeekProductInfo.micro}
          />
        ))}
        <p className="row-span-1 border-b border-gray-300 py-5 2xl:text-sm">
          OUTROS
        </p>
        {outros.map((outroInsumo) => (
          <Insumo
            key={outroInsumo.insumo}
            insumo={outroInsumo}
            lastWeek={lastWeekProductInfo?.outros}
            actualWeek={actualWeekProductInfo.outros}
          />
        ))}
      </div>
    </div>
  );
}

function TableHeader({ lastWeek, actualWeek }) {
  const { getWeek, lastWeek: lastWeekData } = useWeeks();
  const { products } = useProducts();

  const { numberToPriceString } = useIngredients();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (lastWeek) getWeek(lastWeek.semana, true);
  }, [getWeek, lastWeek]);

  if (!products) return null;

  const currentProduct = products.find(
    (el) => el.idExterno === Number(searchParams.get("produto")),
  );

  const totalLastWeek = currentProduct?.precosTotalSemanal.find(
    (el) => el.semana === lastWeek?.semana,
  );

  const totalActualWeek = currentProduct?.precosTotalSemanal.find(
    (el) => el.semana === actualWeek.semana,
  );

  return (
    <>
      <div className="row-span-1 grid grid-cols-8 content-center items-center justify-center border-b border-gray-300 py-10">
        <p className="col-span-2 text-sm tracking-wider">
          {lastWeekData &&
            `De ${format(lastWeekData.intervalo.inicio, "dd/MM/yyyy")} à ${format(lastWeekData.intervalo.fim, "dd/MM/yyyy")}:`}
        </p>
        <p className="col-span-2 text-xl text-blue-500">
          {totalLastWeek && numberToPriceString(totalLastWeek.precoTotal)}
        </p>

        <p className="col-span-2 text-sm">Semana atual:</p>
        <p className="col-span-2 text-xl text-blue-500">
          {totalActualWeek && numberToPriceString(totalActualWeek.precoTotal)}
        </p>
      </div>
      <div className="row-span-1 grid grid-cols-7 content-center justify-center border-b border-gray-300 py-5 2xl:text-sm">
        <p>NOME</p>
        <p>QUANTIDADE</p>
        <p>PREÇO</p>
        <p>TOTAL</p>
        <p>QUANTIDADE</p>
        <p>PREÇO</p>
        <p>TOTAL</p>
      </div>
    </>
  );
}

function Insumo({ insumo, lastWeek, actualWeek }) {
  const { ingredients, numberToPriceString } = useIngredients();

  const currentInsumo = ingredients.find((el) => el._id === insumo.insumo);

  const currentInsumoOnActualWeek = actualWeek.find(
    (el) => el.insumo === currentInsumo?._id,
  );

  const currentInsumoOnLastWeek = lastWeek?.find(
    (el) => el.insumo === currentInsumo?._id,
  );

  const hasPriceFlagLastWeek =
    currentInsumoOnLastWeek?.weeklyPreco === 0 ? true : false;

  const hasPriceFlagActualWeek =
    currentInsumoOnActualWeek?.weeklyPreco === 0 ? true : false;

  return (
    <div className="row-span-1 grid grid-cols-7 content-center justify-center border-b border-gray-300 py-5 2xl:text-sm">
      <p className="col-span-1 self-center 2xl:text-sm">{currentInsumo.nome}</p>
      {lastWeek && (
        <>
          <p className="col-span-1 self-center">
            {currentInsumoOnLastWeek
              ? `${currentInsumoOnLastWeek.qtdBatidaMil} KG`
              : "---"}
          </p>
          <p className="col-span-1 self-center">
            {currentInsumoOnLastWeek
              ? numberToPriceString(currentInsumoOnLastWeek.weeklyPreco)
              : "---"}
          </p>
          <p className="col-span-1 self-center text-red-600">
            {currentInsumoOnLastWeek
              ? numberToPriceString(
                  currentInsumoOnLastWeek.weeklyPreco *
                    currentInsumoOnLastWeek.qtdBatidaMil,
                )
              : "---"}
          </p>
        </>
      )}
      {!lastWeek && (
        <p className="col-span-3 self-center 2xl:text-xs">Sem informações</p>
      )}
      <p className="col-span-1 self-center">
        {currentInsumoOnActualWeek?.qtdBatidaMil
          ? `${currentInsumoOnActualWeek.qtdBatidaMil} KG`
          : "---"}
      </p>
      <p className="col-span-1 self-center">
        {currentInsumoOnActualWeek?.weeklyPreco
          ? numberToPriceString(currentInsumoOnActualWeek.weeklyPreco)
          : "---"}
      </p>
      <p className="col-span-1 self-center text-red-600">
        {currentInsumoOnActualWeek
          ? numberToPriceString(
              currentInsumoOnActualWeek.weeklyPreco *
                currentInsumoOnActualWeek.qtdBatidaMil,
            )
          : "---"}
      </p>
    </div>
  );
}

export default WeeklyReport;

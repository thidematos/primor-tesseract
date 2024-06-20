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
} from "@fortawesome/free-solid-svg-icons";
import { useProductPagination } from "../hooks/useProductPagination";

function WeeklyReport() {
  const { getAllProducts, products, weeks: week, getWeeks } = useProducts();

  const { semanaId } = useParams();

  useEffect(() => {
    getAllProducts();
    getWeeks(semanaId);
  }, [getAllProducts, semanaId, getWeeks]);

  console.log(products);
  console.log(week);

  if (!products || !week) return <Loader position={"col-span-4"} />;

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

  const { products } = useProducts();

  return <div>{products[currentPageZeroBased].nome}</div>;
}

function Header() {
  const { weeks: week, getWeekPdfs } = useProducts();

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
          className="cursor-pointer text-2xl text-blue-500 shadow"
          icon={faFileArrowDown}
          onClick={() => getWeekPdfs(week._id)}
        />
      </div>
    </div>
  );
}

export default WeeklyReport;

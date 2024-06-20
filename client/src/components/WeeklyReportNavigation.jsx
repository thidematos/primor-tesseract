import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsProvider";

function WeeklyReportNavigation() {
  const { semanaId } = useParams();

  const { sortedProducts } = useProducts();

  const [searchParams, setSeachParams] = useSearchParams();

  const currentProductQuery = searchParams.get("produto");

  if (!semanaId) return <p> oi</p>;

  return (
    <div className="col-span-2 flex h-[80%] w-full flex-col items-center justify-start self-center overflow-y-scroll">
      <ul className="flex flex-col items-start justify-center gap-5 py-10 font-noto text-sm">
        {sortedProducts?.map((product) => (
          <button
            onClick={() => setSeachParams(`produto=${product.idExterno}`)}
            key={product.idExterno}
            className={`${Number(currentProductQuery) === product.idExterno ? "border border-blue-500 p-3 text-blue-500 underline underline-offset-2" : "text-gray-500"} rounded shadow drop-shadow-sm`}
          >
            {product.nome}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default WeeklyReportNavigation;

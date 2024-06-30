import { useEffect } from "react";
import { useProducts } from "../context/ProductsProvider";
import Loader from "../utils/Loader";
import Title from "../utils/Title";
import { useIngredients } from "../context/IngredientsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { useWeeks } from "../context/WeeksProvider";
import { Link } from "react-router-dom";

function ProductsList() {
  const { getAllProducts, products, sortedProducts } = useProducts();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  if (!products) return <Loader position={"col-span-7"} />;

  return (
    <div className="col-span-7 flex flex-col items-center justify-start gap-10 py-16">
      <Header />
      <ProductsContainer />
    </div>
  );
}

function Header() {
  return (
    <div>
      <Title fontSize="text-2xl text-gray-700 text-center">
        CATÁLOGO DE PRODUTOS
      </Title>
    </div>
  );
}

function ProductsContainer() {
  const { sortedProducts } = useProducts();

  return (
    <div className="grid h-[500px] w-full grid-cols-3 gap-10 overflow-y-scroll">
      {sortedProducts.map((product) => (
        <ProductCard product={product} key={product.idExterno} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link
      to={`${product.idExterno}`}
      className="relative col-span-1 flex min-h-[250px] flex-col items-center justify-around rounded-lg border border-gray-300 bg-gray-100 p-6 font-montserrat shadow-xl drop-shadow-sm"
    >
      <p className="text-orange-600 drop-shadow">
        <span className="">ID:</span> {product.idExterno}
      </p>
      <FontAwesomeIcon
        icon={faPaw}
        className="text-5xl text-orange-700 drop-shadow"
      />
      <h3 className="w-[85%] text-center text-gray-800">{product.nome}</h3>
      <ProductPrices product={product} />
    </Link>
  );
}

function ProductPrices({ product }) {
  const { getCurrentAndLastWeek } = useWeeks();

  const { numberToPriceString } = useIngredients();

  const weeks = getCurrentAndLastWeek(product, "product");

  return (
    <div className="flex w-full flex-row justify-around">
      <div className="flex w-[50%] flex-col items-center justify-center">
        <p className="text-xs">Preço anterior:</p>
        <p className="text-sm text-blue-500 drop-shadow">
          {weeks.lastWeek &&
            numberToPriceString(
              product.precosTotalSemanal.find(
                (el) => el.semana === weeks.lastWeek,
              ).precoTotal,
            )}
          {!weeks.lastWeek && "-"}
        </p>
      </div>
      <div className="flex w-[50%] flex-col items-center justify-center">
        <p className="text-xs">Preço atual:</p>
        <p className="text-sm text-blue-500 drop-shadow">
          {numberToPriceString(
            product.precosTotalSemanal.find(
              (el) => el.semana === weeks.actualWeek,
            ).precoTotal,
          )}
        </p>
      </div>
    </div>
  );
}

export default ProductsList;

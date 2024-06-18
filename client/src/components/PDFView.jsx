import { useEffect, useState } from "react";
import { useExtract } from "../context/ExtractProvider";
import Loader from "./../utils/Loader";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useCurrentPage } from "../hooks/useCurrentPage";

function PDFView() {
  const { pdfContent, status, pdFTotalPages } = useExtract();
  const { currentPage, setCurrentPage, isLimit, isMinimum } = useCurrentPage();

  useEffect(() => {
    if (pdfContent && !currentPage) setCurrentPage(1);
  }, [pdfContent, currentPage, setCurrentPage]);

  return (
    <div className="col-span-3 flex w-full flex-col items-center justify-center py-[5%]">
      {status === "loading" && <Loader />}
      {status === "ready" && (
        <>
          <div className="dataTable font-noto flex max-h-[80%] w-full grow flex-col items-center justify-center gap-8 overflow-y-scroll text-gray-800">
            <Title />
            <Macro />
            <Micro />
            <Outros />
          </div>
          <div className="mb-4 mt-10 flex w-full flex-row items-center justify-center gap-16">
            <button
              disabled={isMinimum}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`${isMinimum ? "opacity-0" : ""} w-[3%]`}
            >
              <img src="/nav-arrow.png" className="rotate-180" />
            </button>

            <button
              disabled={isLimit}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`${isLimit ? "opacity-0" : ""} w-[3%]`}
            >
              <img src="/nav-arrow.png" />
            </button>
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
}

function Title() {
  const { pdfContent } = useExtract();
  const { currentPageZeroBased } = useCurrentPage();

  const currentPDFPage = pdfContent?.at(currentPageZeroBased);

  return (
    <h2>
      ID: {currentPDFPage?.produto.id} |NOME: {currentPDFPage?.produto.nome} |
      BATIDA: {currentPDFPage?.produto.batida}
    </h2>
  );
}

function Macro() {
  const { pdfContent } = useExtract();
  const { currentPageZeroBased } = useCurrentPage();

  const showPageMacro = pdfContent?.at(currentPageZeroBased).macro;

  if (!showPageMacro?.length) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h3 className="text-xl">Macro</h3>
      {showPageMacro.map((macro) => (
        <div className="grid w-full grid-cols-3 text-center" key={macro.id}>
          <span>ID: {macro.id}</span>
          <span>{macro.nome}</span>
          <span>Quantidade: {macro.qtd}</span>
        </div>
      ))}
    </div>
  );
}

function Micro() {
  const { pdfContent } = useExtract();
  const { currentPageZeroBased } = useCurrentPage();

  const showPageMicro = pdfContent?.at(currentPageZeroBased).micro;

  if (!showPageMicro?.length) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h3 className="text-xl">Micro</h3>
      {showPageMicro.map((macro) => (
        <div className="grid w-full grid-cols-3 text-center" key={macro.id}>
          <span>ID: {macro.id}</span>
          <span>{macro.nome}</span>
          <span>Quantidade: {macro.qtd}</span>
        </div>
      ))}
    </div>
  );
}

function Outros() {
  const { pdfContent } = useExtract();
  const { currentPageZeroBased } = useCurrentPage();

  const showPageOutros = pdfContent?.at(currentPageZeroBased).outros;

  if (!showPageOutros?.length) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h3 className="text-xl">Outros</h3>
      {showPageOutros.map((macro) => (
        <div className="grid w-full grid-cols-3 text-center" key={macro.id}>
          <span>ID: {macro.id}</span>
          <span>{macro.nome}</span>
          <span>Quantidade: {macro.qtd}</span>
        </div>
      ))}
    </div>
  );
}

function Pagination() {
  const { pdfTotalPages } = useExtract();
  const { currentPage } = useCurrentPage();

  const pages = Array.from(
    { length: Number(pdfTotalPages) },
    (_, ind) => ind + 1,
  );

  return (
    <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-5 px-[10%]">
      {pages.map((page) => (
        <Link key={page} to={`?page=${page}`}>
          <li
            className={
              currentPage === page ? "active" : "text-xs text-gray-500"
            }
          >
            {page}
          </li>
        </Link>
      ))}
    </ul>
  );
}
export default PDFView;

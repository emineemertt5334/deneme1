import { useEffect, useState } from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";

export default function TablePagination({
  total = 0,
  defaultPage,
  defaultRowsPerPage,
  onChangePagination,
  rowPerPageOptions = [5, 10, 20, 30, 50, 100],
}) {
  /**Şu anki sayfa */
  const [page, setPage] = useState(defaultPage || 1);

  /**Sayfa başına gösterilecek veri sayısı */
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 20);

  const startPage = (page - 1) * rowsPerPage + 1;
  const endPage =
    startPage + rowsPerPage >= total ? total : startPage + rowsPerPage;

  /**Sonraki sayfa butonuna tıklandığı zaman tetiklenir */
  const handleClickNextPage = () => {
    setPage((pre) => {
      onChangePagination?.({ page: pre + 1, limit: rowsPerPage });
      return pre + 1;
    });
  };

  /**Önceki sayfa butonuna tıklandığı zaman tetiklenir */
  const handleClickPrevPage = () => {
    setPage((pre) => {
      onChangePagination?.({ page: pre - 1, limit: rowsPerPage });
      return pre - 1;
    });
  };

  /**Eğer sayfa başına gösterilecek değer sayısı değişir ise
   * pagination hesabını bozmamak için page alanı en başa yani 1'e
   * set edilir.
   */
  const handleChangeRowPerPage = (event) => {
    setPage(1);
    setRowsPerPage(Number(event.target.value));
    onChangePagination?.({ page: 1, limit: Number(event.target.value) });
  };

  /**Default alanlar değişir ise useEffect dinleyicisi ile
   * bu alanları yeniden set ediyoruz.
   */
  useEffect(() => {
    if (typeof defaultRowsPerPage === "number") {
      setRowsPerPage(defaultRowsPerPage);
    }
  }, [defaultRowsPerPage]);

  useEffect(() => {
    if (typeof defaultPage === "number") {
      setPage(defaultPage);
    }
  }, [defaultPage]);

  return (
    <div
      style={{
        gap: 10,
        display: "flex",
        alignItems: "center",
      }}
    >
      <label style={{ fontSize: 16, whiteSpace: "nowrap" }}>
        Sayfa Başı Satır:
      </label>

      <select
        value={rowsPerPage}
        className="form-select"
        style={{ cursor: "pointer" }}
        onChange={handleChangeRowPerPage}
      >
        {rowPerPageOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <label
        style={{
          padding: 6,
          borderRadius: 6,
          userSelect: "none",
          whiteSpace: "nowrap",
          border: "1px solid lightgrey",
        }}
      >
        {startPage} - {endPage} arası {total}
      </label>

      <div style={{ display: "flex" }}>
        <button
          type="button"
          disabled={startPage <= 1}
          onClick={handleClickPrevPage}
          className="btn btn-sm btn-light"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          disabled={endPage >= total}
          onClick={handleClickNextPage}
          className="btn btn-sm btn-light"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

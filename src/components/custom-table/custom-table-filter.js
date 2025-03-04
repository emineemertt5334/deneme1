import { useState } from "react";
import { Button, Input } from "reactstrap";

/**
 * onChangeFilter fonksiyonu "Filtrele" butonuna tıklandığı
 * zaman tetiklenir. İçerisine filtre sonuçları atılır.
 *
 * Örn: {name: "fatih"}
 *
 * "Filtre Temizle" butonuna tıklandığı zaman onChangeFilter
 * fonksiyonuna boş değer atılır.
 */
export default function TableFilter({ columns, onChangeFilter }) {
  const [filters, setFilters] = useState({});

  const handleClickFilter = () => {
    onChangeFilter?.(filters);
  };

  const handleClickClearFilter = () => {
    setFilters({});
    onChangeFilter?.();
  };

  const handleChangeFilter = (id, value) => {
    /**
     * Burada eğer diğer kolonlarda değer varsa onlar saklanır.
     * Eğer input içeriği tamamen silinirse filtre alanından da
     * ilgili property silinir
     */
    setFilters((pre) => {
      if (value) {
        return {
          ...pre,
          [id]: value,
        };
      }

      delete pre[id];
      return { ...pre };
    });
  };

  return (
    <>
      <div style={{ display: "flex", gap: 20 }}>
        {columns
          .filter((col) => col.filterable)
          .map((col, i) => (
            <Input
              key={i}
              type={col?.type || "text"}
              value={filters[col.id] || ""}
              onChange={(e) => handleChangeFilter(col.id, e.target.value)}
              placeholder={`${col.label} filtresi`}
            />
          ))}
      </div>

      <div
        style={{
          gap: 10,
          marginTop: 10,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          outline
          size="sm"
          color="danger"
          onClick={handleClickClearFilter}
        >
          Filtreyi Temizle
        </Button>
        <Button onClick={handleClickFilter} size="sm" color="success">
          Filtrele
        </Button>
      </div>
    </>
  );
}

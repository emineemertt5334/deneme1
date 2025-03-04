import { useState } from "react";
import ArrowUpIcon from "./icons/ArrowUpIcon";
import ArrowDownIcon from "./icons/ArrowDownIcon";

export default function TableHead({ columns, onChangeSorting }) {
  const [sorting, setSorting] = useState({});

  const toggleSorting = (id) => {
    setSorting((pre) => {
      let newSorting;

      /**
       * Buradaki amaç 3 seçenek arasında sıra ile gitmektir.
       * asc | desc | "iptal"
       *
       */
      if (pre[id]) {
        newSorting =
          pre[id] === "asc"
            ? { [id]: "desc" }
            : pre[id] === "desc"
            ? {}
            : { [id]: "asc" };
      } else {
        newSorting = { [id]: "asc" };
      }

      onChangeSorting?.(newSorting);

      return newSorting;
    });
  };

  return (
    <thead style={{ userSelect: "none" }}>
      <tr>
        {columns.map((col) => (
          <th key={col.id}>
            <div
              style={{
                gap: 10,
                display: "flex",
                alignItems: "center",
                cursor: col.sortable ? "pointer" : "text",
              }}
              onClick={() => col.sortable && toggleSorting(col.id)}
            >
              <div>{col.label}</div>

              {col.sortable && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ArrowUpIcon
                    color={
                      !sorting[col.id] || sorting[col.id] === "asc"
                        ? "lightgrey"
                        : "black"
                    }
                  />
                  <ArrowDownIcon
                    color={
                      !sorting[col.id] || sorting[col.id] === "desc"
                        ? "lightgrey"
                        : "black"
                    }
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

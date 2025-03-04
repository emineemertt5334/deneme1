import { Card, CardFooter, CardHeader, Table } from "reactstrap";
import TablePagination from "./custom-table-pagination";
import TableFilter from "./custom-table-filter";
import TableHead from "./custom-table-head";

function CustomTable({
  data,
  columns,

  // Pagination
  total,
  defaultPage,
  defaultRowsPerPage,
  onChangePagination,

  onChangeFilter, // Filtering
  onChangeSorting, // Sorting
}) {
  return (
    <Card style={{ marginTop: 40 }}>
      <CardHeader>
        {/** Filtreleme kısmı burada gerçekleşir */}
        <TableFilter columns={columns} onChangeFilter={onChangeFilter} />
      </CardHeader>

      <Table striped hover>
        {/** Sıralama kısmı burada gerçekleşir */}
        <TableHead columns={columns} onChangeSorting={onChangeSorting} />

        <tbody>
          {data.map((value) => (
            <tr key={value.id} style={{ cursor: "pointer" }}>
              <th scope="row"># {value.id}</th>
              <th style={{ fontWeight: "initial" }}>{value.name}</th>
              <th style={{ fontWeight: "initial" }}>{value.lastname}</th>
              <th style={{ fontWeight: "initial" }}>{value.age}</th>
              <th style={{ fontWeight: "initial" }}>{value.salary}</th>
            </tr>
          ))}
        </tbody>
      </Table>

      <CardFooter
        style={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <TablePagination
          total={total}
          defaultPage={defaultPage}
          defaultRowsPerPage={defaultRowsPerPage}
          onChangePagination={onChangePagination}
        />
      </CardFooter>
    </Card>
  );
}

export default CustomTable;

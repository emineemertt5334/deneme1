import { Container } from "reactstrap";
import CustomTable from "./components/custom-table/custom-table";
import { useState } from "react";

// Fake data üret
const makeData = (count) => {
  return [...Array(count)].map((_, i) => ({
    id: i + 1,
    name: "Fatih",
    lastname: "Soyad " + (i + 1),
    age: 10 + i,
    salary: 50000 + i,
  }));
};

//Fake data
const allData = makeData(48);

/**
 * type alanı boş bırakılır ise "text" olarak ele alınır. type alanı
 * html inputlarındaki alan ile aynıdır. text | number | date | file vb. tipler
 * props olarak geçilebilir.
 *
 * İlgili kolonda filtreleme yapmak için filterable; sıralama yapmak için sortable
 * seçenekleri true olmalı
 */
const columns = [
  {
    id: "id",
    label: "Id",
    type: "number",
    sortable: true,
    filterable: true,
  },
  {
    id: "name",
    label: "Ad",
    sortable: true,
    filterable: false,
  },
  {
    id: "lastname",
    label: "Soyad",
    sortable: false,
    filterable: true,
  },
  {
    id: "age",
    label: "Yaş",
    type: "number",
    sortable: true,
    filterable: true,
  },
  {
    id: "salary",
    label: "Maaş",
    type: "number",
    sortable: true,
    filterable: true,
  },
];

function App() {
  /**
   * Burada oluşturulan state değerleri aslında gerekli değil.
   * Backend üzerinde gönderilen verileri saklamak için eski değerleri tutuyoruz.
   * Filtre, sıralama, sayfalama değerleri her değiştiğinde ilgili fonksiyonlar değiştiği
   * için buradaki değerlere aslında gerek kalmıyor. Burada bu stateleri oluşturma amacım
   * backende gönderilen diğer verileri de akılda tutmak. Örneğin isim alanında filtreleme
   * yaparken aynı anda sayfalama verilerini de bozmamak için burada saklıyorum. Giden veri şu
   * şekilde olacak:
   *
   * {name:"fatih", page: 1, limit:20}
   */
  const [sorting, setSorting] = useState({});
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });

  /**
   * İlk yükleme anında backend üzerinden belirli sayıda değer çekmek
   * için pagination kullanıyoruz. Pagination ile 1.sayfa ve 20 satırlık
   * veri çekiyoruz.
   */
  const [filteredData, setFilteredData] = useState(
    backendFilterExample(allData, {
      sorting,
      filter,
      pagination,
    })
  );

  /**
    Filtrele butonuna tıklandığı zaman tetiklenir. filterValue yapısı şu şekildedir:
    {[obje name]: "value"}
    Örn: {name: "fat", age: 23}
  */
  const handleChangeFilter = (filterValue) => {
    const newFilteredData = backendFilterExample(allData, {
      sorting,
      filter: filterValue,
      pagination,
    });
    setFilteredData(newFilteredData);
    setFilter(filterValue);
  };

  /**
    Kolonlarda sıralama yapıldığı zaman tetiklenir. sortingValue yapısı şu şekildedir:
    {[obje name]: "asc" | "desc"}
    Örn: {name: "desc"}
  */
  const handleChangeSorting = (sortingValue) => {
    const newFilteredData = backendFilterExample(allData, {
      sorting: sortingValue,
      filter,
      pagination,
    });
    setFilteredData(newFilteredData);
    setSorting(sortingValue);
  };

  /**
    Sayfalama değiştiği zaman tetiklenir. paginationValu yapısı şu şekildedir.
    {page: 1, limit: 10}
    Page o anki sayfa sayısını belirtir. Limit ise sayfa başına getirilecek satır sayısını belirtir
  */
  const handleChangePagination = (paginationValue) => {
    const newFilteredData = backendFilterExample(allData, {
      sorting,
      filter,
      pagination: paginationValue,
    });
    setFilteredData(newFilteredData);
    setPagination(paginationValue);
  };

  return (
    <Container style={{ marginTop: 20 }}>
      <h3>Bionluk Tablo Örnek Çalışma</h3>

      <CustomTable
        columns={columns}
        data={filteredData.results}
        // Pagination
        total={filteredData.total}
        defaultPage={filteredData.page}
        defaultRowsPerPage={filteredData.limit}
        // Actions
        onChangeFilter={handleChangeFilter}
        onChangeSorting={handleChangeSorting}
        onChangePagination={handleChangePagination}
      />
    </Container>
  );
}

/**
 * Backendi simüle etmek için yazıldı
 */
function backendFilterExample(data, { sorting, filter, pagination }) {
  let newValue = [...data];

  if (filter) {
    const keys = Object.keys(filter);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      newValue = data.filter((val) =>
        val[key]?.toString()?.includes(filter[key]?.toString())
      );
    }
  }

  if (sorting) {
    newValue.sort((a, b) => {
      const key = Object.keys(sorting)[0];

      if (a[key] > b[key]) return sorting[key] === "desc" ? -1 : 1;
      return 0;
    });
  }

  if (pagination) {
    const { page, limit } = pagination;
    newValue = newValue.slice((page - 1) * limit, page * limit);
  }

  return {
    page: pagination?.page || 1,
    limit: pagination?.limit || 20,
    total: data.length,
    results: newValue,
  };
}

export default App;

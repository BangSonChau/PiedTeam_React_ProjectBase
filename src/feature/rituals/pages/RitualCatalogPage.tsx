import { useRituals } from "../hooks/useRituals";
import RitualCard from "../components/RitualCard";
import Pagination from "@/shared/common/Pagination";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";

function RitualCatalogPage() {
  let [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  // const [inputChanged, setInputChanged] = useState("");
  const [isHot, setIsHot] = useState<boolean | undefined>(undefined);

  const debouncedSearch = useDebounce(inputValue, 500);

  const { rituals, isLoading, isError, error, refetch, pagination } =
    useRituals({ page: page, search: debouncedSearch, isHot: isHot });

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // const handleSearchInput = () => {
  //   setInputChanged(inputValue);
  // };

  // if (isLoading) return <p>Đang loading</p>;

  if (isError)
    return (
      <>
        <p>{error?.message}</p>
        <button onClick={() => refetch()}>Thử lại</button>
      </>
    );
  if (!rituals) return <p>Data rỗng</p>;

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <Input
          placeholder="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/* <Button onClick={handleSearchInput}>Search</Button> */}
      </div>
      <select
        name=""
        id=""
        value={isHot?.toString() || ""}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "true") setIsHot(true);
          else if (value === "false") setIsHot(false);
          else setIsHot(undefined);
        }}
      >
        <option value="">All</option>
        <option value="true">Hot</option>
        <option value="false">Not hot</option>
      </select>

      {isLoading ? (
        <p>Đang loading</p>
      ) : rituals.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rituals.map((ritual) => (
              <RitualCard key={ritual.id} rituals={ritual} />
            ))}
          </div>
        </div>
      )}
      {pagination && (
        <Pagination meta={pagination} onPageChange={handlePageChange} />
      )}
    </>
  );
}

export default RitualCatalogPage;
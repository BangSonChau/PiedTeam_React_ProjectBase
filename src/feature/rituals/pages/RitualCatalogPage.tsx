import { useRituals } from "../hooks/useRituals";
import RitualCard from "../components/RitualCard";
import Pagination from "@/shared/common/Pagination";
import { useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

function RitualCatalogPage() {
  // let [page, setPage] = useState(1);
  // const [inputValue, setInputValue] = useState("");
  // // const [inputChanged, setInputChanged] = useState("");
  // const [isHot, setIsHot] = useState<boolean | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );

  const debouncedSearch = useDebounce(searchInput, 500);

  const { rituals, isLoading, isError, error, refetch, pagination } =
    useRituals({
      page: Number(searchParams.get("page")) || 1,
      search: searchParams.get("search") || undefined,
      isHot: Boolean(searchParams.get("trending")) || undefined,
      limit: Number(searchParams.get("limit")) || 6,
    });

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  useEffect(() => {
    if (debouncedSearch !== searchParams.get("search")) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      setSearchParams(params);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {/* <Button onClick={handleSearchInput}>Search</Button> */}
      </div>
      <select
        name=""
        id=""
        value={searchParams.get("trending") || ""}
        onChange={(e) => {
          const value = e.target.value;

          // if (value === "true") setIsHot(true);
          // else if (value === "false") setIsHot(false);
          // else setIsHot(undefined);
          handleFilterChange("trending", value);
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

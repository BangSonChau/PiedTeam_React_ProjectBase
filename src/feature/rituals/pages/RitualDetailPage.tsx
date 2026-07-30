import { useParams } from "react-router-dom";
import { useRitual } from "../hooks/useRitual";

function RitualDetailPage() {
  const { id } = useParams();

  const { data: ritual, isLoading, isError, error, refetch } = useRitual(id!);

  if (isLoading) return <p>Đang loading</p>;

  if (isError)
    return (
      <>
        <p>{error?.message}</p>
        <button onClick={() => refetch()}>Thử lại</button>
      </>
    );

  if (!ritual) return <p>No data</p>;
  return <>{ritual.name}</>;
}

export default RitualDetailPage;

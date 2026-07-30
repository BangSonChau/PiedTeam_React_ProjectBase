import { AspectRatio } from "@/shared/components/ui/aspect-ratio";
import { useUser } from "../hooks/useUser";

function ProfilePage() {
  const { data: userData, isLoading, isError, error, refetch } = useUser();

  if (isLoading) return <p>Đang loading</p>;
  if (isError)
    return (
      <>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Thử lại</button>
      </>
    );

  if (!userData) return <p>Data rỗng</p>;
  return (
    <>
      <div className="flex justify-around items-start">
        <div className="">
          <AspectRatio ratio={1/0.5 } className="w-[40rem]">
            <img src="https://innhanhasia.com/wp-content/uploads/2026/01/sticker-meo-cute-27-1.jpg" alt="Photo" className="" />
          </AspectRatio>
        </div>
        <div className="flex-1 ">
          <div className="m-10 ">
            <h1 className="text-center">Thông tin cá nhân:))</h1>
            <h1>Email: {userData.email}</h1>
            <h1>Vai trò: {userData.role}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

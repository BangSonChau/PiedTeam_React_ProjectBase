import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/feature/auth/store";
import { useLogoutMutation } from "@/feature/auth/hooks/useLogout";

function UserLayout() {
  const { accessToken } = useAuthStore();

  const handleLogout = useLogoutMutation();

  return (
    <>
      <div className="m-auto -m-0 max-w-7xl">
        <div className="flex gap-4 p-4 justify-center">
          <Button>
            <NavLink to="/">Home</NavLink>
          </Button>
          {accessToken ? (
            <Button onClick={() => handleLogout.mutate()}>Logout</Button>
          ) : (
            <Button>
              <NavLink to="/login">Login</NavLink>
            </Button>
          )}
          <Button>
            <NavLink to="/profile">Profile</NavLink>
          </Button>
          <Button>
            <NavLink to="/rituals">Rituals</NavLink>
          </Button>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default UserLayout;

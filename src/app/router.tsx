import DashBoardPage from "@/feature/admin/pages/DashBoardPage";
import ManageCreate from "@/feature/admin/pages/ManageCreate";
import ManageRitual from "@/feature/admin/pages/ManageRitual";
import ManageRitualEditPage from "@/feature/admin/pages/ManageRitualEditPage";
import UserManagementPage from "@/feature/admin/pages/UserManagementPage";
import LoginPage from "@/feature/auth/pages/LoginPage";
import ProfilePage from "@/feature/user/pages/ProfilePage";
import RegisterPage from "@/feature/auth/pages/RegisterPage";
import RitualCatalogPage from "@/feature/rituals/pages/RitualCatalogPage";
import RitualDetailPage from "@/feature/rituals/pages/RitualDetailPage";
import GuestRoute from "@/shared/common/guards/GuestRoute";
import ProtectedRoute from "@/shared/common/guards/ProtectedRoute";
import AdminLayout from "@/shared/layouts/AdminLayout";
import UserLayout from "@/shared/layouts/UserLayout";
import HomePage from "@/shared/pages/HomePage";
import NotFoundPage from "@/shared/pages/NotFoundPage";
import UnauthorizedPage from "@/shared/pages/UnauthorizedPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "rituals", element: <RitualCatalogPage /> },
      { path: "rituals/:id", element: <RitualDetailPage /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      { path: "unauthorized", element: <UnauthorizedPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  //admin
  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashBoardPage /> },
      { path: "rituals", element: <ManageRitual /> },
      { path: "rituals/create", element: <ManageCreate /> },
      { path: "rituals/:id/edit", element: <ManageRitualEditPage /> },
      { path: "users", element: <UserManagementPage /> },
    ],
  },
]);

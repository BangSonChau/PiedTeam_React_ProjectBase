import NotFoundPage from "@/shared/pages/NotFoundPage";
import UnauthorizedPage from "@/shared/pages/UnauthorizedPage";
import { createBrowserRouter } from "react-router-dom";
import {Suspense, type ReactNode } from "react";
import DashBoardPage from "@/feature/admin/pages/DashBoardPage";
// const DashBoardPage = lazy(() => import("@/feature/admin/pages/DashBoardPage"));
import ManageCreate from "@/feature/admin/pages/ManageCreate";
// const ManageCreate = lazy(() => import("@/feature/admin/pages/ManageCreate"));
import ManageRitual from "@/feature/admin/pages/ManageRitual";
// const ManageRitual = lazy(() => import("@/feature/admin/pages/ManageRitual"));
import ManageRitualEditPage from "@/feature/admin/pages/ManageRitualEditPage";
import GuestRoute from "@/shared/common/guards/GuestRoute";
import ProtectedRoute from "@/shared/common/guards/ProtectedRoute";

// const ManageRitualEditPage = lazy(
//   () => import("@/feature/admin/pages/ManageRitualEditPage"),
// );
import UserManagementPage from "@/feature/admin/pages/UserManagementPage";
// const UserManagementPage = lazy(
//   () => import("@/feature/admin/pages/UserManagementPage"),
// );
import LoginPage from "@/feature/auth/pages/LoginPage";
// const LoginPage = lazy(() => import("@/feature/auth/pages/LoginPage"));
import ProfilePage from "@/feature/user/pages/ProfilePage";
// const ProfilePage = lazy(() => import("@/feature/user/pages/ProfilePage"));
import RegisterPage from "@/feature/auth/pages/RegisterPage";
// const RegisterPage = lazy(() => import("@/feature/auth/pages/RegisterPage"));
import RitualCatalogPage from "@/feature/rituals/pages/RitualCatalogPage";
// const RitualCatalogPage = lazy(
//   () => import("@/feature/rituals/pages/RitualCatalogPage"),
// );
import RitualDetailPage from "@/feature/rituals/pages/RitualDetailPage";
// const RitualDetailPage = lazy(
//   () => import("@/feature/rituals/pages/RitualDetailPage"),
// );
import AdminLayout from "@/shared/layouts/AdminLayout";
// const AdminLayout = lazy(() => import("@/shared/layouts/AdminLayout"));
import UserLayout from "@/shared/layouts/UserLayout";
// const UserLayout = lazy(() => import("@/shared/layouts/UserLayout"));
import HomePage from "@/shared/pages/HomePage";
// const HomePage = lazy(() => import("@/shared/pages/HomePage"));

const withSuspense = (children: ReactNode) => (
  <Suspense
    fallback={
      <>
        <p>Đang Loading</p>
      </>
    }
  >
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "rituals", element: withSuspense(<RitualCatalogPage />) },
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
        {/* <AdminLayout /> */}
        {withSuspense(<AdminLayout />)}
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

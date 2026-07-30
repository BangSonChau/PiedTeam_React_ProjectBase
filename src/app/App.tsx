import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <QueryProvider>
      <RouterProvider />
      <Toaster position="top-right" richColors />
    </QueryProvider>
  );
}

export default App;

import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/App.routes";
import { AuthProvider } from "./features/auth/Auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

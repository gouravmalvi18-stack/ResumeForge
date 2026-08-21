import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/App.routes";
import { AuthProvider } from "./features/auth/Auth.context";
import { AiProvider } from "./features/GemmiAi/Ai.context";

function App() {
  return (
    <AuthProvider>
      <AiProvider>
        <RouterProvider router={router} />
      </AiProvider>
    </AuthProvider>
  );
}

export default App;

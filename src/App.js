import "./styles/App.css";
import axios from "axios";
import { UserContextProvider } from "./contexts/UserContexts";
import AppRoutes from "./routes/AppRoutes";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  return (
    <div>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </div>
  );
}

export default App;

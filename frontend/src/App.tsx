import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";

import { Toaster } from "react-hot-toast";
import Routes from "./routes/Routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Routes />
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

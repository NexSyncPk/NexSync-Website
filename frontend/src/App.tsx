import { BrowserRouter as Router, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";

import { Toaster } from "react-hot-toast";
import Routes from "./routes/Routes";

function App() {
  return (
    <Router>
      <Toaster />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes />
        </main>
      </div>
    </Router>
  );
}

export default App;

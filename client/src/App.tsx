import AppLayout from "./components/AppLayout";
import Footer from "./components/Footer";
import AllRoutes from "./utils/AllRoutes";

function App() {
  return (
    <div>
      <AppLayout />
      <div className="mt-16">
        <AllRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;

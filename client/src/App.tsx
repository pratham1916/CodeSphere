import AppLayout from "./components/AppLayout";
import AllRoutes from "./utils/AllRoutes";

function App() {
  return (
    <div>
      <AppLayout/>
      <div className="mt-16"></div>
      <AllRoutes/>
    </div>
  );
}

export default App;

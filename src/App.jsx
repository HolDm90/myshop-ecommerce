// src/App.jsx
import Navbar from "./components/ui/Navbar";
import AppRoutes from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <AppRoutes />
      </div>
    </>
  );
}

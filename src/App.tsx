import { Route, Routes } from "react-router-dom";
import { Header } from "./layouts/header";
import HomePage from "./views/home";
import SignInPage from "./views/sign-in";

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </main>
    </div>
  );
}

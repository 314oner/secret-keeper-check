import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="border-b p-4 flex justify-between items-center bg-white shadow-sm">
      <Link to="/" className="text-xl font-bold text-blue-600">
        MyApp
      </Link>
      <Link to="/signin">
        <button type="button">Войти</button>
      </Link>
    </header>
  );
}

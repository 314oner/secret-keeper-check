import { useNavigate } from "react-router-dom";
import { authApi } from "../../shared/api/auth-api";

export default function SignInPage() {
  const navigate = useNavigate();

  const handleMockLogin = () => {
    console.log("[SignInPage] Нажата кнопка входа");

    authApi
      .getYandexAuthUrl()
      .then((response) => {
        console.log("[SignInPage] Публичный API /yandex/url вернул:", response.data.url);
        return authApi.exchangeCode("mock_code");
      })
      .then((result) => {
        console.log("[SignInPage] Приватный API /callback вернул пользователя:", result.data.user);
        navigate("/profile");
      })
      .catch((err) => {
        console.error("[SignInPage] Ошибка при вызове API:", err);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Вход</h1>
      <button type="button" onClick={handleMockLogin}>
        Войти (демо public + private)
      </button>
    </div>
  );
}

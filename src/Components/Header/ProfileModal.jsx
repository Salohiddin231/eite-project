import { useAuthStore } from '../../store/authStore';

function ProfileModal({ user, onClose }) {
  const authLogout = useAuthStore((state) => state.authLogout);

  const handleLogout = () => {
    authLogout();
    localStorage.removeItem("currentUser");
    onClose();
  };

  const handleDeleteProfile = () => {
    if (user.type === 'google') {
      alert("Нельзя удалить аккаунт Google.");
      return;
    }

    // Удаляем из списка пользователей
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(u => u.email !== user.email);
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    // Удаляем текущего пользователя
    localStorage.removeItem("currentUser");

    // Выход
    authLogout();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Профиль</h2>

        <p><strong>Email:</strong> {user.email}</p>
        {user.type === 'local' && (
          <p><strong>Пароль:</strong> {user.password}</p>
        )}

        <div className="profile-buttons">
          <button className="delete-btn" onClick={handleDeleteProfile}>
            Удалить аккаунт
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;

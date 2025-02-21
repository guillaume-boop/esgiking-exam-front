import React, { useState } from "react";
import { useUser } from "./UserContext";

const ConnectButton: React.FC = () => {
  const { user, login, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState("");

  const handleConnect = () => {
    if (login(customerId)) {
      setIsModalOpen(false);
      setCustomerId("");
    } else {
      setError("Client inconnu");
    }
  };

  return (
    <>
      {user ? (
        <div className="connected-user">
          <button onClick={logout}>{`Bienvenue, ${user.firstName} ${user.lastName}!`}</button>
        </div>
      ) : (
        <button className="connect-button" onClick={() => setIsModalOpen(true)}>
          Connexion
        </button>
      )}

      {isModalOpen && (
        <div className="connect-modal-overlay">
          <div className="connect-modal-content">
            <h2>Connexion</h2>
            <input
              type="text"
              placeholder="Entrez votre ID client"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="connect-modal-input"
            />
            {error && <p className="connect-error-message">{error}</p>}
            <button className="connect-modal-submit" onClick={handleConnect}>
              Valider
            </button>
            <button className="connect-modal-close" onClick={() => setIsModalOpen(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectButton;

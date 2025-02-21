import React, { useState } from 'react';
import customers from '../json/customer.json';
import users from '../json/user.json'; // Assumons que tu as un fichier user.json ou une autre source pour les utilisateurs

const ConnectButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [error, setError] = useState('');
  const [connectedUser, setConnectedUser] = useState<{ firstName: string; lastName: string } | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
    setError(''); // Réinitialiser l'erreur à chaque ouverture
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCustomerId(''); // Réinitialiser l'ID saisi
    setError(''); // Réinitialiser l'erreur
  };

  // Fonction pour vérifier le client
  const handleConnect = () => {
    const customer = customers.find((customer) => customer._id === customerId);

    if (customer) {
      // Client trouvé : fermer le modal
      closeModal();
      // Trouver l'utilisateur associé à ce client
      const user = users.find((user) => user._id === customer.user); // Assumons que `users` est un tableau d'utilisateurs
      if (user) {
        // Afficher le nom de l'utilisateur
        setConnectedUser({ firstName: user.firstName, lastName: user.lastName });
        setIsButtonDisabled(true); // Désactiver le bouton
      } else {
        setError('Client inconnu');
      }
    } else {
      setError('Client inconnu');
    }
  };

  const disconnectUser = () => {
    setConnectedUser(null); // Réinitialiser l'utilisateur connecté
    setIsButtonDisabled(false); // Réactiver le bouton de connexion
  };

  return (
    <>
      {/* Afficher le nom de l'utilisateur en haut à droite */}
      {connectedUser && (
        <div className="connected-user">
          <button onClick={disconnectUser}>{`Bienvenue, ${connectedUser.firstName} ${connectedUser.lastName}!`}</button>
        </div>
      )}

      {/* Bouton "Connecter" fixé en haut */}
      <button
        className="connect-button"
        onClick={openModal}
        disabled={isButtonDisabled} // Désactiver le bouton si connecté
      >
        Connexion
      </button>

      {/* Modal pour la connexion */}
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
            <button className="connect-modal-close" onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectButton;

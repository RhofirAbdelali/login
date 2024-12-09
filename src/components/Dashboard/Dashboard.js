import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const Auth = useAuth();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('tableauDeBord');

    // Menu dynamique basé sur le rôle de l'utilisateur
    const menuItems = {
        admin: [
            { key: 'tableauDeBord', label: 'Tableau de Bord' },
            { key: 'utilisateurs', label: 'Utilisateurs' },
            { key: 'contrats', label: 'Contrats d’Assurance' },
            { key: 'reclamations', label: 'Réclamations' },
            { key: 'partenaires', label: 'Partenaires Assureurs' },
            { key: 'finances', label: 'Finances et Facturation' },
            { key: 'rapports', label: 'Rapports et Analyses' },
            { key: 'support', label: 'Support Client' },
            { key: 'parametres', label: 'Paramètres' },
        ],
        user: [
            { key: 'tableauDeBord', label: 'Tableau de Bord' },
            { key: 'reclamations', label: 'Réclamations' },
            { key: 'contrats', label: 'Mes Contrats' },
            { key: 'support', label: 'Support Client' },
        ],
    };

    const userRole = Auth.user?.roles?.includes('admin') ? 'admin' : 'user';
    const menus = menuItems[userRole];

    // Contenu dynamique
    const renderContent = () => {
        switch (activeMenu) {
            case 'tableauDeBord':
                return <h2>Bienvenue sur votre tableau de bord</h2>;
            case 'utilisateurs':
                return <h2>Gestion des utilisateurs</h2>;
            case 'contrats':
                return <h2>Gestion des contrats</h2>;
            case 'reclamations':
                return <h2>Gestion des réclamations</h2>;
            default:
                return <h2>Contenu non disponible</h2>;
        }
    };
const handleLogout = () => {
    Auth.userLogout();
    navigate('/login');
};
    return (
        <div className="dashboard-container">
            {/* Barre latérale */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1>AssurMob</h1>
                </div>
                <ul className="menu-list">
                    {menus.map((menu) => (
                        <li
                            key={menu.key}
                            className={activeMenu === menu.key ? 'active' : ''}
                            onClick={() => setActiveMenu(menu.key)}
                        >
                            {menu.label}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Contenu principal */}
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h2>Bienvenue : {Auth.user?.Prenom} {Auth.user?.Nom}!</h2>
                   <button onClick={handleLogout}>Déconnexion</button>
                </header>
                <section className="content-area">
                    {renderContent()}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;

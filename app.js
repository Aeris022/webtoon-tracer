// WEBTOON Tracer - Application JavaScript reproduisant exactement l'application React
// Extrait précisément de l'application Replit en cours

class WebtoonTracer {
    constructor() {
        // État de l'application exact
        this.currentUser = null;
        this.isAuthenticated = false;
        this.webtoons = [];
        this.favorites = new Set();
        this.readProgress = new Map(); // webtoonId -> Set de chapitres lus
        this.notes = new Map(); // webtoonId -> string
        this.currentTab = 'home';
        this.currentAdminTab = 'webtoons';
        this.searchTerm = '';
        this.selectedWebtoons = new Set();
        
        this.initializeApp();
    }

    // Données exactes de l'application React (reproduction des 10 webtoons de base)
    getDemoWebtoons() {
        return [
            {
                id: 1,
                title: "Tower of God",
                author: "SIU",
                genre: "Action",
                platform: "Webtoon",
                status: "En cours",
                rating: 95,
                chapters: 300,
                chapterCount: 300,
                description: "Un garçon escalade une tour mystérieuse pour retrouver son amie.",
                image: "📗",
                imageUrl: null
            },
            {
                id: 2,
                title: "Solo Leveling",
                author: "Chugong",
                genre: "Action",
                platform: "Webtoon",
                status: "Terminé",
                rating: 98,
                chapters: 179,
                chapterCount: 179,
                description: "Un chasseur faible devient le plus puissant au monde.",
                image: "⚔️",
                imageUrl: null
            },
            {
                id: 3,
                title: "UnOrdinary",
                author: "uru-chan",
                genre: "Drame",
                platform: "Webtoon",
                status: "En cours",
                rating: 89,
                chapters: 250,
                chapterCount: 250,
                description: "Dans un monde de super-pouvoirs, John cache son vrai pouvoir.",
                image: "⚡",
                imageUrl: null
            },
            {
                id: 4,
                title: "True Beauty",
                author: "Yaongyi",
                genre: "Romance",
                platform: "Webtoon",
                status: "Terminé",
                rating: 92,
                chapters: 201,
                chapterCount: 201,
                description: "Une lycéenne transformée par le maquillage trouve l'amour.",
                image: "💄",
                imageUrl: null
            },
            {
                id: 5,
                title: "Lore Olympus",
                author: "Rachel Smythe",
                genre: "Romance",
                platform: "Webtoon",
                status: "En cours",
                rating: 94,
                chapters: 180,
                chapterCount: 180,
                description: "Une version moderne du mythe d'Hadès et Perséphone.",
                image: "🌺",
                imageUrl: null
            },
            {
                id: 6,
                title: "My Dear Cold-Blooded King",
                author: "lifelight",
                genre: "Romance",
                platform: "Webtoon",
                status: "Terminé",
                rating: 91,
                chapters: 142,
                chapterCount: 142,
                description: "Une histoire d'amour entre une thief et un roi mystérieux.",
                image: "👑",
                imageUrl: null
            },
            {
                id: 7,
                title: "Let's Play",
                author: "Mongie",
                genre: "Romance",
                platform: "Webtoon",
                status: "En cours",
                rating: 88,
                chapters: 95,
                chapterCount: 95,
                description: "Une développeuse de jeux et ses relations compliquées.",
                image: "🎮",
                imageUrl: null
            },
            {
                id: 8,
                title: "I Love Yoo",
                author: "Quimchee",
                genre: "Drame",
                platform: "Webtoon",
                status: "En cours",
                rating: 93,
                chapters: 156,
                chapterCount: 156,
                description: "Une jeune fille qui refuse l'amour rencontre deux frères.",
                image: "💝",
                imageUrl: null
            },
            {
                id: 9,
                title: "Gourmet Hound",
                author: "Leehama",
                genre: "Slice of Life",
                platform: "Webtoon",
                status: "Terminé",
                rating: 87,
                chapters: 167,
                chapterCount: 167,
                description: "Les aventures culinaires d'une chasseuse de goûts.",
                image: "🍜",
                imageUrl: null
            },
            {
                id: 10,
                title: "Age Matters",
                author: "Enjelicious",
                genre: "Romance",
                platform: "Webtoon",
                status: "Terminé",
                rating: 85,
                chapters: 94,
                chapterCount: 94,
                description: "L'histoire d'amour entre une femme de 30 ans et son jeune patron.",
                image: "💼",
                imageUrl: null
            }
        ];
    }

    // Utilisateurs de démonstration pour l'admin
    getDemoUsers() {
        return [
            {
                id: "1",
                username: "erisaudrey",
                email: "erisaudrey@gmail.com",
                firstName: "Eris",
                lastName: "Audrey",
                isAdmin: true,
                isModerator: false,
                createdAt: "2025-01-01"
            },
            {
                id: "2",
                username: "testuser",
                email: "test@example.com",
                firstName: "Test",
                lastName: "User",
                isAdmin: false,
                isModerator: false,
                createdAt: "2025-01-02"
            },
            {
                id: "3",
                username: "moderator1",
                email: "mod@example.com",
                firstName: "Modérateur",
                lastName: "Test",
                isAdmin: false,
                isModerator: true,
                createdAt: "2025-01-03"
            }
        ];
    }

    // Initialisation exacte
    initializeApp() {
        this.checkSavedAuth();
        this.webtoons = this.getDemoWebtoons();
        this.users = this.getDemoUsers();
        
        this.loadSavedFavorites();
        this.loadSavedProgress();
        this.loadSavedNotes();
        
        this.setupEventListeners();
        
        if (this.isAuthenticated) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    // Configuration des événements
    setupEventListeners() {
        // Connexion
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Navigation
        document.querySelectorAll('.nav-tab, .bottom-nav-item').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                if (tabName) this.switchTab(tabName);
            });
        });

        // Navigation admin
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.adminTab;
                if (tabName) this.switchAdminTab(tabName);
            });
        });

        // Boutons header
        const adminBtn = document.getElementById('adminBtn');
        if (adminBtn) {
            adminBtn.addEventListener('click', () => this.switchTab('admin'));
        }

        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => this.switchTab('profile'));
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        const adminPanelBtn = document.getElementById('adminPanelBtn');
        if (adminPanelBtn) {
            adminPanelBtn.addEventListener('click', () => this.switchTab('admin'));
        }

        // Recherche
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        const clearSearchBtn = document.getElementById('clearSearchBtn');
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => this.clearSearch());
        }

        // Admin actions
        const addWebtoonBtn = document.getElementById('addWebtoonBtn');
        if (addWebtoonBtn) {
            addWebtoonBtn.addEventListener('click', () => this.showAddWebtoonModal());
        }

        const syncWebtoonsBtn = document.getElementById('syncWebtoonsBtn');
        if (syncWebtoonsBtn) {
            syncWebtoonsBtn.addEventListener('click', () => this.handleSync());
        }

        // Modals
        this.setupModalListeners();
    }

    setupModalListeners() {
        // Modal webtoon
        const closeModalBtn = document.getElementById('closeModalBtn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal('webtoonModal'));
        }

        // Modal ajout webtoon
        const closeAddModalBtn = document.getElementById('closeAddModalBtn');
        if (closeAddModalBtn) {
            closeAddModalBtn.addEventListener('click', () => this.closeModal('addWebtoonModal'));
        }

        const addWebtoonForm = document.getElementById('addWebtoonForm');
        if (addWebtoonForm) {
            addWebtoonForm.addEventListener('submit', (e) => this.handleAddWebtoon(e));
        }

        // Fermer sur overlay
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeAllModals();
            }
        });
    }

    // Authentification exacte de l'app React
    checkSavedAuth() {
        const savedCredentials = localStorage.getItem('webtoon-tracer-credentials');
        if (savedCredentials) {
            try {
                const { email, password, rememberMe } = JSON.parse(savedCredentials);
                if (rememberMe && email && password) {
                    const emailInput = document.getElementById('email');
                    const passwordInput = document.getElementById('password');
                    const rememberMeCheckbox = document.getElementById('rememberMe');
                    
                    if (emailInput) emailInput.value = email;
                    if (passwordInput) passwordInput.value = password;
                    if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
                }
            } catch (error) {
                console.error('Erreur lors du chargement des informations sauvegardées:', error);
            }
        }
    }

    loadSavedFavorites() {
        const savedFavorites = localStorage.getItem('webtoon-tracer-favorites');
        if (savedFavorites) {
            try {
                const favoriteIds = JSON.parse(savedFavorites);
                this.favorites = new Set(favoriteIds);
            } catch (error) {
                console.error('Erreur lors du chargement des favoris:', error);
            }
        }
    }

    loadSavedProgress() {
        const savedProgress = localStorage.getItem('webtoon-tracer-progress');
        if (savedProgress) {
            try {
                const progressData = JSON.parse(savedProgress);
                this.readProgress = new Map();
                for (const [webtoonId, chapters] of Object.entries(progressData)) {
                    this.readProgress.set(parseInt(webtoonId), new Set(chapters));
                }
            } catch (error) {
                console.error('Erreur lors du chargement de la progression:', error);
            }
        }
    }

    loadSavedNotes() {
        const savedNotes = localStorage.getItem('webtoon-tracer-notes');
        if (savedNotes) {
            try {
                const notesData = JSON.parse(savedNotes);
                this.notes = new Map(Object.entries(notesData).map(([k, v]) => [parseInt(k), v]));
            } catch (error) {
                console.error('Erreur lors du chargement des notes:', error);
            }
        }
    }

    saveFavorites() {
        localStorage.setItem('webtoon-tracer-favorites', JSON.stringify(Array.from(this.favorites)));
    }

    saveProgress() {
        const progressObj = {};
        for (const [webtoonId, chapters] of this.readProgress.entries()) {
            progressObj[webtoonId] = Array.from(chapters);
        }
        localStorage.setItem('webtoon-tracer-progress', JSON.stringify(progressObj));
    }

    saveNotes() {
        const notesObj = {};
        for (const [webtoonId, note] of this.notes.entries()) {
            notesObj[webtoonId] = note;
        }
        localStorage.setItem('webtoon-tracer-notes', JSON.stringify(notesObj));
    }

    // Connexion exacte (erisaudrey@gmail.com / password123)
    handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (email === 'erisaudrey@gmail.com' && password === 'password123') {
            this.currentUser = {
                id: "1",
                email: email,
                username: 'erisaudrey',
                firstName: 'Eris',
                lastName: 'Audrey',
                isAdmin: true,
                isModerator: false
            };
            this.isAuthenticated = true;

            if (rememberMe) {
                localStorage.setItem('webtoon-tracer-credentials', JSON.stringify({
                    email,
                    password,
                    rememberMe: true
                }));
            } else {
                localStorage.removeItem('webtoon-tracer-credentials');
            }

            this.showToast('Connexion réussie', 'Bienvenue sur WEBTOON Tracer!', 'success');
            this.showDashboard();
        } else {
            this.showToast('Erreur de connexion', 'Identifiants incorrects', 'error');
        }
    }

    handleLogout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('webtoon-tracer-credentials');
        
        this.showToast('Déconnexion réussie', 'À bientôt sur WEBTOON Tracer!', 'success');
        this.showLogin();
    }

    showLogin() {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('dashboard').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        
        this.updateUserInfo();
        this.updateAdminVisibility();
        this.loadCurrentTab();
        this.updateStats();
        this.updateSearchCounter();
    }

    updateUserInfo() {
        if (!this.currentUser) return;

        const userInitials = document.getElementById('userInitials');
        const userFullName = document.getElementById('userFullName');
        const userUsername = document.getElementById('userUsername');
        const userFirstName = document.getElementById('userFirstName');
        const userLastName = document.getElementById('userLastName');
        const userEmail = document.getElementById('userEmail');

        if (userInitials) {
            userInitials.textContent = `${this.currentUser.firstName[0]}${this.currentUser.lastName[0]}`;
        }
        if (userFullName) {
            userFullName.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        }
        if (userUsername) {
            userUsername.value = this.currentUser.username;
        }
        if (userFirstName) {
            userFirstName.value = this.currentUser.firstName;
        }
        if (userLastName) {
            userLastName.value = this.currentUser.lastName;
        }
        if (userEmail) {
            userEmail.value = this.currentUser.email;
        }
    }

    updateAdminVisibility() {
        const isAdmin = this.currentUser?.isAdmin;
        
        // Boutons admin dans header et profil
        const adminBtn = document.getElementById('adminBtn');
        const adminPanelBtn = document.getElementById('adminPanelBtn');
        
        if (adminBtn) {
            adminBtn.classList.toggle('hidden', !isAdmin);
        }
        if (adminPanelBtn) {
            adminPanelBtn.classList.toggle('hidden', !isAdmin);
        }

        // Onglet admin dans navigation
        document.querySelectorAll('.admin-only').forEach(el => {
            el.classList.toggle('hidden', !isAdmin);
            if (isAdmin) {
                el.classList.add('visible');
            }
        });
    }

    // Navigation entre onglets exacte
    switchTab(tabName) {
        this.currentTab = tabName;

        // Navigation desktop
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeDesktopTab = document.querySelector(`[data-tab="${tabName}"].nav-tab`);
        if (activeDesktopTab) {
            activeDesktopTab.classList.add('active');
        }

        // Navigation mobile
        document.querySelectorAll('.bottom-nav-item').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeMobileTab = document.querySelector(`[data-tab="${tabName}"].bottom-nav-item`);
        if (activeMobileTab) {
            activeMobileTab.classList.add('active');
        }

        // Contenu
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        const targetTab = document.getElementById(`${tabName}Tab`);
        if (targetTab) {
            targetTab.classList.remove('hidden');
        }

        this.loadCurrentTab();
    }

    switchAdminTab(tabName) {
        this.currentAdminTab = tabName;

        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-admin-tab="${tabName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        const targetContent = document.getElementById(`admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Tab`);
        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        if (tabName === 'users') {
            this.loadUsers();
        }
    }

    loadCurrentTab() {
        switch (this.currentTab) {
            case 'home':
                this.loadWebtoons();
                break;
            case 'favorites':
                this.loadFavorites();
                break;
            case 'profile':
                this.loadProfile();
                break;
            case 'admin':
                this.loadAdmin();
                break;
        }
    }

    // Chargement des webtoons exact
    loadWebtoons() {
        const grid = document.getElementById('webtoonsGrid');
        if (!grid) return;

        const filteredWebtoons = this.getFilteredWebtoons();
        
        if (filteredWebtoons.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <h3>${this.searchTerm ? "Aucun webtoon trouvé" : "Aucun webtoon disponible"}</h3>
                    <p>${this.searchTerm ? "Essayez un autre terme de recherche" : "Les webtoons seront ajoutés par l'administrateur"}</p>
                </div>
            `;
        } else {
            grid.innerHTML = filteredWebtoons.map(webtoon => this.createWebtoonCard(webtoon)).join('');
        }

        this.updateStats();
        this.updateSearchCounter();
    }

    getFilteredWebtoons() {
        let filtered = this.webtoons;

        if (this.searchTerm) {
            filtered = filtered.filter(webtoon =>
                webtoon.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                webtoon.author.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }

        return filtered.sort((a, b) => a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' }));
    }

    createWebtoonCard(webtoon) {
        const isFavorite = this.favorites.has(webtoon.id);
        
        return `
            <div class="webtoon-card" onclick="app.showWebtoonDetail(${webtoon.id})">
                <div class="webtoon-image">${webtoon.image}</div>
                <div class="webtoon-info">
                    <div class="webtoon-title">${webtoon.title}</div>
                    <div class="webtoon-author">par ${webtoon.author}</div>
                    <div class="webtoon-meta">
                        <span class="webtoon-genre">${webtoon.genre}</span>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                                onclick="event.stopPropagation(); app.toggleFavorite(${webtoon.id})">
                            ⭐
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    toggleFavorite(webtoonId) {
        if (this.favorites.has(webtoonId)) {
            this.favorites.delete(webtoonId);
            this.showToast('Retiré des favoris', 'Webtoon retiré de vos favoris', 'success');
        } else {
            this.favorites.add(webtoonId);
            this.showToast('Ajouté aux favoris', 'Webtoon ajouté à vos favoris', 'success');
        }
        
        this.saveFavorites();
        this.loadCurrentTab();
        this.updateStats();
    }

    // Modal de détail exacte avec progression des chapitres
    showWebtoonDetail(webtoonId) {
        const webtoon = this.webtoons.find(w => w.id === webtoonId);
        if (!webtoon) return;

        const modal = document.getElementById('webtoonModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = webtoon.title;
        
        const readChapters = this.readProgress.get(webtoon.id) || new Set();
        const currentNotes = this.notes.get(webtoon.id) || '';
        
        // Chapitres exactement comme dans l'app React
        let chaptersHtml = '';
        if (webtoon.chapterCount > 0) {
            const chapters = Array.from({ length: webtoon.chapterCount }, (_, i) => {
                const chapterNumber = i + 1;
                const isRead = readChapters.has(chapterNumber);
                return `
                    <button class="chapter-btn ${isRead ? 'read' : ''}" 
                            onclick="app.toggleChapterProgress(${webtoon.id}, ${chapterNumber})">
                        ${isRead ? '✓' : chapterNumber}
                    </button>
                `;
            }).join('');

            chaptersHtml = `
                <div class="chapters-section">
                    <h4>Progression des chapitres</h4>
                    <div class="chapters-grid">
                        ${chapters}
                    </div>
                </div>
            `;
        } else {
            chaptersHtml = `
                <div class="chapters-warning">
                    <p><strong>Nombre de chapitres non spécifié</strong><br/>
                    Les informations sur les chapitres seront ajoutées prochainement.</p>
                </div>
            `;
        }

        modalBody.innerHTML = `
            <div class="webtoon-detail">
                <div class="webtoon-detail-layout">
                    <div class="webtoon-image-large">${webtoon.image}</div>
                    
                    <div class="webtoon-info-section">
                        <h3>Plateforme: ${webtoon.platform}</h3>
                        <p>Chapitres disponibles: ${webtoon.chapterCount > 0 ? webtoon.chapterCount : "Non spécifié"}</p>
                        
                        ${chaptersHtml}
                        
                        <div class="notes-section">
                            <h4>Mes notes</h4>
                            <textarea id="webtoonNotes" class="notes-textarea" placeholder="Ajoutez vos notes sur ce webtoon...">${currentNotes}</textarea>
                            <button class="save-notes-btn" onclick="app.saveWebtoonNotes(${webtoon.id})">
                                Sauvegarder les notes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }

    toggleChapterProgress(webtoonId, chapterNumber) {
        if (!this.readProgress.has(webtoonId)) {
            this.readProgress.set(webtoonId, new Set());
        }
        
        const readChapters = this.readProgress.get(webtoonId);
        
        if (readChapters.has(chapterNumber)) {
            readChapters.delete(chapterNumber);
        } else {
            readChapters.add(chapterNumber);
        }
        
        this.saveProgress();
        
        // Mise à jour visuelle
        const chapterBtn = event.target;
        const isRead = readChapters.has(chapterNumber);
        chapterBtn.classList.toggle('read', isRead);
        chapterBtn.textContent = isRead ? '✓' : chapterNumber;
        
        this.showToast(
            isRead ? 'Chapitre marqué comme lu' : 'Chapitre marqué comme non lu',
            `Chapitre ${chapterNumber} mis à jour`,
            'success'
        );
    }

    saveWebtoonNotes(webtoonId) {
        const notesTextarea = document.getElementById('webtoonNotes');
        if (!notesTextarea) return;
        
        const notes = notesTextarea.value.trim();
        
        if (notes) {
            this.notes.set(webtoonId, notes);
        } else {
            this.notes.delete(webtoonId);
        }
        
        this.saveNotes();
        this.showToast('Notes sauvegardées', 'Vos notes ont été mises à jour', 'success');
    }

    // Recherche exacte
    handleSearch(term) {
        this.searchTerm = term;
        this.loadWebtoons();
        this.updateClearSearchButton();
    }

    clearSearch() {
        this.searchTerm = '';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        this.loadWebtoons();
        this.updateClearSearchButton();
    }

    updateClearSearchButton() {
        const clearBtn = document.getElementById('clearSearchBtn');
        if (clearBtn) {
            clearBtn.classList.toggle('hidden', !this.searchTerm);
        }
    }

    updateSearchCounter() {
        const counter = document.getElementById('searchCounter');
        if (!counter) return;
        
        const filteredWebtoons = this.getFilteredWebtoons();
        const totalWebtoons = this.webtoons.length;
        
        if (this.searchTerm) {
            counter.textContent = `${filteredWebtoons.length} résultat${filteredWebtoons.length !== 1 ? 's' : ''} sur ${totalWebtoons} webtoons`;
        } else {
            counter.textContent = `${totalWebtoons} webtoon${totalWebtoons !== 1 ? 's' : ''} disponible${totalWebtoons !== 1 ? 's' : ''}`;
        }
    }

    // Favoris exacts
    loadFavorites() {
        const grid = document.getElementById('favoritesGrid');
        if (!grid) return;

        const favoriteWebtoons = this.webtoons
            .filter(webtoon => this.favorites.has(webtoon.id))
            .sort((a, b) => a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' }));

        if (favoriteWebtoons.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⭐</div>
                    <h3>Aucun favori pour le moment</h3>
                    <p>Ajoutez des webtoons à vos favoris depuis la page d'accueil</p>
                    <button class="btn btn-primary" onclick="app.switchTab('home')">
                        Découvrir des webtoons
                    </button>
                </div>
            `;
        } else {
            grid.innerHTML = favoriteWebtoons.map(webtoon => this.createWebtoonCard(webtoon)).join('');
        }
    }

    loadProfile() {
        this.updateStats();
    }

    // Admin exact
    loadAdmin() {
        if (!this.currentUser?.isAdmin) {
            this.showToast('Accès refusé', 'Seuls les administrateurs peuvent accéder à cette page', 'error');
            this.switchTab('home');
            return;
        }

        const totalWebtoonsAdmin = document.getElementById('totalWebtoonsAdmin');
        if (totalWebtoonsAdmin) {
            totalWebtoonsAdmin.textContent = this.webtoons.length;
        }

        if (this.currentAdminTab === 'users') {
            this.loadUsers();
        }
    }

    loadUsers() {
        const usersList = document.getElementById('usersList');
        if (!usersList) return;

        const usersHtml = this.users.map(user => {
            const badges = [];
            if (user.isAdmin) badges.push('<span class="user-badge badge-admin">Admin</span>');
            if (user.isModerator) badges.push('<span class="user-badge badge-moderator">Modérateur</span>');

            return `
                <div class="user-item">
                    <div class="user-info">
                        <h5>${user.firstName} ${user.lastName} ${badges.join('')}</h5>
                        <p>${user.email}</p>
                    </div>
                    ${!user.isAdmin ? `
                        <div class="moderator-toggle">
                            <label>Modérateur</label>
                            <input type="checkbox" ${user.isModerator ? 'checked' : ''} 
                                   onchange="app.toggleModerator('${user.id}', this.checked)">
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        usersList.innerHTML = usersHtml;
    }

    toggleModerator(userId, isModerator) {
        const user = this.users.find(u => u.id === userId);
        if (user && !user.isAdmin) {
            user.isModerator = isModerator;
            this.showToast('Succès', 'Statut modérateur mis à jour', 'success');
            this.loadUsers();
        }
    }

    showAddWebtoonModal() {
        const modal = document.getElementById('addWebtoonModal');
        if (modal) {
            modal.classList.remove('hidden');
            
            const form = document.getElementById('addWebtoonForm');
            if (form) {
                form.reset();
            }
        }
    }

    handleAddWebtoon(event) {
        event.preventDefault();
        
        const newWebtoon = {
            id: Math.max(...this.webtoons.map(w => w.id)) + 1,
            title: document.getElementById('newTitle').value,
            author: document.getElementById('newAuthor').value,
            genre: document.getElementById('newGenre').value,
            platform: document.getElementById('newPlatform').value,
            status: document.getElementById('newStatus').value,
            rating: parseInt(document.getElementById('newRating').value) || 0,
            chapters: parseInt(document.getElementById('newChapters').value) || 0,
            chapterCount: parseInt(document.getElementById('newChapters').value) || 0,
            description: document.getElementById('newDescription').value,
            image: this.getRandomEmoji(),
            imageUrl: null
        };
        
        this.webtoons.push(newWebtoon);
        this.closeModal('addWebtoonModal');
        this.showToast('Webtoon ajouté', `${newWebtoon.title} a été ajouté avec succès`, 'success');
        
        this.loadCurrentTab();
        this.updateStats();
    }

    getRandomEmoji() {
        const emojis = ['📗', '📘', '📙', '📕', '📓', '📔', '📒', '📚', '📖', '📑', '📜', '📄', '📃', '📰', '🗞️'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    handleSync() {
        const syncBtn = document.getElementById('syncWebtoonsBtn');
        if (syncBtn) {
            const icon = syncBtn.querySelector('.icon');
            if (icon) {
                icon.classList.add('rotating');
            }
        }

        this.showToast('Synchronisation', 'Synchronisation en cours...', 'success');
        
        setTimeout(() => {
            if (syncBtn) {
                const icon = syncBtn.querySelector('.icon');
                if (icon) {
                    icon.classList.remove('rotating');
                }
            }
            this.showToast('Synchronisation terminée', 'Aucun nouveau webtoon trouvé', 'success');
        }, 2000);
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    updateStats() {
        const totalWebtoons = document.getElementById('totalWebtoons');
        const favoriteCount = document.getElementById('favoriteCount');
        const chaptersRead = document.getElementById('chaptersRead');

        // Calculer le nombre total de chapitres lus
        let totalChaptersRead = 0;
        for (const chapters of this.readProgress.values()) {
            totalChaptersRead += chapters.size;
        }

        if (totalWebtoons) {
            totalWebtoons.textContent = this.webtoons.length;
        }
        
        if (favoriteCount) {
            favoriteCount.textContent = this.favorites.size;
        }
        
        if (chaptersRead) {
            chaptersRead.textContent = totalChaptersRead;
        }
    }

    // Toast notifications exactes
    showToast(title, description, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialisation exacte
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WebtoonTracer();
    console.log('Application WEBTOON Tracer initialisée - Reproduction exacte de l\'application React');
});

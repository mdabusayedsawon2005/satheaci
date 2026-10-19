/* ══════════════════════════════════════════════════════════
   SATHE ACHI - ADMIN PANEL CORE
   Supabase Init · Auth · Theme · Toast · Global Helpers
   ══════════════════════════════════════════════════════════ */

// ── 1. SUPABASE ──
const SUPABASE_URL     = 'https://biteosolyhaoxwnzxdxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpdGVvc29seWhhb3h3bnp4ZHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTA3OTcsImV4cCI6MjA5NzQ2Njc5N30.jHjbpWxqqH83dLhGZ4MwYfk1pbnlov5jvP2x9Z0-S2g';
window.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── 2. AUTH CHECK ──
async function checkAdminAuth() {
    const isLoginPage = window.location.pathname.includes('login.html');

    // 1. Check Super Admin Credentials State
    const isMasterAdmin = localStorage.getItem('sa_admin_auth') === 'true';
    const adminEmail = (localStorage.getItem('sa_admin_email') || '').toLowerCase();
    const allowedAdmins = ['11@gmail.com', 'mdabusayedsawon2005@gmail.com'];

    if (isMasterAdmin && (allowedAdmins.includes(adminEmail) || localStorage.getItem('sa_admin_role') === 'Super Admin')) {
        if (isLoginPage) {
            window.location.href = 'index.html';
            return null;
        }

        const nameEl = document.getElementById('topbarAdminName');
        if (nameEl) {
            nameEl.textContent = localStorage.getItem('sa_admin_name') || 'Abu Sayed';
        }
        const roleEl = document.querySelector('.sa-admin-role');
        if (roleEl) {
            roleEl.textContent = localStorage.getItem('sa_admin_role') || 'Super Admin';
        }

        // Ensure Supabase JWT session is active so PostgreSQL RLS allows all admin operations
        try {
            const { data: currentSession } = await window.db.auth.getSession();
            if (!currentSession?.session && (adminEmail === '11@gmail.com' || adminEmail === 'mdabusayedsawon2005@gmail.com')) {
                await window.db.auth.signInWithPassword({ email: adminEmail, password: 'abusayed2025' });
            }
        } catch (err) {
            console.warn('Admin Supabase auth session sync:', err);
        }

        return {
            user: {
                id: 'admin-' + (adminEmail || 'super'),
                email: adminEmail,
                user_metadata: { full_name: 'Abu Sayed', role: 'Super Admin' }
            }
        };
    }

    // 2. Standard Supabase Session Verification
    const { data: { session } } = await window.db.auth.getSession();

    if (!session) {
        localStorage.removeItem('sa_admin_auth');
        if (!isLoginPage) window.location.href = 'login.html';
        return null;
    }

    // Verify user is in admins table
    const { data: adminData } = await window.db
        .from('admins')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

    if (!adminData) {
        await window.db.auth.signOut();
        localStorage.removeItem('sa_admin_auth');
        localStorage.removeItem('sa_admin_email');
        if (window.saGlassModal) {
            window.saGlassModal.show({
                type: 'error',
                title: 'Access Denied',
                message: 'Administrator privileges required. You will be redirected to the homepage.',
                confirmText: 'OK',
                onConfirm: () => { window.location.href = '../index.html'; }
            });
        } else {
            window.location.href = '../index.html';
        }
        return null;
    }

    if (isLoginPage) { window.location.href = 'index.html'; return null; }

    // Populate admin name in topbar
    const nameEl = document.getElementById('topbarAdminName');
    if (nameEl) {
        const { data: profile } = await window.db
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .single();
        if (profile?.full_name) nameEl.textContent = profile.full_name;
        else nameEl.textContent = session.user.email?.split('@')[0] || 'Admin';
    }
    return session;
}


// ── 3. GLOBAL DOM READY ──
document.addEventListener('DOMContentLoaded', async () => {
    await checkAdminAuth();

    // ── THEME ──
    const themeBtn = document.getElementById('adminThemeBtn');
    const saved = localStorage.getItem('sa_admin_theme') || 'light';
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-regular fa-sun"></i>';
    }
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('sa_admin_theme', 'light');
                themeBtn.innerHTML = '<i class="fa-regular fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('sa_admin_theme', 'dark');
                themeBtn.innerHTML = '<i class="fa-regular fa-sun"></i>';
            }
        });
    }

    // ── MOBILE SIDEBAR (for pages that don't define their own handler) ──
    const menuBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('sidebarCloseBtn');
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('show');
            if (overlay) overlay.classList.add('show');
        });
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (sidebar) sidebar.classList.remove('show');
            overlay.classList.remove('show');
        });
    }
});

// Premium Apple Glass Modal System Global Object
window.saGlassModal = {
    activeModal: null,

    show: function({
        type = 'info', // 'success' | 'error' | 'confirm' | 'info'
        title = '',
        message = '',
        confirmText = 'OK',
        cancelText = 'Cancel',
        onConfirm = null,
        onCancel = null,
        autoClose = false,
        autoCloseDuration = 3000
    }) {
        // Remove any existing active modal
        this.closeActive();

        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'sa-glass-modal-overlay';
        
        // Define Icon Class
        let iconClass = 'fa-solid ';
        if (type === 'success') iconClass += 'fa-circle-check';
        else if (type === 'error') iconClass += 'fa-circle-exclamation';
        else if (type === 'confirm') iconClass += 'fa-circle-question';
        else iconClass += 'fa-circle-info';

        // Set Cancel Button visibility
        const showCancel = (type === 'confirm');
        const confirmBtnClass = (type === 'error' || (type === 'confirm' && (title.toLowerCase().includes('delete') || message.toLowerCase().includes('delete') || message.toLowerCase().includes('remove') || message.toLowerCase().includes('logout')))) ? 'danger' : 'primary';

        overlay.innerHTML = `
            <div class="sa-glass-modal-box">
                <button class="sa-glass-modal-close-btn" aria-label="Close modal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="sa-glass-modal-icon ${type}">
                    <i class="${iconClass}"></i>
                </div>
                <h3 class="sa-glass-modal-title">${title || (type === 'success' ? 'Success' : (type === 'error' ? 'Error' : 'Notification'))}</h3>
                <p class="sa-glass-modal-desc">${message}</p>
                <div class="sa-glass-modal-buttons">
                    ${showCancel ? `<button class="sa-glass-modal-btn secondary sa-cancel-btn">${cancelText}</button>` : ''}
                    <button class="sa-glass-modal-btn ${confirmBtnClass} sa-confirm-btn">${confirmText}</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.activeModal = overlay;

        // Force reflow
        overlay.offsetWidth;

        // Show modal with animation
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        const closeBtn = overlay.querySelector('.sa-glass-modal-close-btn');
        const confirmBtn = overlay.querySelector('.sa-confirm-btn');
        const cancelBtn = overlay.querySelector('.sa-cancel-btn');

        const escListener = (e) => {
            if (e.key === 'Escape') {
                close();
                if (onCancel) onCancel();
            }
        };
        window.addEventListener('keydown', escListener);

        overlay._cleanup = () => {
            window.removeEventListener('keydown', escListener);
        };

        function close() {
            if (overlay._cleanup) overlay._cleanup();
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                overlay.remove();
                if (self.activeModal === overlay) {
                    self.activeModal = null;
                }
            }, 350);
        }

        closeBtn.onclick = (e) => {
            e.stopPropagation();
            close();
            if (onCancel) onCancel();
        };

        confirmBtn.onclick = (e) => {
            e.stopPropagation();
            close();
            if (onConfirm) onConfirm();
        };

        if (cancelBtn) {
            cancelBtn.onclick = (e) => {
                e.stopPropagation();
                close();
                if (onCancel) onCancel();
            };
        }

        overlay.onclick = (e) => {
            if (e.target === overlay) {
                close();
                if (onCancel) onCancel();
            }
        };

        if (autoClose) {
            setTimeout(() => {
                if (document.body.contains(overlay) && overlay.classList.contains('active')) {
                    close();
                }
            }, autoCloseDuration);
        }
    },

    closeActive: function() {
        if (this.activeModal) {
            if (this.activeModal._cleanup) {
                this.activeModal._cleanup();
            }
            this.activeModal.classList.remove('active');
            const target = this.activeModal;
            setTimeout(() => {
                if (target && target.parentNode) target.parentNode.removeChild(target);
            }, 350);
            this.activeModal = null;
            document.body.style.overflow = '';
        }
    }
};

window.saConfirm = function(message, onConfirm, onCancel) {
    window.saGlassModal.show({
        type: 'confirm',
        title: 'Confirm Action',
        message: message,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        onConfirm: onConfirm,
        onCancel: onCancel
    });
};

window.saAlert = function(message, type = 'info', onConfirm = null) {
    window.saGlassModal.show({
        type: type,
        title: type === 'success' ? 'Success' : (type === 'error' ? 'Error' : 'Notification'),
        message: message,
        confirmText: 'OK',
        onConfirm: onConfirm
    });
};

// Override native alert API globally
window.alert = function(message) {
    window.saAlert(message);
};

// ── 4. LOGOUT ──
async function adminLogout() {
    window.saConfirm('Are you sure you want to log out of the admin panel?', async () => {
        localStorage.removeItem('sa_admin_auth');
        localStorage.removeItem('sa_admin_email');
        localStorage.removeItem('sa_admin_name');
        localStorage.removeItem('sa_admin_role');
        try { await window.db.auth.signOut(); } catch(e){}
        window.location.href = 'login.html';
    });
}

// ── 5. TOAST SYSTEM (Redirected to Glass Modal) ──
window.showToast = function(message, type = 'success') {
    const msgLower = message.toLowerCase();

    // 1. Success Modals
    if (type === 'success') {
        if (msgLower.includes('published') || msgLower.includes('added') || msgLower.includes('created') || msgLower.includes('saved')) {
            window.saGlassModal.show({
                type: 'success',
                title: msgLower.includes('published') ? 'Product Published' : (msgLower.includes('saved') ? 'Draft Saved' : 'Success'),
                message: message,
                confirmText: 'OK',
                autoClose: true,
                autoCloseDuration: 2500
            });
            return;
        }
        if (msgLower.includes('login successful')) {
            window.saGlassModal.show({
                type: 'success',
                title: 'Login Successful',
                message: message,
                confirmText: 'Continue',
                autoClose: true,
                autoCloseDuration: 2000
            });
            return;
        }
    }

    // 2. Error Modals
    if (type === 'error') {
        if (msgLower.includes('required') || msgLower.includes('select') || msgLower.includes('invalid')) {
            window.saGlassModal.show({
                type: 'error',
                title: 'Invalid Input',
                message: message,
                confirmText: 'Dismiss'
            });
            return;
        }
        if (msgLower.includes('denied') || msgLower.includes('unauthorized') || msgLower.includes('privileges')) {
            window.saGlassModal.show({
                type: 'error',
                title: 'Access Denied',
                message: message,
                confirmText: 'Exit',
                onConfirm: () => { window.location.href = '../index.html'; }
            });
            return;
        }
    }

    // 3. Fallback Transient Modal for General Notifications
    window.saGlassModal.show({
        type: type,
        title: type === 'success' ? 'Success' : (type === 'error' ? 'Error' : 'Notification'),
        message: message,
        confirmText: 'OK',
        autoClose: true,
        autoCloseDuration: 2500
    });
};


// ── 6. HELPERS ──
window.formatCurrency = (n) => '৳' + Number(n || 0).toLocaleString('en-BD');
window.formatDate = (d) => d ? new Date(d).toLocaleDateString('en-BD', { day:'2-digit', month:'short', year:'numeric' }) : '—';
window.slugify = (s) => s.toLowerCase().replace(/[^\w\s]/g,'').trim().replace(/\s+/g,'-');

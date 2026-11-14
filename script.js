document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Sidebar Menu Toggle Logic (Responsive <= 500px)
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleSidebar = () => {
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : 'auto';
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 2. Interactive Portfolio Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white', 'shadow-sm');
                btn.classList.add('bg-zinc-100', 'text-zinc-600');
            });

            button.classList.remove('bg-zinc-100', 'text-zinc-600');
            button.classList.add('bg-primary', 'text-white', 'shadow-sm');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 3. Portfolio Detail Modal Logic with Dynamic Image & Alt
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModal');
    const detailButtons = document.querySelectorAll('.detail-btn');

    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDesc = document.getElementById('modalDesc');
    const modalTools = document.getElementById('modalTools');
    const modalImage = document.getElementById('modalImage');

    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const title = button.getAttribute('data-title');
            const category = button.getAttribute('data-category');
            const desc = button.getAttribute('data-desc');
            const tools = button.getAttribute('data-tools');
            const imageSrc = button.getAttribute('data-image');

            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modalDesc.textContent = desc;
            modalTools.textContent = tools;
            
            // Set Dynamic Image Source & Alt Text
            if (imageSrc) {
                modalImage.src = imageSrc;
                modalImage.alt = `Pratinjau detail proyek ${title}`;
            } else {
                modalImage.src = '';
                modalImage.alt = 'Pratinjau tidak tersedia';
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 4. Scroll Animation Observer (Fade In Elements on Scroll)
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

//Custom Smooth Cursor Script
        const cursorDot = document.getElementById('cursor-dot');
        const cursorOutline = document.getElementById('cursor-outline');

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        // Smooth trailing animation loop for the outline ring
        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.2;
            outlineY += (mouseY - outlineY) * 0.2;
            
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add interactive hover states for links/buttons
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        const workflowData = {
    1: {
        number: "TAHAP 01",
        title: "Breakdown Brief & Analisis",
        phase: "Fase: Strategi & Riset",
        icon: "📋",
        desc: "Membedah kemauan klien, memahami target audiens, menentukan tujuan utama kampanye, dan merumuskan batasan masalah agar arah proyek jelas sejak awal."
    },
    2: {
        number: "TAHAP 02",
        title: "Riset & Moodboard Visual",
        phase: "Fase: Eksplorasi",
        icon: "🔍",
        desc: "Mencari referensi kompetitor, mengumpulkan tren visual terbaik, menyusun palet warna, tipografi, dan merangkumnya dalam sebuah moodboard yang koheren."
    },
    3: {
        number: "TAHAP 03",
        title: "Eksekusi Desain & Iterasi",
        phase: "Fase: Produksi",
        icon: "✏️",
        desc: "Mulai merancang tata letak, mengolah aset di Figma atau tools desain, menyempurnakan hirarki visual, hingga melakukan penyempurnaan berdasarkan masukan."
    },
    4: {
        number: "TAHAP 04",
        title: "Finalisasi & Publikasi",
        phase: "Fase: Delivery",
        icon: "🚀",
        desc: "Pengecekan akhir resolusi, kesesuaian format aset (siap cetak atau digital), lalu dipublikasikan atau diintegrasikan langsung ke dalam sistem."
    }
};

function switchWorkflowStep(step) {
    const panel = document.getElementById('workflow-content-panel');
    
    // Efek transisi pudar (fade out)
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(8px)';

    setTimeout(() => {
        // Update isi konten panel berdasarkan data step
        const data = workflowData[step];
        document.getElementById('panel-icon').innerText = data.icon;
        document.getElementById('panel-phase').innerText = data.phase;
        document.getElementById('panel-step-number').innerText = data.number;
        document.getElementById('panel-title').innerText = data.title;
        document.getElementById('panel-desc').innerText = data.desc;
        document.getElementById('panel-progress-text').innerText = `Menampilkan tahap ${step} dari 4`;

        // Update styling tombol navigasi di sebelah kiri
        document.querySelectorAll('.workflow-btn').forEach(btn => {
            const btnStep = btn.getAttribute('data-step');
            const badge = btn.querySelector('span:first-child');
            const arrow = btn.querySelector('span:last-child');
            
            if (parseInt(btnStep) === step) {
                btn.className = "workflow-btn group text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between bg-zinc-900 text-white border-zinc-900 shadow-lg scale-[1.02]";
                badge.className = "w-10 h-10 rounded-xl bg-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm";
                arrow.className = "text-primary text-lg group-hover:translate-x-1 transition-transform";
            } else {
                btn.className = "workflow-btn group text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between bg-zinc-50 text-zinc-900 border-zinc-200/80 hover:border-primary/50 hover:bg-zinc-100/60";
                badge.className = "w-10 h-10 rounded-xl bg-zinc-200 text-zinc-700 font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-primary group-hover:text-white";
                arrow.className = "text-zinc-400 text-lg group-hover:translate-x-1 transition-transform";
            }
        });

        // Update indikator titik progress di bagian bawah panel
        document.querySelectorAll('.dot-indicator').forEach((dot, index) => {
            if (index + 1 === step) {
                dot.className = "w-6 h-2 rounded-full bg-primary transition-all duration-300 dot-indicator";
            } else {
                dot.className = "w-2 h-2 rounded-full bg-zinc-300 transition-all duration-300 dot-indicator";
            }
        });

        // Kembalikan efek transisi masuk (fade in)
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
    }, 150);
}

// --- Scroll To Top Script ---
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Pantau posisi scroll window
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        // Munculkan button jika scroll lebih dari 300px
        scrollToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else {
        // Sembunyikan button jika kembali ke atas
        scrollToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
});

// Fungsi untuk kembali ke atas dengan mulus (smooth scroll)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
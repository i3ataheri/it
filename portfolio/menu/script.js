/**
 * Nokhba Digital - Showcase Logic
 * Developer: Abdullah Al-Baloushi
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('menuGrid');
    const searchInput = document.getElementById('searchInput');
    const filterGroup = document.getElementById('filterGroup');

    // ۱. تابع اصلی برای رندر کردن کارت‌ها (ساخت اتوماتیک بر اساس دیتای موجود در data.js)
    function renderCards(data) {
        if (!grid) return;
        
        grid.innerHTML = ''; // پاکسازی گرید برای نمایش نتایج جدید
        
        if (data.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-sub);">
                <i class="fas fa-search" style="font-size: 40px; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>لم يتم العثور على نتائج تطابق بحثك...</p>
            </div>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = `card ${item.category}`;
            
            // تولید تگ‌ها به صورت داینامیک
            const tagsHTML = item.tags.map(t => `<span class="mini-tag">${t}</span>`).join('');

            card.innerHTML = `
                <div class="card-tag-row">${tagsHTML}</div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.desc}</p>
                <a href="javascript:void(0)" class="card-btn" onclick="openMenu('${item.id}')">
                    <i class="fas fa-eye"></i> معاينة التصميم
                </a>
            `;
            grid.appendChild(card);
        });
    }

    // ۲. مدیریت فیلترها و قابلیت اسکرول دکمه به مرکز
    if (filterGroup) {
        filterGroup.addEventListener('click', (e) => {
            const btn = e.target.closest('.f-btn');
            if (!btn) return;

            // تغییر دکمه فعال
            document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // --- قابلیت هوشمند: اسکرول دکمه کلیک شده به مرکز نوار اسکرول ---
            btn.scrollIntoView({
                behavior: 'smooth',
                inline: 'center', // آوردن دکمه به وسط کادر در موبایل
                block: 'nearest'
            });

            // فیلتر کردن داده‌ها
            const cat = btn.dataset.cat;
            const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
            
            renderCards(filtered);

            // اسکرول نرم صفحه به ابتدای گرید منوها
            setTimeout(() => {
                const gridPos = grid.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: gridPos - 150, behavior: 'smooth' });
            }, 300);
        });
    }

    // ۳. سیستم جستجوی زنده (Live Search)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            
            const filtered = projects.filter(p => 
                p.title.toLowerCase().includes(term) || 
                p.desc.toLowerCase().includes(term) ||
                p.tags.some(t => t.toLowerCase().includes(term))
            );
            
            renderCards(filtered);
        });
    }

    // ۴. اجرای اولیه (نمایش تمام پروژه‌ها هنگام لود سایت)
    if (typeof projects !== 'undefined') {
        renderCards(projects);
    } else {
        console.error("Data file (data.js) not found or projects array is missing.");
    }
});

/**
 * توابع مدیریت مودال (خارج از DOMContentLoaded برای دسترسی توسط onclick)
 */
function openMenu(id) {
    const modal = document.getElementById('menuModal');
    const frame = document.getElementById('menuFrame');
    
    if (modal && frame) {
        // تنظیم آدرس فایل منو (فرض بر این است که فایل‌ها در پوشه menu و با فرمت .html هستند)
        frame.src = `menu/${id}.html`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // جلوگیری از اسکرول صفحه زیرین
    }
}

function closeMenu() {
    const modal = document.getElementById('menuModal');
    const frame = document.getElementById('menuFrame');
    
    if (modal && frame) {
        modal.style.display = 'none';
        frame.src = ''; // تخلیه آی‌فریم برای سرعت بیشتر و توقف صدا/ویدیو احتمالی
        document.body.style.overflow = 'auto'; // فعال‌سازی مجدد اسکرول صفحه
    }
}
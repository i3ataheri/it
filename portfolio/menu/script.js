/**
 * Nokhba Digital - Showcase Logic
 * Developer: Abdullah Al-Baloushi
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('menuGrid');
    const searchInput = document.getElementById('searchInput');
    const filterGroup = document.getElementById('filterGroup');

    // ۱. تابع اصلی برای رندر کردن کارت‌ها با نمایش شماره محصول
    function renderCards(data) {
        if (!grid) return;
        
        grid.innerHTML = ''; // پاکسازی گرید
        
        if (data.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-sub);">
                    <i class="fas fa-search" style="font-size: 40px; margin-bottom: 15px; opacity: 0.3;"></i>
                    <p>لم يتم العثور على نتائج تطابق بحثك...</p>
                </div>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = `card ${item.category}`;
            
            // تولید تگ‌ها
            const tagsHTML = item.tags.map(t => `<span class="mini-tag">${t}</span>`).join('');

            // ساختار جدید کارت شامل شماره (بدون هشتگ) کنار عنوان
            card.innerHTML = `
                <div class="card-tag-row">${tagsHTML}</div>
                <div class="card-header-flex">
                    <span class="item-number">${item.id}</span>
                    <h3 class="card-title">${item.title}</h3>
                </div>
                <p class="card-desc">${item.desc}</p>
                <a href="javascript:void(0)" class="card-btn" onclick="openMenu('${item.id}')">
                    <i class="fas fa-eye"></i> معاينة التصميم
                </a>
            `;
            grid.appendChild(card);
        });
    }

    // ۲. مدیریت فیلترها و اسکرول دکمه فعال
    if (filterGroup) {
        filterGroup.addEventListener('click', (e) => {
            const btn = e.target.closest('.f-btn');
            if (!btn) return;

            // تغییر حالت اکتیو دکمه‌ها
            document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // اسکرول هوشمند دکمه به وسط (بسیار مهم برای موبایل)
            btn.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });

            // فیلتر کردن داده‌ها از آرایه پروژه‌ها
            const cat = btn.dataset.cat;
            const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
            
            renderCards(filtered);

            // اسکرول نرم به بخش نمایش کارت‌ها
            setTimeout(() => {
                const gridPos = grid.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: gridPos - 130, behavior: 'smooth' });
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
                p.tags.some(t => t.toLowerCase().includes(term)) ||
                p.id.toString().includes(term) // قابلیت جستجو بر اساس شماره محصول
            );
            
            renderCards(filtered);
        });
    }

    // ۴. اجرای اولیه
    if (typeof projects !== 'undefined') {
        renderCards(projects);
    } else {
        console.error("فایل دیتا (data.js) بارگذاری نشده است.");
    }
});

/**
 * مدیریت مودال نمایش منو
 */
function openMenu(id) {
    const modal = document.getElementById('menuModal');
    const frame = document.getElementById('menuFrame');
    
    if (modal && frame) {
        frame.src = `menu/${id}.html`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // قفل کردن اسکرول صفحه اصلی
    }
}

function closeMenu() {
    const modal = document.getElementById('menuModal');
    const frame = document.getElementById('menuFrame');
    
    if (modal && frame) {
        modal.style.display = 'none';
        frame.src = ''; 
        document.body.style.overflow = 'auto'; // باز کردن اسکرول
    }
}
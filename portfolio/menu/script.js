document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('menuGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    // ۱. تابع رندر کردن کارت‌ها
    function renderCards(data) {
        grid.innerHTML = '';
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = `card ${item.category}`;
            
            // نمایش هشتگ‌ها
            const tagsHTML = item.tags ? item.tags.map(tag => 
                `<span class="card-tag" onclick="filterByTag('${tag.replace('#','')}')">${tag.startsWith('#') ? tag : '#'+tag}</span>`
            ).join('') : '';

            card.innerHTML = `
                <div class="card-title">${item.title}</div>
                <div class="card-desc">${item.desc}</div>
                <div class="card-tags-container">${tagsHTML}</div>
                <div class="card-actions">
                    <button class="btn-view" onclick="openMenu('${item.id}')">
                        <i class="fas fa-eye"></i> معاينة التصميم
                    </button>
                    <button class="btn-share" onclick="shareMenu('${item.id}')">
                        <i class="fas fa-share-nodes"></i>
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // بررسی وجود متغیر پروژه‌ها در data.js
    if (typeof projects !== 'undefined') {
        renderCards(projects);
    }

    // ۲. فیلتر کردن دسته‌بندی‌ها
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-cat');
            const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
            renderCards(filtered);
        });
    });

    // ۳. جستجوی پیشرفته
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = projects.filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.desc.toLowerCase().includes(term) || 
            (p.tags && p.tags.some(t => t.toLowerCase().includes(term)))
        );
        renderCards(filtered);
    });
});

// ۴. تابع باز کردن منو در پاپ‌آپ (اصلاح شده برای پوشه menu)
function openMenu(id) {
    const modal = document.getElementById('menuModal');
    const frame = document.getElementById('menuFrame');
    
    // چون فایل‌ها داخل پوشه menu هستند، مسیر را اینگونه اصلاح کردیم:
    frame.src = `menu/${id}.html`; 
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // جلوگیری از اسکرول صفحه اصلی
}

// ۵. تابع بستن پاپ‌آپ
function closeMenu() {
    const modal = document.getElementById('menuModal');
    const frame = document.getElementById('menuFrame');
    modal.style.display = "none";
    frame.src = ""; // خالی کردن فریم برای توقف بارگذاری
    document.body.style.overflow = "auto";
}

// ۶. بستن با کلیک خارج از پاپ‌آپ
window.onclick = function(event) {
    const modal = document.getElementById('menuModal');
    if (event.target == modal) {
        closeMenu();
    }
}

// ۷. فیلتر با کلیک روی تگ‌ها
function filterByTag(tag) {
    const search = document.getElementById('searchInput');
    search.value = tag;
    search.dispatchEvent(new Event('input'));
    window.scrollTo({ top: search.offsetTop - 100, behavior: 'smooth' });
}

// ۸. کپی کردن لینک و نمایش اعلان
function shareMenu(id) {
    const url = `${window.location.origin}/menu/${id}.html`;
    navigator.clipboard.writeText(url).then(() => {
        const toast = document.getElementById('toast');
        toast.style.opacity = '1';
        toast.style.visibility = 'visible';
        setTimeout(() => { 
            toast.style.opacity = '0'; 
            toast.style.visibility = 'hidden'; 
        }, 2000);
    });
}

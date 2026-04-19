/**
 * Nokhba Digital - Showcase Logic
 * Uses: data.js (projects array)
 */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('menuGrid');
  const searchInput = document.getElementById('searchInput');
  const filterGroup = document.getElementById('filterGroup');

  function renderCards(data) {
    if (!grid) return;

    grid.innerHTML = '';

    if (!data || data.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:50px;color:var(--text-sub);">
          <i class="fas fa-search" style="font-size:40px;margin-bottom:15px;opacity:0.3;"></i>
          <p>لم يتم العثور على نتائج تطابق بحثك...</p>
        </div>`;
      return;
    }

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = `card ${item.category}`;

      const tagsHTML = item.tags
        .map(t => `<span class="mini-tag">${t}</span>`)
        .join('');

      card.innerHTML = `
        <div class="card-tag-row">${tagsHTML}</div>
        <div class="card-header-flex">
          <span class="item-number">${item.id}</span>
          <h3 class="card-title">${item.title}</h3>
        </div>
        <p class="card-desc">${item.desc}</p>
        <div class="card-actions">
          <button class="share-btn" data-id="${item.id}" data-title="${item.title}">
            <i class="fas fa-share-alt"></i>
            <span>مشاركة</span>
          </button>
          <button class="card-btn" data-open="${item.id}">
            <i class="fas fa-eye"></i>
            <span>معاينة التصميم</span>
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    attachCardEvents();
  }

  function attachCardEvents() {
    // preview buttons
    document.querySelectorAll('.card-btn[data-open]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open');
        openMenu(id);
      });
    });

    // share buttons
    document.querySelectorAll('.share-btn[data-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title');
        const url = `${location.origin}${location.pathname.replace(/[^/]*$/, '')}menu/${id}.html`;

        const text = `قالب رقم ${id} - ${title}\n${url}`;

        try {
          if (navigator.share) {
            await navigator.share({
              title: `قالب منيو رقم ${id}`,
              text,
              url
            });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            alert('تم نسخ رابط القالب إلى الحافظة.');
          } else {
            alert(text);
          }
        } catch (e) {
          console.error(e);
        }
      });
    });
  }

  // filters
  if (filterGroup) {
    filterGroup.addEventListener('click', e => {
      const btn = e.target.closest('.f-btn');
      if (!btn) return;

      document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // center clicked filter in horizontal scroll
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });

      const cat = btn.dataset.cat;
      const filtered =
        cat === 'all' ? projects : projects.filter(p => p.category === cat);

      renderCards(filtered);
    });
  }

  // live search
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase().trim();

      const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term) ||
        p.tags.some(t => t.toLowerCase().includes(term)) ||
        p.id.toString().includes(term)
      );

      renderCards(filtered);
    });
  }

  // initial render
  if (typeof projects !== 'undefined') {
    renderCards(projects);
  } else {
    console.error('data.js (projects) not loaded.');
  }
});

/* MODAL */

function openMenu(id) {
  const modal = document.getElementById('menuModal');
  const frame = document.getElementById('menuFrame');

  if (modal && frame) {
    frame.src = `menu/${id}.html`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  const modal = document.getElementById('menuModal');
  const frame = document.getElementById('menuFrame');

  if (modal && frame) {
    modal.style.display = 'none';
    frame.src = '';
    document.body.style.overflow = 'auto';
  }
}

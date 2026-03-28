/**
 * تابع تغییر تم (Toggle Theme)
 * این تابع کلاس data-theme را در بدنه سایت تغییر می‌دهد
 * و آیکون ماه/خورشید را عوض می‌کند.
 */
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    // بررسی وضعیت فعلی تم
    if (body.getAttribute('data-theme') === 'light') {
        // تغییر به حالت تاریک
        body.setAttribute('data-theme', 'dark');
        icon.className = "fas fa-sun"; // نمایش آیکون خورشید
    } else {
        // تغییر به حالت روشن
        body.setAttribute('data-theme', 'light');
        icon.className = "fas fa-moon"; // نمایش آیکون ماه
    }
}

// نکته: اگر بخواهید انتخاب کاربر ذخیره شود، می‌توانید از localStorage استفاده کنید.

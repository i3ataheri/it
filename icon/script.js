const animTitles = [
    { ar: "بوابة النيون", en: "Neon Gate" }, { ar: "الموجة السائلة", en: "Liquid Wave" },
    { ar: "ضربة البرق", en: "Lightning Strike" }, { ar: "انقسام الألوان", en: "Color Split" },
    { ar: "النبض السيبراني", en: "Cyber Pulse" }, { ar: "الظل الطافي", en: "Floating Shadow" },
    { ar: "دوران لا نهائي", en: "Infinite Rotate" }, { ar: "الشبح المموه", en: "Ghost Blur" },
    { ar: "توهج داخلي", en: "Inner Glow" }, { ar: "قلب مرآتي", en: "Mirror Heart" },
    { ar: "إطار مضاعف", en: "Double Border" }, { ar: "قص هندسي", en: "Geometric Clip" },
    { ar: "تنبيه أصفر", en: "Yellow Alert" }, { ar: "عكس الألوان", en: "Invert Mode" },
    { ar: "عمق ثلاثي", en: "3D Depth" }, { ar: "زوايا ناعمة", en: "Smooth Corners" },
    { ar: "دوران المحور", en: "Axis Flip" }, { ar: "توهج الغابة", en: "Forest Glow" },
    { ar: "ظل صلب", en: "Hard Shadow" }, { ar: "دوران كامل", en: "Full Spin" },
    { ar: "انعكاس سيني", en: "X-Axis Flip" }, { ar: "مزج الألوان", en: "Color Dodge" },
    { ar: "انحراف حاد", en: "Sharp Skew" }, { ar: "مكعب فضاء", en: "Space Cube" },
    { ar: "لمسة ذهبية", en: "Gold Touch" }, { ar: "ضوء أبيض", en: "White Shine" },
    { ar: "قص بيضاوي", en: "Ellipse Clip" }, { ar: "تقليص نئون", en: "Neon Shrink" },
    { ar: "خط سفلي", en: "Underline Glow" }, { ar: "مرآة أفقية", en: "Horizontal Mirror" },
    { ar: "مرآة عمودية", en: "Vertical Mirror" }, { ar: "نجمة خضراء", en: "Green Star" },
    { ar: "تمدد علوي", en: "Top Stretch" }, { ar: "تمدد سفلي", en: "Bottom Stretch" },
    { ar: "حدود يسرى", en: "Left Border" }, { ar: "حدود يمنى", en: "Right Border" },
    { ar: "تدرج وردي", en: "Pink Gradient" }, { ar: "تدرج سماوي", en: "Sky Gradient" },
    { ar: "منظور أيمن", en: "Right Perspective" }, { ar: "منظور أيسر", en: "Left Perspective" },
    { ar: "اهتزاز سريع", en: "Fast Shake" }, { ar: "نبض الحلقة", en: "Ring Pulse" },
    { ar: "ظل أحمر", en: "Red Drop" }, { ar: "دوران الأيقونة", en: "Icon Spin" },
    { ar: "خلفية داكنة", en: "Dark Background" }, { ar: "شكل عضوي", en: "Organic Shape" },
    { ar: "قفزة ذكية", en: "Smart Jump" }, { ar: "سداسي الأضلاع", en: "Hexagon Clip" },
    { ar: "توهج ضبابي", en: "Blur Glow" }, { ar: "كرة بيضاء", en: "White Sphere" },
    { ar: "تصغير مائل", en: "Tilt Shrink" }, { ar: "توهج برتقالي", en: "Orange Glow" },
    { ar: "توهج أزرق", en: "Blue Glow" }, { ar: "نبض مزدوج", en: "Double Pulse" },
    { ar: "إطار أبيض", en: "White Frame" }, { ar: "انحراف نئون", en: "Neon Skew" },
    { ar: "سهم سفلي", en: "Bottom Arrow" }, { ar: "دوران غامض", en: "Mystic Flip" },
    { ar: "تأثير الفراشة", en: "Butterfly Effect" }, { ar: "منظور مائل", en: "Skew View" },
    { ar: "خلل بصری", en: "Glitch Effect" }, { ar: "توهج داخلي", en: "Inner Neon" },
    { ar: "خط مزدوج", en: "Double Line" }, { ar: "إطار علوي", en: "Top Frame" },
    { ar: "تشبع لوني", en: "Saturate Mode" }, { ar: "اختفاء تدريجي", en: "Fade Out" },
    { ar: "تكبير فائق", en: "Ultra Zoom" }, { ar: "میلاد حاد", en: "Sharp Tilt" },
    { ar: "دوران متقطع", en: "Dashed Spin" }, { ar: "انعكاس عميق", en: "Deep Flip" },
    { ar: "عكس التوهج", en: "Invert Glow" }, { ar: "سقف مائل", en: "Ceiling Tilt" },
    { ar: "جدار مائل", en: "Wall Tilt" }, { ar: "عدسة مكبرة", en: "Magnify Circle" },
    { ar: "إزاحة خضراء", en: "Green Offset" }, { ar: "إزاحة وردية", en: "Pink Offset" },
    { ar: "ماسة بنفسجية", en: "Purple Diamond" }, { ar: "حلقة زرقاء", en: "Blue Ring" },
    { ar: "انفجار نئون", en: "Neon Blast" }, { ar: "وهج وردي", en: "Pink Glow" },
    { ar: "دوران مائل", en: "Diagonal Spin" }, { ar: "تلاشي كلي", en: "Full Vanish" },
    { ar: "مزج سلبي", en: "Negative Mix" }, { ar: "دوران لوني", en: "Hue Rotate" },
    { ar: "إطار سمیک", en: "Thick Frame" }, { ar: "لمعان ذهبي", en: "Golden Shine" },
    { ar: "تحديد داخلي", en: "Inner Outline" }, { ar: "قبة بنفسجية", en: "Purple Dome" },
    { ar: "ظل الأرض", en: "Floor Shadow" }, { ar: "دوران فائق", en: "Hyper Spin" },
    { ar: "نور الزمرد", en: "Emerald Light" }, { ar: "بوابة زرقاء", en: "Blue Portal" },
    { ar: "بوابة وردية", en: "Pink Portal" }, { ar: "شكل ثماني", en: "Octagon Clip" },
    { ar: "توسع واختفاء", en: "Expand Hide" }, { ar: "حلقة بيضاء", en: "White Ring" },
    { ar: "خروج أيسر", en: "Exit Left" }, { ar: "خروج أيمن", en: "Exit Right" },
    { ar: "تشبع فائق", en: "Super Saturate" }, { ar: "دوامة نهائية", en: "Final Vortex" }
];

const iconSets = [
    ['fab fa-instagram', 'fab fa-facebook-f', 'fab fa-twitter'],
    ['fab fa-snapchat', 'fab fa-tiktok', 'fab fa-youtube'],
    ['fab fa-whatsapp', 'fab fa-telegram', 'fab fa-skype'],
    ['fab fa-google-play', 'fab fa-apple', 'fab fa-amazon'],
    ['fab fa-twitch', 'fab fa-discord', 'fab fa-reddit-alien']
];

function generateIcons() {
    const grid = document.getElementById('iconGrid');
    if(!grid) return;
    
    let htmlContent = '';
    for (let i = 0; i < 100; i++) {
        const num = i + 1;
        const set = iconSets[i % iconSets.length];
        const titleAr = animTitles[i] ? animTitles[i].ar : `تأثير ${num}`;
        const titleEn = animTitles[i] ? animTitles[i].en : `Effect ${num}`;

        htmlContent += `
            <div class="glass-card">
                <div class="card-info">
                    <span class="num">${num}</span>
                    <div class="title-group">
                        <span class="title-ar">${titleAr}</span>
                        <span class="title-en">${titleEn}</span>
                    </div>
                </div>
                <div class="icon-group">
                    <a class="btn-icon anim-${num}"><i class="${set[0]}"></i></a>
                    <a class="btn-icon anim-${num}"><i class="${set[1]}"></i></a>
                    <a class="btn-icon anim-${num}"><i class="${set[2]}"></i></a>
                </div>
            </div>`;
    }
    grid.innerHTML = htmlContent;
}

document.addEventListener('DOMContentLoaded', generateIcons);

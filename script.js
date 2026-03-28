const IMAGES = [
    "https://images.unsplash.com/photo-1551288049-bbbda5366392?w=800", // تحليل البيانات
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", // بور بي اي
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800", // تسويق
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", // تحليل سوق
    "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800", // واجهات
    "https://images.unsplash.com/photo-1551288049-bbbda5366392?w=800"  // داشبورد
];

const NAMES = ["تحليل البيانات", "بور بي اي", "التسويق الرقمي", "تحليل السوق", "تصميم واجهة", "عمل داشبورد"];

// تعبئة الصور في الأوجه
document.querySelectorAll('.face').forEach((face, i) => {
    const img = new Image();
    img.src = IMAGES[i];
    face.appendChild(img);
});

// مصفوفة الزوايا (مهمة جداً لضبط السكول مع المكعب)
const STOPS = [
    { rx: 90, ry: 0 },   // Top
    { rx: 0, ry: 0 },    // Front
    { rx: 0, ry: -90 },  // Right
    { rx: 0, ry: -180 }, // Back
    { rx: 0, ry: -270 }, // Left
    { rx: -90, ry: -360 } // Bottom
];

window.addEventListener('scroll', () => {
    const wrapper = document.getElementById('cube_section_wrapper');
    const cube = document.getElementById('cube');
    const rect = wrapper.getBoundingClientRect();
    
    // حساب النسبة المئوية للسكول داخل القسم
    const totalHeight = rect.height - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));

    // تحديث الواجهة (HUD)
    document.getElementById('prog_fill').style.width = (progress * 100) + "%";
    document.getElementById('hud_pct').innerText = Math.round(progress * 100).toString().padStart(3, '0') + "%";

    // حساب الاندكس الحالي
    const idx = Math.min(5, Math.floor(progress * 6));
    document.getElementById('face_caption_name').innerText = NAMES[idx];
    document.getElementById('scene_name').innerText = NAMES[idx];
    document.getElementById('face_caption_num').innerText = (idx + 1).toString().padStart(2, '0');

    // حركة المكعب السلسة بين النقاط
    const sectionProgress = (progress * 5) - Math.floor(progress * 5);
    const i = Math.min(Math.floor(progress * 5), STOPS.length - 2);
    
    const start = STOPS[i];
    const end = STOPS[i+1];

    const rx = start.rx + (end.rx - start.rx) * sectionProgress;
    const ry = start.ry + (end.ry - start.ry) * sectionProgress;

    cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
});
let activeIndex = 0;
const cards = document.querySelectorAll('.card-container');

function updateCarousel() {
    cards.forEach((card, i) => {
        const offset = i - activeIndex;
        card.style.setProperty('--offset', offset);
        card.style.setProperty('--abs-offset', Math.abs(offset));
        card.style.setProperty('--direction', offset > 0 ? 1 : offset < 0 ? -1 : 0);
        card.style.setProperty('--active', i === activeIndex ? 1 : 0);
    });
}

function moveLeft() {
    if (activeIndex > 0) {
        activeIndex--;
        updateCarousel();
    }
}

function moveRight() {
    if (activeIndex < cards.length - 1) {
        activeIndex++;
        updateCarousel();
    }
}

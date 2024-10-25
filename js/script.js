let slideIndex = 0;
showSlide(slideIndex);
function showSlide(index) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('index-item');
    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    slides[slideIndex].style.display = 'block';
    dots[slideIndex].classList.add('active');
}
function changeSlide(n) {
    showSlide(slideIndex += n);
}
function currentSlide(n) {
    showSlide(slideIndex = n);
}
document.getElementById('btn-left')?.addEventListener('click', () => changeSlide(-1));
document.getElementById('btn-right')?.addEventListener('click', () => changeSlide(1));
const dots = document.getElementsByClassName('index-item');
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
        const index = Number(this.getAttribute('data-index'));
        currentSlide(index);
    });
}
const URL_API = "http://localhost:3000";
const code_1_san_pham = (sp) => {
    return `
    <div class="sp">
        <h3>${sp.name}</h3>
        <img src="${sp.img}" alt="${sp.name}" />
        <p>Giá khuyến mãi:<b> ${Number(sp.gia).toLocaleString("vi-VN")} VNĐ/1kg </b></p>
        <p>Công dụng: ${sp.title}</p>
        <p>Đã bán: ${sp.sold}</p>
        <button class="buy-now-btn">Mua Ngay</button> 
    </div>
    `;
};
export const lay_san_pham = async (so_sp) => {
    let sp_arr;
    sp_arr = await fetch(URL_API + `/san_pham?_sort=-ngay&_limit=${so_sp}`)
        .then(res => res.json())
        .then(data => data);
    let kq = ``;
    sp_arr.forEach(sp => {
        kq += code_1_san_pham(sp);
    });
    return kq;
};
const code_1_binh_luan = (bl) => {
    return `
    <div class="bl">
        <h5>
            ${bl.ho_ten}  
            <br>
            <span>${new Date(bl.ngay).toLocaleDateString("vi")}</span>
        </h5>
        <h6>ID bài viết: ${bl.id_sp}</h6>
        <p>${bl.noi_dung}</p>
    </div>`;
};
export const lay_binh_luan = async (so_bl = 6) => {
    let url = URL_API + `/binh_luan?_sort=-ngay&_limit=${so_bl}`;
    let bl_arr;
    bl_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    bl_arr.forEach(bl => str += code_1_binh_luan(bl));
    return str;
};
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const popupModal = document.getElementById("popup-modal");
    const closeBtn = document.getElementById("close-btn");
    const overlay = document.getElementById("overlay");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (popupModal && overlay) {
                popupModal.classList.remove("hidden");
                popupModal.classList.add("show");
                overlay.classList.remove("hidden");
                overlay.classList.add("show");
            }
            form.reset();
        });
    }
    if (closeBtn && popupModal && overlay) {
        closeBtn.addEventListener("click", () => {
            popupModal.classList.remove("show");
            popupModal.classList.add("hidden");
            overlay.classList.remove("show");
            overlay.classList.add("hidden");
        });
    }
    if (overlay) {
        overlay.addEventListener("click", () => {
            popupModal?.classList.remove("show");
            popupModal?.classList.add("hidden");
            overlay.classList.remove("show");
            overlay.classList.add("hidden");
        });
    }
});

//Khai báo biến slideIndex
let slideIndex: number = 0;
showSlide(slideIndex);

//Hiển thị slide tại chỉ số index đã cho.
function showSlide(index: number): void {
    const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName('index-item') as HTMLCollectionOf<HTMLElement>;

//Hiển thị slide tại chỉ số index đã cho.
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

// Thay đổi slide sang slide tiếp theo hoặc trước đó.
function changeSlide(n: number): void {
    showSlide(slideIndex += n);
}

//Hàm này được gọi để chuyển trực tiếp đến slide có chỉ số n.
function currentSlide(n: number): void {
    showSlide(slideIndex = n);
}

// Xử lý sự kiện cho các nút trái phải
document.getElementById('btn-left')?.addEventListener('click', () => changeSlide(-1));
document.getElementById('btn-right')?.addEventListener('click', () => changeSlide(1));

// Xử lý sự kiện cho các chỉ số (dots)
const dots = document.getElementsByClassName('index-item');
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
        const index = Number((dots[i] as HTMLElement).getAttribute('data-index'));
        currentSlide(index);
    });
}

const URL_API = "http://localhost:3000";
type TSanPham = {
    id: number,
    name: string,
    gia: number,
    title: string,  
    sold: number,
    img: string
}

interface IBinh_Luan{
    id:number; 
    id_sp:number; 
    noi_dung:string;
    ngay:string; 
    ho_ten:string
}




const code_1_san_pham = (sp: TSanPham) => {
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


export const lay_san_pham = async(so_sp) => {
    let sp_arr: TSanPham[];
    sp_arr = await fetch(URL_API + `/san_pham?_sort=-ngay&_limit=${so_sp}`) 
    .then (res =>  res.json())
    .then (data => data)
    let kq=``;
    sp_arr.forEach( sp =>{
        kq+= code_1_san_pham(sp);
    })
    return kq;
}

const code_1_binh_luan = (bl: IBinh_Luan) => {
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


export const lay_binh_luan = async (so_bl=6) => {
    let url = URL_API + `/binh_luan?_sort=-ngay&_limit=${so_bl}`;
    let bl_arr:IBinh_Luan[];
    bl_arr = await fetch(url).then( res => res.json()).then ( d => d);
    let str=``;
    bl_arr.forEach ( bl => str+=code_1_binh_luan(bl))
        
    return str;
}

// API TIN TỨC
interface ITin_Tuc {
    id: number;
    tieude: string;
    noi_dung_tt: string;
    ngay_dang: string;
}



const code_tin_tuc = (tt: ITin_Tuc) => {
    return `<div class="tt">
        <h5> ${tt.tieude}  
            <br>
            <p>Ngày đăng: <span>${new Date(tt.ngay_dang).toLocaleDateString("vi")}</span> </p> 
        </h5>
        <h6>Nội dung: ${tt.noi_dung_tt}</h6>
    </div>`;
};


export const lay_tin_tuc = async (so_tt) => {
    let url = URL_API + `/tin_tuc?_sort=-ngay_dang&_limit=${so_tt}`;
    let tt_arr: ITin_Tuc[];
    tt_arr = await fetch(url).then(res => res.json()).then(d => d);
    let str = ``;
    tt_arr.forEach(tt => str += code_tin_tuc(tt));
        
    return str;
};


// Lắng nghe sự kiện khi form được submit
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

    // Đóng popup và overlay khi nhấn nút "Đóng"
    if (closeBtn && popupModal && overlay) {
        closeBtn.addEventListener("click", () => {
            popupModal.classList.remove("show");
            popupModal.classList.add("hidden");
            overlay.classList.remove("show");
            overlay.classList.add("hidden");
        });
    }

    // Đóng popup và overlay khi nhấn vào overlay
    if (overlay) {
        overlay.addEventListener("click", () => {
            popupModal?.classList.remove("show");
            popupModal?.classList.add("hidden");
            overlay.classList.remove("show");
            overlay.classList.add("hidden");
        });
    }
});

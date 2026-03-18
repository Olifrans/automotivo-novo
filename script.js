
// --- DADOS DOS VEÍCULOS ---
const vehicles = [
    { id: 1, name: "Honda Civic Sedan", year: 2022, price: 155000, km: "12.000", brand: "Honda", img: "https://images.unsplash.com/photo-1606148383350-0834316a75f1?auto=format&fit=crop&w=600&q=80", desc: "Teto solar, revisado, estado de novo." },
    { id: 2, name: "Toyota Corolla Altis", year: 2023, price: 178000, km: "5.000", brand: "Toyota", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80", desc: "Híbrido, pacote premium de tecnologia." },
    { id: 3, name: "Chevrolet Onix Turbo", year: 2021, price: 82000, km: "30.000", brand: "Chevrolet", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80", desc: "Econômico, MyLink e sensor de estacionamento." },
    { id: 4, name: "Hyundai HB20 Platinum", year: 2023, price: 95000, km: "0", brand: "Hyundai", img: "https://images.unsplash.com/photo-1620612471131-775f0a027964?auto=format&fit=crop&w=600&q=80", desc: "Zero KM, pronta entrega." },
    { id: 5, name: "Jeep Compass Limited", year: 2021, price: 165000, km: "45.000", brand: "Jeep", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80", desc: "Diesel 4x4, som Beats e bancos em couro." },
    { id: 6, name: "Toyota Hilux SRX", year: 2022, price: 290000, km: "22.000", brand: "Toyota", img: "https://images.unsplash.com/photo-1620023646545-2007419f7125?auto=format&fit=crop&w=600&q=80", desc: "Picape robusta com o maior valor de revenda." },
    { id: 7, name: "BMW 320i M-Sport", year: 2023, price: 340000, km: "2.500", brand: "BMW", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80", desc: "Desempenho esportivo e luxo absoluto." },
    { id: 8, name: "VW Gol Last Edition", year: 2023, price: 110000, km: "0", brand: "VW", img: "https://images.unsplash.com/photo-1602491291176-66380a1f0a9f?auto=format&fit=crop&w=600&q=80", desc: "Edição limitada de colecionador." }
];

// --- LÓGICA DE EXIBIÇÃO ---
function displayCars(data) {
    const container = document.getElementById('carCatalog');
    container.innerHTML = data.length ? '' : '<p>Nenhum veículo encontrado.</p>';
    data.forEach(car => {
        container.innerHTML += `
                    <div class="card">
                        <img src="${car.img}" class="card-img">
                        <div class="card-body">
                            <h3>${car.name}</h3>
                            <p>${car.brand} | ${car.year}</p>
                            <p class="card-price">R$ ${car.price.toLocaleString('pt-BR')}</p>
                            <div class="card-actions">
                                <button class="btn btn-primary" style="font-size:0.7rem" onclick="openDetails(${car.id})">VER MAIS</button>
                                <button class="btn" style="background:#555; color:white; font-size:0.7rem" onclick="buyCar('${car.name}')">INTERESSE</button>
                            </div>
                        </div>
                    </div>
                `;
    });
}

// --- FILTROS ---
function filterCars() {
    const name = document.getElementById('searchName').value.toLowerCase();
    const year = document.getElementById('filterYear').value;
    const price = document.getElementById('filterPrice').value;

    const filtered = vehicles.filter(car => {
        return car.name.toLowerCase().includes(name) &&
            (!year || car.year >= year) &&
            (!price || car.price <= price);
    });
    displayCars(filtered);
}

// --- CHATBOT ---
let chatStep = 1;
let userData = { nome: '', carro: '' };

function toggleChat() {
    const win = document.getElementById('chat-window');
    win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
}

function sendBotMsg() {
    const input = document.getElementById('chatInput');
    const val = input.value.trim();
    if (!val) return;

    addMsg(val, 'user');
    input.value = '';

    setTimeout(() => {
        if (chatStep === 1) {
            userData.nome = val;
            addMsg(`Prazer ${val}! Qual carro do site você mais gostou?`, 'bot');
            chatStep = 2;
        } else {
            userData.carro = val;
            addMsg(`Excelente escolha! Vou te levar agora para o WhatsApp para falar com um consultor.`, 'bot');
            setTimeout(() => {
                const zapUrl = `https://wa.me/5511939592955?text=${encodeURIComponent('Olá, meu nome é ' + userData.nome + '. Tenho interesse no veículo: ' + userData.carro)}`;
                window.open(zapUrl, '_blank');
            }, 1500);
        }
    }, 800);
}

function addMsg(text, type) {
    const cont = document.getElementById('chatContent');
    cont.innerHTML += `<div class="message ${type}-msg">${text}</div>`;
    cont.scrollTop = cont.scrollHeight;
}

// --- UI GERAL ---
function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

function openDetails(id) {
    const car = vehicles.find(c => c.id === id);
    document.getElementById('modalData').innerHTML = `
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap:20px;">
                    <img src="${car.img}" style="width:100%; border-radius:10px;">
                    <div>
                        <h2>${car.name}</h2>
                        <p class="card-price">R$ ${car.price.toLocaleString('pt-BR')}</p>
                        <p><strong>Ano:</strong> ${car.year} | <strong>KM:</strong> ${car.km}</p>
                        <p style="margin-top:20px; color:#ccc;">${car.desc}</p>
                        <button class="btn btn-primary" style="width:100%; margin-top:20px;" onclick="buyCar('${car.name}')">SOLICITAR ATENDIMENTO</button>
                    </div>
                </div>
            `;
    document.getElementById('modalDetails').style.display = 'flex';
}

function closeModal() { document.getElementById('modalDetails').style.display = 'none'; }

function buyCar(name) {
    document.getElementById('interestVehicle').value = name;
    window.location.href = "#contato";
    closeModal();
}

function handleForm(e) {
    e.preventDefault();
    alert("Sucesso! Sua proposta foi registrada. O consultor entrará em contato.");
    e.target.reset();
}

// SLIDER AUTO
let cur = 0;
setInterval(() => {
    const slides = document.querySelectorAll('.slide');
    slides[cur].classList.remove('active');
    cur = (cur + 1) % slides.length;
    slides[cur].classList.add('active');
}, 4000);

window.onload = () => displayCars(vehicles);
window.onclick = (e) => { if (e.target.className === 'modal') closeModal(); }

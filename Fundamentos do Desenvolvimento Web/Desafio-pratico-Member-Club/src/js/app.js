class ClientProfile {
	constructor(clientId) {
		this.clientId = clientId;
		this.user = null;
	}

	async fetchUserData() {
		try {
			const response = await fetch(`http://localhost:3000/clients/${this.clientId}`);
			if (!response.ok) throw new Error('ID não encontrado!');

			this.user = await response.json();
		} catch (error) {
			alert(error.message);
			document.getElementById('id').value = '';
		}
	}

	renderProfile() {
		if (!this.user) return;

		document.getElementById('username').textContent = `${this.user.name}`;
		document.getElementById('clientSince').textContent = `Cliente desde ${this.user.clientSince}`;
		document.getElementById('profile-pic-id').innerHTML = `<img src="${this.user.profilePic}" alt="Profile Image">`;
		document.getElementById('history-header').innerHTML = `<p>Histórico</p> <p>${this.user.loyaltyCard.totalCuts} cortes</p>`;
		document.getElementById('card-header-id-span').textContent = `ID: ${this.user.id}`;
		this.renderAppointmentHistory();
		this.renderLoyaltyCard();
		this.renderProgressBar();

		if (this.user.loyaltyCard.totalCuts === 10) alert('Parabéns! Seu próximo corte é gratuito!');
	}

	renderAppointmentHistory() {
		const cutsContainer = document.getElementById('cuts');
		cutsContainer.innerHTML = '';
		this.user.appointmentHistory.forEach((cut) => {
			cutsContainer.innerHTML += `
          <div class="corte">
            <div class="corte-date">
              <p>${cut.date}</p>
              <p>${cut.time}</p>
            </div>
            <div class="corte-icon">
              <i class="ph ph-seal-check"></i>
            </div>
          </div>`;
		});
	}

	renderLoyaltyCard() {
		const cardContent = document.getElementById('card-content');
		cardContent.innerHTML = '';

		for (let i = 0; i < (this.user.loyaltyCard.totalCuts >= this.user.loyaltyCard.cutsNeeded ? this.user.loyaltyCard.totalCuts - 1 : this.user.loyaltyCard.totalCuts); i++) {
			cardContent.innerHTML += `<div class="card-content-corte"><img src="./assets/PinCheck.png" alt="Pin-Check-image"></div>`;
		}

		for (let i = 0; i < this.user.loyaltyCard.cutsRemaining - 1; i++) {
			cardContent.innerHTML += `<div class="card-content-corte"></div>`;
		}

		if (this.user.loyaltyCard.totalCuts === 10) {
			cardContent.innerHTML += `<div class="card-content-corte"><img src="./assets/PinGift.png" alt="Gift-image"></div>`;
		} else {
			cardContent.innerHTML += `<div class="card-content-corte"><i class="ph-fill ph-gift"></i></div>`;
		}
	}

	renderProgressBar() {
		const progressItems = document.getElementById('progress-items');
		progressItems.innerHTML = `
        <span>${this.user.loyaltyCard.cutsRemaining} cortes restantes</span>
        <div class="progress-footer">
          <div class="progress-bar">
            <div class="total-progress" style="width: ${this.user.loyaltyCard.totalCuts * 10}%;"></div>
          </div>
          <span>${this.user.loyaltyCard.totalCuts} de ${this.user.loyaltyCard.cutsNeeded}</span>
        </div>`;
	}
}

async function loadClientProfile(clientId) {
	const clientProfile = new ClientProfile(clientId);
	await clientProfile.fetchUserData();
	clientProfile.renderProfile();
}
window.addEventListener('load', () => loadClientProfile('124-537-835-230'));

document.getElementById('id').addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		searchUserById();
	}
});

async function searchUserById() {
	const id = document.getElementById('id').value;
	if (id) {
		await loadClientProfile(id);
	}
}

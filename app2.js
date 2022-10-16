// ================= VARIABLES ================= \\

const cellTotalHT = document.getElementById('totalHT');
const cellTotalMarge = document.getElementById('marge');
const cellTotalTTC = document.getElementById('totalTTC');
const cellTVA = document.getElementById('TVA');
const allMarque = document.querySelectorAll('.marque-container');
const allInputQuantite = document.querySelectorAll('.inputQuantite');
const allProduits = document.querySelectorAll('.ligne');

let allTotalMarque = [];
let allTotalMargeMarque = [];

let totalHT = 0;
let totalMarge = 0;
let TVA;
let totalTTC;


// TODO
// empêcher le fait d'entrer manuellement des valeurs négatives
// gérer l'ajout manuelle de lignes de produits





// ================= INIT ================= \\

function init() {
    console.log('start');

    addEvent();

    console.log('end');
}







// ================= FUNCTIONS ================= \\

function addEvent() {
    for (const produit of allProduits) {
        const boutonPlus = produit.querySelector('.buttonPlus');
        const boutonMoins = produit.querySelector('.buttonMoins');
        const quantite = produit.querySelector('.inputQuantite');
        
        
        boutonPlus.onclick = () => {
            quantite.value ++;
            updateCalculAfterChangeValue();
        }
        
        boutonMoins.onclick = () => {
            if (quantite.value > 0) {
                quantite.value --;
                updateCalculAfterChangeValue();
            }
        }

        quantite.addEventListener('input', updateCalculAfterChangeValue);
    }
}


function updateCalculAfterChangeValue() {
    calculDuTotalParMarque();
    calculTotal();
    displayTable();
}


function calculDuTotalParMarque() {
    allTotalMarque = [];
    allTotalMargeMarque = [];
    for (const marque of allMarque) {
        
        const allTotalLigneInMarque = [];
        const allTotalMargeLigneInMarque = [];

        calculLignes(marque, allTotalLigneInMarque, allTotalMargeLigneInMarque);
        totalMarque(marque, allTotalLigneInMarque);
        totalMargeMarque(allTotalMargeLigneInMarque);
    }
}


function calculLignes(marque, allTotalLigneInMarque, allTotalMargeLigneInMarque) {
    const allProduitsMarque = marque.querySelectorAll('.ligne');
    for (let i = 0 ; i < allProduitsMarque.length; i++) {
        const row = allProduitsMarque[i];
        const prixVente = parseFloat(row.querySelector('.prixVente').textContent);
        const prixAchat = parseFloat(row.querySelector('.prixAchat').textContent);
        const quantite = row.querySelector('.inputQuantite').value;
        const cellTotalLigne = row.querySelector('.totalLigne');

        const totalLigne = prixVente * quantite;
        const margeLigne = (prixVente - prixAchat) * quantite;

        cellTotalLigne.textContent = `${totalLigne.toFixed(2)} €`;
        allTotalLigneInMarque.push(totalLigne);
        allTotalMargeLigneInMarque.push(margeLigne);
    }
}


function totalMarque(marque, allTotalLigneInMarque) {
    let totalMarque = 0;
    const celltotalMarque = marque.querySelector('.totalMarque');
    
    for (let i = 0 ; i < allTotalLigneInMarque.length; i++) {
        totalMarque += allTotalLigneInMarque[i];
    }
    
    celltotalMarque.textContent = `${totalMarque.toFixed(2)} €`;
    allTotalMarque.push(totalMarque);
}


function totalMargeMarque(allTotalMargeLigneInMarque) {
    let totalMargeMarque = 0;
    
    for (let i = 0 ; i < allTotalMargeLigneInMarque.length; i++) {
        totalMargeMarque += parseFloat(allTotalMargeLigneInMarque[i]);
    }

    allTotalMargeMarque.push(totalMargeMarque);
}


function calculTotal() {
    totalHT = 0;
    totalMarge = 0;
    for (let i = 0 ; i < allTotalMarque.length; i++) {
        totalHT += allTotalMarque[i];
    }
    for (let i = 0 ; i < allTotalMargeMarque.length; i++) {
        totalMarge += allTotalMargeMarque[i];
    }
    TVA = totalHT * 0.2;
    totalTTC = totalHT + TVA;
}


function displayTable () {
    cellTotalHT.textContent = totalHT.toFixed(2);
    cellTotalMarge.textContent = totalMarge.toFixed(2);
    cellTVA.textContent = TVA.toFixed(2);
    cellTotalTTC.textContent = totalTTC.toFixed(2);
}






// ================= START ================= \\
init();
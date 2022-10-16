
function init() {
    console.log('start');

    let rows = document.querySelectorAll('.ligne');
    for (let row of rows) {
        addEvent(row);
    }

    console.log('end');
}


function addEvent(row) {
    let buttonPlus = row.querySelector('.buttonPlus');
    let buttonMoins = row.querySelector('.buttonMoins');
    let quantityInput = row.querySelector('.inputQuantite');
    buttonPlus.onclick = function(){
        // console.log(row);
        quantityInput.value++;
        let quantity = quantityInput.value;
        calculLigne(row, quantity);
    }
    buttonMoins.onclick = function(){
        if (quantityInput.value > 0) {
            quantityInput.value--;
            let quantity = quantityInput.value;
            calculLigne(row, quantity);
        }
    }
    quantityInput.onchange = function() {
        let quantity = quantityInput.value;
        calculLigne(row, quantity);
    }
}


function calculLigne(row, quantity) {
    let blockPrixUnitaireTTC = row.querySelector('.prixVente');
    let prixUnitaireTTC;
    let prixUnitaireAchat;

    if (row.querySelector('.prixVenteManuel')){
        let inputPrixUnitaireTTC = row.querySelector('.prixVenteManuel');
        prixUnitaireTTC = inputPrixUnitaireTTC.value;

        let inputPrixUnitaireAchat = row.querySelector('.prixAchatManuel');
        prixUnitaireAchat = inputPrixUnitaireAchat.value;
    }else{
        let prixUnitaireTTCAvecEuro = blockPrixUnitaireTTC.textContent;
        prixUnitaireTTC = prixUnitaireTTCAvecEuro.substring(0, prixUnitaireTTCAvecEuro.indexOf(' '));
        
        let blockPrixUnitaireAchat = row.querySelector('.prixAchat');
        let prixUnitaireAchatAvecEuro = blockPrixUnitaireAchat.textContent;
        prixUnitaireAchat = prixUnitaireAchatAvecEuro.substring(0, prixUnitaireTTCAvecEuro.indexOf(' '));
    }

    let totalLigne = quantity * prixUnitaireTTC;
    let margeLigne = (prixUnitaireTTC - prixUnitaireAchat) * quantity;
    
    let totalLigneContainer = row.querySelector('.totalLigne');
    totalLigneContainer.textContent = totalLigne.toFixed(2);
    
    let margeLigneContainer = row.querySelector('.margeLigne');
    margeLigneContainer.textContent = margeLigne.toFixed(2);
    
    
    calculTotalParMarque();
}


function calculTotalParMarque() {
    let arrayMarques = document.querySelectorAll('.marque-container');
    
    for (let marque of arrayMarques) {
        let totalMarque = 0;
        let margeMarque = 0;

        let arrayTotalLignes = marque.querySelectorAll('.totalLigne');
        for (let total of arrayTotalLignes) {
            totalMarque += parseFloat(total.textContent);
        }
        let totalMarqueContainer = marque.querySelector('.totalMarque');
        totalMarqueContainer.textContent = totalMarque.toFixed(2);

        let arrayTotalMargeLignes = marque.querySelectorAll('.margeLigne');
        for (let marge of arrayTotalMargeLignes) {
            margeMarque += parseFloat(marge.textContent);
        }
        let totalMargeMarqueContainer = marque.querySelector('.margeMarque');
        totalMargeMarqueContainer.textContent = margeMarque.toFixed(2);
    }
    calculTotal();
}


function calculTotal(){
    let totalTTC = 0;
    let totalHT = 0;
    let pourcentageTVA = 20;
    let TVA = 0;
    let totalMarge = 0;
    
    let arrayTotalMarque = document.querySelectorAll('.totalMarque');
    for (let total of arrayTotalMarque) {
        totalTTC += parseFloat(total.textContent);
    }
    document.getElementById('totalTTC').textContent = totalTTC.toFixed(2);
    
    let arrayTotalMargeMarque = document.querySelectorAll('.margeMarque');
    for (let marge of arrayTotalMargeMarque) {
        totalMarge += parseFloat(marge.textContent);
    }
    document.getElementById('marge').textContent = totalMarge.toFixed(2);
    
    totalHT = totalTTC / (1 + pourcentageTVA/100);
    document.getElementById('totalHT').textContent = totalHT.toFixed(2);
    
    TVA = totalHT * pourcentageTVA/100;
    document.getElementById('TVA').textContent = TVA.toFixed(2);
}



init();

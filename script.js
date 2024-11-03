function generateUniqueID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';
    for (let i = 0; i < 10; i++) {
        uniqueID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uniqueID;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const authorizedIDs = ['id1', 'id2', 'id3']; // Liste des identifiants autorisés

// Vérifier si un cookie contenant l'identifiant existe déjà
let uniqueID = getCookie('uniqueID');
if (!uniqueID) {
    // Si le cookie n'existe pas, générer un nouvel identifiant et le stocker dans un cookie
    uniqueID = generateUniqueID();
    setCookie('uniqueID', uniqueID, 30); // Le cookie expire dans 30 jours
}

// Afficher l'identifiant unique dans le champ de saisie
document.getElementById('uniqueIDInput').value = uniqueID;

    // Ajouter un événement pour basculer la visibilité de l'identifiant
    document.getElementById('toggleIDVisibility').onclick = function() {
        const input = document.getElementById('uniqueIDInput');
        const icon = document.getElementById('toggleIDVisibility').querySelector('svg');
        if (input.type === 'password') {
            input.type = 'text';
            icon.innerHTML = '<path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"></path>';
        } else {
            input.type = 'password';
            icon.innerHTML = '<path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>';
        }
    }

    document.getElementById('copyIDButton').onclick = function() {
        // Récupère la valeur de l'input
        const textToCopy = document.getElementById('uniqueIDInput').value;
        
        // Crée un textarea temporaire pour copier le texte
        const tempTextarea = document.createElement("textarea");
        tempTextarea.style.position = "absolute";
        tempTextarea.style.left = "-9999px";
        tempTextarea.value = textToCopy; // Définit la valeur du textarea temporaire
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
    
        // Essaye de copier le texte sélectionné
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                console.log("Texte copié avec succès !");
                showSuccessMessage(); // Affiche le message de succès
            } else {
                console.error("Échec de la copie.");
                alert("Impossible de copier le texte.");
            }
        } catch (err) {
            console.error("Erreur lors de la copie : ", err);
            alert("Impossible de copier le texte.");
        }
    
        // Supprime le textarea temporaire après la tentative de copie
        document.body.removeChild(tempTextarea);
    };
    
    
    function showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'flex'; // Display the success message
        successMessage.classList.add('show'); // Add the show animation class
    
        // Automatically fade out the message after 2 seconds
        setTimeout(() => {
            successMessage.classList.add('fade-out');
        }, 2000);
    
        // Hide completely after the fade-out animation ends
        setTimeout(() => {
            successMessage.classList.remove('show', 'fade-out');
            successMessage.style.display = 'none'; // Hide the element
        }, 2400);
    }   

document.getElementById('premiumButton').onclick = function() {
    if (authorizedIDs.includes(uniqueID)) {
        messageBox.style.display = 'block';
        overlay.style.display = 'block';
        container.classList.add('blurred'); // Appliquer l'effet de flou au nouveau conteneur
        document.body.classList.add('no-scroll'); // Désactiver le défilement
    } else {
        alert('Accès refusé : vous n\'êtes pas autorisé à accéder à cette section.');
    }
};


async function loadFonts() {
    const fontRegular = new FontFace('PayPalOpenTT', 'url(fonts/PayPalOpenTT-Regular.woff)');
    const fontMedium = new FontFace('PayPalOpenTTMedium', 'url(fonts/PayPalOpenTT-Medium.woff)');
    const fontHeavy = new FontFace ('FontsFree-Net-SFProDisplay-Heavy', 'url(fonts/FontsFree-Net-SFProDisplay-Heavy.woff)');

    await fontRegular.load();
    await fontMedium.load();
    await fontHeavy.load();

    document.fonts.add(fontRegular);
    document.fonts.add(fontMedium);
    document.fonts.add(fontHeavy);

    // Charger les icônes
    const iconImage = new Image();
    iconImage.crossOrigin = 'anonymous';
    iconImage.src = 'https://i.imgur.com/b0PrMyJ.png'; // Vérifiez le chemin ici

    const secondIcon = new Image();
    secondIcon.crossOrigin = 'anonymous';
    secondIcon.src = 'https://i.imgur.com/IRr3aJw.png';
    

    await Promise.all([
        new Promise((resolve, reject) => {
            iconImage.onload = resolve;
            iconImage.onerror = () => reject(new Error("Erreur lors du chargement de l'image des icônes."));
        }),
        new Promise((resolve, reject) => {
            secondIcon.onload = resolve;
            secondIcon.onerror = () => reject(new Error("Erreur lors du chargement de la deuxième icône."));
        })
    ]);

    console.log("Images des icônes chargées");
    return { iconImage, secondIcon };
}


function getSelectedCurrencySymbol() {
    const currencySelect = document.getElementById("currency");
    const selectedOption = currencySelect.options[currencySelect.selectedIndex].value;
    let currencySymbol = "€"; // Valeur par défaut (EUR)

    // Définir le symbole en fonction de la devise
    switch (selectedOption) {
        case "USD":
            currencySymbol = "$";
            break;
        case "GBP":
            currencySymbol = "£";
            break;
        case "CAD":
            currencySymbol = "$";
            break;
        case "EUR":
        default:
            currencySymbol = "€";
            break;
    }
    return currencySymbol;
}

async function generateImage({ iconImage, secondIcon }) {
    const email = document.getElementById('email').value;
    const money = document.getElementById('money').value;

    if (!email || !money) {
        alert('Veuillez entrer une adresse e-mail et un montant.');
        return;
    }
    console.log(`Email: ${email}, Montant: ${money}`); 

    // Récupérer l'heure actuelle
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;

    const scaleFactor = 2;
    const canvas = document.getElementById('canvas');
    
    const container = document.getElementById('container');
    const downloadLink = document.getElementById('downloadLink');
    const currencySymbol = getSelectedCurrencySymbol();
    const downloadButton = document.getElementById('downloadButton');
    const premiumButton = document.getElementById('premiumButton');
    const messageBox = document.getElementById('messageBox');
    const overlay = document.getElementById('overlay');
    const closeIcon = document.querySelector('.close-icon');
    const ctx = canvas.getContext('2d');
    canvas.width = 390 * scaleFactor;
    canvas.height = 844 * scaleFactor;
    const margin = 20; // Marge
    const lineHeight = 30;

    premiumButton.onclick = function() {
        messageBox.style.display = 'block';
        overlay.style.display = 'block';
        container.classList.add('blurred'); // Appliquer l'effet de flou au nouveau conteneur
        document.body.classList.add('no-scroll'); // Désactiver le défilement
    };
    
    closeIcon.onclick = function() {
        messageBox.style.display = 'none';
        overlay.style.display = 'none';
        container.classList.remove('blurred'); // Retirer l'effet de flou du nouveau conteneur
        document.body.classList.remove('no-scroll'); // Réactiver le défilement
    };      

    const borderWidth = 4 * scaleFactor; // Épaisseur de la bordure
    ctx.fillStyle = '#d3d3d3'; // Couleur de la bordure
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Dessiner la bordure

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    ctx.font = `${15.5 * scaleFactor}px 'FontsFree-Net-SFProDisplay-Heavy'`; // Utiliser la police Medium
    ctx.textAlign = 'left';
    ctx.fillText(time, 25 * scaleFactor, 34 * scaleFactor);

    const iconX = canvas.width - iconImage.width - 10 * scaleFactor; // Position x à droite
    const iconY = 20 * scaleFactor; // Position y en haut
    ctx.drawImage(iconImage, iconX, iconY);

    const secondIconX = (canvas.width - secondIcon.width) / 2;
    const secondIconY = canvas.height - secondIcon.height - 10 * scaleFactor; // En bas
    ctx.drawImage(secondIcon, secondIconX, secondIconY);

    ctx.fillStyle = '#010101';
    ctx.font = `normal ${25 * scaleFactor}px 'PayPalOpenTT'`; // Utiliser la police Bold
    ctx.textAlign = 'center';
    ctx.fillText(`Vous avez envoyé ${money} ${currencySymbol} à`, (canvas.width / 2), (285 + margin) * scaleFactor);

    ctx.font = `normal ${25 * scaleFactor}px 'PayPalOpenTT'`; // Utiliser la police Bold
    ctx.fillText(email, canvas.width / 2, 340 * scaleFactor);

    ctx.font = `normal ${12.5 * scaleFactor}px 'PayPalOpenTT'`; // Utiliser la police Regular
    ctx.fillStyle = '#010101';
    ctx.fillText(
        `Nous allons immédiatement informer ${email}`,
        canvas.width / 2,
        400 * scaleFactor
    );
    ctx.fillText(
        "que vous lui avez envoyé de l'argent. Les détails seront",
        canvas.width / 2,
        415 * scaleFactor
    );
    ctx.fillText(
        "disponibles dans votre Activité.",
        canvas.width / 2,
        430 * scaleFactor
    );

// Bouton "Done"
ctx.fillStyle = '#0651b5';
const buttonWidth = 158 * scaleFactor; // Largeur plus petite
const buttonHeight = 50 * scaleFactor; // Hauteur plus petite
const buttonX = (canvas.width / 2) - (buttonWidth / 2);
const buttonY = 700 * scaleFactor;

ctx.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 30 * scaleFactor);
ctx.fill();

// Texte "Done" sur le bouton
ctx.fillStyle = '#FFFFFF';
ctx.font = `normal ${14.9 * scaleFactor}px 'PayPalOpenTT'`; // Taille de texte ajustée
ctx.fillText("Terminé", canvas.width / 2, buttonY + (buttonHeight / 2) + 5.5 * scaleFactor);

const textY = buttonY + buttonHeight + 39 * scaleFactor; // Ajoutez un espacement de 10 pixels

// Dessiner le texte "Nouvel envoi" après le bouton
ctx.fillStyle = '#0550b1';
ctx.font = `normal ${14.9 * scaleFactor}px 'PayPalOpenTT'`; // Utiliser la police
ctx.textAlign = 'center';
ctx.fillText(`Nouvel envoi`, canvas.width / 2, textY);

canvas.style.display = 'flex';
downloadButton.onclick = function() {
    downloadLink.href = canvas.toDataURL('image/png'); // Cela devrait fonctionner maintenant

    // Spécifier le nom du fichier téléchargé
    downloadLink.download = 'IMG_0528.png';

    // Déclencher le téléchargement
    downloadLink.click();
};

downloadButton.style.display = 'flex'; // Affiche le bouton de téléchargement
premiumButton.style.display = 'block';
}


async function startGeneration() {
    // Charger les polices et les images des icônes avant de générer l'image
    const { iconImage, secondIcon } = await loadFonts();
    
    // Génère l'image avec les icônes chargées
    await generateImage({ iconImage, secondIcon });
    
    // Attendre la génération et défiler vers l'image générée
    if (canvas) {
        canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}


// Méthode pour dessiner des rectangles arrondis
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
};


const themeSwitcher = document.getElementById('themeSwitcher');
const themeImage = document.getElementById('themeImage');

// Vérifier le stockage local pour voir si un thème est déjà sélectionné
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeSwitcher.checked = true; // Si le thème est sombre, cochez le switcher
    themeImage.src = 'https://i.imgur.com/bZwaKHl.png';
}

// Fonction pour changer l'image avec une transition de fade
function changeImage(src) {
    themeImage.classList.add('fade-out'); // Commence le fade-out

    // Attendre la fin de l'animation avant de changer la source
    setTimeout(() => {
        themeImage.src = src; // Change la source de l'image
        themeImage.classList.remove('fade-out'); // Supprime fade-out
        themeImage.classList.add('fade-in'); // Ajoute fade-in pour apparition

        // Supprime fade-in après la transition pour éviter conflits
        setTimeout(() => {
            themeImage.classList.remove('fade-in');
        }, 500); // Temps de la transition (0.5s)
    }, 500); // Temps de fade-out (0.5s)
}

// Change l'image en fonction du thème sélectionné
themeSwitcher.addEventListener('change', () => {
    if (themeSwitcher.checked) {
        document.body.classList.add('dark');
        themeText.textContent = "Dark";
        changeImage('https://i.imgur.com/bZwaKHl.png'); // Image sombre
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        themeText.textContent = "Light";
        changeImage('https://i.imgur.com/Aeum6p5.png'); // Image claire
        localStorage.setItem('theme', 'light');
    }
});

function startWithLoading() {
    const buttonText = document.getElementById("buttonText");
    const createButton = document.getElementById("createButton")
    const loadingSpinner = document.getElementById("loadingSpinner");

    // Récupérer les valeurs des champs email et montant
    const email = document.getElementById('email').value.trim();
    const money = document.getElementById('money').value.trim();

    // Vérifier si les champs sont remplis
    if (!email || !money) {
        alert("Veuillez entrer une adresse e-mail et un montant.");
        return; // Ne pas lancer l'animation si l'un des champs est vide
    }

    // Changer le texte et afficher le spinner
    buttonText.textContent = "Loading...";
    loadingSpinner.style.display = "inline-block";

    // Appliquer display: flex et width: auto au bouton
    createButton.style.display = "flex";
    createButton.style.width = "auto";

    // Simuler un délai avant d'exécuter la fonction principale
    setTimeout(async () => {
        await startGeneration(); // Fonction principale

        // Réinitialiser le texte et le spinner après exécution
        buttonText.textContent = "Create";
        loadingSpinner.style.display = "none";

        // Réinitialiser les styles du bouton après chargement
        createButton.style.display = ""; // Retire le display: flex
        createButton.style.width = "";   // Retire le width: auto
    }, 2000); // délai de 2 secondes
}

document.getElementById('closeButton').onclick = function() {
    window.location.href = 'https://discord.gg/PqNUanR7zC';
};




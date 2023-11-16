console.log("Script chargé");
//
//************************DÉCLARATION DES CONSTANTES ET VARIABLES**************************//
//
const ARRAY_MOTS = ["NAVIGATEUR", "RESPONSIVE", "PACKAGE", "PROJET", "REFERENCEMENT", "ALGORITHME", "FRAMEWORK", "PROCEDURALE", "APPLICATION"];
const ARRAY_DEFINITIONS = [
    {
        mot: "NAVIGATEUR",
        definition: "Un navigateur web est un logiciel conçu pour consulter et afficher le World Wide Web"
    },
    {
        mot: "RESPONSIVE",
        definition: "Un site web responsive ou 'réactif' est un site web dont la conception vise à offrir une consultation confortable sur des écrans de tailles très différentes"},
    {
        mot: "PACKAGE",
        definition: "En développement web, le terme package ou 'paquet' est le nom donné à une bibliothèque logicielle."},
    {
        mot: "PROJET",
        definition: "Techniquement, le terme projet est la concrétisation ou la réalisation d'une idée en mobilisant les ressources nécessaires dont on a besoin, en fixant et en respectant le délai de sa réalisation sans oublier la qualité de la finalité."},
    {
        mot: "REFERENCEMENT",
        definition: "Sur internet, le travail de référencement consiste à améliorer le positionnement et la visibilité de sites dans des pages de résultats de moteurs de recherche ou d'annuaires."},
    {
        mot: "ALGORITHME",
        definition: "Un algorithme est une suite finie et non ambiguë d'instructions et d\'opérations permettant de résoudre une classe de problèmes."},
    {
        mot: "FRAMEWORK",
        definition: "En développement web, un framework est un ensemble cohérent de composants structurels qui sert à créer l'architecture de tout ou partie d'une application"},
    {
        mot: "PROCEDURALE",
        definition: "En informatique, la programmation procédurale est un paradigme qui se fonde sur le concept d'appel procédural. Une procédure, aussi appelée routine, sous-routine ou fonction (à ne pas confondre avec les fonctions de la programmation fonctionnelle reposant sur des fonctions mathématiques), contient simplement une série d'étapes à réaliser. N\'importe quelle procédure peut être appelée à n'importe quelle étape de l\'exécution du programme, y compris à l\'intérieur d\'autres procédures, voire dans la procédure elle-même (récursivité)."},
    {
        mot: "APPLICATION",
        definition: "En informatique, une application web est une application manipulable directement en ligne grâce à un navigateur web et qui ne nécessite donc pas d\'installation sur les machines clientes, contrairement aux applications mobiles."}
]
const ARRAY_ALPHABET = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
console.log(ARRAY_ALPHABET);
const SPAN_SCORE = document.querySelector(".affichage>span:last-of-type");
const BOUTON_REJOUER = document.querySelector("input[type='button']");
//
//************************INITIALISATION**************************//
//
construireClavier();
const MOT_MYSTERE = ARRAY_DEFINITIONS[Math.floor(Math.random() * ARRAY_DEFINITIONS.length)].mot;
console.log(MOT_MYSTERE);
const arrayChevalet = construireChevalet();
console.log(arrayChevalet);
//
//****La partie commence****//
//
BOUTON_REJOUER.addEventListener("click", () => window.location.reload());
ecouterClavier();

/**
 * 
 * @returns {Array} Tous les élémets span enfants de ".lettres-decouvertes"
 */
function construireChevalet() {
    for (let index = 0; index < MOT_MYSTERE.length; index++) {
        const unTiret = document.createElement("span");
        unTiret.textContent = "-";
        document.querySelector(".lettres-decouvertes").appendChild(unTiret);
    }
    return document.querySelectorAll(".lettres-decouvertes span");
}
/**
 * Construction du clavier
 */
function construireClavier() {
    for (let index = 0; index < ARRAY_ALPHABET.length; index++) {
        const boutonLettre = document.createElement("button");
        boutonLettre.textContent = ARRAY_ALPHABET[index];
        document.querySelector(".clavier").appendChild(boutonLettre);
    }
}
/**
 * On écoute le clavier pour lancer la recherche de la lattre choisie dans le mot mystère
 */
function ecouterClavier() {
    document.querySelectorAll("button").forEach(bouton => {
        bouton.addEventListener("click", chercher)
    })
}
/**
 * 
 * @param {Object} evenementClick 
 */
function chercher(evenementClick) {
    let trouve = false;
    const boutonLettre = Array.from(document.querySelectorAll("button")).find((button) => button.textContent == evenementClick.target.textContent);
    for (let index = 0; index < MOT_MYSTERE.length; index++) {
        if (evenementClick.target.textContent == MOT_MYSTERE[index]) { // Lettre cliquée présente dans mot mystère ?
            arrayChevalet[index].textContent = MOT_MYSTERE[index]; // On place la lettre à sa place dans le chevalet
            trouve = true;
            boutonLettre.style.backgroundColor = "green";
            const tiretChevalet = Array.from(arrayChevalet).find((span) => span.textContent == "-"); // On cherche s'il y a encore un tiret sur le chevalet
            if (!tiretChevalet) {// Si plus de place libre sur chevalet
                document.querySelector(".resultat p").textContent = "GAGNÉ !";
                let laDefinition = ARRAY_DEFINITIONS.find((item) => item.mot == MOT_MYSTERE).definition;
                const motDansDef = strNoAccent(laDefinition);
                let trouveMotDansDef = motDansDef.indexOf(MOT_MYSTERE.toLowerCase());
                let motMystereMarked = `${laDefinition.substring(trouveMotDansDef, trouveMotDansDef + MOT_MYSTERE.length)}`;
                laDefinition = laDefinition.replace(motMystereMarked, `<mark>${motMystereMarked}</mark>`);
                document.querySelector(".resultat p:last-of-type").innerHTML = `<strong><em>${laDefinition}<em></strong>`;
                document.querySelector(".interface").style.pointerEvents = "none";
                BOUTON_REJOUER.style.visibility = "visible";
            }
        }
    }
    if (trouve == false) {// Si la lettre choisie n'a été trouvée nulle part dans le mot mystère
        boutonLettre.style.backgroundColor = "red";
        SPAN_SCORE.innerHTML = `<strong>${parseInt(SPAN_SCORE.textContent) - 1}</strong>`;// On réduit de 1 le nombre d'essais reqtants
        if (SPAN_SCORE.textContent == 0) {// Si le nombre d'essais est tombé à zéro
            document.querySelector(".resultat p").innerHTML = `PERDU ! Le mot à trouver était <strong>${MOT_MYSTERE}</strong>`;
            let laDefinition = ARRAY_DEFINITIONS.find((item) => item.mot == MOT_MYSTERE).definition;
            const motDansDef = strNoAccent(laDefinition);
            let trouveMotDansDef = motDansDef.indexOf(MOT_MYSTERE.toLowerCase());
            let motMystereMarked = `${laDefinition.substring(trouveMotDansDef, trouveMotDansDef + MOT_MYSTERE.length)}`;
            laDefinition = laDefinition.replace(motMystereMarked, `<mark>${motMystereMarked}</mark>`);
            document.querySelector(".resultat p:last-of-type").innerHTML = `<strong><em>${laDefinition}<em></strong>`;
            document.querySelector(".interface").style.pointerEvents = "none";
            BOUTON_REJOUER.style.visibility = "visible";
        }
    }
    boutonLettre.style.color = "white";
    boutonLettre.disabled = true;
    trouve = false;// On remet le booléen à faslse en prévision du prochain click du joueur sur le clavier
}

function strNoAccent(definition) {
    var n = '',
        t = {'Š':'S','š':'s','?':'Dj','?':'dj','Ž':'Z','ž':'z','?':'C','?':'c','?':'C','?':'c','À':'A','Á':'A','Â':'A','Ã':'A','Ä':'A','Å':'A','Æ':'A','Ç':'C','È':'E','É':'E','Ê':'E','Ë':'E','Ì':'I','Í':'I','Î':'I','Ï':'I','Ñ':'N','Ò':'O','Ó':'O','Ô':'O','Õ':'O','Ö':'O','Ø':'O','Ù':'U','Ú':'U','Û':'U','Ü':'U','Ý':'Y','Þ':'B','ß':'Ss','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'a','ç':'c','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ð':'o','ñ':'n','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o','ù':'u','ú':'u','û':'u','ý':'y','ý':'y','þ':'b','ÿ':'y','?':'R','?':'r'};
    for (var i = 0, j = definition.length, c = definition[i]; i < j; i++) {
      var c = definition[i];
      n += t[c] ? t[c] : c;
    }
    return n;
  }
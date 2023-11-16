---

Author: Alain ORLUK  
Formation : Développeur Web & Web mobile  
Lieu: Marseille
Date : 27/10/2023  

---
# **Solution**

## **Sélectionner un mot au hasard dans le tableau d'objet `DEFINITIONS`**

```js
const MOT_MYSTERE = DEFINITIONS[Math.floor(Math.random() * DEFINITIONS.length)].mot;
```

## **Définir la propriété `innerHTML` du second paragraphe de la div de classe `resultat`**

```js
document.querySelector(".resultat p:last-of-type").innerHTML = `<strong><em>${ARRAY_DEFINITIONS.find((item) => item.mot == MOT_MYSTERE).definition}<em></strong>`;
```

/*
    Code organization: 6.5/10
    Code readability: 5/10
*/

import spells from "./scripts/spellGet.js";
import modifierCalc from "./scripts/modifierCalc.js";

// API connection
const API = "https://www.dnd5eapi.co/api";

// Elements 
const container = document.querySelector(".container");

// Character Data
let character = {
    name: null,
    level: 1,
    class: "wizard",
    ability_scores: {
        cha: 10,
        con: 10,
        dex: 10,
        int: 10,
        str: 10,
        wis: 10
    },
    hp: 6,
    skills: [],
    spells: {
        0: [],
        1: []
    }
}

// Page initialization
let page = 1;

// Page advancer
const left = document.querySelector("#left");
const right = document.querySelector("#right");
right.addEventListener("click", () => {
    if (page === 1) {
        left.classList.remove("hidden");
        left.classList.add("visible");
    } else if (page === 5) {
        right.classList.remove("visible");
        right.classList.add("hidden");
    }
    page++;
    build(page);
})

left.addEventListener("click", () => {
    if (page === 2) {
        left.classList.remove("visible");
        left.classList.add("hidden");
    } else if (page === 6) {
        right.classList.remove("hidden");
        right.classList.add("visible");
    }

    page--;
    build(page);
})

// Arrow drag fix
left.ondragstart = () => {
    return false;
};

right.ondragstart = () => {
    return false;
}; 

function build(page) {
    container.innerHTML = "";
    if (page === 1) {
        renderPageOne();
    } else if (page === 2) {
        renderPageTwo();
    } else if (page === 3) {
        renderPageThree();
    } else if (page === 4) {
        renderPageFour();
    } else if (page === 5) {
        renderPageFive(spells);
    } else if (page === 6) {
        renderPageSix(spells);
    } else {
        container.innerHTML = "o.o you've entered the minus realm o.o";
    }
}

renderPageOne()

// Ability Querier
async function queryAPI(section, subsection="") {
    const apiReq = await fetch(`${API}/${section}/${subsection}`);
    const apiData = await apiReq.json(); 
    return apiData;
}

function renderPageOne() {
    container.innerHTML = `
        <h1>Wizard Character Creator</h1>
        <p class="class-info">Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, and brute-force mind control. Their magic conjures monsters from other planes of existence, glimpses the future, or turns slain foes into zombies. Their mightiest spells change one substance into another, call meteors down from the sky, or open portals to other worlds.</p>
        <div>
            <p>Level: 1</p>
            <p>Class: Wizard</p>
            <span>What is your name?</span>
            <input type="text" id="nameText">
            <button id="nameInput" class="button-border">Submit</button><span id="success" class="hidden"> Saved!</span>
        </div>
        `
    // Name Updater
    const nameInput = document.querySelector("#nameInput");
    nameInput.addEventListener("click", () => {
        const nameText = document.querySelector("#nameText");
        const successText = document.querySelector("#success");
        character.name = nameText.value;
        successText.classList.add("visible");
    });
}

function renderPageTwo() {
    container.innerHTML = `
    <h1>Ability Scores</h1>
        <table>
            <tr>
                <td class="ability-card" id="cha">
                    <h3>Charisma</h3>
                    <button id="cha-dec">-</button>
                    <span id="cha-value"></span>
                    <button id="cha-inc">+</button>
                </td>
                <td class="ability-card" id="con">
                    <h3>Constitution</h3>
                    <button id="con-dec">-</button>
                    <span id="con-value"></span>
                    <button id="con-inc">+</button>
                </td>
                <td class="ability-card" id="dex">
                    <h3>Dexterity</h3>
                    <button id="dex-dec">-</button>
                    <span id="dex-value"></span>
                    <button id="dex-inc">+</button>
                </td>
            </tr>
            <tr>
                <td class="ability-card" id="int">
                    <h3>Intelligence</h3>
                    <button id="int-dec">-</button>
                    <span id="int-value"></span>
                    <button id="int-inc">+</button>
                </td>
                <td class="ability-card" id="str">
                    <h3>Strength</h3>
                    <button id="str-dec">-</button>
                    <span id="str-value"></span>
                    <button id="str-inc">+</button>
                </td>
                <td class="ability-card" id="wis">
                    <h3>Wisdom</h3>
                    <button id="wis-dec">-</button>
                    <span id="wis-value"></span>
                    <button id="wis-inc">+</button>
                </td>
            </tr>
        </table>
        <p class="info"></p>
    `

    let stats = Object.keys(character.ability_scores);
    let abilityInfo = document.querySelector(".info");

    function initializeStats(stat) {
        document.querySelector(`#${stat}-value`).innerHTML = character.ability_scores[stat];
    }

    function valueChanger(stat) {
        document.querySelector(`#${stat}-dec`).addEventListener("click", () => {
            if (character.ability_scores[stat] > 1) {
                character.ability_scores[stat]--;
            } else {
                alert("Ability scores cannot be reduced below 1. If they were, your character would be dead!")
            }
            document.querySelector(`#${stat}-value`).innerHTML = character.ability_scores[stat];
        })
        document.querySelector(`#${stat}-inc`).addEventListener("click", () => {
            if (character.ability_scores[stat] < 20) {
                character.ability_scores[stat]++;
            } else {
                alert("Ability scores cannot be higher than 20.")
            }
            document.querySelector(`#${stat}-value`).innerHTML = character.ability_scores[stat];
        })
        
    }

    async function loadStatInfo(stat) {
        document.querySelector(`#${stat} h3`).addEventListener("click", async () => {
            let ability = await queryAPI("ability-scores", `${stat}`);
            abilityInfo.innerHTML = ability.desc[0] + " " + ability.desc[1];
        })
    }

    for (let i = 0; i < stats.length; i++) {
        initializeStats(stats[i]);
        valueChanger(stats[i]);
        loadStatInfo(stats[i]);
    }
}

function renderPageThree() {
    container.innerHTML = `
    <h1>Hit Points (HP)</h1>
    <h2>Your starting hit points are <span id="hp"></span>.</h2> <p>This is determined by the max value of the wizard's hit die (d6) and your constitution modifier, which is <span id="con-mod"></span>.</p>
    `
    let conMod = modifierCalc(character.ability_scores.con);
    if (character.hp !== 6 + conMod) {
        character.hp = 6 + conMod;
    }
    document.querySelector("#hp").innerHTML = character.hp;
    if (conMod >= 0) {
        document.querySelector("#con-mod").innerHTML = `+${modifierCalc(character.ability_scores.con)}`;
    } else {
        document.querySelector("#con-mod").innerHTML = modifierCalc(character.ability_scores.con);
    }
}

function renderPageFour() {
    container.innerHTML = `
    <h1>Skill Proficiencies</h1>
    <h3><i>Choose 2:</i></h3>
    <table>
        <tr>
            <td>
                <div class="checkbox" id="arcana" name="arcana"></div>
                <label for="arcana">Arcana</label>
            </td>
            <td>
                <div class="checkbox" id="history" name="history"></div>
                <label for="history">History</label>
            </td>
            <td>
                <div class="checkbox" id="insight" name="insight"></div>
                <label for="insight">Insight</label>
            </td>
        </tr>
        <tr>
            <td>
                <div class="checkbox" id="investigation" name="investigation"></div>
                <label for="investigation">Investigation</label>
            </td>
            <td>
                <div class="checkbox" id="medicine" name="medicine"></div>
                <label for="medicine">Medicine</label>
            </td>
            <td>
                <div class="checkbox" id="religion" name="religion"></div>
                <label for="religion">Religion</label>
            </td>
        </tr>
    </table>
    <p class="info"></p>
    `
    container.style.justifyContent = "center";

    let profs = character.skills.length;
    let labels = document.querySelectorAll("label");
    let info = document.querySelector(".info");

    labels.forEach((item) => {
        item.addEventListener("click", async () => {
            let data = await queryAPI("skills", item.innerHTML.toLowerCase());
            info.innerHTML = `${data.desc[0]}`;
        })
    })

    let checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((item) => {
        if (character.skills.includes(item.id)) {
            item.classList.add("checked");
        }
        item.addEventListener("click", () => {
            if (character.skills.includes(item.id)) {
                for (let i = 0; i < profs; i++) {
                    if (character.skills[i] === item.id) {
                        let temp = character.skills[profs-1];
                        character.skills[profs-1] = character.skills[i];
                        character.skills[i] = temp;
                    }
                }
                character.skills.pop(); // leaves undefined value when popping with 1 element in the array
                let filtered = character.skills.filter((x) => { // clears undefined value
                    return x !== undefined;
                })
                character.skills = filtered;
                item.classList.remove("checked");
                profs--;
            } else if (profs < 2) {
                character.skills.push(item.id)
                item.classList.add("checked");
                profs++;
            }
        })
    })
}

function renderPageFive(spells) {
    container.innerHTML = `
    <h1>Spells</h1>
    <h3>Cantrip (pick 3)</h3>
    <table id="cantrips"><tr><td></td><td><u>Spell Name</u></td><td><u>School of Magic</u></td></tr></table>
    <h3>Level 1 Spells (pick <span id="spell-count"></span>, 1 + int mod)</h3>
    <sub style="color:red"><i>If you go back and change your int value, you will have to repick your spells!</i></sub><br/>
    <table id="level-one"><tr><td></td><td><u>Spell Name</u></td><td><u>School of Magic</u></td></tr></table>
    `
    container.style.justifyContent = "space-between"
    let spellCount = document.querySelector("#spell-count");
    let spellTotal = 1 + modifierCalc(character.ability_scores.int)
    if (spellTotal < 1) {
        spellTotal = 1;
    }

    spellCount.innerHTML = spellTotal;
    const cantrips = document.querySelector("#cantrips");
    const levelOne = document.querySelector("#level-one");
    for (let i = 0; i < spells.length; i++){
        if (spells[i].level === 0) {
            cantrips.innerHTML += `<tr><td><div class="level-zero checkbox" id="${spells[i].name}"</div></td><td class="spell-name">${spells[i].name}</td><td class="school">${spells[i].school.name}</td></tr>`;
        } else if (spells[i].level === 1) {
            levelOne.innerHTML += `<tr><td><div class="level-one checkbox" id="${spells[i].name}"</div></td><td class="spell-name">${spells[i].name}</td><td class="school">${spells[i].school.name}</td></tr>`;
        }
        
    }
    const schools = document.querySelectorAll(".school");
    schools.forEach((item) => {
        if (item.innerHTML === "Conjuration") {
            item.style.color = "lightskyblue";
        } else if (item.innerHTML === "Necromancy") {
            item.style.color = "black";
        } else if (item.innerHTML === "Evocation") {
            item.style.color = "red";
        } else if (item.innerHTML === "Transmutation") {
            item.style.color = "gold";
        } else if (item.innerHTML === "Illusion") {
            item.style.color = "purple";
        } else if (item.innerHTML === "Divination") {
            item.style.color = "aqua";
        } else if (item.innerHTML === "Enchantment") {
            item.style.color = "yellow";
        } else if (item.innerHTML === "Abjuration") {
            item.style.color = "orange";
        }
    })

    const checkboxes = document.querySelectorAll(".checkbox");
    let zeros = character.spells[0].length;
    let ones = character.spells[1].length;
    checkboxes.forEach((item) => {
        if (character.spells[0].includes(item.id) || character.spells[1].includes(item.id)) {
            item.classList.add("checked");
        }
        item.addEventListener("click", () => {
            if (item.classList.contains("level-zero")) {
                if (item.classList.contains("checked") === true) {
                    for (let i = 0; i < character.spells[0].length; i++) {
                        if (character.spells[0][i] === item.id) {
                            let temp = character.spells[0][i];
                            character.spells[0][i] = character.spells[0][zeros-1];
                            character.spells[0][zeros-1] = temp
                            i += 10000; // breaks loop
                        }
                    }
                    character.spells[0].pop();
                    let filtered = character.spells[0].filter((x) => {
                        return x !== undefined;
                    })
                    character.spells[0] = filtered;
                    item.classList.remove("checked");
                    zeros--;
                } else if (zeros < 3) {
                    character.spells[0].push(item.id);
                    item.classList.add("checked");
                    zeros++;
                }
            } else if (item.classList.contains("level-one")) {
                if (item.classList.contains("checked") === true) {
                    for (let i = 0; i < character.spells[1].length; i++) {
                        if (character.spells[1][i] === item.id) {
                            let temp = character.spells[1][i];
                            character.spells[1][i] = character.spells[1][ones-1];
                            character.spells[1][ones-1] = temp
                            i += 10000; // breaks loop
                        }
                    }
                    character.spells[1].pop();
                    let filtered = character.spells[1].filter((x) => {
                        return x !== undefined;
                    })
                    character.spells[1] = filtered;
                    item.classList.remove("checked");
                    ones--;
                } else if (ones < spellTotal) {
                    character.spells[1].push(item.id);
                    item.classList.add("checked");
                    ones++;
                }
            }
        })
    })
}

function renderPageSix(spells) {
    container.innerHTML = `
    <h1>Your Character:</h1>
    <h2 id="name"></h2>
    <table class="centered-mid">
    <tr><td>Level <span id="level"></span></td><td><span id="class"></span></td><td>HP: <span id="hp"></hp></td></tr>
    </table>
    <h3><u>Ability Scores and Modifiers:</u></h3>
    <table class="left-wide">
    <tr><td>Charisma: <span id="cha"></span></td><td>Intelligence: <span id="int"></span></td></tr>
    <tr><td>Constitution: <span id="con"></span></td><td>Strength: <span id="str"></span></td></tr>
    <tr><td>Dexterity: <span id="dex"></span></td><td>Wisdom: <span id="wis"></span></td></tr>
    </table>
    <h3><u>Skill Proficiencies</u></h3>
    <table id="skills">
    </table>
    <h3><u>Spells</u></h3>
    <table id="spells">
        <tr>
            <td>Level</td>
            <td>Name</td>
            <td>School</td>
        </tr>
    </table>
    `
    container.style.justifyContent = "center"
    const nameEle = document.querySelector("#name");
    const levelEle = document.querySelector("#level");
    const classEle = document.querySelector("#class");
    const hpEle = document.querySelector("#hp");
    const chaEle = document.querySelector("#cha");
    const conEle = document.querySelector("#con");
    const dexEle = document.querySelector("#dex");
    const intEle = document.querySelector("#int");
    const strEle = document.querySelector("#str");
    const wisEle = document.querySelector("#wis");
    const skillsEle = document.querySelector("#skills");
    const spellsEle = document.querySelector("#spells");

    // fixes positive values to include '+' in string
    let mods = [];
    for (let i = 0; i < Object.values(character.ability_scores).length; i++) {
        let mod = modifierCalc(Object.values(character.ability_scores)[i]);
        if (mod >= 0) {
            mod = `+${mod}`;
        }
        mods.push(mod);
    }

    nameEle.innerHTML = character.name;
    levelEle.innerHTML = character.level;
    classEle.innerHTML = `${character.class.charAt(0).toUpperCase()}${character.class.slice(1)}`;
    hpEle.innerHTML = character.hp;
    chaEle.innerHTML = `${character.ability_scores.cha} (${mods[0]})`
    conEle.innerHTML = `${character.ability_scores.con} (${mods[1]})`
    dexEle.innerHTML = `${character.ability_scores.dex} (${mods[2]})`
    intEle.innerHTML = `${character.ability_scores.int} (${mods[3]})`
    strEle.innerHTML = `${character.ability_scores.str} (${mods[4]})`
    wisEle.innerHTML = `${character.ability_scores.wis} (${mods[5]})`

    skillsEle.innerHTML += "<tr>";
    for (let i = 0; i < character.skills.length; i++) {
        let skill = `${character.skills[i].charAt(0).toUpperCase()}${character.skills[i].slice(1)}`
        skillsEle.innerHTML += `<td>${skill}</td>`
    }
    skillsEle.innerHTML += "</tr>";

    async function renderSpells() {
        for (let i = 0; i < spells.length; i++) {
            if (character.spells[0].includes(spells[i].name) || character.spells[1].includes(spells[i].name)){
                spellsEle.innerHTML += `<tr><td>${spells[i].level}</td><td>${spells[i].name}</td><td class="school">${spells[i].school.name}</td></tr>`;  
            }
                        
        }
    }

    renderSpells();

    // make this a function
    const schools = document.querySelectorAll(".school");
    schools.forEach((item) => {
        if (item.innerHTML === "Conjuration") {
            item.style.color = "lightskyblue";
        } else if (item.innerHTML === "Necromancy") {
            item.style.color = "black";
        } else if (item.innerHTML === "Evocation") {
            item.style.color = "red";
        } else if (item.innerHTML === "Transmutation") {
            item.style.color = "gold";
        } else if (item.innerHTML === "Illusion") {
            item.style.color = "purple";
        } else if (item.innerHTML === "Divination") {
            item.style.color = "aqua";
        } else if (item.innerHTML === "Enchantment") {
            item.style.color = "yellow";
        } else if (item.innerHTML === "Abjuration") {
            item.style.color = "orange";
        }
    })
}
/*
    Code organization: 2/10
*/

// import spells from "./spell_get";

// API connection
const API = "https://www.dnd5eapi.co/api";

// Elements 
const container = document.querySelector(".container");

// Class information
// let wizardData = queryAPI("classes", "wizard");

let page = 1;
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

function modifierCalc(val) {
    if (val >= 30) {
        return 10;
    } else if (val >= 28) {
        return 9;
    } else if (val >= 26) {
        return 8;
    } else if (val >= 24) {
        return 7;
    } else if (val >= 22) {
        return 6;
    } else if (val >= 20) {
        return 5;
    } else if (val >= 18) {
        return 4;
    } else if (val >= 16) {
        return 3;
    } else if (val >= 14) {
        return 2;
    } else if (val >= 12) {
        return 1;
    } else if (val >= 10) {
        return 0;
    } else if (val >= 8) {
        return -1;
    } else if (val >= 6) {
        return -2;
    } else if (val >= 4) {
        return -3;
    } else if (val >= 2) {
        return -4;
    } else if (val === 1) {
        return -5;
    } else {
        return null;
    }
}

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

renderPageOne()

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

// Arrow drag fix
left.ondragstart = () => {
    return false;
};

right.ondragstart = () => {
    return false;
}; 

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
    // Name updater (using let for rebuilding elements)
    let nameInput = document.querySelector("#nameInput");
    function renderNameUpdater() {
        nameInput.addEventListener("click", () => {
            const nameText = document.querySelector("#nameText");
            const successText = document.querySelector("#success");
            character.name = nameText.value;
            successText.classList.add("visible");
        });
}
    renderNameUpdater();
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
    // Better way to do this? Arrays and for loops probably
    const chaVal = document.querySelector("#cha-value");
    const conVal = document.querySelector("#con-value");
    const dexVal = document.querySelector("#dex-value");
    const intVal = document.querySelector("#int-value");
    const strVal = document.querySelector("#str-value");
    const wisVal = document.querySelector("#wis-value");

    chaVal.innerHTML = character.ability_scores.cha;
    conVal.innerHTML = character.ability_scores.con;
    dexVal.innerHTML = character.ability_scores.dex;
    intVal.innerHTML = character.ability_scores.int;
    strVal.innerHTML = character.ability_scores.str;
    wisVal.innerHTML = character.ability_scores.wis;

    // And this? Most likely a method that takes two arguments, the skill and the increase or decrease
    document.querySelector("#cha-dec").addEventListener("click", () => {
        if (character.ability_scores.cha > 1) {
            character.ability_scores.cha--;
        } else {
            alert("Ability scores cannot be reduced below 1. If they were, your character would be dead!")
        }
        chaVal.innerHTML = character.ability_scores.cha;
    })
    document.querySelector("#cha-inc").addEventListener("click", () => {
        if (character.ability_scores.cha < 20) {
            character.ability_scores.cha++;
        } else {
            alert("Ability scores cannot be higher than 20.")
        }
        chaVal.innerHTML = character.ability_scores.cha;
    })

    document.querySelector("#con-dec").addEventListener("click", () => {
        if (character.ability_scores.con > 1) {
            character.ability_scores.con--;
        } else {
            alert("Ability scores cannot be reduced below 1. If they were, your character would be dead!")
        }
        conVal.innerHTML = character.ability_scores.con;
    })
    document.querySelector("#con-inc").addEventListener("click", () => {
        if (character.ability_scores.con < 20) {
            character.ability_scores.con++;
        } else {
            alert("Ability scores cannot be higher than 20.")
        }
        conVal.innerHTML = character.ability_scores.con;
    })

    document.querySelector("#dex-dec").addEventListener("click", () => {
        if (character.ability_scores.dex > 1) {
            character.ability_scores.dex--;
        } else {
            alert("Ability scores cannot be reduced below 1. If they were, your character would be dead!")
        }
        dexVal.innerHTML = character.ability_scores.dex;
    })
    document.querySelector("#dex-inc").addEventListener("click", () => {
        if (character.ability_scores.dex < 20) {
            character.ability_scores.dex++;
        } else {
            alert("Ability scores cannot be higher than 20.")
        }
        dexVal.innerHTML = character.ability_scores.dex;
    })

    document.querySelector("#int-dec").addEventListener("click", () => {
        if (character.ability_scores.int > 1) {
            character.ability_scores.int--;
        } else {
            alert("Ability scores cannot be reduced below 1. If they were, your character would be dead!")
        }
        intVal.innerHTML = character.ability_scores.int;
    })
    document.querySelector("#int-inc").addEventListener("click", () => {
        if (character.ability_scores.int < 20) {
            character.ability_scores.int++;
        } else {
            alert("Ability scores cannot be higher than 20.")
        }
        intVal.innerHTML = character.ability_scores.int;
    })

    document.querySelector("#str-dec").addEventListener("click", () => {
        if (character.ability_scores.str > 1) {
            character.ability_scores.str--;
        } else {
            alert("Ability scores cannot be reduced below 1. If they were, your character would be dead!")
        }
        strVal.innerHTML = character.ability_scores.str;
    })
    document.querySelector("#str-inc").addEventListener("click", () => {
        if (character.ability_scores.str < 20) {
            character.ability_scores.str++;
        } else {
            alert("Ability scores cannot be higher than 20.")
        }
        strVal.innerHTML = character.ability_scores.str;
    })

    document.querySelector("#wis-dec").addEventListener("click", () => {
        if (character.ability_scores.wis > 1) {
            character.ability_scores.wis--;
        } else {
            alert("Ability scores cannot be reduced below 1. If they were, your character would be dead!")
        }
        wisVal.innerHTML = character.ability_scores.wis;
    })
    document.querySelector("#wis-inc").addEventListener("click", () => {
        if (character.ability_scores.wis < 20) {
            character.ability_scores.wis++;
        } else {
            alert("Ability scores cannot be higher than 20.")
        }
        wisVal.innerHTML = character.ability_scores.wis;
    })

    // Same here.
    let abilityInfo = document.querySelector(".info");
    document.querySelector("#cha h3").addEventListener("click", async () => {
        let ability = await queryAPI("ability-scores", "cha");
        console.log(Object.keys(ability));
        abilityInfo.innerHTML = ability.desc[0] + " " + ability.desc[1];
    })

    document.querySelector("#con h3").addEventListener("click", async () => {
        let ability = await queryAPI("ability-scores", "con");
        abilityInfo.innerHTML = ability.desc[0] + " " + ability.desc[1];
    })
    
    document.querySelector("#dex h3").addEventListener("click", async () => {
        let ability = await queryAPI("ability-scores", "dex");
        abilityInfo.innerHTML = ability.desc[0] + " " + ability.desc[1];
    })
    
    document.querySelector("#int h3").addEventListener("click", async () => {
        let ability = await queryAPI("ability-scores", "int");
        abilityInfo.innerHTML = ability.desc[0] + " " + ability.desc[1];
    })
    
    document.querySelector("#str h3").addEventListener("click", async () => {
        let ability = await queryAPI("ability-scores", "str");
        abilityInfo.innerHTML = ability.desc[0] + " " + ability.desc[1];
    })
    
    document.querySelector("#wis h3").addEventListener("click", async () => {
        let ability = await queryAPI("ability-scores", "wis");
        abilityInfo.innerHTML = ability.desc[0] + " " + ability.desc[1];
    })
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
    container.style.justifyContent = "center"
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
                        character.skills[i] = temp
                    }
                }
                character.skills.pop(); // leaves undefined value when popping with 1 element in the array
                // clears undefined value
                let filtered = character.skills.filter((x) => {
                    return x !== undefined;
                })
                character.skills = filtered;
                item.classList.remove("checked");
                profs--;
            } else if (profs < 2) {
                character.skills.push(item.id)
                item.classList.add("checked");
                profs++;
            } else {
                item.checked = false;
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
    /*
        Expected functionality:
            1. sort by level
            2. sort by school of magic
            3. modal with api data loaded on click
    */

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
    <p>Spells</p>
    <table id="spells">
        <tr>
            <td>Level</td>
            <td>Name</td>
            <td>School</td>
        </tr>
    </table>
    `
    container.style.justifyContent = "center"
    function loadChar() {
        let nameEle = document.querySelector("#name");
        let levelEle = document.querySelector("#level");
        let classEle = document.querySelector("#class");
        let hpEle = document.querySelector("#hp");
        let chaEle = document.querySelector("#cha");
        let conEle = document.querySelector("#con");
        let dexEle = document.querySelector("#dex");
        let intEle = document.querySelector("#int");
        let strEle = document.querySelector("#str");
        let wisEle = document.querySelector("#wis");
        let skillsEle = document.querySelector("#skills");
        let spellsEle = document.querySelector("#spells");

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

            // for (let i = 0; i < character.spells[1].length; i++) {
            //     let name = character.spells[1][i].toLowerCase().replace(" ", "-");
            //     let data = await queryAPI("spells", name);
            //     spellsEle.innerHTML += `<tr><td>1</td><td>${data.name}</td><td class="school">${data.school.name}</td></tr>`;            
            // }
        }
        renderSpells();

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

    loadChar();
}
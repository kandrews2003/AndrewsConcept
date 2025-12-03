/***********************
 * A) VARIABLES & OPERATORS
 ***********************/
// TODO A1: Declare 6 variables: string, number, boolean, array, object, and an undefined variable
// Use const by default; use let only if you plan to reassign.
const course = /* string */ ;
const weeks  = /* number */ ;
const active = /* boolean */ ;
const fruits = /* array of strings */ ;
const user   = /* object with at least name + role */ ;
let pending;  // leave this undefined

// TODO A2: Log three expressions that evaluate to true using strict equality and logical operators
// Example ideas: weeks > 8 && active === true, etc.
// console.log(...);


/***********************
 * B) DOM LIST BUILDER
 ***********************/
// TODO B1: Implement renderList(arr). Create <li> nodes (no innerHTML) and update #status to "N items".
function renderList(arr) {
  // 1) select #items and clear it
  // 2) loop over arr, create <li>, set textContent, append
  // 3) set #status textContent to `${arr.length} items`
}

// Call once with sample data
const sample = ["kiwi","dragonfruit","pear","plum"];
renderList(sample);


/***********************
 * C) VALIDATION (EVENTS + BRANCHING)
 ***********************/
const form = document.querySelector("#contact");
const input = document.querySelector("#displayName");
const statusEl = document.querySelector("#status");

// TODO C1: Implement validateName(name) -> returns a message:
// "< 3" => "Too short (min 3).", "> 30" => "Too long (max 30).", otherwise => "Looks good, <name>!"
function validateName(name) {
  // implement branching with if/else if/else
  return "";
}

// TODO C2: On form submit, prevent default, call validateName, set #status textContent to the message
form.addEventListener("submit", (e) => {
  // ...
});

// TODO C3: On input event, show "✓ OK" in #status when valid length, otherwise clear the status
input.addEventListener("input", () => {
  // ...
});


/***********************
 * D) FETCH + RENDER CARDS
 ***********************/
const searchForm = document.querySelector("#search");
const q = document.querySelector("#q");
const fetchStatus = document.querySelector("#fetchStatus");
const results = document.querySelector("#results");
const loadBtn = document.querySelector("#loadBtn");

let cache = []; // array of objects from the API

// TODO D1: Implement loadData(): set fetchStatus "Loading…"; fetch users; on success set cache (array) and status "Loaded N records."
// Use: https://jsonplaceholder.typicode.com/users
async function loadData() {
  // try/catch; set aria-live text during states
}

// TODO D2: Implement applyFilter(term): return the filtered array based on name/username/email (case-insensitive)
// If term is empty -> return cache. If term === "sort:az" -> return a sorted copy by name.
function applyFilter(term) {
  // ...
  return [];
}

// TODO D3: Implement renderCards(items): create .card for first 10 items; show name + email (or fallback text)
function renderCards(items) {
  // ...
}

// Wire buttons / submit
loadBtn.addEventListener("click", async () => {
  await loadData();
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!cache.length) {
    await loadData();
  }
  fetchStatus.textContent = "Searching…";
  const items = applyFilter(q.value);
  fetchStatus.textContent = `Found ${items.length} result(s).`;
  renderCards(items);
});


/***********************
 * SELF-CHECK HARNESS — DO NOT EDIT
 ***********************/
function mark(id, pass, detail="") {
  const li = document.createElement("li");
  li.innerHTML = `<span class="${pass ? 'ok' : 'fail'}">${pass ? 'PASS' : 'FAIL'}</span> — ${id}${detail ? ' — ' + detail : ''}`;
  document.querySelector("#checks").appendChild(li);
}

async function runChecks() {
  document.querySelector("#checks").textContent = "";

  // A) Variables & operators
  try {
    const a = typeof course === "string";
    const b = typeof weeks === "number";
    const c = typeof active === "boolean";
    const d = Array.isArray(fruits) && fruits.length >= 1;
    const e = user && typeof user === "object" && "name" in user && "role" in user;
    const f = typeof pending === "undefined";
    mark("A1 Types", a && b && c && d && e && f);

    // Rough check: at least one true logged
    const _log = console.log;
    let trueCount = 0;
    console.log = (x) => { if (x === true) trueCount++; _log(x); };
    // Encourage student to run their truthy logs again:
    try { /* student logs already ran on load; ignore */ } catch {}
    console.log = _log;
    mark("A2 True expressions", trueCount >= 1, `(${trueCount} true)`);
  } catch (err) {
    mark("A — Variables", false, err.message);
  }

  // B) DOM List
  try {
    const items = document.querySelectorAll("#items li");
    const countText = document.querySelector("#status")?.textContent || "";
    const pass = items.length >= 4 && /items/.test(countText);
    mark("B1 renderList()", pass, `(${items.length} li)`);
  } catch (err) {
    mark("B — DOM List", false, err.message);
  }

  // C) Validation
  try {
    const shortMsg = validateName("Al");
    const okMsg = validateName("Alice");
    const longStr = "X".repeat(31);
    const longMsg = validateName(longStr);
    const pass = shortMsg.includes("Too short") &&
                 okMsg.includes("Looks good") &&
                 longMsg.includes("Too long");
    mark("C1 validateName()", pass);
  } catch (err) {
    mark("C — Validation", false, err.message);
  }

  // D) Fetch + render (hit the network once)
  try {
    if (!cache.length) { await loadData(); }
    const loaded = Array.isArray(cache) && cache.length > 0;
    mark("D1 loadData()", loaded, loaded ? `(${cache.length} records)` : "");

    const filtered = applyFilter("Leanne"); // name from JSONPlaceholder dataset
    const sorted = applyFilter("sort:az");
    const okFilter = Array.isArray(filtered);
    const okSort = Array.isArray(sorted) && sorted.length >= 1;
    mark("D2 applyFilter()", okFilter && okSort);

    renderCards(filtered.slice(0, 3));
    const cards = document.querySelectorAll("#results .card").length;
    mark("D3 renderCards()", cards >= 1, `(${cards} cards)`);
  } catch (err) {
    mark("D — Fetch/Render", false, err.message);
  }
}

// Button
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#runChecks").addEventListener("click", runChecks);
  console.log("Unit 4 Lab loaded — fill the TODOs, then click Run Checks.");
});

/* =========================================================
   REGISTER
   ========================================================= */

async function register() {

    let name =
        document.getElementById("name").value.trim();

    let studentId =
        document.getElementById("studentId").value.trim();

    let email =
        document.getElementById("regEmail").value.trim();

    let password =
        document.getElementById("regPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    let terms =
        document.getElementById("terms").checked;

    let error =
        document.getElementById("regError");

    error.innerHTML = "";


    // Check empty fields
    if (
        name === "" ||
        studentId === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        error.innerHTML =
            "Please fill in all fields.";

        return;
    }


    // Check password
    if (password !== confirmPassword) {

        error.innerHTML =
            "Passwords do not match.";

        return;
    }


    // Check terms
    if (!terms) {

        error.innerHTML =
            "Please agree to the Terms & Conditions.";

        return;
    }


    try {

        let response = await fetch(
            "http://localhost:8081/api/users/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,
                    studentId: studentId,
                    email: email,
                    password: password

                })
            }
        );


        if (response.ok) {

            alert(
                "Account created successfully!"
            );

            window.location.href =
                "login.html";

        }

        else {

            const message =
                await response.text();


            if (response.status === 409) {

                error.innerHTML =
                    "Email is already registered.";

            }

            else {

                error.innerHTML =
                    message ||
                    "Registration failed.";

            }

        }

    }

    catch (e) {

        console.error(e);

        error.innerHTML =
            "Cannot connect to server. Start Spring Boot.";

    }

}


/* =========================================================
   LOGIN
   ========================================================= */

async function login() {

    let email =
        document.getElementById("email").value.trim();

    let password =
        document.getElementById("password").value;

    let error =
        document.getElementById("error");

    error.innerHTML = "";


    // Check empty fields
    if (
        email === "" ||
        password === ""
    ) {

        error.innerHTML =
            "Please enter email and password.";

        return;
    }


    try {

        let response = await fetch(
            "http://localhost:8081/api/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,
                    password: password

                })
            }
        );


        if (response.ok) {

            let user =
                await response.json();


            localStorage.setItem(
                "loggedIn",
                "true"
            );


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            let remember =
                document.getElementById("remember");


            if (
                remember &&
                remember.checked
            ) {

                localStorage.setItem(
                    "rememberEmail",
                    email
                );

            }


            window.location.href =
                "dashboard.html";

        }

        else {

            error.innerHTML =
                "Invalid email or password.";

        }

    }

    catch (e) {

        console.error(e);

        error.innerHTML =
            "Unable to connect to the server. Please try again.";

    }

}


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

function showPassword(id, button) {

    let password =
        document.getElementById(id);


    if (password.type === "password") {

        password.type = "text";

        button.innerHTML = "🙈";

    }

    else {

        password.type = "password";

        button.innerHTML = "👁";

    }

}


/* =========================================================
   PASSWORD STRENGTH
   ========================================================= */

function checkStrength() {

    let password =
        document.getElementById("regPassword").value;

    let strength =
        document.getElementById("strength");


    if (password === "") {

        strength.innerHTML =
            "Password strength: —";

        return;
    }


    if (password.length < 8) {

        strength.innerHTML =
            "Password strength: Weak";

        return;
    }


    if (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[@$!%*?&]/.test(password)
    ) {

        strength.innerHTML =
            "Password strength: Strong";

    }

    else {

        strength.innerHTML =
            "Password strength: Medium";

    }

}


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

function forgotPassword() {

    alert(
        "Password recovery will be available soon."
    );

}


/* =========================================================
   SHOW USER
   ========================================================= */

function showUser() {

    let loggedIn =
        localStorage.getItem("loggedIn");

    let user =
        JSON.parse(
            localStorage.getItem("user")
        );


    if (
        loggedIn !== "true" ||
        user === null
    ) {

        window.location.href =
            "login.html";

        return;
    }


    let userName =
        document.getElementById("userName");

    let welcomeUser =
        document.getElementById("welcomeUser");


    if (userName) {

        userName.innerHTML =
            user.name;

    }


    if (welcomeUser) {

        welcomeUser.innerHTML =
            user.name;

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "user"
    );

    window.location.href =
        "login.html";

}


/* =========================================================
   DASHBOARD CATEGORY OPEN
   ========================================================= */

function openCategory(category) {

    window.location.href =
        "locations.html?category=" +
        encodeURIComponent(category);

}


/* =========================================================
   CATEGORY FILTER
   =========================================================
   
   This matches the categories with the CURRENT
   Location database structure.

   Current Location fields:

   id
   name
   description
   latitude
   longitude
   type
   building
   floor

   There is NO category/subCategory field anymore.
   ========================================================= */

function filterLocationsByCategory(
    locations,
    category
) {

    if (!category) {

        return locations;

    }


    /* ================================
       ADMINISTRATION
       ================================ */

    if (category === "Administration") {

        return locations.filter(location =>

            location.type === "Administration"

        );

    }


    /* ================================
       FACULTY
       ================================ */

    if (category === "Faculty") {

        return locations.filter(location =>

            location.name === "Faculty Room" ||

            location.name === "HOD Cabin"

        );

    }


    /* ================================
       CLASSROOMS
       ================================ */

    if (category === "Classrooms") {

        return locations.filter(location =>

            location.type === "Classroom"

        );

    }


    /* ================================
       LABORATORIES
       ================================ */

    if (category === "Laboratories") {

        return locations.filter(location =>

            location.type === "Laboratory" ||

            location.type === "Laboratories"

        );

    }


    /* ================================
       LIBRARY
       ================================ */

    if (category === "Library") {

        return locations.filter(location =>

            location.name === "Library"

        );

    }


    /* ================================
       HALLS
       ================================ */

    if (category === "Halls") {

        return locations.filter(location =>

            location.name &&
            location.name
                .toLowerCase()
                .includes("hall")

        );

    }


    /* ================================
       FACILITIES
       ================================ */

    if (category === "Facilities") {

        return locations.filter(location =>

            location.type === "Facility"

        );

    }


    /* ================================
       ENTRANCES & GATES
       ================================ */

    if (category === "Entrances & Gates") {

        return locations.filter(location =>

            location.type === "Entrance" ||

            location.type === "Gate"

        );

    }


    /* ================================
       SPORTS & RECREATION
       ================================ */

    if (
        category ===
        "Sports & Recreation"
    ) {

        return locations.filter(location =>

            location.type === "Sports" ||

            location.type === "Recreation"

        );

    }


    // If no category matches,
    // show all locations.

    return locations;

}


/* =========================================================
   DASHBOARD SEARCH
   ========================================================= */

async function searchLocation() {

    const searchInput =
        document.getElementById("location");

    const result =
        document.getElementById("result");


    if (!searchInput) {

        console.error(
            "Search input not found."
        );

        return;
    }


    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchText === "") {

        if (result) {

            result.innerHTML =
                "Please enter a campus location.";

        }

        return;
    }


    if (result) {

        result.innerHTML =
            "Searching campus locations...";

    }


    try {

        const response =
            await fetch(
                "http://localhost:8081/api/locations"
            );


        if (!response.ok) {

            if (result) {

                result.innerHTML =
                    "Unable to load campus locations.";

            }

            return;
        }


        const locations =
            await response.json();


        /* =========================================
           CATEGORY SEARCH
           ========================================= */

        const categoryMap = {

            "lab":
                "Laboratories",

            "labs":
                "Laboratories",

            "laboratory":
                "Laboratories",

            "laboratories":
                "Laboratories",


            "classroom":
                "Classrooms",

            "classrooms":
                "Classrooms",

            "room":
                "Classrooms",

            "rooms":
                "Classrooms",


            "faculty":
                "Faculty",

            "teacher":
                "Faculty",

            "teachers":
                "Faculty",

            "staff":
                "Faculty",


            "library":
                "Library",


            "hall":
                "Halls",

            "halls":
                "Halls",


            "admin":
                "Administration",

            "administration":
                "Administration",


            "facility":
                "Facilities",

            "facilities":
                "Facilities",


            "gate":
                "Entrances & Gates",

            "gates":
                "Entrances & Gates",

            "entrance":
                "Entrances & Gates",

            "entrances":
                "Entrances & Gates",


            "sport":
                "Sports & Recreation",

            "sports":
                "Sports & Recreation",

            "recreation":
                "Sports & Recreation",

            "sports and recreation":
                "Sports & Recreation",

            "sports & recreation":
                "Sports & Recreation"

        };


        /*
         * If user searches a category,
         * open the filtered Locations page.
         */

        if (categoryMap[searchText]) {

            const category =
                categoryMap[searchText];


            window.location.href =
                "locations.html?category=" +
                encodeURIComponent(category);


            return;

        }


        /* =========================================
           NORMAL LOCATION SEARCH
           ========================================= */

        const filteredLocations =
            locations.filter(location => {

                return (

                    (
                        location.name &&

                        location.name
                            .toLowerCase()
                            .includes(searchText)
                    )

                    ||

                    (
                        location.type &&

                        location.type
                            .toLowerCase()
                            .includes(searchText)
                    )

                    ||

                    (
                        location.building &&

                        location.building
                            .toLowerCase()
                            .includes(searchText)
                    )

                    ||

                    (
                        location.floor &&

                        location.floor
                            .toLowerCase()
                            .includes(searchText)
                    )

                    ||

                    (
                        location.description &&

                        location.description
                            .toLowerCase()
                            .includes(searchText)
                    )

                );

            });


        /* =========================================
           NO LOCATION FOUND
           ========================================= */

        if (
            filteredLocations.length === 0
        ) {

            result.innerHTML = `

                <div class="location-result">

                    <h3>
                        No location found
                    </h3>

                    <p>
                        No campus location matches
                        "${searchText}".
                    </p>

                </div>

            `;

            return;

        }


        /* =========================================
           EXACT LOCATION
           ========================================= */

        const exactMatch =
            filteredLocations.find(location =>

                location.name &&

                location.name
                    .toLowerCase() ===
                searchText

            );


        if (exactMatch) {

            localStorage.setItem(
                "selectedLocationId",
                exactMatch.id
            );


            window.location.href =
                "map.html";


            return;

        }


        /* =========================================
           ONLY ONE MATCH
           ========================================= */

        if (
            filteredLocations.length === 1
        ) {

            localStorage.setItem(
                "selectedLocationId",
                filteredLocations[0].id
            );


            window.location.href =
                "map.html";


            return;

        }


        /* =========================================
           MULTIPLE SEARCH RESULTS
           ========================================= */

        result.innerHTML = `

            <div class="location-result">

                <h3>
                    Multiple locations found
                </h3>

                <p>
                    Select a location:
                </p>

            </div>

        `;


        filteredLocations.forEach(location => {

            const item =
                document.createElement("div");


            item.className =
                "location-result";


            item.innerHTML = `

                <h3>
                    ${location.name}
                </h3>

                <p>
                    <strong>Type:</strong>
                    ${location.type || "N/A"}
                </p>

                <p>
                    <strong>Building:</strong>
                    ${location.building || "N/A"}
                </p>

                <p>
                    <strong>Floor:</strong>
                    ${location.floor || "N/A"}
                </p>

                <p>
                    ${location.description || ""}
                </p>

                <button
                    type="button"
                    onclick="navigateToLocation(${location.id})">

                    View on Map

                </button>

            `;


            result.appendChild(item);

        });

    }

    catch (error) {

        console.error(
            "Search error:",
            error
        );


        if (result) {

            result.innerHTML =
                "Cannot connect to Spring Boot server.";

        }

    }

}


/* =========================================================
   SELECT LOCATION
   ========================================================= */

async function selectLocation(category) {

    let result =
        document.getElementById("result");


    if (!result) {

        return;

    }


    result.innerHTML =
        "Loading locations...";


    try {

        let response =
            await fetch(
                "http://localhost:8081/api/locations"
            );


        if (!response.ok) {

            result.innerHTML =
                "Unable to load campus locations.";

            return;

        }


        let locations =
            await response.json();


        let filteredLocations =
            filterLocationsByCategory(
                locations,
                category
            );


        if (
            filteredLocations.length === 0
        ) {

            result.innerHTML =
                "No locations found in " +
                category +
                ".";

            return;

        }


        result.innerHTML = "";


        filteredLocations.forEach(
            location => {

                let item =
                    document.createElement("div");


                item.className =
                    "location-result";


                item.innerHTML = `

                    <h3>
                        ${location.name}
                    </h3>

                    <p>
                        <strong>Type:</strong>
                        ${location.type || "N/A"}
                    </p>

                    <p>
                        <strong>Building:</strong>
                        ${location.building || "N/A"}
                    </p>

                    <p>
                        <strong>Floor:</strong>
                        ${location.floor || "N/A"}
                    </p>

                    <p>
                        ${location.description ||
                        "No description available"}
                    </p>

                    <button
                        type="button"
                        onclick="navigateToLocation(${location.id})">

                        Navigate

                    </button>

                `;


                result.appendChild(item);

            }
        );

    }

    catch (error) {

        console.error(
            "Category error:",
            error
        );


        result.innerHTML =
            "Cannot connect to Spring Boot server.";

    }

}


/* =========================================================
   NAVIGATE TO LOCATION
   ========================================================= */

function navigateToLocation(locationId) {

    localStorage.setItem(
        "selectedLocationId",
        locationId
    );


    window.location.href =
        "map.html";

}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(
    event,
    locationId
) {

    event.stopPropagation();


    let favorites =
        JSON.parse(
            localStorage.getItem(
                "favoriteLocations"
            )
        ) || [];


    locationId =
        Number(locationId);


    if (
        favorites.includes(locationId)
    ) {

        favorites =
            favorites.filter(
                id => id !== locationId
            );

    }

    else {

        favorites.push(
            locationId
        );

    }


    localStorage.setItem(
        "favoriteLocations",
        JSON.stringify(favorites)
    );


    updateFavoriteButtons();

}


/* =========================================================
   UPDATE FAVORITE BUTTONS
   ========================================================= */

function updateFavoriteButtons() {

    const favorites =
        JSON.parse(
            localStorage.getItem(
                "favoriteLocations"
            )
        ) || [];


    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {


            const locationId =
                Number(
                    button.getAttribute(
                        "data-location-id"
                    )
                );


            if (
                favorites.includes(locationId)
            ) {

                button.innerHTML =
                    "★";

                button.classList.add(
                    "favorite-active"
                );

            }

            else {

                button.innerHTML =
                    "☆";

                button.classList.remove(
                    "favorite-active"
                );

            }

        });

}


/* =========================================================
   GLOBAL DARK MODE
   ========================================================= */

function applyGlobalTheme() {

    const darkMode =
        localStorage.getItem(
            "darkMode"
        ) === "true";


    if (darkMode) {

        document.body.classList.add(
            "dark-mode"
        );

    }

    else {

        document.body.classList.remove(
            "dark-mode"
        );

    }

}


applyGlobalTheme();
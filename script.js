/* =========================================================
   GCC COMPUTER SCIENCE PORTAL
   COMPLETE JAVASCRIPT - FIXED VERSION

   FEATURES
   - Admin Login
   - Notes
   - Events
   - Seminars
   - Projects
   - Department Content
   - Text
   - PDF
   - Word
   - PowerPoint
   - Excel
   - TXT
   - Images
   - Videos
   - 1 to 20 files
   - Search
   - Filters
   - View
   - Open
   - Download
   - Edit
   - Delete
   - IndexedDB
   - FIXED DATABASE LOADING
========================================================= */


/* =====================================================
   ELEMENTS
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

const loginBtn =
    document.getElementById("loginBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const loginBox =
    document.getElementById("loginBox");

const adminBox =
    document.getElementById("adminBox");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const contentForm =
    document.getElementById("contentForm");

const contentType =
    document.getElementById("contentType");

const contentTitle =
    document.getElementById("contentTitle");

const contentText =
    document.getElementById("contentText");

const contentFile =
    document.getElementById("contentFile");

const contentSemester =
    document.getElementById("contentSemester");

const contentSubject =
    document.getElementById("contentSubject");

const departmentFields =
    document.getElementById("departmentFields");

const departmentTopic =
    document.getElementById("departmentTopic");

const noteFields =
    document.getElementById("noteFields");

const eventsGrid =
    document.getElementById("eventsGrid");

const seminarsGrid =
    document.getElementById("seminarsGrid");

const projectsGrid =
    document.getElementById("projectsGrid");

const departmentGrid =
    document.getElementById("departmentGrid");

const notesGrid =
    document.getElementById("notesGrid");

const searchInput =
    document.getElementById("searchInput");

const semesterFilter =
    document.getElementById("semesterFilter");

const typeFilter =
    document.getElementById("typeFilter");

const toast =
    document.getElementById("toast");

const editModal =
    document.getElementById("editModal");

const closeModal =
    document.getElementById("closeModal");

const editTitle =
    document.getElementById("editTitle");

const editText =
    document.getElementById("editText");

const editSemester =
    document.getElementById("editSemester");

const editSubject =
    document.getElementById("editSubject");

const saveEditBtn =
    document.getElementById("saveEditBtn");

const viewModal =
    document.getElementById("viewModal");

const closeViewModal =
    document.getElementById("closeViewModal");

const viewTitle =
    document.getElementById("viewTitle");

const viewBody =
    document.getElementById("viewBody");


let editingId = null;


/* =====================================================
   DATABASE
===================================================== */

const DB_NAME =
    "GCCComputerSciencePortal";

const DB_VERSION =
    4;

const STORE_NAME =
    "content";

let db = null;

let databaseReady = false;

let databasePromise = null;


/* =====================================================
   FILE TYPES
===================================================== */

const allowedExtensions = [

    "pdf",

    "doc",
    "docx",

    "ppt",
    "pptx",

    "xls",
    "xlsx",

    "txt",

    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",

    "mp4",
    "webm",
    "mov"

];


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "show"
            );

        }
    );

}


document
    .querySelectorAll(".nav-links a")
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (navLinks) {

                        navLinks.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }
    );


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =====================================================
   ADMIN LOGIN
===================================================== */

if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        function () {

            const username =
                usernameInput
                    ? usernameInput.value.trim()
                    : "";

            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            if (
                username === "GCC COMPUTER SCIENCE DEPARTMENT" &&
                password === "GCC#CS.DEPT@2026"
            ) {

                sessionStorage.setItem(
                    "gccAdmin",
                    "true"
                );

                showAdminPanel();

                renderAll();

                showToast(
                    "Admin login successful!"
                );

            } else {

                showToast(
                    "Wrong username or password!"
                );

            }

        }
    );

}


/* =====================================================
   SHOW ADMIN PANEL
===================================================== */

function showAdminPanel() {

    if (loginBox) {

        loginBox.classList.add(
            "hidden"
        );

    }

    if (adminBox) {

        adminBox.classList.remove(
            "hidden"
        );

    }

}


/* =====================================================
   SHOW LOGIN PANEL
===================================================== */

function showLoginPanel() {

    if (loginBox) {

        loginBox.classList.remove(
            "hidden"
        );

    }

    if (adminBox) {

        adminBox.classList.add(
            "hidden"
        );

    }

}


/* =====================================================
   ADMIN STATUS
===================================================== */

function isAdminLoggedIn() {

    return (
        sessionStorage.getItem(
            "gccAdmin"
        ) === "true"
    );

}


/* =====================================================
   LOGOUT
===================================================== */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "gccAdmin"
            );

            showLoginPanel();

            if (usernameInput) {

                usernameInput.value = "";

            }

            if (passwordInput) {

                passwordInput.value = "";

            }

            renderAll();

            showToast(
                "Logged out successfully!"
            );

        }
    );

}


/* =====================================================
   CHECK ADMIN
===================================================== */

if (isAdminLoggedIn()) {

    showAdminPanel();

}


/* =====================================================
   ENTER LOGIN
===================================================== */

if (
    passwordInput &&
    loginBtn
) {

    passwordInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                loginBtn.click();

            }

        }
    );

}


/* =====================================================
   DATABASE OPEN - FIXED
===================================================== */

function openDatabase() {

    if (databasePromise) {

        return databasePromise;

    }


    databasePromise =
        new Promise(
            function (
                resolve,
                reject
            ) {

                if (
                    !window.indexedDB
                ) {

                    databaseReady =
                        false;

                    showToast(
                        "Your browser does not support IndexedDB."
                    );

                    reject(
                        new Error(
                            "IndexedDB not supported"
                        )
                    );

                    return;

                }


                console.log(
                    "Opening IndexedDB..."
                );


                const request =
                    indexedDB.open(
                        DB_NAME,
                        DB_VERSION
                    );


                /* =========================================
                   UPGRADE
                ========================================= */

                request.onupgradeneeded =
                    function (event) {

                        const database =
                            event.target.result;


                        let store;


                        if (
                            !database.objectStoreNames.contains(
                                STORE_NAME
                            )
                        ) {

                            store =
                                database.createObjectStore(
                                    STORE_NAME,
                                    {
                                        keyPath: "id",
                                        autoIncrement: true
                                    }
                                );

                        } else {

                            store =
                                event.target
                                    .transaction
                                    .objectStore(
                                        STORE_NAME
                                    );

                        }


                        if (
                            !store.indexNames.contains(
                                "type"
                            )
                        ) {

                            store.createIndex(
                                "type",
                                "type",
                                {
                                    unique: false
                                }
                            );

                        }


                        if (
                            !store.indexNames.contains(
                                "title"
                            )
                        ) {

                            store.createIndex(
                                "title",
                                "title",
                                {
                                    unique: false
                                }
                            );

                        }


                        if (
                            !store.indexNames.contains(
                                "semester"
                            )
                        ) {

                            store.createIndex(
                                "semester",
                                "semester",
                                {
                                    unique: false
                                }
                            );

                        }


                        console.log(
                            "IndexedDB upgrade completed."
                        );

                    };


                /* =========================================
                   SUCCESS
                ========================================= */

                request.onsuccess =
                    function (event) {

                        db =
                            event.target.result;

                        databaseReady =
                            true;


                        console.log(
                            "✅ IndexedDB READY"
                        );


                        db.onversionchange =
                            function () {

                                db.close();

                                db = null;

                                databaseReady =
                                    false;

                                databasePromise =
                                    null;

                                showToast(
                                    "Database updated. Please refresh the page."
                                );

                            };


                        db.onclose =
                            function () {

                                console.warn(
                                    "IndexedDB connection closed."
                                );

                                db = null;

                                databaseReady =
                                    false;

                                databasePromise =
                                    null;

                            };


                        resolve(db);

                    };


                /* =========================================
                   ERROR
                ========================================= */

                request.onerror =
                    function (event) {

                        db = null;

                        databaseReady =
                            false;

                        databasePromise =
                            null;


                        console.error(
                            "IndexedDB error:",
                            event.target.error
                        );


                        showToast(
                            "Database could not be opened."
                        );


                        reject(
                            event.target.error
                        );

                    };


                /* =========================================
                   BLOCKED
                ========================================= */

                request.onblocked =
                    function () {

                        console.warn(
                            "IndexedDB opening is blocked."
                        );


                        databaseReady =
                            false;


                        showToast(
                            "Database is busy. Close other tabs and refresh."
                        );

                    };

            }
        );


    return databasePromise;

}


/* =====================================================
   WAIT FOR DATABASE
===================================================== */

async function waitForDatabase() {

    if (
        db &&
        databaseReady
    ) {

        return db;

    }


    try {

        return await openDatabase();

    } catch (error) {

        console.error(
            "Database initialization failed:",
            error
        );

        return null;

    }

}


/* =====================================================
   CONTENT TYPE CHANGE
===================================================== */

if (contentType) {

    contentType.addEventListener(
        "change",
        function () {

            if (noteFields) {

                noteFields.classList.add(
                    "hidden"
                );

            }


            if (departmentFields) {

                departmentFields.classList.add(
                    "hidden"
                );

            }


            if (
                contentType.value ===
                "note"
            ) {

                if (noteFields) {

                    noteFields.classList.remove(
                        "hidden"
                    );

                }

            }


            if (
                contentType.value ===
                "department"
            ) {

                if (departmentFields) {

                    departmentFields.classList.remove(
                        "hidden"
                    );

                }

            }

        }
    );

}


/* =====================================================
   GET EXTENSION
===================================================== */

function getExtension(filename) {

    if (!filename) {

        return "";

    }

    return filename
        .split(".")
        .pop()
        .toLowerCase();

}


/* =====================================================
   GET FILE CATEGORY
===================================================== */

function getFileCategory(extension) {

    if (
        extension === "pdf"
    ) {

        return "pdf";

    }


    if (
        extension === "doc" ||
        extension === "docx"
    ) {

        return "doc";

    }


    if (
        extension === "ppt" ||
        extension === "pptx"
    ) {

        return "ppt";

    }


    if (
        extension === "xls" ||
        extension === "xlsx"
    ) {

        return "xls";

    }


    if (
        extension === "txt"
    ) {

        return "txt";

    }


    if (
        [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif"
        ].includes(extension)
    ) {

        return "image";

    }


    if (
        [
            "mp4",
            "webm",
            "mov"
        ].includes(extension)
    ) {

        return "video";

    }


    return "other";

}


/* =====================================================
   ICON
===================================================== */

function getFileIcon(category) {

    if (
        category === "pdf"
    ) {

        return "📄";

    }

    if (
        category === "doc"
    ) {

        return "📝";

    }

    if (
        category === "ppt"
    ) {

        return "📊";

    }

    if (
        category === "xls"
    ) {

        return "📑";

    }

    if (
        category === "txt"
    ) {

        return "📃";

    }

    if (
        category === "image"
    ) {

        return "🖼️";

    }

    if (
        category === "video"
    ) {

        return "🎥";

    }

    return "📁";

}


/* =====================================================
   FILE ICON BY FILE
===================================================== */

function getFileIconByFile(file) {

    if (!file) {

        return "📁";

    }


    const extension =
        getExtension(
            file.name
        );


    return getFileIcon(
        getFileCategory(
            extension
        )
    );

}


/* =====================================================
   ADD CONTENT
   1 TO 20 FILES
===================================================== */

if (contentForm) {

    contentForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               ADMIN
            --------------------------------------------- */

            if (
                !isAdminLoggedIn()
            ) {

                showToast(
                    "Please login as Admin."
                );

                return;

            }


            /* ---------------------------------------------
               WAIT DATABASE
            --------------------------------------------- */

            const database =
                await waitForDatabase();


            if (!database) {

                showToast(
                    "Database could not be opened. Please refresh the page."
                );

                return;

            }


            /* ---------------------------------------------
               VALUES
            --------------------------------------------- */

            const type =
                contentType
                    ? contentType.value
                    : "";

            const title =
                contentTitle
                    ? contentTitle.value.trim()
                    : "";

            const text =
                contentText
                    ? contentText.value.trim()
                    : "";


            /* ---------------------------------------------
               FILES
            --------------------------------------------- */

            const files =
                contentFile
                    ? Array.from(
                        contentFile.files || []
                    )
                    : [];


            if (
                files.length > 20
            ) {

                showToast(
                    "Maximum 20 files are allowed."
                );

                return;

            }


            /* ---------------------------------------------
               BASIC VALIDATION
            --------------------------------------------- */

            if (
                !type ||
                !title
            ) {

                showToast(
                    "Please enter content type and title."
                );

                return;

            }


            if (
                !text &&
                files.length === 0
            ) {

                showToast(
                    "Add text or select at least one file."
                );

                return;

            }


            /* ---------------------------------------------
               NOTE VALIDATION
            --------------------------------------------- */

            if (
                type === "note"
            ) {

                if (
                    !contentSemester ||
                    !contentSemester.value
                ) {

                    showToast(
                        "Please select semester."
                    );

                    return;

                }


                if (
                    !contentSubject ||
                    !contentSubject.value.trim()
                ) {

                    showToast(
                        "Please enter subject."
                    );

                    return;

                }

            }


            /* ---------------------------------------------
               DEPARTMENT VALIDATION
            --------------------------------------------- */

            if (
                type === "department"
            ) {

                if (
                    !departmentTopic ||
                    !departmentTopic.value
                ) {

                    showToast(
                        "Please select department topic."
                    );

                    return;

                }

            }


            /* ---------------------------------------------
               CHECK FILES
            --------------------------------------------- */

            for (
                const file of files
            ) {

                const extension =
                    getExtension(
                        file.name
                    );


                if (
                    !allowedExtensions.includes(
                        extension
                    )
                ) {

                    showToast(
                        `${file.name} is not supported.`
                    );

                    return;

                }


                if (
                    file.size >
                    100 * 1024 * 1024
                ) {

                    showToast(
                        `${file.name} is larger than 100 MB.`
                    );

                    return;

                }

            }


            /* ---------------------------------------------
               FIRST FILE
            --------------------------------------------- */

            const firstFile =
                files[0] || null;


            let extension = "";

            let category = "text";


            if (firstFile) {

                extension =
                    getExtension(
                        firstFile.name
                    );

                category =
                    getFileCategory(
                        extension
                    );

            }


            /* ---------------------------------------------
               CREATE ITEM
            --------------------------------------------- */

            const item = {

                type: type,

                title: title,

                text: text,

                semester:
                    type === "note" &&
                    contentSemester
                        ? contentSemester.value
                        : "",

                subject:
                    type === "note" &&
                    contentSubject
                        ? contentSubject.value.trim()
                        : "",

                department:
                    type === "department" &&
                    departmentTopic
                        ? departmentTopic.value
                        : "",

                fileName:
                    firstFile
                        ? firstFile.name
                        : "",

                fileType:
                    firstFile
                        ? firstFile.type
                        : "",

                extension:
                    extension,

                category:
                    category,

                file:
                    firstFile || null,

                files:
                    files,

                fileCount:
                    files.length,

                createdAt:
                    new Date().toISOString()

            };


            /* ---------------------------------------------
               SAVE TO DATABASE
            --------------------------------------------- */

            try {

                const transaction =
                    database.transaction(
                        [STORE_NAME],
                        "readwrite"
                    );


                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );


                const addRequest =
                    store.add(item);


                addRequest.onsuccess =
                    function () {

                        console.log(
                            "Content saved:",
                            item
                        );


                        if (contentForm) {

                            contentForm.reset();

                        }


                        if (noteFields) {

                            noteFields.classList.add(
                                "hidden"
                            );

                        }


                        if (departmentFields) {

                            departmentFields.classList.add(
                                "hidden"
                            );

                        }


                        renderAll();


                        if (
                            files.length > 0
                        ) {

                            showToast(
                                `${files.length} file(s) uploaded successfully!`
                            );

                        } else {

                            showToast(
                                "Content added successfully!"
                            );

                        }

                    };


                addRequest.onerror =
                    function () {

                        console.error(
                            "Add error:",
                            addRequest.error
                        );


                        showToast(
                            "Could not save content."
                        );

                    };


            } catch (error) {

                console.error(
                    "Save error:",
                    error
                );


                showToast(
                    "Could not save content."
                );

            }

        }
    );

}


/* =====================================================
   GET ALL CONTENT
===================================================== */

async function getAllContent() {

    const database =
        await waitForDatabase();


    if (!database) {

        return [];

    }


    return new Promise(
        function (
            resolve,
            reject
        ) {

            try {

                const transaction =
                    database.transaction(
                        [STORE_NAME],
                        "readonly"
                    );


                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );


                const request =
                    store.getAll();


                request.onsuccess =
                    function () {

                        resolve(
                            request.result || []
                        );

                    };


                request.onerror =
                    function () {

                        console.error(
                            "getAll error:",
                            request.error
                        );


                        reject(
                            request.error
                        );

                    };


            } catch (error) {

                reject(error);

            }

        }
    );

}


/* =====================================================
   GET ONE CONTENT
===================================================== */

async function getContent(id) {

    const database =
        await waitForDatabase();


    if (!database) {

        return null;

    }


    return new Promise(
        function (
            resolve,
            reject
        ) {

            try {

                const transaction =
                    database.transaction(
                        [STORE_NAME],
                        "readonly"
                    );


                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );


                const request =
                    store.get(
                        Number(id)
                    );


                request.onsuccess =
                    function () {

                        resolve(
                            request.result
                        );

                    };


                request.onerror =
                    function () {

                        reject(
                            request.error
                        );

                    };


            } catch (error) {

                reject(error);

            }

        }
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(
        value || ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =====================================================
   RENDER ALL
===================================================== */

async function renderAll() {

    try {

        const all =
            await getAllContent();


        if (eventsGrid) {

            renderType(
                all,
                "event",
                eventsGrid
            );

        }


        if (seminarsGrid) {

            renderType(
                all,
                "seminar",
                seminarsGrid
            );

        }


        if (projectsGrid) {

            renderType(
                all,
                "project",
                projectsGrid
            );

        }


        if (departmentGrid) {

            renderDepartment(
                all
            );

        }


        if (notesGrid) {

            renderNotes(
                all
            );

        }

    } catch (error) {

        console.error(
            "Render error:",
            error
        );

    }

}


/* =====================================================
   RENDER TYPE
===================================================== */

function renderType(
    all,
    type,
    container
) {

    if (!container) {

        return;

    }


    container.innerHTML = "";


    const items =
        all

            .filter(
                item =>
                    item.type === type
            )

            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt
                    ) -
                    new Date(
                        a.createdAt
                    )
            );


    if (!items.length) {

        container.innerHTML = `

            <div class="empty">

                <div class="empty-icon">

                    ${
                        type === "event"
                            ? "🎉"
                            : type === "seminar"
                                ? "🎤"
                                : "🚀"
                    }

                </div>

                <h3>
                    No ${escapeHTML(type)}
                    content available
                </h3>

                <p>
                    Admin can add content from
                    the Admin section.
                </p>

            </div>

        `;

        return;

    }


    items.forEach(
        item => {

            container.appendChild(
                createContentCard(
                    item
                )
            );

        }
    );

}


/* =====================================================
   RENDER DEPARTMENT
===================================================== */

function renderDepartment(all) {

    if (!departmentGrid) {

        return;

    }


    departmentGrid.innerHTML = "";


    const items =
        all.filter(
            item =>
                item.type ===
                "department"
        );


    if (!items.length) {

        departmentGrid.innerHTML = `

            <div class="empty">

                <div class="empty-icon">
                    💻
                </div>

                <h3>
                    Select a department card
                </h3>

                <p>
                    Click a department card above
                    to view its resources.
                </p>

            </div>

        `;

        return;

    }


    items

        .sort(
            (a, b) =>
                new Date(
                    b.createdAt
                ) -
                new Date(
                    a.createdAt
                )
        )

        .forEach(
            item => {

                departmentGrid.appendChild(
                    createContentCard(
                        item
                    )
                );

            }
        );

}


/* =====================================================
   RENDER NOTES
===================================================== */

function renderNotes(
    allNotes = null
) {

    if (!notesGrid) {

        return;

    }


    if (!allNotes) {

        getAllContent()
            .then(
                notes =>
                    renderNotes(notes)
            )
            .catch(
                error =>
                    console.error(error)
            );

        return;

    }


    notesGrid.innerHTML = "";


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const semester =
        semesterFilter
            ? semesterFilter.value
            : "all";


    const fileType =
        typeFilter
            ? typeFilter.value
            : "all";


    const notes =
        allNotes

            .filter(
                item =>
                    item.type ===
                    "note"
            )

            .filter(
                note => {

                    const name =
                        (
                            note.title ||
                            ""
                        ).toLowerCase();


                    const subject =
                        (
                            note.subject ||
                            ""
                        ).toLowerCase();


                    const filename =
                        (
                            note.fileName ||
                            ""
                        ).toLowerCase();


                    const text =
                        (
                            note.text ||
                            ""
                        ).toLowerCase();


                    const searchMatch =
                        name.includes(search) ||
                        subject.includes(search) ||
                        filename.includes(search) ||
                        text.includes(search);


                    const semesterMatch =
                        semester === "all" ||
                        note.semester === semester;


                    const typeMatch =
                        fileType === "all" ||
                        note.category === fileType;


                    return (
                        searchMatch &&
                        semesterMatch &&
                        typeMatch
                    );

                }
            )

            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt
                    ) -
                    new Date(
                        a.createdAt
                    )
            );


    if (!notes.length) {

        notesGrid.innerHTML = `

            <div class="empty">

                <div class="empty-icon">
                    📚
                </div>

                <h3>
                    No Notes Found
                </h3>

                <p>
                    Admin can upload notes
                    from the Admin section.
                </p>

            </div>

        `;

        return;

    }


    notes.forEach(
        note => {

            notesGrid.appendChild(
                createContentCard(
                    note
                )
            );

        }
    );

}


/* =====================================================
   CREATE FILE LIST
===================================================== */

function createFilesHTML(item) {

    let files = [];


    if (
        Array.isArray(
            item.files
        ) &&
        item.files.length > 0
    ) {

        files =
            item.files;

    }

    else if (
        item.file
    ) {

        files =
            [item.file];

    }


    if (!files.length) {

        return "";

    }


    let html = `

        <div class="uploaded-files">

            <strong>
                📎 Files (${files.length})
            </strong>

            <div class="file-list">

    `;


    files.forEach(
        function (
            file,
            index
        ) {

            const fileName =
                file.name ||
                `File ${index + 1}`;


            const icon =
                getFileIconByFile(
                    file
                );


            html += `

                <div class="uploaded-file-row">

                    <span class="uploaded-file-name">

                        ${icon}

                        ${escapeHTML(
                            fileName
                        )}

                    </span>


                    <div class="file-buttons">

                        <button
                            type="button"
                            class="small-btn view-btn"
                            data-action="viewfile"
                            data-id="${item.id}"
                            data-file-index="${index}"
                        >
                            👁️ View
                        </button>


                        <button
                            type="button"
                            class="small-btn view-btn"
                            data-action="openfile"
                            data-id="${item.id}"
                            data-file-index="${index}"
                        >
                            📂 Open
                        </button>


                        <button
                            type="button"
                            class="small-btn download-btn"
                            data-action="downloadfile"
                            data-id="${item.id}"
                            data-file-index="${index}"
                        >
                            ⬇️ Download
                        </button>

                    </div>

                </div>

            `;

        }
    );


    html += `

            </div>

        </div>

    `;


    return html;

}


/* =====================================================
   CREATE CONTENT CARD
===================================================== */

function createContentCard(item) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "content-card";


    const icon =
        getFileIcon(
            item.category
        );


    let typeName = "";


    if (
        item.type === "event"
    ) {

        typeName =
            "Event";

    }


    if (
        item.type === "seminar"
    ) {

        typeName =
            "Seminar";

    }


    if (
        item.type === "project"
    ) {

        typeName =
            "Project";

    }


    if (
        item.type === "department"
    ) {

        typeName =
            "Department";

    }


    if (
        item.type === "note"
    ) {

        typeName =
            "Note";

    }


    card.innerHTML = `

        <div class="content-icon">
            ${icon}
        </div>


        <span class="content-badge">
            ${escapeHTML(typeName)}
        </span>


        <h3>
            ${escapeHTML(item.title)}
        </h3>


        ${
            item.department
                ? `

                    <p class="meta-line">

                        💻
                        ${escapeHTML(
                            item.department
                        )}

                    </p>

                  `
                : ""
        }


        ${
            item.semester
                ? `

                    <p class="meta-line">

                        📚 Semester:
                        ${escapeHTML(
                            item.semester
                        )}

                    </p>

                  `
                : ""
        }


        ${
            item.subject
                ? `

                    <p class="meta-line">

                        📖 Subject:
                        ${escapeHTML(
                            item.subject
                        )}

                    </p>

                  `
                : ""
        }


        ${
            item.text
                ? `

                    <p class="content-description">

                        ${escapeHTML(
                            item.text.substring(
                                0,
                                180
                            )
                        )}

                        ${
                            item.text.length > 180
                                ? "..."
                                : ""
                        }

                    </p>

                  `
                : ""
        }


        ${createFilesHTML(item)}


        <div class="content-actions">

            ${
                item.text
                    ? `

                        <button
                            class="small-btn view-btn"
                            data-action="view"
                            data-id="${item.id}"
                            type="button"
                        >
                            👁️ View Text
                        </button>

                      `
                    : ""
            }


            ${
                isAdminLoggedIn()
                    ? `

                        <button
                            class="small-btn edit-btn"
                            data-action="edit"
                            data-id="${item.id}"
                            type="button"
                        >
                            ✏️ Edit
                        </button>


                        <button
                            class="small-btn delete-btn"
                            data-action="delete"
                            data-id="${item.id}"
                            type="button"
                        >
                            🗑️ Delete
                        </button>

                      `
                    : ""
            }

        </div>

    `;


    return card;

}


/* =====================================================
   GET ITEM FILES
===================================================== */

function getItemFiles(item) {

    if (
        item &&
        Array.isArray(
            item.files
        ) &&
        item.files.length
    ) {

        return item.files;

    }


    if (
        item &&
        item.file
    ) {

        return [
            item.file
        ];

    }


    return [];

}


/* =====================================================
   GET SINGLE FILE
===================================================== */

function getSingleFile(
    item,
    index
) {

    const files =
        getItemFiles(
            item
        );


    if (
        index < 0 ||
        index >= files.length
    ) {

        return null;

    }


    return files[index];

}


/* =====================================================
   CLICK EVENTS
===================================================== */

document.addEventListener(
    "click",
    async function (event) {

        const button =
            event.target.closest(
                "button[data-action]"
            );


        if (!button) {

            return;

        }


        const action =
            button.dataset.action;


        const id =
            Number(
                button.dataset.id
            );


        const fileIndex =
            Number(
                button.dataset.fileIndex || 0
            );


        if (
            action === "view"
        ) {

            await viewContent(
                id
            );

        }


        if (
            action === "viewfile"
        ) {

            await viewSingleFile(
                id,
                fileIndex
            );

        }


        if (
            action === "openfile"
        ) {

            await openSingleFile(
                id,
                fileIndex
            );

        }


        if (
            action === "downloadfile"
        ) {

            await downloadSingleFile(
                id,
                fileIndex
            );

        }


        if (
            action === "edit"
        ) {

            await openEdit(
                id
            );

        }


        if (
            action === "delete"
        ) {

            await deleteContent(
                id
            );

        }

    }
);


/* =====================================================
   VIEW CONTENT
===================================================== */

async function viewContent(id) {

    try {

        const item =
            await getContent(
                id
            );


        if (!item) {

            showToast(
                "Content not found."
            );

            return;

        }


        if (viewTitle) {

            viewTitle.textContent =
                item.title;

        }


        let html = "";


        if (item.text) {

            html += `

                <div class="full-text">

                    ${escapeHTML(
                        item.text
                    ).replaceAll(
                        "\n",
                        "<br>"
                    )}

                </div>

            `;

        }


        const files =
            getItemFiles(
                item
            );


        if (
            files.length
        ) {

            html += `

                <div class="modal-file-list">

                    <h4>
                        📎 Uploaded Files
                    </h4>

            `;


            files.forEach(
                function (
                    file,
                    index
                ) {

                    html += `

                        <div
                            class="modal-file-row"
                        >

                            ${getFileIconByFile(
                                file
                            )}

                            ${escapeHTML(
                                file.name ||
                                `File ${index + 1}`
                            )}


                            <button
                                type="button"
                                class="small-btn view-btn"
                                data-action="viewfile"
                                data-id="${item.id}"
                                data-file-index="${index}"
                            >
                                👁️ View
                            </button>


                            <button
                                type="button"
                                class="small-btn view-btn"
                                data-action="openfile"
                                data-id="${item.id}"
                                data-file-index="${index}"
                            >
                                📂 Open
                            </button>


                            <button
                                type="button"
                                class="small-btn download-btn"
                                data-action="downloadfile"
                                data-id="${item.id}"
                                data-file-index="${index}"
                            >
                                ⬇️ Download
                            </button>

                        </div>

                    `;

                }
            );


            html += `

                </div>

            `;

        }


        if (!html) {

            html = `

                <p>
                    No content available.
                </p>

            `;

        }


        if (viewBody) {

            viewBody.innerHTML =
                html;

        }


        if (viewModal) {

            viewModal.classList.add(
                "show"
            );

        }

    } catch (error) {

        console.error(
            "View error:",
            error
        );

        showToast(
            "Unable to view content."
        );

    }

}


/* =====================================================
   VIEW SINGLE FILE
===================================================== */

async function viewSingleFile(
    id,
    fileIndex
) {

    try {

        const item =
            await getContent(
                id
            );


        if (!item) {

            showToast(
                "Content not found."
            );

            return;

        }


        const file =
            getSingleFile(
                item,
                fileIndex
            );


        if (!file) {

            showToast(
                "File not found."
            );

            return;

        }


        const url =
            URL.createObjectURL(
                file
            );


        const category =
            getFileCategory(
                getExtension(
                    file.name
                )
            );


        if (viewTitle) {

            viewTitle.textContent =
                file.name;

        }


        let html = "";


        if (
            category === "image"
        ) {

            html = `

                <div class="preview-area">

                    <img
                        src="${url}"
                        class="preview-image"
                        alt="${escapeHTML(
                            file.name
                        )}"
                    >

                </div>

            `;

        }


        else if (
            category === "video"
        ) {

            html = `

                <div class="preview-area">

                    <video
                        class="preview-video"
                        controls
                    >

                        <source
                            src="${url}"
                            type="${escapeHTML(
                                file.type || ""
                            )}"
                        >

                    </video>

                </div>

            `;

        }


        else if (
            category === "pdf"
        ) {

            html = `

                <div class="preview-area">

                    <iframe
                        src="${url}"
                        class="pdf-preview"
                    ></iframe>

                </div>

            `;

        }


        else if (
            category === "txt"
        ) {

            try {

                const text =
                    await file.text();


                html = `

                    <div class="full-text">

                        ${escapeHTML(
                            text
                        ).replaceAll(
                            "\n",
                            "<br>"
                        )}

                    </div>

                `;

            } catch (error) {

                html = `

                    <p>
                        Unable to preview this text file.
                    </p>

                `;

            }

        }


        else {

            html = `

                <div class="preview-area">

                    <div class="empty-icon">
                        📎
                    </div>

                    <h3>
                        ${escapeHTML(
                            file.name
                        )}
                    </h3>

                    <p>
                        This file type should be downloaded
                        and opened with its respective application.
                    </p>


                    <button
                        type="button"
                        class="small-btn download-btn"
                        data-action="downloadfile"
                        data-id="${item.id}"
                        data-file-index="${fileIndex}"
                    >
                        ⬇️ Download
                    </button>

                </div>

            `;

        }


        if (viewBody) {

            viewBody.innerHTML =
                html;

        }


        if (viewModal) {

            viewModal.classList.add(
                "show"
            );

        }


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    url
                );

            },
            60000
        );

    } catch (error) {

        console.error(
            "File view error:",
            error
        );

        showToast(
            "Unable to view file."
        );

    }

}


/* =====================================================
   OPEN SINGLE FILE
===================================================== */

async function openSingleFile(
    id,
    fileIndex
) {

    try {

        const item =
            await getContent(
                id
            );


        if (!item) {

            showToast(
                "Content not found."
            );

            return;

        }


        const file =
            getSingleFile(
                item,
                fileIndex
            );


        if (!file) {

            showToast(
                "File not found."
            );

            return;

        }


        const url =
            URL.createObjectURL(
                file
            );


        const category =
            getFileCategory(
                getExtension(
                    file.name
                )
            );


        if (
            category === "pdf" ||
            category === "image" ||
            category === "video" ||
            category === "txt"
        ) {

            window.open(
                url,
                "_blank"
            );

        } else {

            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                file.name;


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();

        }


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    url
                );

            },
            60000
        );

    } catch (error) {

        console.error(
            "Open error:",
            error
        );

        showToast(
            "Unable to open file."
        );

    }

}


/* =====================================================
   DOWNLOAD SINGLE FILE
===================================================== */

async function downloadSingleFile(
    id,
    fileIndex
) {

    try {

        const item =
            await getContent(
                id
            );


        if (!item) {

            showToast(
                "Content not found."
            );

            return;

        }


        const file =
            getSingleFile(
                item,
                fileIndex
            );


        if (!file) {

            showToast(
                "File not found."
            );

            return;

        }


        const url =
            URL.createObjectURL(
                file
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            file.name ||
            `file-${fileIndex + 1}`;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    url
                );

            },
            5000
        );


        showToast(
            "Download started!"
        );

    } catch (error) {

        console.error(
            "Download error:",
            error
        );

        showToast(
            "Download failed."
        );

    }

}


/* =====================================================
   OLD OPEN FILE SUPPORT
===================================================== */

async function openFile(id) {

    await openSingleFile(
        id,
        0
    );

}


/* =====================================================
   OLD DOWNLOAD SUPPORT
===================================================== */

async function downloadFile(id) {

    await downloadSingleFile(
        id,
        0
    );

}


/* =====================================================
   DELETE CONTENT
===================================================== */

async function deleteContent(id) {

    if (
        !isAdminLoggedIn()
    ) {

        showToast(
            "Please login as Admin first."
        );

        const admin =
            document.getElementById(
                "admin"
            );


        if (admin) {

            admin.scrollIntoView({
                behavior: "smooth"
            });

        }

        return;

    }


    const item =
        await getContent(
            id
        );


    if (!item) {

        showToast(
            "Content not found."
        );

        return;

    }


    const confirmDelete =
        confirm(
            `Delete "${item.title}"?`
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const database =
            await waitForDatabase();


        if (!database) {

            showToast(
                "Database is not ready."
            );

            return;

        }


        const transaction =
            database.transaction(
                [STORE_NAME],
                "readwrite"
            );


        const store =
            transaction.objectStore(
                STORE_NAME
            );


        const deleteRequest =
            store.delete(
                Number(id)
            );


        deleteRequest.onsuccess =
            function () {

                renderAll();

                showToast(
                    "Deleted successfully!"
                );

            };


        deleteRequest.onerror =
            function () {

                console.error(
                    deleteRequest.error
                );


                showToast(
                    "Could not delete content."
                );

            };

    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

        showToast(
            "Could not delete content."
        );

    }

}


/* =====================================================
   EDIT
===================================================== */

async function openEdit(id) {

    if (
        !isAdminLoggedIn()
    ) {

        showToast(
            "Please login as Admin first."
        );

        return;

    }


    const item =
        await getContent(
            id
        );


    if (!item) {

        showToast(
            "Content not found."
        );

        return;

    }


    editingId =
        id;


    if (editTitle) {

        editTitle.value =
            item.title || "";

    }


    if (editText) {

        editText.value =
            item.text || "";

    }


    if (editSemester) {

        editSemester.value =
            item.semester || "";

    }


    if (editSubject) {

        editSubject.value =
            item.subject || "";

    }


    if (editModal) {

        editModal.classList.add(
            "show"
        );

    }

}


/* =====================================================
   SAVE EDIT
===================================================== */

if (saveEditBtn) {

    saveEditBtn.addEventListener(
        "click",
        async function () {

            if (
                editingId === null
            ) {

                return;

            }


            if (
                !isAdminLoggedIn()
            ) {

                showToast(
                    "Please login as Admin."
                );

                return;

            }


            const title =
                editTitle
                    ? editTitle.value.trim()
                    : "";


            const text =
                editText
                    ? editText.value.trim()
                    : "";


            const semester =
                editSemester
                    ? editSemester.value
                    : "";


            const subject =
                editSubject
                    ? editSubject.value.trim()
                    : "";


            if (!title) {

                showToast(
                    "Title is required."
                );

                return;

            }


            const item =
                await getContent(
                    editingId
                );


            if (!item) {

                showToast(
                    "Content not found."
                );

                return;

            }


            item.title =
                title;

            item.text =
                text;

            item.semester =
                semester;

            item.subject =
                subject;


            try {

                const database =
                    await waitForDatabase();


                if (!database) {

                    showToast(
                        "Database is not ready."
                    );

                    return;

                }


                const transaction =
                    database.transaction(
                        [STORE_NAME],
                        "readwrite"
                    );


                const store =
                    transaction.objectStore(
                        STORE_NAME
                    );


                const updateRequest =
                    store.put(
                        item
                    );


                updateRequest.onsuccess =
                    function () {

                        if (editModal) {

                            editModal.classList.remove(
                                "show"
                            );

                        }


                        editingId =
                            null;


                        renderAll();


                        showToast(
                            "Updated successfully!"
                        );

                    };


                updateRequest.onerror =
                    function () {

                        console.error(
                            updateRequest.error
                        );


                        showToast(
                            "Could not update content."
                        );

                    };

            } catch (error) {

                console.error(
                    "Update error:",
                    error
                );


                showToast(
                    "Could not update content."
                );

            }

        }
    );

}


/* =====================================================
   CLOSE EDIT MODAL
===================================================== */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        function () {

            if (editModal) {

                editModal.classList.remove(
                    "show"
                );

            }

            editingId =
                null;

        }
    );

}


/* =====================================================
   CLOSE VIEW MODAL
===================================================== */

if (closeViewModal) {

    closeViewModal.addEventListener(
        "click",
        function () {

            if (viewModal) {

                viewModal.classList.remove(
                    "show"
                );

            }


            if (viewBody) {

                viewBody.innerHTML =
                    "";

            }

        }
    );

}


/* =====================================================
   EDIT MODAL BACKGROUND
===================================================== */

if (editModal) {

    editModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                editModal
            ) {

                editModal.classList.remove(
                    "show"
                );

                editingId =
                    null;

            }

        }
    );

}


/* =====================================================
   VIEW MODAL BACKGROUND
===================================================== */

if (viewModal) {

    viewModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                viewModal
            ) {

                viewModal.classList.remove(
                    "show"
                );


                if (viewBody) {

                    viewBody.innerHTML =
                        "";

                }

            }

        }
    );

}


/* =====================================================
   SEARCH
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            renderNotes();

        }
    );

}


/* =====================================================
   SEMESTER FILTER
===================================================== */

if (semesterFilter) {

    semesterFilter.addEventListener(
        "change",
        function () {

            renderNotes();

        }
    );

}


/* =====================================================
   TYPE FILTER
===================================================== */

if (typeFilter) {

    typeFilter.addEventListener(
        "change",
        function () {

            renderNotes();

        }
    );

}


/* =====================================================
   DEPARTMENT CARD CLICK
===================================================== */

document
    .querySelectorAll(
        ".department-card"
    )
    .forEach(
        function (card) {

            card.addEventListener(
                "click",
                async function () {

                    const topic =
                        card.dataset.dept;


                    const all =
                        await getAllContent();


                    const matching =
                        all.filter(
                            item =>
                                item.type ===
                                "department" &&
                                item.department ===
                                topic
                        );


                    const departmentTitle =
                        document.getElementById(
                            "departmentContentTitle"
                        );


                    if (
                        departmentTitle
                    ) {

                        departmentTitle.textContent =
                            `${topic} Resources`;

                    }


                    if (
                        departmentGrid
                    ) {

                        departmentGrid.innerHTML =
                            "";

                    }


                    if (
                        !matching.length
                    ) {

                        if (
                            departmentGrid
                        ) {

                            departmentGrid.innerHTML = `

                                <div class="empty">

                                    <div class="empty-icon">
                                        📚
                                    </div>

                                    <h3>
                                        ${escapeHTML(
                                            topic
                                        )}
                                    </h3>

                                    <p>
                                        No resources added yet.
                                        Admin can add text,
                                        images, videos and
                                        documents for this topic.
                                    </p>

                                </div>

                            `;

                        }

                    } else {

                        matching

                            .sort(
                                (a, b) =>
                                    new Date(
                                        b.createdAt
                                    ) -
                                    new Date(
                                        a.createdAt
                                    )
                            )

                            .forEach(
                                item => {

                                    if (
                                        departmentGrid
                                    ) {

                                        departmentGrid.appendChild(
                                            createContentCard(
                                                item
                                            )
                                        );

                                    }

                                }
                            );

                    }


                    const departmentContent =
                        document.getElementById(
                            "departmentContent"
                        );


                    if (
                        departmentContent
                    ) {

                        departmentContent.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            if (editModal) {

                editModal.classList.remove(
                    "show"
                );

            }


            if (viewModal) {

                viewModal.classList.remove(
                    "show"
                );

            }


            editingId =
                null;


            if (viewBody) {

                viewBody.innerHTML =
                    "";

            }

        }

    }
);


/* =====================================================
   INITIAL DATABASE START
===================================================== */

window.addEventListener(
    "load",
    async function () {

        console.log(
            "GCC Computer Science Portal loading..."
        );


        try {

            await waitForDatabase();


            console.log(
                "✅ Database ready."
            );


            await renderAll();

        } catch (error) {

            console.error(
                "Initial loading error:",
                error
            );

        }

    }
);
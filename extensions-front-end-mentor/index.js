const extensionsArray = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

const all = document.getElementById("all");
const active = document.getElementById("active");
const inactive = document.getElementById("inactive");
const theme = document.querySelector(".theme");

theme.addEventListener("click", () => {
  document.querySelector(".moon").classList.toggle("hide")
  document.querySelector(".day").classList.toggle("hide")
  document.body.classList.toggle("dark");
});

function updateExtensionLists() {
  const activeExtensions = extensionsArray.filter(extension => extension.isActive);
  const inactiveExtensions = extensionsArray.filter(extension => !extension.isActive);

  all.addEventListener("click", () => renderExtensions(extensionsArray));
  active.addEventListener("click", () => renderExtensions(activeExtensions));
  inactive.addEventListener("click", () => renderExtensions(inactiveExtensions));
}

function renderExtensions(extensionsToRender) {
  extensions.innerHTML = extensionsToRender
    .map(
      (extension, index) => `
    <div class="extension">
        <div class="extension-info">
            <div class="icon">
                <img src="${extension.logo}" alt="" />
            </div>
            <div class="icon-text">
                <h3>${extension.name}</h3>
                <p>${extension.description}</p>
            </div>
        </div>
        <div class="button-and-toggle">
            <button class="btn remove">Remove</button>
            <label class="switch">
                <input type="checkbox" ${
                  extension.isActive ? "checked" : ""
                } data-index="${index}" />
                <span class="slider round"></span>
            </label>
        </div>
    </div>
  `
    )
    .join("");

  document
    .querySelectorAll('.extension input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const index = e.target.getAttribute("data-index");
        extensionsArray[index].isActive = e.target.checked;
        console.log(
          `Extension: ${extensionsArray[index].name} isActive: ${extensionsArray[index].isActive}`
        );

        updateExtensionLists();
      });
    });
}

renderExtensions(extensionsArray);

updateExtensionLists();

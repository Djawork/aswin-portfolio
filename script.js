(() => {
  const panels = [...document.querySelectorAll(".panel")];
  const accordion = document.querySelector("#accordion");
  let activeIndex = 0;
  const activate = (index) => {
    activeIndex = index;
    panels.forEach((panel, i) => {
      const active = i === index;
      panel.classList.toggle("active", active);
      panel.setAttribute("aria-expanded", String(active));
    });
  };

  // Desktop: hover previews a panel. Click and keyboard also select it.
  panels.forEach((panel, index) => {
    panel.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) activate(index);
    });
    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      activate(index);
    });
    panel.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(index);
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        const next = (activeIndex + 1) % panels.length;
        activate(next); panels[next].focus();
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const prev = (activeIndex - 1 + panels.length) % panels.length;
        activate(prev); panels[prev].focus();
      }
    });
  });

  // On touch screens, clicking a panel toggles the active expanded panel.
  // Keep one panel open so the layout remains easy to navigate.
  activate(0);
})();

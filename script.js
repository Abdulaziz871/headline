document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.querySelector(".topbar");
  const revealItems = document.querySelectorAll(".reveal");

  const updateTopbarState = () => {
    if (!topbar) {
      return;
    }

    topbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));

  const marquee = document.querySelector(".marquee-track");
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }

  updateTopbarState();
  window.addEventListener("scroll", updateTopbarState, { passive: true });

  const aboutChoices = document.querySelectorAll(".about-choice");
  const aboutDetailTitle = document.querySelector(".about-detail-title");
  const aboutDetailText = document.querySelector(".about-detail-text");

  if (aboutChoices.length && aboutDetailTitle && aboutDetailText) {
    const renderTextWithAccentFirstWord = (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed) {
        return "";
      }

      const firstSpace = trimmed.indexOf(" ");
      if (firstSpace === -1) {
        return `<span class="accent-word">${trimmed}</span>`;
      }

      const firstWord = trimmed.slice(0, firstSpace);
      const rest = trimmed.slice(firstSpace + 1);
      return `<span class="accent-word">${firstWord}</span> ${rest}`;
    };

    const activateChoice = (choice) => {
      aboutChoices.forEach((item) => {
        item.classList.remove("is-active", "stat-card--accent");
      });

      choice.classList.add("is-active", "stat-card--accent");
      aboutDetailTitle.innerHTML = renderTextWithAccentFirstWord(choice.dataset.title);
      aboutDetailText.textContent = choice.dataset.text || "";
    };

    aboutChoices.forEach((choice) => {
      choice.addEventListener("click", () => activateChoice(choice));
    });

    const initiallyActive = document.querySelector(".about-choice.is-active") || aboutChoices[0];
    if (initiallyActive) {
      activateChoice(initiallyActive);
    }
  }
});
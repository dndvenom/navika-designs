const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const galleryButtons = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const externalLinks = document.querySelectorAll("[data-external-link]");

const setHeaderState = () => {
    header.classList.toggle("scrolled", window.scrollY > 18);
};

const closeMenu = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

const openLightbox = (src, alt) => {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
};

galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openLightbox(button.dataset.image, button.dataset.alt);
    });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

externalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const href = link.getAttribute("href");
    const kind = link.dataset.linkKind;

    if (!href) {
      return;
    }

    if (kind === "mailto") {
      window.location.href = href;
      return;
    }

    const newWindow = window.open(href, "_blank", "noopener,noreferrer");

    if (!newWindow) {
      window.location.href = href;
    }
  });
});

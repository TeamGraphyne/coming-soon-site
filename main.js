gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

// ===== SHAPE OVERLAYS LOADER =====
let overlay = document.querySelector(".shape-overlays");
let paths = document.querySelectorAll(".shape-overlays__path");
let numPoints = 10;
let numPaths = paths.length;
let delayPointsMax = 0.3;
let delayPerPath = 0.25;
let duration = 0.9;
let isOpened = false;
let pointsDelay = [];
let allPoints = [];
let loaderTl = gsap.timeline({
  onUpdate: renderLoader,
  defaults: {
    ease: "power2.inOut",
    duration: 0.9,
  },
});

for (let i = 0; i < numPaths; i++) {
  let points = [];
  allPoints.push(points);
  for (let j = 0; j < numPoints; j++) {
    points.push(100);
  }
}

function toggleLoader() {
  loaderTl.progress(0).clear();

  for (let i = 0; i < numPoints; i++) {
    pointsDelay[i] = Math.random() * delayPointsMax;
  }

  for (let i = 0; i < numPaths; i++) {
    let points = allPoints[i];
    let pathDelay = delayPerPath * (isOpened ? i : numPaths - i - 1);

    for (let j = 0; j < numPoints; j++) {
      let delay = pointsDelay[j];
      loaderTl.to(
        points,
        {
          [j]: 0,
        },
        delay + pathDelay
      );
    }
  }
}

function renderLoader() {
  for (let i = 0; i < numPaths; i++) {
    let path = paths[i];
    let points = allPoints[i];

    let d = "";
    d += isOpened ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;

    for (let j = 0; j < numPoints - 1; j++) {
      let p = ((j + 1) / (numPoints - 1)) * 100;
      let cp = p - ((1 / (numPoints - 1)) * 100) / 2;
      d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
    }

    d += isOpened ? ` V 100 H 0` : ` V 0 H 0`;
    path.setAttribute("d", d);
  }
}

// Start the loader animation
isOpened = false;
toggleLoader();

// Wait for loader to finish, then reveal content
loaderTl.eventCallback("onComplete", () => {
  setTimeout(() => {
    // Hide the loader overlay
    gsap.to(".shape-overlays", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        overlay.style.display = "none";
      },
    });

    // Fade in main container after loader finishes
    gsap.to(".container", {
      opacity: 1,
      duration: 0.5,
      onComplete: startMainAnimation,
    });
  }, 300);
});

// ===== MAIN PAGE ANIMATIONS =====
function startMainAnimation() {
  // Animate background gradient
  gsap.to(".bg-gradient", {
    rotation: 360,
    duration: 60,
    repeat: -1,
    ease: "none",
  });

  // Animate shapes
  gsap.to(".shape1", {
    x: 100,
    y: 50,
    scale: 1.2,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".shape2", {
    x: -80,
    y: -60,
    scale: 0.8,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".shape3", {
    x: 60,
    y: 80,
    scale: 1.1,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Main animation timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Logo fade in
  tl.to(
    ".logo",
    {
      opacity: 1,
      duration: 1,
      y: 0,
    },
    "0.2"
  );

  // Title words animation
  tl.to(
    ".title-word",
    {
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
    },
    "0"
  );

  tl.to(
    ".title-word",
    {
      text: "COMING SOON",
      duration: 1.6,
      ease: "power2.out",
      scrambleText: { chars: "0123456789!@#$%^&*()<>?", speed: 1 },
    },
    "+=0.5"
  );

  // Subtitle
  tl.to(
    ".subtitle",
    {
      opacity: 1,
      duration: 1.5,
      y: 0,
    },
    "-=1.5"
  );

  // CTA
  tl.to(
    ".cta",
    {
      opacity: 1,
      duration: 0.8,
      y: 0,
    },
    "-=1.4"
  );

  // Features
  tl.to(
    ".features",
    {
      opacity: 1,
      duration: 0.8,
      y: 0,
    },
    "-=0.4"
  );
}

// Form submission animation
document.querySelector("button").addEventListener("click", (e) => {
  const button = e.target;
  const originalText = button.textContent;

  gsap.to(button, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      button.textContent = "This Button does nothing!";
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    },
  });
});

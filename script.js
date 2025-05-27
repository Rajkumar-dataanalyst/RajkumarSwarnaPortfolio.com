// Smooth Scrolling for Section Boxes
document.querySelectorAll('.section-box').forEach(box => {
  box.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offset = 0; // No offset for sticky header
      const targetPosition = targetSection.offsetTop - offset;

      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Ensure the contact section is visible only when directly navigating to it
        if (targetId === 'contact') {
          contactSection.classList.remove('hidden');
        }
      }, 100); // Small delay for better UX
    } else {
      console.error(`Target section with ID "${targetId}" not found.`);
    }
  });
});

// Highlight Active Section on Scroll
const sections = document.querySelectorAll('.full-page');
const sectionBoxes = document.querySelectorAll('.section-box');
const contactSection = document.getElementById('contact');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        sectionBoxes.forEach(box => {
          box.classList.remove('active');
          if (box.getAttribute('data-target') === sectionId) {
            box.classList.add('active');
          }
        });

        // Ensure the contact section is visible only when scrolling to it
        if (sectionId === 'contact') {
          contactSection.classList.remove('hidden');
        }
      }
    });
  },
  { threshold: 0.5 } // Adjust threshold as needed
);

sections.forEach(section => observer.observe(section));

// Back-to-Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
    setTimeout(() => backToTopButton.style.opacity = '1', 10); // Fade in
  } else {
    backToTopButton.style.opacity = '0';
    setTimeout(() => backToTopButton.style.display = 'none', 200); // Fade out
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Theme Toggle with LocalStorage
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check system preference
const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light-mode' : 'dark-mode';

// Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme') || systemPreference;
if (savedTheme === 'light-mode') {
  body.classList.add('light-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
} else {
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');

  // Update the icon based on the theme
  themeToggle.innerHTML = isLightMode
    ? '<i class="fas fa-sun"></i>' // Sun icon for light mode
    : '<i class="fas fa-moon"></i>'; // Moon icon for dark mode

  // Save the theme preference to localStorage
  localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
});

// Dynamically Load Projects
const projects = [
  {
    title: "Excel Dashboard - Sales Analysis",
    description: "Created an interactive sales dashboard using Excel.",
    image: "excel1.png",
    link: "https://github.com/Rajkumar-dataanalyst/Excel_Dashboard",
    category: "excel"
  },
  {
    title: "Excel Dashboard - FnP Sales Analysis",
    description: "Built an Analyzed report dashboard with pivot tables and charts.",
    image: "excel2.png",
    link: "https://github.com/Rajkumar-dataanalyst/fnp-Sales-Analysis",
    category: "excel"
  },
  {
    title: "Power BI Dashboard - Facebook Ads Analytics",
    description: "Visualized FB-Ads Trends and Analysis.",
    image: "powerbi1.png",
    link: "https://github.com/Rajkumar-dataanalyst/FB_Ads-Analysis",
    category: "powerbi"
  },
  {
    title: "Power BI Dashboard - Financial Analytics",
    description: "Analyzed the Financial Status.",
    image: "powerbi2.png",
    link: "https://github.com/Rajkumar-dataanalyst/PowerBi_Dashboard-Visuals",
    category: "powerbi"
  },
  {
    title: "Tableau Dashboard - Swiggy Analysis",
    description: "Visualized Swiggy Food and Business trends using Tableau.",
    image: "tableu1.png",
    link: "https://github.com/Rajkumar-dataanalyst/Swiggy_Analysis",
    category: "tableau"
  },
  {
    title: "Tableau Dashboard - LinkedIn Posts Analysis.",
    description: "Analyzed the Linkedin Posts trends in Linkedin Website/Application",
    image: "tableu2.png",
    link: "https://github.com/Rajkumar-dataanalyst/Linked-posts-Analysis",
    category: "tableau"
  },
];

const projectGrid = document.getElementById("project-grid");

// Explode and Reform Animation for Filter Buttons
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked button
    button.classList.add('active');

    // Explode current projects
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
      card.style.animation = "explode 0.5s ease forwards";
    });

    // Filter projects after explosion
    const filter = button.getAttribute("data-filter");
    setTimeout(() => {
      renderProjects(filter);
    }, 500); // Match the duration of the explosion animation
  });
});

// Function to render projects
function renderProjects(filter = "all") {
  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.category === filter);

  if (filteredProjects.length === 0) {
    projectGrid.innerHTML = '<p>No projects found in this category.</p>';
    return;
  }

  // Clear existing projects
  projectGrid.innerHTML = '';

  // Add new projects to the grid
  filteredProjects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.setAttribute("data-category", project.category);

    projectCard.innerHTML = `
      <div class="project-image-container">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='default.png';">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" class="btn">Project Github Link</a>
      </div>
    `;

    // Add reform animation with delay
    setTimeout(() => {
      projectCard.style.animation = "reform 0.5s ease forwards";
    }, index * 100); // Adjust delay as needed

    projectGrid.appendChild(projectCard);
  });
}

// Initial render (show all projects)
renderProjects();

// Dynamic Year in Footer
const year = new Date().getFullYear();
document.getElementById('year').textContent = year;

// Fade-in animation for sections
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 200); // Adjust delay as needed
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => sectionObserver.observe(section));

// Web3Forms Integration
const contactForm = document.getElementById("contact-form");
const resultMessage = document.getElementById("form-result");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  resultMessage.textContent = "Sending...";
  resultMessage.style.display = "block";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        resultMessage.textContent = "✅ Message sent successfully!";
      } else {
        resultMessage.textContent = `❌ Error: ${json.message}`;
      }
    })
    .catch((error) => {
      resultMessage.textContent = "❌ Something went wrong!";
    })
    .finally(() => {
      contactForm.reset();
      setTimeout(() => {
        resultMessage.style.display = "none";
      }, 4000);
    });
});

const searchToggle = document.querySelector('.search-toggle');
const searchInput = document.querySelector('#search-input');
const agents = document.querySelectorAll('.agent');






searchToggle.addEventListener('click', () => {
  searchInput.parentNode.classList.toggle('active');
});





agents.forEach(agent => {
  const img = agent.querySelector('img');
  img.addEventListener('mouseover', () => {
    agent.classList.toggle('agent-hover');
  });

  img.addEventListener('mouseout', () => {
    agent.classList.toggle('agent-hover');
  });
});



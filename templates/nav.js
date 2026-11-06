class NavigationDropdown extends HTMLElement {
    constructor() {
      super();

      // Pages under c/ need one extra "../" to reach the book root
      const inChapterDir = /\/c\/[^/]*\.html$/.test(location.pathname);
      const base = inChapterDir ? '../' : '';

      const sections = [
        {
          title: 'Front Matter',
          links: [
            ['Preface', 'c/00-preface.html'],
          ]
        },
        {
          title: 'Chapters',
          links: [
            ['01 The RL Problem', 'c/01-the-rl-problem.html'],
            ['02 Value Functions and the Bellman Equations', 'c/02-value-functions-the-bellman-equations.html'],
            ['03 Dynamic Programming', 'c/03-dynamic-programming.html'],
            ['04 Monte Carlo Methods', 'c/04-monte-carlo-methods.html'],
            ['05 Temporal-Difference Learning', 'c/05-temporal-difference-learning.html'],
            ['06 TD Control', 'c/06-td-control.html'],
            ['07 Function Approximation: The Deadly Triad', 'c/07-function-approximation-the-deadly-triad.html'],
            ['08 Deep Q-Networks: DQN and Double DQN', 'c/08-deep-q-networks-dqn-double-dqn.html'],
            ['09 Policy Gradients: REINFORCE', 'c/09-policy-gradients-reinforce.html'],
            ['10 Actor-Critic Methods', 'c/10-actor-critic-methods.html'],
            ['11 Reinforcement Learning from Human Feedback', 'c/11-reinforcement-learning-from-human-feedback.html'],
            ['12 InstructGPT and DeepSeek-R1-Style Training', 'c/12-instructgpt-and-deepseek-r1-style-training.html'],
            ['13 Summary', 'c/13-summary.html'],
            ['14 Exercises and Code Solutions', 'c/14-exercises-fully-code-solutions.html'],
          ]
        },
        {
          title: 'Appendix',
          links: [
            ['Appendix Index', 'c/appendix.html'],
            ['A Statistical Concepts', 'c/a-statistical-concepts.html'],
            ['B Bellman Expectation Derivation', 'c/b-bellman-expectation-derivation.html'],
            ['C Bellman Optimality Derivation', 'c/c-bellman-optimality-derivation.html'],
            ['D Robbins-Monro Step-Size Conditions', 'c/d-robbins-monro-step-size-conditions.html'],
            ['E Policy Gradient Theorem and Expectations', 'c/e-policy-gradient-theorem-and-expectations.html'],
            ['F KL Non-Negativity', 'c/f-kl-non-negativity.html'],
            ['G PPO Derivations', 'c/g-ppo-derivations.html'],
            ['H Rejection Sampling', 'c/h-rejection-sampling.html'],
          ]
        },
        {
          title: 'Back Matter',
          links: [
            ['References', 'c/references.html'],
          ]
        },
      ];

      const sectionsHtml = sections.map(s => `
        <div class="section">
          <h3>${s.title}</h3>
          <ol>
            ${s.links.map(([label, href]) => `<li><a href="${base}${href}">${label}</a></li>`).join('')}
          </ol>
        </div>`).join('');

      // Ordered list of all pages for prev/next navigation
      const orderedPages = [
        ['00-preface.html', 'Preface'],
        ['01-the-rl-problem.html', 'Chapter 1: The RL Problem'],
        ['02-value-functions-the-bellman-equations.html', 'Chapter 2: Value Functions and the Bellman Equations'],
        ['03-dynamic-programming.html', 'Chapter 3: Dynamic Programming'],
        ['04-monte-carlo-methods.html', 'Chapter 4: Monte Carlo Methods'],
        ['05-temporal-difference-learning.html', 'Chapter 5: Temporal-Difference Learning'],
        ['06-td-control.html', 'Chapter 6: TD Control'],
        ['07-function-approximation-the-deadly-triad.html', 'Chapter 7: Function Approximation: The Deadly Triad'],
        ['08-deep-q-networks-dqn-double-dqn.html', 'Chapter 8: Deep Q-Networks: DQN and Double DQN'],
        ['09-policy-gradients-reinforce.html', 'Chapter 9: Policy Gradients: REINFORCE'],
        ['10-actor-critic-methods.html', 'Chapter 10: Actor-Critic Methods'],
        ['11-reinforcement-learning-from-human-feedback.html', 'Chapter 11: Reinforcement Learning from Human Feedback'],
        ['12-instructgpt-and-deepseek-r1-style-training.html', 'Chapter 12: InstructGPT and DeepSeek-R1-Style Training'],
        ['13-summary.html', 'Chapter 13: Summary'],
        ['14-exercises-fully-code-solutions.html', 'Chapter 14: Exercises and Code Solutions'],
        ['appendix.html', 'Appendix'],
        ['a-statistical-concepts.html', 'Appendix A: Statistical Concepts'],
        ['b-bellman-expectation-derivation.html', 'Appendix B: Bellman Expectation Derivation'],
        ['c-bellman-optimality-derivation.html', 'Appendix C: Bellman Optimality Derivation'],
        ['d-robbins-monro-step-size-conditions.html', 'Appendix D: Robbins-Monro Step-Size Conditions'],
        ['e-policy-gradient-theorem-and-expectations.html', 'Appendix E: Policy Gradient Theorem and Expectations'],
        ['f-kl-non-negativity.html', 'Appendix F: KL Non-Negativity'],
        ['g-ppo-derivations.html', 'Appendix G: PPO Derivations'],
        ['h-rejection-sampling.html', 'Appendix H: Rejection Sampling'],
        ['references.html', 'References'],
      ];

      const currentFile = location.pathname.split('/').pop();
      const idx = orderedPages.findIndex(([file]) => file === currentFile);
      const prev = idx > 0 ? orderedPages[idx - 1] : null;
      const next = idx >= 0 && idx < orderedPages.length - 1 ? orderedPages[idx + 1] : null;

      const prevnext = document.getElementById('prevnext');
      if (prevnext && idx >= 0) {
        prevnext.innerHTML = `
          ${prev ? `<a href="${base}${prev[0]}">&larr; ${prev[1]}</a>` : '<span class="spacer"></span>'}
          ${next ? `<a href="${base}${next[0]}">${next[1]} &rarr;</a>` : ''}
        `;
      }

      const initialExpanded = this.getAttribute('expanded') === 'true';

      this.innerHTML = `
        <div>
          <button class="dropdown-button" aria-expanded="${initialExpanded}">
            <span><strong>Navigation</strong></span>
            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="dropdown-content${initialExpanded ? ' open' : ''}">
            <nav class="chapter-nav">
              <div class="section">
                <h3>Links</h3>
                <ol>
                  <li><a href="${base}index.html">Full book (single page)</a></li>
                  <li><a href="https://github.com/dipeshgautam2012/rl-book-project" target="_blank">GitHub Repository</a></li>
                </ol>
              </div>
              ${sectionsHtml}
            </nav>
          </div>
        </div>
      `;

      const button = this.querySelector('.dropdown-button');
      const content = this.querySelector('.dropdown-content');

      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('open');
      });
    }

    static get observedAttributes() {
      return ['expanded'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'expanded') {
        const button = this.querySelector('.dropdown-button');
        const content = this.querySelector('.dropdown-content');
        const isExpanded = newValue === 'true';

        if (button && content) {
          button.setAttribute('aria-expanded', isExpanded);
          content.classList.toggle('open', isExpanded);
        }
      }
    }
}

if (!customElements.get('navigation-dropdown')) {
  customElements.define('navigation-dropdown', NavigationDropdown);
}

/* CoSA explainer integrated into the static academic page. No libraries, network requests, or site dependencies. */
(() => {
  'use strict';
  const root = document.querySelector('#attack-animation');
  if (!root) return;
  const steps = [
    {
      title: 'Individually admitted. Composition still matters.',
      description: 'The participating Skills pass the specified package checks. This local result does not establish that every multi-Skill workflow will preserve the task’s policy constraints.',
      duration: 6500
    },
    {
      title: 'CoSA changes the pool, within a budget.',
      description: 'Operation contracts reveal composition opportunities. CoSA generates and validates candidates, then selects locally admitted additions within a domain budget. Installation is assumed; the existing Skills and runtime permissions stay fixed.',
      duration: 8500
    },
    {
      title: 'The agent connects useful operations.',
      description: 'The agent autonomously selects from the augmented pool. This schematic follows one representative pattern: an assessment informs a recommendation, which is reused by a state-update operation.',
      duration: 7500
    },
    {
      title: 'A decision signal acquires authority.',
      description: 'The recommendation is treated as approval for a consequential action. No new authorization has been introduced. This change in meaning is semantic authority promotion.',
      duration: 8500
    },
    {
      title: 'The consequence makes it a violation.',
      description: 'If the final operation fails to re-establish authorization and persists the change, the task policy is violated. A Conflict of Skills requires evidence that this cross-Skill reuse contributed to the violation—not just that several Skills ran.',
      duration: 8500
    }
  ];
  const diagram = root.querySelector('#cosa-diagram');
  const scene = root.querySelector('.scene');
  const play = root.querySelector('#cosa-play');
  const playLabel = root.querySelector('#cosa-play-label');
  const icon = root.querySelector('#cosa-play-icon');
  const previous = root.querySelector('#cosa-previous');
  const next = root.querySelector('#cosa-next');
  const nav = [...root.querySelectorAll('[data-step]')];
  const note = root.querySelector('#cosa-playback-note');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 760px)');
  let stage = 0;
  let playing = false;
  let elapsed = 0;
  let lastFrame = 0;
  let frame = 0;
  let packetFrame = 0;
  let paths = [];
  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

  const text = (x, y, label, cls = '', anchor = 'start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${label}</text>`;
  const rect = (x, y, w, h, cls) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" class="${cls}"/>`;
  const check = (x, y) => `<circle cx="${x}" cy="${y}" r="9" class="check-circle"/><path d="M${x-4},${y} l3,3 l5,-6" class="check"/>`;
  const edge = (id, d, critical = false, group = '') => `<g class="group ${group}"><path id="cosa-${id}" d="${d}" class="edge ${critical ? 'reuse-edge' : ''}" marker-end="url(#${critical ? 'cosa-arrow-red' : 'cosa-arrow'})"/></g>`;
  const node = (x, y, w, h, role, number, line1, line2, cls) => `<g class="group workflow ${cls}">${rect(x,y,w,h,'node-box')}${text(x+17,y+25,number,'step-number')}${text(x+17,y+49,role,'node-title')}${text(x+17,y+71,line1,'node-detail')}${line2 ? text(x+17,y+88,line2,'node-detail') : ''}</g>`;

  function renderDiagram() {
    const mobile = narrow.matches;
    const width = mobile ? 340 : 1060;
    const height = mobile ? 815 : 532;
    let content = '';
    if (mobile) {
      content += `<g class="group original">${rect(10,20,151,107,'pool-box')}${text(23,44,'Original Skills','node-title')}${text(23,67,'Existing pool','node-detail')}${check(29,99)}${text(44,103,'Local checks pass','node-caption')}</g>`;
      content += `<g class="group additions">${rect(178,20,151,107,'addition-box')}${text(191,44,'CoSA additions','node-title added-title')}${text(191,67,'Budgeted selection','node-detail')}${check(197,99)}${text(212,103,'Local checks pass','node-caption')}</g>`;
      content += `<g class="group fixed">${rect(10,141,319,44,'fixed-box')}${text(170,159,'Task · model · tools · permissions','node-detail','middle')}${text(170,176,'held fixed','node-detail','middle')}</g>`;
      content += edge('pool-original','M85 127 V135 H4 V244 H26',false,'pool-link');
      content += edge('pool-additions','M254 127 V135 H336 V244 H315',false,'addition-link');
      content += text(26,214,'AUTONOMOUS SKILL COMPOSITION','svg-label');
      content += node(26,232,289,89,'Assess', 'A / EVIDENCE', 'Produce a task-relevant assessment.', '', 'assess');
      content += edge('assessment-flow','M170 321 V365',false,'workflow');
      content += text(183,347,'Assessment reused','edge-label');
      content += node(26,365,289,89,'Recommend', 'B / DECISION', 'Derive a recommended next step.', '', 'recommend');
      content += edge('decision-flow','M170 454 V558',true,'workflow');
      content += `<g class="group authority">${rect(14,470,150,28,'authority-box')}${text(24,488,'Treated as approval','authority-label')}</g>`;
      content += `<g class="group boundary-group"><path d="M26 515 H314" class="boundary"/>${text(186,507,'Authorization','critical-text')}${text(186,532,'not established','critical-text')}</g>`;
      content += node(26,558,289,89,'Update state', 'C / EFFECT', 'A consequential, persistent mutation.', '', 'update');
      content += edge('effect-flow','M170 647 V704',true,'effect-link');
      content += `<g class="group outcome">${rect(10,704,319,87,'result-box')}${text(27,732,'Unauthorized mutation','result-title')}${text(27,755,'The change persists without the required','result-detail')}${text(27,774,'authorization. Cross-Skill reuse contributes.','result-detail')}</g>`;
      content += `<g class="group pending">${text(170,742,'The effect must be observed','muted-state','middle')}${text(170,761,'to establish a concrete violation.','muted-state','middle')}</g>`;
    } else {
      content += `<g class="group original">${rect(28,27,242,104,'pool-box')}${text(47,55,'Original Skills','node-title')}${text(47,77,'The existing domain pool','node-detail')}${check(55,105)}${text(71,109,'Specified local checks pass','node-caption')}</g>`;
      content += `<g class="group additions">${rect(322,27,270,104,'addition-box')}${text(341,55,'CoSA additions','node-title added-title')}${text(341,77,'Domain-relevant · budgeted selection','node-detail')}${check(349,105)}${text(365,109,'Specified local checks pass','node-caption')}</g>`;
      content += `<g class="group fixed">${rect(676,33,356,90,'fixed-box')}${text(695,58,'MATCHED EXECUTION CONDITIONS','svg-label')}${text(695,82,'Task · model · native tools · permissions','node-detail')}${text(695,103,'held fixed','node-detail')}</g>`;
      content += edge('pool-original','M149 131 V248',false,'pool-link');
      content += edge('pool-additions','M457 131 V169 Q457 181 445 181 H161 Q149 181 149 193 V248',false,'addition-link');
      content += text(384,220,'AUTONOMOUS SKILL COMPOSITION','svg-label');
      content += node(28,249,242,104,'Assess', 'A / EVIDENCE', 'Produce a task-relevant', 'assessment.', 'assess');
      content += edge('assessment-flow','M270 301 H384',false,'workflow');
      content += text(327,284,'Assessment','edge-label','middle');
      content += node(384,249,250,104,'Recommend', 'B / DECISION', 'Derive a recommended', 'next step.', 'recommend');
      content += edge('decision-flow','M634 301 H799',true,'workflow');
      content += `<g class="group authority">${rect(641,255,150,27,'authority-box')}${text(716,273,'Treated as approval','authority-label','middle')}</g>`;
      content += `<g class="group boundary-group"><path d="M718 292 V392" class="boundary"/>${text(718,413,'Authorization not established','critical-text','middle')}</g>`;
      content += node(799,249,233,104,'Update state', 'C / EFFECT', 'Perform a consequential,', 'persistent mutation.', 'update');
      content += edge('effect-flow','M915 353 V446',true,'effect-link');
      content += `<g class="group outcome">${rect(28,448,1004,64,'result-box')}${text(47,476,'Unauthorized mutation','result-title')}${text(47,496,'The change persists without the required authorization. Cross-Skill reuse contributes to the violation.','result-detail')}</g>`;
      content += `<g class="group pending">${text(28,480,'The effect must be observed to establish a concrete violation.','muted-state')}</g>`;
    }
    diagram.innerHTML = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><marker id="cosa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#a9b3aa"/></marker><marker id="cosa-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#8a4635"/></marker></defs>${content}<circle class="flow-packet" r="5" visibility="hidden"/><circle class="flow-packet" r="5" visibility="hidden"/></svg>`;
    paths = [...diagram.querySelectorAll('path[id]')].map(path => ({path, length: path.getTotalLength()}));
    paintStage();
  }

  function setDim(selector, dim) {
    diagram.querySelectorAll(selector).forEach(element => element.classList.toggle('subdued', dim));
  }
  function setHidden(selector, hidden) {
    diagram.querySelectorAll(selector).forEach(element => element.classList.toggle('not-yet', hidden));
  }
  function paintStage() {
    setDim('.additions', stage < 1);
    setDim('.pool-link, .addition-link, .workflow', stage < 2);
    setHidden('.authority, .boundary-group', stage < 3);
    setHidden('.outcome, .effect-link', stage < 4);
    setHidden('.pending', stage >= 4);
    diagram.querySelectorAll('.recommend, .update').forEach(element => {
      element.classList.toggle('active-node', stage >= (element.classList.contains('recommend') ? 3 : 4));
    });
    diagram.querySelectorAll('.flow-packet').forEach(packet => packet.setAttribute('visibility','hidden'));
  }

  function updateProgress(fraction = 0) {
    const prior = steps.slice(0,stage).reduce((sum, step) => sum + step.duration,0);
    root.querySelector('#cosa-progress').style.width = `${100 * (prior + steps[stage].duration*fraction) / totalDuration}%`;
  }
  function setStage(index, animate = true) {
    stage = Math.max(0,Math.min(index,steps.length-1));
    elapsed = 0;
    scene.dataset.stage = String(stage);
    nav.forEach((button,index) => index === stage ? button.setAttribute('aria-current','step') : button.removeAttribute('aria-current'));
    root.querySelector('#cosa-step-count').textContent = `0${stage+1} / 05`;
    root.querySelector('#cosa-step-title').textContent = steps[stage].title;
    root.querySelector('#cosa-step-description').textContent = steps[stage].description;
    previous.disabled = stage === 0;
    next.disabled = stage === steps.length-1;
    playLabel.textContent = playing ? 'Pause' : stage === steps.length-1 ? 'Replay' : 'Play sequence';
    paintStage();
    updateProgress(stage === steps.length-1 ? 1 : 0);
    cancelAnimationFrame(packetFrame);
    if (animate && !motion.matches && !playing) {
      const start = performance.now();
      const animatePacket = time => {
        const progress = (time-start)/2200;
        if (progress >= 1) {
          diagram.querySelectorAll('.flow-packet').forEach(packet => packet.setAttribute('visibility','hidden'));
          return;
        }
        movePackets(progress);
        packetFrame = requestAnimationFrame(animatePacket);
      };
      packetFrame = requestAnimationFrame(animatePacket);
    }
  }

  function movePackets(progress) {
    const pathNames = stage === 1 ? ['pool-additions'] : stage === 2 ? ['pool-original','assessment-flow'] : stage === 3 ? ['decision-flow'] : stage === 4 ? ['effect-flow'] : [];
    diagram.querySelectorAll('.flow-packet').forEach((packet,index) => {
      const item = paths.find(item => item.path.id === 'cosa-' + pathNames[index]);
      if (!item || motion.matches) { packet.setAttribute('visibility','hidden'); return; }
      const point = item.path.getPointAtLength(Math.min(1,progress)*item.length);
      packet.setAttribute('cx',point.x);
      packet.setAttribute('cy',point.y);
      packet.setAttribute('visibility','visible');
      packet.classList.toggle('critical',stage >= 3);
    });
  }

  function updateTransport() {
    playLabel.textContent = playing ? 'Pause' : stage === 4 ? 'Replay' : 'Play sequence';
    play.setAttribute('aria-label',playing ? 'Pause the explanation' : stage === 4 ? 'Replay the explanation' : 'Play the five-step explanation');
    icon.setAttribute('d',playing ? 'M4 3 H7 V13 H4 Z M10 3 H13 V13 H10 Z' : 'M5 3 L13 8 L5 13 Z');
    note.textContent = motion.matches ? 'Reduced motion · steps change without animation' : playing ? 'Playing · pause at any point to read' : 'About 40 seconds · play or explore a step';
  }
  function pause() {
    playing = false;
    cancelAnimationFrame(frame);
    cancelAnimationFrame(packetFrame);
    updateTransport();
    diagram.querySelectorAll('.flow-packet').forEach(packet => packet.setAttribute('visibility','hidden'));
  }
  function tick(time) {
    if (!playing) return;
    elapsed += time-lastFrame;
    lastFrame = time;
    updateProgress(Math.min(1,elapsed/steps[stage].duration));
    // One packet pass per step; the remaining time is a still reading interval.
    if (elapsed < 2900) movePackets(Math.max(0,(elapsed-400)/2500));
    else diagram.querySelectorAll('.flow-packet').forEach(packet => packet.setAttribute('visibility','hidden'));
    if (elapsed >= steps[stage].duration) {
      if (stage === steps.length-1) { pause(); updateProgress(1); return; }
      setStage(stage+1,false);
    }
    frame = requestAnimationFrame(tick);
  }
  play.addEventListener('click',() => {
    if (playing) { pause(); return; }
    cancelAnimationFrame(packetFrame);
    if (stage === steps.length-1) setStage(0,false);
    playing = true;
    lastFrame = performance.now();
    updateTransport();
    frame = requestAnimationFrame(tick);
  });
  function selectStage(index) { pause(); setStage(index); updateTransport(); }
  previous.addEventListener('click',() => selectStage(stage-1));
  next.addEventListener('click',() => selectStage(stage+1));
  nav.forEach(button => {
    button.addEventListener('click',() => selectStage(Number(button.dataset.step)));
    button.addEventListener('keydown',event => {
      let index = Number(button.dataset.step);
      if (event.key === 'ArrowRight') index = (index+1)%steps.length;
      else if (event.key === 'ArrowLeft') index = (index+steps.length-1)%steps.length;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = steps.length-1;
      else return;
      event.preventDefault();
      selectStage(index);
      nav[index].focus();
    });
  });
  document.addEventListener('visibilitychange',() => { if (document.hidden) pause(); });
  motion.addEventListener('change',() => { pause(); paintStage(); });
  narrow.addEventListener('change',renderDiagram);
  root.querySelector('.step-nav').hidden = false;
  root.querySelector('.controls').hidden = false;
  renderDiagram();
  updateTransport();
})();

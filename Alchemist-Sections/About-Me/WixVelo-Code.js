// Referencia de la API de Velo: https://www.wix.com/velo/reference/api-overview/introduction

// ___________________________________________________________________________________________________
// QUIEN SOY | AI.QUIMISTA AGIL
// _________________________________________________________________________

import wixLocation from 'wix-location';
$w.onReady(function () {

// CONTROL AUDIOS QUIEN SOY _____________________________________________

  const IFRAME_ID = "#htmlAudioFX";

  const sections = [
    { sectionId: "#SectionB1", soundKey: "rain" },
    { sectionId: "#SectionB2", soundKey: "egypt" },
    { sectionId: "#SectionB3", soundKey: "space" },
    { sectionId: "#SectionB4", soundKey: "flames" },
    { sectionId: "#SectionB5", soundKey: "travel" }
  ];

  const cooldown = {};
  const COOLDOWN_MS = 300;

  function getIframe() {
    return $w(IFRAME_ID);
  }

  function postToAudioManager(message) {
    const $iframe = getIframe();
    if ($iframe) {
      try {
        $iframe.postMessage(message);
      } catch (e) {
        console.warn('Error enviando mensaje al iframe de audio', e);
      }
    }
  }

  // 🚀 Precargar sonidos al cargar la página
  postToAudioManager({ type: 'resume' });

  // 🛑 Detener todos los sonidos activos
  function stopAll() {
    postToAudioManager({ type: 'stopAll' });
  }

  // 🎧 Configurar reproducción por secciones
  sections.forEach(({ sectionId, soundKey }) => {
    const $section = $w(sectionId);
    if (!$section) return;

    $section.onViewportEnter(() => {
      if (cooldown[soundKey]) return;
      cooldown[soundKey] = true;
      setTimeout(() => (cooldown[soundKey] = false), COOLDOWN_MS);

      // Detener sonidos previos
      stopAll();

      // Iniciar sonido de la sección en loop
      postToAudioManager({
        type: 'startLoop',
        sound: soundKey,
        options: { volume: 0.9 }
      });
    });

    $section.onViewportLeave(() => {
      postToAudioManager({ type: 'stop', sound: soundKey });
    });
  });

  // 🧭 Detener sonidos al navegar entre páginas dentro del sitio
  wixLocation.onChange(() => stopAll());


// CONTROL ILUMINACIÓN SECCIONES ________________________________________

  // Helper: devuelve el elemento $w si existe y soporta show/hide, sino null
  function getEl(selector) {
    try {
      const el = $w(selector);
      if (el && typeof el.show === "function") return el;
    } catch (e) {}
    return null;
  }

  // Tiempo de animación en milisegundos (ajusta según prefieras)
  const FADE_DURATION = 300;

  // Oculta (con fade si existe) todos los botones al cargar la página
  for (let i = 1; i <= 5; i++) {
    const aId = `#buttonLight-${i}A`;
    const bId = `#buttonLight-${i}B`;
    const aEl = getEl(aId);
    const bEl = getEl(bId);
    if (aEl) aEl.hide("fade");
    if (bEl) bEl.hide("fade");
  }

  // Asigna eventos a cada sección
  for (let i = 1; i <= 5; i++) {
    const sectionId = `#SectionB${i}`;
    const buttonAId = `#buttonLight-${i}A`;
    const buttonBId = `#buttonLight-${i}B`;

    const sectionEl = getEl(sectionId);
    const buttonAEl = getEl(buttonAId);
    const buttonBEl = getEl(buttonBId);

    if (!sectionEl) {
      console.warn(`Sección no encontrada: ${sectionId}`);
      continue;
    }

    sectionEl.onMouseIn(() => {
      if (buttonAEl) buttonAEl.show("fade");
      if (buttonBEl) buttonBEl.show("fade");
    });

    sectionEl.onMouseOut(() => {
      if (buttonAEl) buttonAEl.hide("fade");
      if (buttonBEl) buttonBEl.hide("fade");
    });
  }
});

// Referencia de la API de Velo: https://www.wix.com/velo/reference/api-overview/introduction

// ___________________________________________________________________________________________________
// BLOG | AI.QUIMISTA AGIL
// _________________________________________________________________________

$w.onReady(function () {

// STOP ABOUT ME AUDIOS _________________________________________________
  const IFRAME_ID = "#htmlAudioFX";
  function postToAudioManager(message) {
    try {
      const $iframe = $w(IFRAME_ID);
      if ($iframe) $iframe.postMessage(message);
    } catch (e) {
      // no hace falta loguear en producción
    }
  }

  // Detener sólo los ambientes que mencionaste
  const ambientKeys = ['rain','egypt','space','flames','travel'];
  ambientKeys.forEach(k => postToAudioManager({ type: 'stop', sound: k }));

  // Como respaldo, pedir stopAll breve
  postToAudioManager({ type: 'stopAll' });

// ROSEWINDOW MAIN TITLE ________________________________________________
  const sectionId = "#sectionBlogRoseWindowScreen";
  const elems = [
    "#textAIQUIMISTA-RoseWindow",
    "#imageTITLE-RoseWindow",
    "#textCARLOSNAVARRO-RoseWindow"
  ];

  // Duraciones en milisegundos
  const fadeInDuration = 300;   // rápido pero visible
  const fadeOutDuration = 600;  // un poco más suave, efecto "apagado"
  const visibleTime = 7000;     // 7 segundos

  let hideTimeout = null;

  // Asegurarse de que empiecen ocultos
  elems.forEach(id => $w(id).hide());

  function showElementsWithFade() {
    // limpiar timeout previo
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    // Mostrar con fade in
    elems.forEach(id => {
      // Si ya están visibles, forzamos el show para reiniciar la animación
      $w(id).show("fade", { "duration": fadeInDuration });
    });

    // Iniciar temporizador para ocultar después de visibleTime
    hideTimeout = setTimeout(() => {
      elems.forEach(id => $w(id).hide("fade", { "duration": fadeOutDuration }));
      hideTimeout = null;
    }, visibleTime);
  }

  function hideElementsWithFade() {
    // cancelar temporizador si existe
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    // Ocultar con fade out al salir de la sección
    elems.forEach(id => $w(id).hide("fade", { "duration": fadeOutDuration }));
  }

  // Eventos de la sección
  $w(sectionId).onViewportEnter(() => {
    showElementsWithFade();
  });

  $w(sectionId).onViewportLeave(() => {
    hideElementsWithFade();
  });
});

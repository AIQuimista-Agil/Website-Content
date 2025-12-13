// Referencia de la API de Velo: https://www.wix.com/velo/reference/api-overview/introduction

// ___________________________________________________________________________________________________
// RESULTADOS DE LA BÚSQUEDA | AI.QUIMISTA AGIL
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


// CONTROL AUDIOS REQUIEM _______________________________________________


  const iframe = $w("#htmlAudioFX");

  function sendPlay(soundName) {
    try {
      iframe.postMessage({ type: "play", sound: soundName });
    } catch (err) {
      console.warn("No se pudo enviar mensaje al iframe:", err);
    }
  }

  // Asigna onMouseIn a #buttonRequiem-0 .. #buttonRequiem-10
  for (let i = 0; i <= 10; i++) {
    const selector = `#buttonRequiem-${i}`;
    try {
      const btn = $w(selector);
      btn.onMouseIn(() => sendPlay("requiem"));
    } catch (e) {
      console.warn(`Botón ${selector} no encontrado.`);
    }
  }
});

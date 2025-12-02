// Referencia de la API de Velo: https://www.wix.com/velo/reference/api-overview/introduction

// ___________________________________________________________________________________________________
// ACERCA DE | AI.QUIMISTA AGIL
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
});

// CONTROL AUDIOS ACERCA DE _____________________________________________

$w.onReady(function () {
  const IFRAME_ID = "#htmlAudioFX";

  // Envía mensaje al iframe para reproducir un sonido
  function sendPlay(soundName, volume = 1.0) {
   try {
     $w("#htmlAudioFX").postMessage({ type: "play", sound: soundName, volume });
    } catch (err) {
      console.warn("No se pudo enviar mensaje al iframe", err);
    }
 }

  // Secciones: reproducir cuando entran en viewport
  $w("#sectionBotonesTablaEsmeralda").onViewportEnter(() => {
  // Enviamos también el volumen deseado
    sendPlay("alchemy_2", 3); // 1.0 es normal, 1.5 es 50% más fuerte
  });

  $w("#sectionPoliticaPrivacidad").onViewportEnter(() => {
    sendPlay("alchemy_3");
  });

  $w("#sectionTerminosCondiciones").onViewportEnter(() => {
    sendPlay("alchemy_4");
  });

  $w("#sectionMapaSitio").onViewportEnter(() => {
    sendPlay("alchemy_5");
  });

  // Mampara Neón: reproducir al pasar el cursor (cada vez que ocurra)
  $w("#buttonNigredo").onMouseIn(() => sendPlay("shot"));
  $w("#buttonAlbedo").onMouseIn(() => sendPlay("shot"));
  $w("#buttonRubedo").onMouseIn(() => sendPlay("shot"));

  // Botones: reproducir al pasar el cursor (cada vez que ocurra)
const buttonIds = [
  "#buttonLey1",
  "#buttonLey2",
  "#buttonLey3",
  "#buttonLey4",
  "#buttonLey5",
  "#buttonLey6",
  "#buttonLey7",
  "#buttonContactoRed",
  "#buttonContactoWhite",
  "#buttonContactoBlack"
];

// Asignar el evento onMouseIn a todos los botones de la lista
buttonIds.forEach(id => {
  $w(id).onMouseIn(() => sendPlay("click"));
});
});

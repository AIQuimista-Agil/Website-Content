// El código de este archivo se cargará en todas las páginas de tu sitio

// ___________________________________________________________________________________________________
// MASTERPAGE.JS | AI.QUIMISTA AGIL | HEADER
// _________________________________________________________________________

$w.onReady(function () {
  let logoActivado = false;
  let cursorSobreLogo = false;
  let logoTimeoutId = null;

  const logoTriggers = ['#imageHeaderLetters', '#imageHeaderLogo'];
  const elementosLogo = ['#imageSunLogo','#imageLogoMarble','#imagelettersMarble'];

  const botones = [
    '#buttonLuzHeader1','#buttonLuzHeader2','#buttonLuzHeader3',
    '#buttonLuzHeader4','#buttonLuzHeader5','#buttonLuzHeader6'
  ];

  // Ocultar solo elementos visuales (no el HTML embed)
  [...botones, ...elementosLogo].forEach(id => $w(id).hide());

  const botonesLuz = {
    "Inicio": "#buttonLuzHeader1",
    "AI.Quimista Ágil": "#buttonLuzHeader2",
    "Servicios": "#buttonLuzHeader3",
    "Portafolio": "#buttonLuzHeader4",
    "Blog": "#buttonLuzHeader5",
    "Contacto": "#buttonLuzHeader6"
  };

  // Helper: enviar mensaje al iframe HTML embed
  function postToAudioFX(msgObj) {
    $w('#htmlAudioFX').postMessage(JSON.stringify(msgObj));
  }

  // reproducir menu (se puede llamar muchas veces, se superpondrá)
  function reproducirSonidoMenu() {
    postToAudioFX({ type: 'play', sound: 'menu' });
  }

  // reproducir logo
  function reproducirSonidoLogo() {
    postToAudioFX({ type: 'play', sound: 'logo' });
  }

  // Ocultar elementos del logo y limpiar estado para permitir reactivación posterior
  function ocultarYResetearLogo() {
    elementosLogo.forEach(el => $w(el).hide("fade",{duration:1200}));
    logoActivado = false;
    logoTimeoutId = null;
  }

  // Inicia el temporizador de 18s que ocultará el logo y reseteará el estado
  function iniciarTemporizadorLogo() {
    // Si ya hay un temporizador activo, no crear otro
    if (logoTimeoutId) return;
    // 18 segundos = 18000 ms
    logoTimeoutId = setTimeout(() => {
      ocultarYResetearLogo();
    }, 18000);
  }

  // Eventos del menú
  $w('#horizontalMenuHeader').onItemMouseIn((event) => {
    const label = event.item.label;
    const botonID = botonesLuz[label];
    if (botonID) {
      $w(botonID).show();
      reproducirSonidoMenu();
    }
  });

  $w('#horizontalMenuHeader').onItemMouseOut((event) => {
    const label = event.item.label;
    const botonID = botonesLuz[label];
    if (botonID) $w(botonID).hide();
  });

  // Logo events
  logoTriggers.forEach(id => {
    $w(id).onMouseIn(() => {
      cursorSobreLogo = true;
      if (!logoActivado) {
        logoActivado = true;
        // mostrar solo los elementos visuales del logo
        elementosLogo.forEach(el => $w(el).show("fade",{duration:1200}));
        reproducirSonidoLogo();
        iniciarTemporizadorLogo();
      } else {
        // Si ya está activado pero no hay temporizador (caso raro), aseguramos temporizador
        iniciarTemporizadorLogo();
      }
    });

    $w(id).onMouseOut(() => {
      cursorSobreLogo = false;
      // No cancelamos el temporizador al salir; el requisito pide contar 18s desde que pasó el cursor.
      // Si prefieres cancelar el temporizador cuando el usuario sale, reemplaza la línea siguiente por:
      // if (logoTimeoutId) { clearTimeout(logoTimeoutId); logoTimeoutId = null; }
    });
  });

  // ---- Opcional: botón Wix para "Activar sonido" (recomendado) ----
 /*
  $w('#btnEnableAudio').onClick(() => {
    postToAudioFX({ type: 'resume' });
    $w('#btnEnableAudio').hide();
  });
 */

});

// ___________________________________________________________________________________________________
// MASTERPAGE.JS | AI.QUIMISTA AGIL | FOOTER
// _________________________________________________________________________

  $w.onReady(function () {
  // Ocultar Logo al inicio
  $w("#imageLogoGold").hide();
  // Componente HTML que contiene el Audio FX Manager
  const htmlComp = $w("#htmlAudioFX"); // ajusta si tu id es distinto

  // Flags para reproducir solo una vez
  let audioFooterPlayed = false;
  let audioLogoPlayed = false;

  // Envía mensaje al iframe HTML de forma segura
  function postToIframe(message) {
    if (!htmlComp) return;
    try {
      htmlComp.postMessage(message);
    } catch (e) {
      console.warn("postMessage error", e);
    }
  }

  // Resume/prepare AudioContext una sola vez tras la primera interacción útil
  function resumeAudioContextOnce() {
    if (!resumeAudioContextOnce._done) {
      postToIframe({ type: "resume" });
      resumeAudioContextOnce._done = true;
    }
  }
  resumeAudioContextOnce._done = false;

  // FOOTER: reproducir submachine la primera vez que entra en viewport
  if ($w("#footer")) {
    $w("#footer").onViewportEnter(() => {
      resumeAudioContextOnce();
      if (!audioFooterPlayed) {
        postToIframe({ type: "play", sound: "submachine" }); // antes: #audioFooterIntro
        audioFooterPlayed = true;
      }
    });
  }

  // LOGO: mostrar gold y reproducir phoenix (solo 1 vez)
  const logoNormal = $w("#imageLogoNormal");
  const logoGold = $w("#imageLogoGold");

  if (logoNormal) {
    logoNormal.onMouseIn(() => {
      if (logoGold) logoGold.show("fade", { duration: 200 });
      logoNormal.hide("fade", { duration: 200 });

      resumeAudioContextOnce();
      if (!audioLogoPlayed) {
        postToIframe({ type: "play", sound: "phoenix" }); // antes: #audioPhoenixCry
        audioLogoPlayed = true;
      }
    });
  }

  if (logoGold && logoNormal) {
    logoGold.onMouseOut(() => {
      logoGold.hide("fade", { duration: 200 });
      logoNormal.show("fade", { duration: 200 });
    });
  }

  // BOTONES DEL FOOTER: reproducir 'button' al hover y al click
  const footerButtons = [
    "#buttonFooter-AIQuimista",
    "#buttonFooter-Servicios",
    "#buttonFooter-Portafolio",
    "#buttonFooter-Blog",
    "#buttonFooter-Contacto"
  ];

  footerButtons.forEach(buttonId => {
    const btn = $w(buttonId);
    if (!btn) {
      console.warn(`Botón no encontrado: ${buttonId}`);
      return;
    }

    if (typeof btn.onMouseIn === "function") {
      btn.onMouseIn(() => {
        resumeAudioContextOnce();
        postToIframe({ type: "play", sound: "button" }); // antes: #audioFooterButtons
      });
    }

    if (typeof btn.onClick === "function") {
      btn.onClick(() => {
        resumeAudioContextOnce();
        postToIframe({ type: "play", sound: "button" });
      });
    }
  });

  // Extra: si quieres asegurar resume por una interacción muy general (click en cualquier botón visible),
  // puedes añadir resumeAudioContextOnce a otros manejadores relevantes de la página aquí mismo.
});

// ==========================================================================
// Irvin Ramos - CV Interactivity & Terminal Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check persisted preference
  const savedTheme = localStorage.getItem('cv-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('cv-theme', newTheme);
  });

  // 2. Print / Save PDF Handler
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 3. Copy Contact Info with Toast Notification
  const copyContactBtn = document.getElementById('copyContactBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const copyBtnText = document.getElementById('copyBtnText');

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  if (copyContactBtn) {
    copyContactBtn.addEventListener('click', () => {
      const contactText = `Irvin Francisco Ramos Campos
Programador Web & Especialista IT (34 años)
Ubicación: Soyapango, San Salvador, El Salvador
Stack: SQL, SAP HANA, ERPs, Java, C#, Angular, Flutter
Experiencia: SOLUGE S.A. DE C.V., INDUFOAM S.A. DE C.V., DIZUCAR S.A. DE C.V.`;

      navigator.clipboard.writeText(contactText).then(() => {
        copyBtnText.textContent = "¡Copiado!";
        showToast("¡Información de Irvin Ramos copiada al portapapeles!");
        setTimeout(() => {
          copyBtnText.textContent = "Copiar Datos";
        }, 2500);
      }).catch(err => {
        console.error("Error al copiar:", err);
        showToast("No se pudo copiar automáticamente.");
      });
    });
  }

  // 4. Interactive Terminal Logic
  const terminalInput = document.getElementById('terminalInput');
  const dynamicTerminalLines = document.getElementById('dynamicTerminalLines');
  const terminalOutput = document.getElementById('terminalOutput');

  const COMMANDS = {
    help: `Comandos disponibles:
  • whoami       : Información de perfil y bio
  • skills       : Lista detallada de tecnologías y stack
  • exp          : Trayectoria y empresas (SOLUGE, INDUFOAM, DIZUCAR)
  • contacto     : Datos de contacto y ubicación
  • pdf          : Abrir diálogo para imprimir / guardar PDF
  • clear        : Limpiar la pantalla de la terminal`,
    
    whoami: `Irvin Francisco Ramos Campos (34 años).
Residente en Soyapango, San Salvador, El Salvador.
Perfil: Programador Web, Desarrollador de Software y Especialista en Sistemas TI y ERPs.`,

    skills: `STACK TÉCNICO:
  • Lenguajes: Java, C# (.NET), TypeScript, JavaScript, Dart
  • Frameworks: Angular, Flutter, HTML5 / CSS3 moderno
  • Bases de Datos: SAP HANA, SQL (Server, MySQL, etc.), modelado relacional
  • Sistemas: Administración de ERPs, Arquitectura TI, Seguridad y Redes`,

    exp: `CRONOLOGÍA LABORAL:
  1. SOLUGE S.A. DE C.V.     -> Encargado de Departamento IT
  2. INDUFOAM S.A. DE C.V.   -> Administrador de Aplicaciones (SAP HANA, SQL)
  3. DIZUCAR S.A. DE C.V.    -> Administrador de Aplicaciones (ERPs, SQL, C#)`,

    contacto: `UBICACIÓN & CONTACTO:
  • Ubicación : Soyapango, San Salvador, El Salvador
  • Estado    : Disponible para contratación y proyectos web / software
  • Teléfono  : WhatsApp / Móvil El Salvador (+503)`,

    pdf: `Abriendo vista de impresión para exportar como PDF...`
  };

  if (terminalInput && dynamicTerminalLines) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (!inputVal) return;

        if (inputVal === 'clear') {
          dynamicTerminalLines.innerHTML = '';
          return;
        }

        // Add user prompt line
        const cmdEntry = document.createElement('div');
        cmdEntry.className = 'term-line';
        cmdEntry.innerHTML = `<span class="term-prompt">irvin@dev:~$</span> <span class="term-cmd">${escapeHtml(inputVal)}</span>`;
        dynamicTerminalLines.appendChild(cmdEntry);

        // Add response
        const respEntry = document.createElement('div');
        respEntry.className = 'term-response';

        if (COMMANDS[inputVal]) {
          respEntry.innerHTML = `<pre style="font-family: inherit; margin: 0; white-space: pre-wrap;">${COMMANDS[inputVal]}</pre>`;
          if (inputVal === 'pdf') {
            setTimeout(() => window.print(), 800);
          }
        } else {
          respEntry.textContent = `Comando no reconocido: '${inputVal}'. Escribe 'help' para ver la lista de comandos disponibles.`;
        }

        dynamicTerminalLines.appendChild(respEntry);

        // Auto-scroll to bottom
        if (terminalOutput) {
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
      }
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});

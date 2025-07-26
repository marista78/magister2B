// ========================================
// 🎯 CONFIGURACIÓN SÚPER FÁCIL DE ACTIVIDADES
// ¡SOLO MODIFICAR AQUÍ PARA AGREGAR NUEVAS!
// ========================================

// PASO 1: Definir todas las actividades (FÁCIL DE MODIFICAR)
const ACTIVIDADES = [
    { id: 'canastaMadre', nombre: 'Canasta de la Madre', costo: 7, grupo: 'madre' },
    { id: 'regaloMiss', nombre: 'Regalo Día de la Madre Miss', costo: 5, grupo: 'madre' },
    { id: 'canastaPadre', nombre: 'Canasta del Padre', costo: 7, grupo: 'padre' },
    { id: 'aro', nombre: 'Confección de Aro', costo: 3, grupo: 'padre' },
    { id: 'actPadre', nombre: 'Actividad del Padre', costo: 15, grupo: 'padre' },
    { id: 'diaMaestro', nombre: 'Día del Maestro', costo: 5, grupo: 'maestro' },
    
    // ¡PARA AGREGAR NUEVA ACTIVIDAD, SOLO AGREGA UNA LÍNEA AQUÍ! 🎉
    //{ id: 'aniversario', nombre: 'Aniversario del Colegio', costo: 6, grupo: 'aniversario' }//
    // ¡Y listo! El resto se actualiza automáticamente
];

// PASO 2: Lista de estudiantes (SOLO NOMBRES)
const ESTUDIANTES_BASE = [
    "Arista Atauchi, Jose Andre",
    "Bautista Hualpa Kate", 
    "Borjas Medina, Dereck",
    "Cajacuri Cardenas, Arlett",
    "Carita Chuquihuanga, Valeria",
    "Chile Suyco, Julián Enrique",
    "Fernández Alcantara, Fernando",
    "Gutierrez Inocente, Rodrigo",
    "Isique Vilcahuamán, Ana Dayanne",
    "Juárez Mondragón, Mia Shirley",
    "Manyari Vargas, Iker Miguel",
    "Mendoza Socualaya, Ezio Valentín",
    "Paico Céspedes, Jésus",
    "Pedroza Muñoz, Rafaela Valentina",
    "Ramos Valdivia, Brianna",
    "Rivas Ramos Yamila Isel",
    "Sahuanay Moreno, Dayana",
    "Tapia Panebra, Renato",
    "Tejada Castillo, Emily",
    "Torres de la Cruz, Noah José",
    "Ycarrayme Rimarachin, Mikaela"
];

// PASO 3: ¡SOLO EXCEPCIONES! (estudiantes que pagan diferente)
const EXCEPCIONES_PAGO = {
    "Bautista Hualpa Kate": { actPadre: 0 },  // No pagó actividad del padre
    "Paico Céspedes, Jésus": { actPadre: 0 }, // No pagó actividad del padre
    
    // ¡AGREGAR EXCEPCIONES AQUÍ ES SÚPER FÁCIL!
    // "Nombre del Estudiante": { aniversario: 0 },  // Si alguien no paga el aniversario
    // "Otro Estudiante": { aniversario: 6 },        // Si alguien paga menos
};

// ========================================
// ¡EL RESTO ES AUTOMÁTICO! NO TOCAR 🤖
// ========================================

// Variable global para compatibilidad
let students = [];

// Generar estudiantes automáticamente
function generarEstudiantes() {
    try {
        return ESTUDIANTES_BASE.map((nombre, index) => {
            const estudiante = {
                no: index + 1,
                name: nombre
            };
            
            // Agregar todas las actividades con su costo default
            ACTIVIDADES.forEach(actividad => {
                estudiante[actividad.id] = actividad.costo;
            });
            
            // Aplicar excepciones si existen
            if (EXCEPCIONES_PAGO[nombre]) {
                Object.assign(estudiante, EXCEPCIONES_PAGO[nombre]);
            }
            
            return estudiante;
        });
    } catch (error) {
        console.error('Error en generarEstudiantes:', error);
        return [];
    }
}

// ========================================
// FUNCIONES PARA ACTUALIZAR RESUMEN AUTOMÁTICO
// ========================================

function actualizarResumenSuperior() {
    try {
        console.log('🔄 Actualizando resumen superior...');
        
        // Actualizar las cards del resumen
        const estudiantes = generarEstudiantes();
        const totalRecaudado = estudiantes.reduce((sum, est) => {
            return sum + ACTIVIDADES.reduce((actSum, act) => actSum + (est[act.id] || 0), 0);
        }, 0);
        
        // CONTAR CATEGORÍAS ÚNICAS (no actividades individuales)
        const categoriasUnicas = [...new Set(ACTIVIDADES.map(act => act.grupo))].length;
        
        console.log('💰 Total recaudado calculado:', totalRecaudado);
        console.log('📂 Categorías únicas:', categoriasUnicas);
        
        // Actualizar cards si existen
        const cards = document.querySelectorAll('.summary-cards .card h3');
        console.log('📊 Cards encontradas:', cards.length);
        
        if (cards.length >= 4) {
            cards[0].textContent = estudiantes.length; // Estudiantes
            cards[1].textContent = `S/ ${totalRecaudado.toFixed(0)}`; // Total Recaudado
            cards[2].textContent = categoriasUnicas; // CATEGORÍAS (no actividades individuales)
            // Participación se mantiene igual
            console.log('✅ Cards actualizadas correctamente');
            console.log(`📋 Actividades individuales: ${ACTIVIDADES.length}, Categorías: ${categoriasUnicas}`);
        }
        
        // Actualizar tabla principal de resumen
        actualizarTablaResumenPrincipal();
        
    } catch (error) {
        console.error('❌ Error en actualizarResumenSuperior:', error);
    }
}

function actualizarTablaResumenPrincipal() {
    try {
        console.log('📋 Actualizando tabla principal...');
        
        const tabla = document.querySelector('#resumen table tbody');
        
        if (!tabla) {
            console.warn('⚠️ No se encontró la tabla de resumen');
            return;
        }
        
        const estudiantes = generarEstudiantes();
        console.log('👥 Estudiantes para tabla:', estudiantes.length);
        
        // Limpiar tabla
        tabla.innerHTML = '';
        
        // Agregar fila por cada actividad
        ACTIVIDADES.forEach((actividad, index) => {
            const participantes = estudiantes.filter(est => (est[actividad.id] || 0) > 0).length;
            const totalRecaudado = estudiantes.reduce((sum, est) => sum + (est[actividad.id] || 0), 0);
            
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${actividad.nombre}</td>
                <td class="amount">S/ ${actividad.costo.toFixed(2)}</td>
                <td class="amount">S/ ${totalRecaudado.toFixed(2)}</td>
                <td>${participantes}/${estudiantes.length}</td>
            `;
            tabla.appendChild(fila);
            
            console.log(`✅ Fila ${index + 1} agregada: ${actividad.nombre}`);
        });
        
        console.log('🎉 Tabla principal actualizada correctamente');
        
    } catch (error) {
        console.error('❌ Error en actualizarTablaResumenPrincipal:', error);
    }
}

// ========================================
// FUNCIÓN PARA GENERAR HEADERS DINÁMICOS
// ========================================

function generarHeadersTablaEstudiantes() {
    try {
        console.log('🏗️ Generando headers dinámicos...');
        
        const tabla = document.querySelector('#estudiantes table');
        if (!tabla) {
            console.warn('⚠️ No se encontró la tabla de estudiantes');
            return;
        }
        
        // Agrupar actividades
        const grupos = {};
        ACTIVIDADES.forEach(act => {
            if (!grupos[act.grupo]) grupos[act.grupo] = [];
            grupos[act.grupo].push(act);
        });
        
        console.log('📋 Grupos para headers:', Object.keys(grupos));
        
        // Nombres de grupos para mostrar
        const nombresGrupos = {
            madre: 'DÍA DE LA MADRE',
            padre: 'DÍA DEL PADRE', 
            maestro: 'DÍA DEL MAESTRO',
            aniversario: 'ANIVERSARIO',
            especial: 'ACTIVIDADES ESPECIALES'
        };
        
        // Colores de grupos
        const coloresGrupos = {
            madre: 'madre',
            padre: 'padre',
            maestro: 'maestro', 
            aniversario: 'aniversario',
            especial: 'especial'
        };
        
        // Generar header principal
        let headerPrincipal = '<tr><th rowspan="2">N°</th><th rowspan="2">Apellidos y Nombres</th>';
        
        Object.keys(grupos).forEach(grupoId => {
            const grupo = grupos[grupoId];
            const nombre = nombresGrupos[grupoId] || grupoId.toUpperCase();
            const color = coloresGrupos[grupoId] || 'especial';
            headerPrincipal += `<th colspan="${grupo.length + 1}" class="group-header ${color}">${nombre}</th>`;
        });
        
        headerPrincipal += '<th rowspan="2">Total Pagado</th></tr>';
        
        // Generar header secundario
        let headerSecundario = '<tr>';
        
        Object.keys(grupos).forEach(grupoId => {
            const grupo = grupos[grupoId];
            const color = coloresGrupos[grupoId] || 'especial';
            
            grupo.forEach(actividad => {
                headerSecundario += `<th class="subheader">${actividad.nombre}</th>`;
            });
            headerSecundario += `<th class="subheader ${color}">Subtotal</th>`;
        });
        
        headerSecundario += '</tr>';
        
        // Reemplazar thead completo
        const thead = tabla.querySelector('thead');
        if (thead) {
            thead.innerHTML = headerPrincipal + headerSecundario;
            console.log('✅ Headers dinámicos generados correctamente');
        } else {
            console.warn('⚠️ No se encontró thead en la tabla');
        }
        
    } catch (error) {
        console.error('❌ Error en generarHeadersTablaEstudiantes:', error);
    }
}

// NUEVA FUNCIÓN PARA LLENAR TABLA COMPLETAMENTE AUTOMÁTICA
function fillStudentTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;
    
    // Generar estudiantes automáticamente
    students = generarEstudiantes();
    
    console.log(`✅ Sistema generó automáticamente ${students.length} estudiantes con ${ACTIVIDADES.length} actividades`);
    
    // PRIMERO: Generar headers dinámicos
    generarHeadersTablaEstudiantes();
    
    // SEGUNDO: Actualizar resumen superior
    actualizarResumenSuperior();
    
    let totales = {};
    
    // Inicializar totales para todas las actividades
    ACTIVIDADES.forEach(actividad => {
        totales[actividad.id] = 0;
    });
    totales.totalGeneral = 0;

    // Limpiar contenido previo
    tbody.innerHTML = '';

    // Agrupar actividades por grupo
    const grupos = {};
    ACTIVIDADES.forEach(act => {
        if (!grupos[act.grupo]) grupos[act.grupo] = [];
        grupos[act.grupo].push(act);
    });

    // Llenar datos de estudiantes
    students.forEach(student => {
        let totalEstudiante = 0;
        let celdas = [];
        
        // Número y nombre
        celdas.push(`<td>${student.no}</td>`);
        celdas.push(`<td class="student-name">${student.name}</td>`);
        
        // Por cada grupo en orden
        Object.keys(grupos).forEach(grupoId => {
            const grupoActividades = grupos[grupoId];
            let subtotalGrupo = 0;
            
            // Actividades del grupo
            grupoActividades.forEach(actividad => {
                const monto = student[actividad.id] || 0;
                celdas.push(`<td class="amount">S/ ${monto.toFixed(2)}</td>`);
                subtotalGrupo += monto;
                totales[actividad.id] += monto;
            });
            
            // Subtotal del grupo
            celdas.push(`<td class="amount" style="font-weight: bold;">S/ ${subtotalGrupo.toFixed(2)}</td>`);
            totalEstudiante += subtotalGrupo;
        });
        
        // Total del estudiante
        celdas.push(`<td class="amount" style="font-weight: bold;">S/ ${totalEstudiante.toFixed(2)}</td>`);
        totales.totalGeneral += totalEstudiante;

        tbody.innerHTML += `<tr>${celdas.join('')}</tr>`;
    });

    // Agregar fila de totales automáticamente
    agregarFilaTotalesCompletamenteAutomatica(tbody, totales, grupos);

    // Generar resumen actualizado
    generateSummary(totales.totalGeneral);
}

function agregarFilaTotalesCompletamenteAutomatica(tbody, totales, grupos) {
    try {
        console.log('🧮 Agregando fila de totales...');
        
        let totalCeldas = ['<td colspan="2"><strong>TOTALES</strong></td>'];
        
        // Por cada grupo en el mismo orden
        Object.keys(grupos).forEach(grupoId => {
            const grupoActividades = grupos[grupoId];
            let totalGrupo = 0;
            
            // Totales de actividades del grupo
            grupoActividades.forEach(actividad => {
                const total = totales[actividad.id] || 0;
                totalCeldas.push(`<td class="amount"><strong>S/ ${total.toFixed(2)}</strong></td>`);
                totalGrupo += total;
            });
            
            // Subtotal del grupo
            totalCeldas.push(`<td class="amount"><strong>S/ ${totalGrupo.toFixed(2)}</strong></td>`);
        });
        
        // Total general
        totalCeldas.push(`<td class="amount"><strong>S/ ${totales.totalGeneral.toFixed(2)}</strong></td>`);
        
        // Crear fila de totales
        const filaTotales = document.createElement('tr');
        filaTotales.className = 'total-row';
        filaTotales.innerHTML = totalCeldas.join('');
        tbody.appendChild(filaTotales);
        
        console.log('✅ Fila de totales agregada');
        
    } catch (error) {
        console.error('❌ Error en agregarFilaTotalesCompletamenteAutomatica:', error);
    }
}

// Generar resumen simplificado
function generateSummary(totalGeneral) {
    try {
        const summaryDiv = document.getElementById('summary');
        if (!summaryDiv) return;
        
        summaryDiv.innerHTML = `
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff;">
                <h3 style="color: #343a40; margin-bottom: 15px;">📊 Resumen de Pagos Dinámico</h3>
                <p><strong>Total de estudiantes:</strong> ${students.length}</p>
                <p><strong>Total de actividades:</strong> ${ACTIVIDADES.length}</p>
                <p><strong>Recaudación total:</strong> S/ ${totalGeneral.toFixed(2)}</p>
                <p><strong>🎯 Sistema automático:</strong> Configuración fácil activada</p>
            </div>
        `;
        
        console.log('✅ Resumen generado');
        
    } catch (error) {
        console.error('❌ Error en generateSummary:', error);
    }
}

// Función para cambiar de pestaña
function openTab(event, tabName) {
    // Ocultar todos los contenidos de pestañas
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Quitar la clase active de todos los botones de pestaña
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(tabName).classList.add('active');

    // Agregar la clase active al botón presionado
    event.target.classList.add('active');
}

// Función para manejar la subida de vouchers
function handleVoucherUpload() {
    const fileInput = document.getElementById('voucherUpload');
    if (!fileInput) return;
    
    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        const voucherGrid = document.getElementById('voucherGrid');
        
        if (!voucherGrid) return;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const voucherItem = document.createElement('div');
                voucherItem.className = 'voucher-item';
                voucherItem.innerHTML = `
                    <div class="voucher-image">
                        <img src="${e.target.result}" alt="Voucher" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div class="voucher-info">
                        <h4>${file.name}</h4>
                        <p><strong>Tamaño:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                        <p><strong>Tipo:</strong> ${file.type}</p>
                    </div>
                `;
                voucherGrid.appendChild(voucherItem);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// ========================================
// FUNCIONES PARA EL BOTÓN SCROLL TO TOP
// ========================================

/**
 * Controla la visibilidad del botón scroll to top
 */
function toggleScrollButton() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300; // Pixeles desde arriba para mostrar el botón
    
    if (!scrollBtn) return;
    
    if (window.pageYOffset > scrollThreshold) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
}

/**
 * Hace scroll suave hacia arriba
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Inicializa el botón de scroll to top
 */
function initScrollToTop() {
    // Agregar evento de scroll para mostrar/ocultar el botón
    window.addEventListener('scroll', toggleScrollButton);
    
    // También verificar al cargar por si la página ya tiene scroll
    toggleScrollButton();
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🚀 Sistema COMPLETAMENTE dinámico iniciado');
        console.log(`📋 Configuradas ${ACTIVIDADES.length} actividades:`, ACTIVIDADES.map(a => a.nombre));
        console.log(`👥 ${ESTUDIANTES_BASE.length} estudiantes base`);
        console.log(`⚠️ ${Object.keys(EXCEPCIONES_PAGO).length} excepciones de pago`);
        
        // PASO 1: Inicializar estudiantes globalmente
        students = generarEstudiantes();
        console.log('✅ Estudiantes generados:', students.length);
        
        // PASO 2: Actualizar INMEDIATAMENTE el resumen (pestaña activa)
        setTimeout(() => {
            actualizarResumenSuperior();
        }, 100);
        
        // PASO 3: Preparar tabla de estudiantes
        setTimeout(() => {
            fillStudentTable();
        }, 200);
        
        // PASO 4: Inicializar otras funciones
        setTimeout(() => {
            handleVoucherUpload();
            initScrollToTop();
        }, 300);
        
        console.log('✅ Sistema completamente cargado - TODO es dinámico ahora');
        console.log('💡 Para agregar actividades: modifica ACTIVIDADES al inicio del archivo');
        console.log('🎯 Resumen, headers y tabla se actualizan automáticamente');
        
    } catch (error) {
        console.error('❌ Error crítico en inicialización:', error);
        
        // Fallback: cargar datos básicos si hay error
        console.log('🔧 Intentando cargar modo fallback...');
        students = [
            {no: 1, name: "Error - Revisar JavaScript", 
             canastaMadre: 0, regaloMiss: 0, canastaPadre: 0, aro: 0, actPadre: 0, diaMaestro: 0, aniversario: 0}
        ];
    }
});

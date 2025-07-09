// Datos de estudiantes - AGREGAR SOLO diaMaestro
const students = [
    {no: 1, name: "Arista Atauchi, Jose Andre", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 2, name: "Bautista Hualpa Kate", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 0, diaMaestro: 5},
    {no: 3, name: "Borjas Medina, Dereck", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 4, name: "Cajacuri Cardenas, Arlett", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 5, name: "Carita Chuquihuanga, Valeria", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 6, name: "Chile Suyco, Julián Enrique", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 7, name: "Fernández Alcantara, Fernando", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 8, name: "Gutierrez Inocente, Rodrigo", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 9, name: "Isique Vilcahuamán, Ana Dayanne", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 10, name: "Juárez Mondragón, Mia Shirley", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 11, name: "Manyari Vargas, Iker Miguel", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 12, name: "Mendoza Socualaya, Ezio Valentín", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 13, name: "Paico Céspedes, Jésus", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 0, diaMaestro: 5},
    {no: 14, name: "Pedroza Muñoz, Rafaela Valentina", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 15, name: "Ramos Valdivia, Brianna", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 16, name: "Rivas Ramos Yamila Isel", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 17, name: "Sahuanay Moreno, Dayana", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 18, name: "Tapia Panebra, Renato", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 19, name: "Tejada Castillo, Emily", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 20, name: "Torres de la Cruz, Noah José", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5},
    {no: 21, name: "Ycarrayme Rimarachin, Mikaela", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15, diaMaestro: 5}
];

// Función para cambiar de pestaña (MANTENER IGUAL)
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

// NUEVA FUNCIÓN PARA LLENAR TABLA AGRUPADA
function fillStudentTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;
    
    let totales = {
        canastaMadre: 0,
        regaloMiss: 0,
        subtotalMadre: 0,
        canastaPadre: 0,
        aro: 0,
        actPadre: 0,
        subtotalPadre: 0,
        diaMaestro: 0,
        subtotalMaestro: 0,
        totalGeneral: 0
    };

    // Limpiar contenido previo
    tbody.innerHTML = '';

    // Llenar datos de estudiantes
    students.forEach(student => {
        const subtotalMadre = student.canastaMadre + student.regaloMiss;
        const subtotalPadre = student.canastaPadre + student.aro + student.actPadre;
        const subtotalMaestro = student.diaMaestro;
        const totalEstudiante = subtotalMadre + subtotalPadre + subtotalMaestro;

        // Acumular totales
        totales.canastaMadre += student.canastaMadre;
        totales.regaloMiss += student.regaloMiss;
        totales.subtotalMadre += subtotalMadre;
        totales.canastaPadre += student.canastaPadre;
        totales.aro += student.aro;
        totales.actPadre += student.actPadre;
        totales.subtotalPadre += subtotalPadre;
        totales.diaMaestro += student.diaMaestro;
        totales.subtotalMaestro += subtotalMaestro;
        totales.totalGeneral += totalEstudiante;

        const row = `
            <tr>
                <td>${student.no}</td>
                <td class="student-name">${student.name}</td>
                <td class="amount">S/ ${student.canastaMadre.toFixed(2)}</td>
                <td class="amount">S/ ${student.regaloMiss.toFixed(2)}</td>
                <td class="amount" style="font-weight: bold;">S/ ${subtotalMadre.toFixed(2)}</td>
                <td class="amount">S/ ${student.canastaPadre.toFixed(2)}</td>
                <td class="amount">S/ ${student.aro.toFixed(2)}</td>
                <td class="amount">S/ ${student.actPadre.toFixed(2)}</td>
                <td class="amount" style="font-weight: bold;">S/ ${subtotalPadre.toFixed(2)}</td>
                <td class="amount">S/ ${student.diaMaestro.toFixed(2)}</td>
                <td class="amount" style="font-weight: bold;">S/ ${subtotalMaestro.toFixed(2)}</td>
                <td class="amount" style="font-weight: bold;">S/ ${totalEstudiante.toFixed(2)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Agregar fila de totales
    const totalRow = `
        <tr class="total-row">
            <td colspan="2"><strong>TOTALES</strong></td>
            <td class="amount"><strong>S/ ${totales.canastaMadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.regaloMiss.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.subtotalMadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.canastaPadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.aro.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.actPadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.subtotalPadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.diaMaestro.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.subtotalMaestro.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totales.totalGeneral.toFixed(2)}</strong></td>
        </tr>
    `;
    tbody.innerHTML += totalRow;

    // Generar resumen (MANTENER IGUAL)
    generateSummary(totales.totalGeneral, totales.canastaMadre, totales.regaloMiss, totales.canastaPadre, totales.aro, totales.actPadre);
}

// Generar resumen (MANTENER IGUAL)
function generateSummary(totalGeneral, totalCanastaMadre, totalRegaloMiss, totalCanastaPadre, totalAro, totalActPadre) {
    const summaryDiv = document.getElementById('summary');
    if (!summaryDiv) return;
    
    const studentsWithoutActPadre = students.filter(s => s.actPadre === 0);
    
    summaryDiv.innerHTML = `
        <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff;">
            <h3 style="color: #343a40; margin-bottom: 15px;">📊 Resumen de Pagos</h3>
            <p><strong>Total de estudiantes:</strong> ${students.length}</p>
            <p><strong>Recaudación total:</strong> S/ ${totalGeneral.toFixed(2)}</p>
        </div>
    `;
}

// Función para manejar la subida de vouchers (MANTENER IGUAL)
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

// Inicializar cuando se carga la página (MANTENER IGUAL)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando...');
    fillStudentTable();
    handleVoucherUpload();
});

// Datos de estudiantes
const students = [
    {no: 1, name: "Arista Atauchi, Jose Andre", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 2, name: "Bautista Hualpa Kate", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 0},
    {no: 3, name: "Borjas Medina, Dereck", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 4, name: "Cajacuri Cardenas, Arlett", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 5, name: "Carita Chuquihuanga, Valeria", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 6, name: "Chile Suyco, Julián Enrique", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 7, name: "Fernández Alcantara, Fernando", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 8, name: "Gutierrez Inocente, Rodrigo", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 9, name: "Isique Vilcahuamán, Ana Dayanne", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 10, name: "Juárez Mondragón, Mia Shirley", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 11, name: "Manyari Vargas, Iker Miguel", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 12, name: "Mendoza Socualaya, Ezio Valentín", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 13, name: "Paico Céspedes, Jésus", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 0},
    {no: 14, name: "Pedroza Muñoz, Rafaela Valentina", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 15, name: "Ramos Valdivia, Brianna", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 16, name: "Rivas Ramos Yamila Isel", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 17, name: "Sahuanay Moreno, Dayana", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 18, name: "Tapia Panebra, Renato", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 19, name: "Tejada Castillo, Emily", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 20, name: "Torres de la Cruz, Noah José", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15},
    {no: 21, name: "Ycarrayme Rimarachin, Mikaela", canastaMadre: 7, regaloMiss: 5, canastaPadre: 7, aro: 3, actPadre: 15}
];

// Función para cambiar de pestaña (DEBE ESTAR FUERA Y SER GLOBAL)
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

// Llenar tabla de estudiantes
function fillStudentTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return; // Verificar que el elemento existe
    
    let totalGeneral = 0;
    let totalCanastaMadre = 0;
    let totalRegaloMiss = 0;
    let totalCanastaPadre = 0;
    let totalAro = 0;
    let totalActPadre = 0;

    // Limpiar contenido previo
    tbody.innerHTML = '';

    students.forEach(student => {
        const total = student.canastaMadre + student.regaloMiss + student.canastaPadre + student.aro + student.actPadre;
        totalGeneral += total;
        totalCanastaMadre += student.canastaMadre;
        totalRegaloMiss += student.regaloMiss;
        totalCanastaPadre += student.canastaPadre;
        totalAro += student.aro;
        totalActPadre += student.actPadre;

        const row = `
            <tr>
                <td>${student.no}</td>
                <td class="student-name">${student.name}</td>
                <td class="amount">S/ ${student.canastaMadre.toFixed(2)}</td>
                <td class="amount">S/ ${student.regaloMiss.toFixed(2)}</td>
                <td class="amount">S/ ${student.canastaPadre.toFixed(2)}</td>
                <td class="amount">S/ ${student.aro.toFixed(2)}</td>
                <td class="amount">S/ ${student.actPadre.toFixed(2)}</td>
                <td class="amount">S/ ${total.toFixed(2)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Agregar fila de totales
    const totalRow = `
        <tr class="total-row">
            <td colspan="2"><strong>TOTALES</strong></td>
            <td class="amount"><strong>S/ ${totalCanastaMadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totalRegaloMiss.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totalCanastaPadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totalAro.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totalActPadre.toFixed(2)}</strong></td>
            <td class="amount"><strong>S/ ${totalGeneral.toFixed(2)}</strong></td>
        </tr>
    `;
    tbody.innerHTML += totalRow;

    // Generar resumen
    generateSummary(totalGeneral, totalCanastaMadre, totalRegaloMiss, totalCanastaPadre, totalAro, totalActPadre);
}

// Generar resumen
function generateSummary(totalGeneral, totalCanastaMadre, totalRegaloMiss, totalCanastaPadre, totalAro, totalActPadre) {
    const summaryDiv = document.getElementById('summary');
    if (!summaryDiv) return; // Verificar que el elemento existe
    
    const studentsWithoutActPadre = students.filter(s => s.actPadre === 0);
    
    summaryDiv.innerHTML = `
        <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff;">
            <h3 style="color: #343a40; margin-bottom: 15px;">📊 Resumen de Pagos</h3>
            <p><strong>Total de estudiantes:</strong> ${students.length}</p>
            <p><strong>Recaudación total:</strong> S/ ${totalGeneral.toFixed(2)}</p>
        </div>
    `;
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

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando...');
    fillStudentTable();
    handleVoucherUpload();
});
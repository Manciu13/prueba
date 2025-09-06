// Espera a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
  let denuncias = [];

  // Cargar el CSV
  Papa.parse("data/denuncias.csv", {
    download: true,
    header: true,
    complete: function(results) {
      denuncias = results.data;
    }
  });

  // Función de búsqueda
  document.getElementById("buscarBtn").addEventListener("click", function() {
    const palabra = document.getElementById("buscador").value.trim().toLowerCase();
    const resultados = denuncias.filter(d => {
      // Ajusta "denuncia" por el nombre real de la columna en tu CSV
      return d.denuncia && d.denuncia.toLowerCase().includes(palabra);
    });

    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
    if(resultados.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron resultados</p>";
    } else {
      resultados.forEach(res => {
        resultadosDiv.innerHTML += `<p>${res.denuncia}</p>`;
      });
    }
  });
});

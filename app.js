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
      // Busca en la columna "Descripció"
      return d["Descripció"] && d["Descripció"].toLowerCase().includes(palabra);
    });

    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
    if(resultados.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron resultados</p>";
    } else {
      resultados.forEach(res => {
        resultadosDiv.innerHTML += `<p>${res["Descripció"]}</p>`;
      });
    }
  });
});

function normaliza(texto) {
  return texto
    ? texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

document.addEventListener("DOMContentLoaded", function() {
  let denuncias = [];
  let columnas = [];

  Papa.parse("data/denuncias.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      denuncias = results.data;
      columnas = results.meta.fields; // Obtiene los nombres de las columnas
    }
  });

  document.getElementById("buscarBtn").addEventListener("click", function() {
    const palabra = normaliza(document.getElementById("buscador").value.trim());
    const resultados = denuncias.filter(d => {
      return (
        d["Descripció"] &&
        normaliza(d["Descripció"]).includes(palabra)
      );
    });

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
    if (resultados.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron resultados</p>";
    } else {
      // Construye la tabla
      let tabla = "<table border='1' cellpadding='5'><thead><tr>";
      columnas.forEach(col => {
        tabla += `<th>${col}</th>`;
      });
      tabla += "</tr></thead><tbody>";
      resultados.forEach(res => {
        tabla += "<tr>";
        columnas.forEach(col => {
          tabla += `<td>${res[col] || ""}</td>`;
        });
        tabla += "</tr>";
      });
      tabla += "</tbody></table>";
      resultadosDiv.innerHTML = tabla;
    }
  });
});

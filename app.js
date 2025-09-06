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
      // Obtiene los nombres de las columnas del CSV
      columnas = results.meta.fields && results.meta.fields.length > 0
        ? results.meta.fields
        : Object.keys(denuncias[0] || {});
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
      // Construir tabla HTML
      let tabla = "<table style='border-collapse:collapse;width:100%'><thead><tr>";
      columnas.forEach(col => {
        tabla += `<th style='border:1px solid #ccc;padding:4px;background:#f8f8f8'>${col}</th>`;
      });
      tabla += "</tr></thead><tbody>";
      resultados.forEach(res => {
        tabla += "<tr>";
        columnas.forEach(col => {
          tabla += `<td style='border:1px solid #ccc;padding:4px'>${res[col] || ""}</td>`;
        });
        tabla += "</tr>";
      });
      tabla += "</tbody></table>";
      resultadosDiv.innerHTML = tabla;
    }
  });
});

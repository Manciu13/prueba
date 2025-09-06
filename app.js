// Función para normalizar texto: quita acentos y pasa a minúsculas
function normaliza(texto) {
  return texto
    ? texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

document.addEventListener("DOMContentLoaded", function() {
  let denuncias = [];

  Papa.parse("data/denuncias.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      denuncias = results.data;
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
      resultados.forEach(res => {
        resultadosDiv.innerHTML += `<p>${res["Descripció"]}</p>`;
      });
    }
  });
});

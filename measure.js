function createResetButton(btnType) {
    if (document.getElementById("resetCoords")) return; // Evita criar múltiplos botões

    const reset = document.createElement("button");
    reset.className = btnType;
    reset.id = "resetCoords";
    reset.textContent = "Reset";

    reset.style.position = "fixed";
    reset.style.bottom = "20px";
    reset.style.left = "20px";
    reset.style.padding = "10px 20px";
    reset.style.backgroundColor = "white";
    reset.style.color = "black";
    reset.style.border = "none";
    reset.style.cursor = "pointer";
    reset.style.zIndex = "1000";
    document.body.appendChild(reset);
  }

  function setupClickEventHandler() {
    let oldX = null,
      oldY = null,
      oldZ = null,
      endX,
      endY,
      endZ;
  
    document.getElementById("resetCoords").addEventListener("click", function () {
      oldX = null;
      oldY = null;
      oldZ = null;
      var lineEl = document.getElementById("line");
      if (lineEl) lineEl.remove();
      var textoEl = document.getElementById("texto");
      if (textoEl) textoEl.innerHTML = "Clique para selecionar o primeiro ponto.";
      console.log("Coordenadas resetadas!");
    });
  
    api.addEventListener(
      "click",
      function (info) {
        if (info.position3D) {
          var x = parseFloat(info.position3D[0].toFixed(3));
          var y = parseFloat(info.position3D[1].toFixed(3));
          var z = parseFloat(info.position3D[2].toFixed(3));
          var startX = parseFloat(info.position2D[0].toFixed(3));
          var startY = parseFloat(info.position2D[1].toFixed(3));
  
          var svgEl = document.getElementById("svgCanvas");
          var textoEl = document.getElementById("texto");
          var lineEl = document.getElementById("line");
          if (!lineEl) {
            lineEl = document.createElementNS("http://www.w3.org/2000/svg", "line");
            lineEl.id = "line";
            lineEl.setAttribute("stroke", "red");
            lineEl.setAttribute("stroke-width", "2");
            svgEl.appendChild(lineEl);
          }
  
          if (oldX === null && oldY === null && oldZ === null) {
            textoEl.innerHTML =
              "Primeiro clique registrado! Selecione outro ponto. Lembre de não mexer a câmera.";
            oldX = startX;
            oldY = startY;
            endX = x;
            endY = y;
            endZ = z;
          } else {
            var deltaX = x - endX;
            var deltaY = y - endY;
            var deltaZ = z - endZ;
            var distancia = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2).toFixed(3);
  
            textoEl.innerHTML = "Distância calculada: " + distancia + " milímetros";
            lineEl.setAttribute("x1", oldX);
            lineEl.setAttribute("y1", oldY);
            lineEl.setAttribute("x2", startX);
            lineEl.setAttribute("y2", startY);
            lineEl.setAttribute("visibility", "visible");
  
            oldX = null;
            oldY = null;
          }
  
          console.log("Clique em: X=" + x + ", Y=" + y + ", Z=" + z);
        }
      },
      { pick: "fast" }
    );
  }

  function setupUIOverlay() {
    var textoEl = document.getElementById("texto");
    if (!textoEl) {
      textoEl = document.createElement("p");
      textoEl.id = "texto";
      textoEl.style.position = "absolute";
      textoEl.style.top = "15px";
      textoEl.style.left = "300px";
      textoEl.style.color = "#fff";
      textoEl.style.fontSize = "20px";
      textoEl.style.fontFamily = "Arial, sans-serif, bold";
      textoEl.style.backgroundColor = "#272425";
      textoEl.style.padding = "8px";
      textoEl.style.border = "1px solid #ccc";
      textoEl.style.borderRadius = "5px";
      document.body.appendChild(textoEl);
      textoEl.innerHTML =
        "clique para registrar o primeiro ponto de medida.<br>Ao medir não mexa na camera para criar uma linha entre os pontos";
    }
  
    var svgEl = document.getElementById("svgCanvas");
    if (!svgEl) {
      svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgEl.id = "svgCanvas";
      svgEl.setAttribute("width", window.innerWidth);
      svgEl.setAttribute("height", window.innerHeight);
      svgEl.style.position = "fixed";
      svgEl.style.top = "085";
      svgEl.style.left = "020";
      svgEl.style.pointerEvents = "none";
      svgEl.style.zIndex = "1000";
      document.body.appendChild(svgEl);
    }
  
    if (!document.getElementById("resetCoords")) {
      const reset = document.createElement("button");
      reset.className = "meu-botao";
      reset.id = "resetCoords";
      reset.textContent = "Reset";
      reset.style.position = "fixed";
      reset.style.bottom = "20px";
      reset.style.left = "20px";
      reset.style.padding = "10px 20px";
      reset.style.backgroundColor = "white";
      reset.style.color = "black";
      reset.style.border = "none";
      reset.style.cursor = "pointer";
      reset.style.zIndex = "1000";
      document.body.appendChild(reset);
    }
  }
  

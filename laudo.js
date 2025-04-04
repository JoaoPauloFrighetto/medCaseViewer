
function createLaudoButton() {
    let laudoBtn = document.getElementById("laudo");
    if (!laudoBtn) {
      laudoBtn = document.createElement("button");
      laudoBtn.id = "laudo";
      laudoBtn.className = "click";
      laudoBtn.style.backgroundColor = "white";
      laudoBtn.style.color = "black";
      laudoBtn.style.zIndex = "1000";
      laudoBtn.style.position = "fixed";
      laudoBtn.style.top = "745px";
      laudoBtn.style.right = "50px";
      laudoBtn.textContent = "Laudo";
      laudoBtn.style.zIndex = "11000";
      document.body.appendChild(laudoBtn);
    }
    return laudoBtn;
  }
  
  function createOptionsButton() {
    let optionsBtn = document.getElementById("options");
    if (!optionsBtn) {
      optionsBtn = document.createElement("button");
      optionsBtn.id = "options";
      optionsBtn.className = "click";
      optionsBtn.style.backgroundColor = "white";
      optionsBtn.style.color = "black";
      optionsBtn.style.zIndex = "1000";
      optionsBtn.style.position = "fixed";
      optionsBtn.style.top = "745px";
      optionsBtn.style.right = "120px";
      optionsBtn.textContent = "Opções";
      optionsBtn.style.zIndex = "11000";
      document.body.appendChild(optionsBtn);
    }
    return optionsBtn;
  }
  
  function toggleControls(show) {
    document.getElementById("navTree").style.display = show ? "inline-block" : "none";
    document.getElementById("subtitles").style.display = show ? "inline-block" : "none";
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    createLaudoButton();
    createOptionsButton();
  
    const laudoBtn = document.getElementById("laudo");
    const optionsBtn = document.getElementById("options");
  
    laudoBtn.addEventListener("click", function () {
      console.log("Botão Laudo clicado!");
      toggleControls(false);
  
      async function getModelInfo() {
          const url = `https://api.sketchfab.com/v3/models/${uid}`;
          
          try {
              const response = await fetch(url, {
                  headers: {
                      'Authorization': `Token ${API_TOKEN}`
                  }
              });
  
              if (!response.ok) {
                  throw new Error(`Erro: ${response.status} ${response.statusText}`);
              }
  
              const data = await response.json();
              
              // Exibir a descrição no elemento "mensagem"
              const mensagemEl = document.getElementById("mensagem");
              if (mensagemEl) {
                  mensagemEl.style.display = "inline-block";
                  mensagemEl.innerHTML = `<p>${data.description}</p>`;
              } else {
                  console.error("Elemento 'mensagem' não encontrado!");
              }
          } catch (error) {
              console.error(error);
          }
      }
  
      // Chamar a função para obter a descrição do modelo
      getModelInfo();
  });
  
    optionsBtn.addEventListener("click", function () {
      console.log("Botão Opções clicado!");
      toggleControls(true);
      document.getElementById("mensagem").style.display = "none";
    });
  });
  
  
  function createLaudoButton() {
    let laudoBtn = document.getElementById("laudo");
    if (!laudoBtn) {
      laudoBtn = document.createElement("button");
      laudoBtn.id = "laudo";
      laudoBtn.className = "laudo-button";
      laudoBtn.style.backgroundColor = "#eaeaea";
      laudoBtn.style.color = "black";
      laudoBtn.style.zIndex = "1000";
      laudoBtn.style.position = "fixed";
      laudoBtn.style.top = "0px";
      laudoBtn.style.right = "50px";
      laudoBtn.textContent = "Laudo";
      laudoBtn.style.zIndex = "11000";
      document.body.appendChild(laudoBtn);
    }
    return laudoBtn;
  }
  
  function createOptionsButton() {
    let optionsBtn = document.getElementById("options");
    if (!optionsBtn) {
      optionsBtn = document.createElement("button");
      optionsBtn.id = "options";
      optionsBtn.className = "options-button";
      optionsBtn.style.backgroundColor = "#eaeaea";
      optionsBtn.style.color = "black";
      optionsBtn.style.zIndex = "1000";
      optionsBtn.style.position = "fixed";
      optionsBtn.style.top = "0px";
      optionsBtn.style.right = "120px";
      optionsBtn.textContent = "Opções";
      optionsBtn.style.zIndex = "11000";
      document.body.appendChild(optionsBtn);
    }
    return optionsBtn;
  }
  
  function toggleControls(show) {
    document.getElementById("navTree").style.display = show ? "inline-block" : "none";
    document.getElementById("subtitles").style.display = show ? "inline-block" : "none";
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    createLaudoButton();
    createOptionsButton();
  
    const laudoBtn = document.getElementById("laudo");
    const optionsBtn = document.getElementById("options");
  
    laudoBtn.addEventListener("click", function () {
      console.log("Botão Laudo clicado!");
      toggleControls(false);
  
      async function getModelInfo() {
          const url = `https://api.sketchfab.com/v3/models/${MODEL_UID}`;
          
          try {
              const response = await fetch(url, {
                  headers: {
                      'Authorization': `Token ${API_TOKEN}`
                  }
              });
  
              if (!response.ok) {
                  throw new Error(`Erro: ${response.status} ${response.statusText}`);
              }
  
              const data = await response.json();
              
              // Exibir a descrição no elemento "mensagem"
              const mensagemEl = document.getElementById("mensagem");
              if (mensagemEl) {
                  mensagemEl.style.display = "inline-block";
                  mensagemEl.innerHTML = `<p>${data.description}</p>`;
              } else {
                  console.error("Elemento 'mensagem' não encontrado!");
              }
          } catch (error) {
              console.error(error);
          }
      }
  
      // Chamar a função para obter a descrição do modelo
      getModelInfo();
  });
  
    optionsBtn.addEventListener("click", function () {
      console.log("Botão Opções clicado!");
      toggleControls(true);
      document.getElementById("mensagem").style.display = "none";
    });
  });

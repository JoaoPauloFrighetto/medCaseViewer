// main.js
// Sketchfab Viewer API: Start/Stop the viewer
var version = "1.12.0";
var api;
// Global arrays for materials and non-parent nodes
var materials = [];
var nonParentNodes = [];

// Global object to track nodes already added
var seenNodes = {};

var urlParams = new URLSearchParams(window.location.search);
var autoSpin = parseFloat(urlParams.get("autospin")) || 0.0;
var uid = urlParams.get("id") || "cfa25b2074ec4de79dbce19bc21f9e8d";

var iframe = document.getElementById("api-frame");
var client = new window.Sketchfab(version, iframe);

var error = function () {
  console.error("Sketchfab API error");
};

var myNodesByNameFromMap = {};

var success = function (passedApi) {
  api = passedApi; // Assign the API instance to the global variable
  api.start(function () {
    api.addEventListener("viewerready", function () {
      // Retrieve and store all materials without sorting
      api.getMaterialList(function (err, mats) {
        if (!err && mats.length > 0) {
          materials = mats;
          // Assign an index property to each material based on original order
          for (var i = 0; i < materials.length; i++) {
            materials[i].index = i;
          }
          console.log("Materials (original order):");
          materials.forEach(function (mat) {
            console.log("Material index:", mat.index, "Name:", mat.name);
          });
        }
      });

      api.getNodeMap(function (err, nodes) {
        if (!err) {
          // Build the node map using node names
          for (var instanceID in nodes) {
            var node = nodes[instanceID];
            var name = node.name || "noname_" + instanceID;
            myNodesByNameFromMap[name] = node;
          }

          console.log("Node map:", nodes);

          // Or enumerate each node’s properties:
          Object.keys(nodes).forEach(function (nodeID) {
            var node = nodes[nodeID];
            console.log("Node ID:", nodeID, "Name:", node.name);
            console.log(node);
          });

          // Identify the root node
          var rootNodeTree =
            myNodesByNameFromMap["RootNode"] || myNodesByNameFromMap["root"];
          if (rootNodeTree) {
            // Recursively build the nonParentNodes array
            recurse(rootNodeTree);
            console.log("nonParentNodes (with instanceIDs):");
            // Assign material indices based on node order
            nonParentNodes.forEach(function (node, index) {
              node.materialIndex = index % materials.length;
            });
            generateFlatList();
          }
        }

        var toggleButtons = document.getElementsByClassName("Toggle");
        for (let i = 0; i < toggleButtons.length; i++) {
          toggleButtons[i].addEventListener("click", function () {
            if (this.dataset.isHidden === "false") {
              api.hide(this.value);
              this.dataset.isHidden = "true";
              this.innerHTML = `<img src="eye_off_icon.svg" width="24" alt="Show" />`;
            } else {
              api.show(this.value);
              this.dataset.isHidden = "false";
              this.innerHTML = `<img src="eye_icon.svg" width="24" alt="Hide" />`;
              const parentEl = document.getElementById(this.value);
              if (parentEl) {
                const childToggles = parentEl.getElementsByClassName("Toggle");
                for (let j = 0; j < childToggles.length; j++) {
                  api.show(childToggles[j].value);
                  childToggles[j].dataset.isHidden = "false";
                  childToggles[
                    j
                  ].innerHTML = `<img src="eye_icon.svg" width="24" alt="Hide" />`;
                }
              }
            }
          });
        }
      });
    });
  });
};

// Initialize the Sketchfab client
client.init(uid, {
  success: success,
  error: error,
  autostart: 1,
  preload: 1,
  autospin: autoSpin,
  transparent: 1,
  ui_infos: 0,
  ui_controls: 0,
  ui_stop: 0,
  ui_help: 0,
  ui_fullscreen: 0,
  ui_vr: 0,
});

// GUI Code
// Generate a flat list UI using nonParentNodes
function generateFlatList() {
  var navTree = document.getElementById("navTree"); // Use 'navTree' to match HTML

  navTree.innerHTML = ""; // Clear existing content
  nonParentNodes.forEach(function (node) {
    var li = document.createElement("li");
    li.className = "lineMain";
    var line1 = document.createElement("div");
    var line2 = document.createElement("div");
    line2.className = "line2";
    li.appendChild(line1);
    li.appendChild(line2);

    var span = document.createElement("span");
    span.className = "caret_child";
    span.textContent = node.name;
    line1.appendChild(span);
    line1.appendChild(createToggleButton("Toggle", node.instanceID, node.name));
    line2.appendChild(createOpacitySlider(1.0, node.materialIndex));
    navTree.appendChild(li);
  });
}

function createOpacitySlider(opacity, materialIndex) {
  // function createOpacitySlider(opacity, materialIndex) {
  const slider = document.createElement("input");
  slider.className = "opacitySlider";
  slider.type = "range";
  slider.min = "0";
  slider.max = "1";
  slider.step = "0.01";
  slider.value = opacity.toString();
  slider.addEventListener("input", function () {
    setOpacityForMaterial(materialIndex, parseFloat(this.value));
  });
  return slider;
}

// Set opacity for a specific material
function setOpacityForMaterial(materialIndex, opacity) {
  var targetMaterial = materials.find(function (mat) {
    //someday fix it
    return mat.stateSetID === materialIndex + 1;
  });
  if (!targetMaterial) {
    console.error(
      "No material found for material.index matching node.materialIndex: " +
        materialIndex
    );
    return;
  }
  console.log("Material properties:");
  for (var prop in targetMaterial) {
    if (targetMaterial.hasOwnProperty(prop)) {
      console.log(prop + ":", targetMaterial[prop]);
    }
  }
  targetMaterial.channels.Opacity.enable = true;
  targetMaterial.channels.Opacity.type = "alphaBlend";
  targetMaterial.channels.Opacity.factor = opacity;
  api.setMaterial(targetMaterial, function () {});
}

// Create a toggle button for visibility
function createToggleButton(btnType, instance, name) {
  const btn = document.createElement("button");
  btn.className = btnType;
  btn.id = instance + "_" + name + "_toggle";
  btn.value = instance;
  btn.dataset.isHidden = "false";
  btn.innerHTML = `<img src="eye_icon.svg" width="24" alt="Hide" />`;
  return btn;
}

// Recursively traverse the node tree to identify non-parent nodes
function recurse(nodeTree) {
  nodeTree.children.forEach((child) => {
    if (child.type === "MatrixTransform") {
      recurse(child);
    } else if (!seenNodes[child.instanceID]) {
      var node = {
        name: child.name,
        instanceID: child.instanceID,
        materialIndex: -1, // Initial value, updated later
      };
      nonParentNodes.push(node);
      seenNodes[child.instanceID] = true;
    }
  });
}

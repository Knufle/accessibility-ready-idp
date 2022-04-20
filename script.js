function handleJSONupload(event) {
    try {
      const { elements } = document.querySelector("form");
      const files = event.target.files;
      if (!files.length) {
        alert("Nenhum arquivo selecionado!");
        return;
      }
      const file = files[0];
      document.querySelector(
        "#selectedFile"
      ).innerHTML = `Arquivo importado: ${file.name}`;
      const reader = new FileReader();
      reader.onload = (event) => {
        for (const [key, value] of Object.entries(
          JSON.parse(event.target.result)
        )) {
          const field = elements.namedItem(key);
          field && (field.value = value);
        }
        console.log("FILE CONTENT", JSON.parse(event.target.result));
      };
      reader.readAsText(file);
    } catch (err) {
      console.error(err);
    }
    document.querySelector("#firstHeading").focus();
    event.target.value = null;
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    console.log(JSON.stringify(Object.fromEntries(formData)));
    const personName = event.target.elements.name.value
      ? "_" + event.target.elements.name.value
      : "";
    saveTemplateAsFile(`PDI${personName}.json`, Object.fromEntries(formData));
  }
  
  const saveTemplateAsFile = (filename, dataObjToWrite) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], {
      type: "text/json",
    });
    const link = document.createElement("a");
  
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
  
    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
  
    link.dispatchEvent(evt);
    link.remove();
  };
  
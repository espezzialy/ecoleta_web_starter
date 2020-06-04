function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]');
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then( res => res.json() )
      .then((states) => {
        for (const state of states) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
      });
  }
  
  populateUFs();
  
  function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
  
    const ufValue = event.target.value;
  
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
  
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = false;

    fetch(url)
      .then((res) => res.json())
      .then((cities) => {
        
        for (const city of cities) {
          citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
  
        citySelect.disabled = false;
      });
  }
  
  document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities);

    const itemsTocCollect = document.querySelectorAll(".items-grid li");

    for (const item of itemsTocCollect){
      item.addEventListener("click", handleSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=items]")

    let selectedItems = []

    function handleSelectedItem(event){
      const itemLi = event.target

      itemLi.classList.toggle("selected")

      const itemId = itemLi.dataset.id

      

      const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //true or false
        return itemFound 
      })

      if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
          const itemIsDiferent = item != itemId
          return itemIsDiferent
        })

        selectedItems = filteredItems
      } else {
        selectedItems.push(itemId)
      }
      
      // add or remove a class with js
      collectedItems.value = selectedItems
      

    }
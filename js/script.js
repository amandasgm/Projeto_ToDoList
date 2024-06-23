// SELEÇÃO DE ELEMENTOS
const toDoForm = document.querySelector('.toDo_form');
const toDoInput = document.querySelector('.toDo_input');
const toDoList = document.querySelector('.toDo_list');
const editForm = document.querySelector('.edit_form');
const editInput = document.querySelector('.edit_input');
const cancelEdit = document.querySelector('.cancel_edit');

let oldInputValue;


// FUNÇÕES
function adicionar(e){
    e.preventDefault();

    const toDoInputValue = toDoInput.value // puxa o valor digitado pelo usuario no toDo_input
    // salva o toDo
    if(toDoInputValue){
        saveToDoInput(toDoInputValue) 
    }
}

function clicar(e){
    const targetEl = e.target; // Captura o elemento que foi clicado
    const parentEl = targetEl.closest("div"); // Encontra o elemento pai mais próximo que seja um <div>
    let toDoTitulo;

    if (parentEl && parentEl.querySelector('h3')){
        toDoTitulo = parentEl.querySelector("h3").innerText
    }

    // BOTÃO CHECK
    if (targetEl.classList.contains("finish_toDo")){ //Verifica se o elemento clicado (targetEl) contem a classe CSS finish_toDo. Isso é importante para garantir que a ação dentro do if seja aplicada apenas quando um elemento com essa classe específica for clicado.
        parentEl.classList.toggle("done"); // Alterna a presença da classe "done" no elemento pai
    }

    // BOTÃO EDIT
    if (targetEl.classList.contains("edit_toDo")){ 
        toggleForms()

        editInput.value = toDoTitulo; // mudo o valor do input
        oldInputValue = toDoTitulo; // mapeeio esse valor e salvo na memoria
    }

    // BOTÃO REMOVE
    if (targetEl.classList.contains("remove_toDo")){ 
        parentEl.remove(); 
    }
}

const saveToDoInput = (text) => {

    const toDo = document.createElement("div") // cria um novo elemento div - entre parenteses vai o elemento a ser criado
    toDo.classList.add("toDo_itens") // adiciona a classe "toDo_itens"

    const toDoTitulo = document.createElement("h3")  // criar o titulo 
    toDoTitulo.innerText = text // inserindo o texto no elemento que criamos
    toDo.appendChild(toDoTitulo) // colocamos no toDo meu h3

    // OS BOTÕES AGORA - finish_toDo / edit_toDo / remove_toDo

    // finish_toDo 
    const doneButton = document.createElement("button") // criamos um novo elemento que surgirá junto com o toDo novo
    doneButton.classList.add('finish_toDo') // adicionamos a classe que está especificada no html
    doneButton.innerHTML = '<i class="fa-solid fa-check"></i>' // add o item do botao
    toDo.appendChild(doneButton)

    //edit_toDo
    const editButton = document.createElement("button") // criamos um novo elemento que surgirá junto com o toDo novo
    editButton.classList.add('edit_toDo') // adicionamos a classe que está especificada no html
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>' // add o item do botao
    toDo.appendChild(editButton)

    // remove_toDo
    const removeButton = document.createElement("button") // criamos um novo elemento que surgirá junto com o toDo novo
    removeButton.classList.add('remove_toDo') // adicionamos a classe que está especificada no html
    removeButton.innerHTML = '<i class="fa-solid fa-x"></i>' // add o item do botao
    toDo.appendChild(removeButton)

    // agora vamos adicionar os novos toDo a toDo_list
    toDoList.appendChild(toDo)

    toDoInput.value = ""; // limpa a caixa de texto do input
    toDoInput.focus(); // faz o cursor focar/permanecer no input 

    
}

// para esconder tudo e aparecer so a parte do editar
const toggleForms = () => { 
    editForm.classList.toggle("hide")
    toDoForm.classList.toggle("hide")
    toDoList.classList.toggle('hide')
}

// para que o botao de cancelar funcione
function editar(e) {
    e.preventDefault()

    toggleForms();
}

// manipulando o titulo do input e a edição depois
function editado(e) {
    e.preventDefault()

    const editInputValue = editInput.value
    if(editInputValue){
        updateToDo(editInputValue)
    }

    toggleForms()
}

// submeter o botao para salvar a edição da tarefa
function submeterEdiçãoButton(e){
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){ // se tiver vazio vamos cancelar a edição
        updateToDo(editInputValue)
    }

    toggleForms();
}

const updateToDo = (text) => {

    const toDos = document.querySelectorAll('.toDo_itens')

    toDos.forEach ((toDo) => {
        let toDoTitulo = toDo.querySelector('h3')

        if(toDoTitulo.innerText === oldInputValue){
            toDoTitulo.innerText = text
        }
    })
}


// EVENTOS ----------------------------------------------------------------------------

// EVENTO DE ADICIONAR NOVA TAREFA
toDoForm.addEventListener("submit", adicionar)

// EVENTO DOS CLICKS 
document.addEventListener("click", clicar)
cancelEdit.addEventListener("click", editar)

// EVENTO DE TAREFA EDITADA
editForm.addEventListener('submit', editado )

// BOTÃO PARA SUBMETER A EDIÇÃO DO TITULO
editInput.addEventListener("submit", submeterEdiçãoButton)
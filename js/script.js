const secaoPendente = document.getElementById("pendente");
const secaoConcluido = document.getElementById("concluido");
const botaoCriarTarefa = document.getElementById("criarTarefa");
const padrao = document.querySelector(".default");

let tarefas = [];

function salvarNoLocalStorage() {
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

function carregarDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem("minhasTarefas");
    if (tarefasSalvas) {
        padrao.style.display = 'none';
        tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(tarefaObj => {
            renderizarTarefa(tarefaObj);
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    carregarDoLocalStorage();
});

function trocarTag(elemento, novaTag) {
    if (!elemento) return;

    const novoEl = document.createElement(novaTag);
    
    if (elemento.tagName.toLowerCase() === 'select') {
        novoEl.innerHTML = elemento.options[elemento.selectedIndex].text;
    } else if (elemento.tagName.toLowerCase() === 'input' || elemento.tagName.toLowerCase() === 'textarea') {
        novoEl.innerHTML = elemento.value; 
    } else {
        novoEl.innerHTML = elemento.innerHTML;
    }
    
    Array.from(elemento.attributes).forEach(attr => {
        const nomesIgnorados = ['value', 'type', 'name', 'required'];
        if (!nomesIgnorados.includes(attr.name)) {
            novoEl.setAttribute(attr.name, attr.value);
        }
    });
    
    elemento.replaceWith(novoEl);
}

function renderizarTarefa(tarefaObj) {
    const novaTarefa = document.createElement("p");
    novaTarefa.classList.add("tarefa");

    const label1 = document.createElement("label");
    label1.textContent = "Descrição: ";
    novaTarefa.appendChild(label1);

    const descP = document.createElement("p");
    descP.textContent = tarefaObj.descricao;
    novaTarefa.appendChild(descP);

    const label2 = document.createElement("label");
    label2.textContent = "Categoria: ";
    novaTarefa.appendChild(label2);

    const catP = document.createElement("p");
    catP.textContent = tarefaObj.categoria;
    novaTarefa.appendChild(catP);

    const label3 = document.createElement("label");
    label3.textContent = "Prioridade: ";
    novaTarefa.appendChild(label3);

    const priP = document.createElement("p");
    priP.textContent = tarefaObj.prioridade;
    novaTarefa.appendChild(priP);

    const botaoConcluir = document.createElement("button");
    botaoConcluir.classList.add("adicionarTarefa");
    botaoConcluir.textContent = "Concluir tarefa";
    novaTarefa.appendChild(botaoConcluir);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("adicionarTarefa");
    botaoEditar.textContent = "Editar";
    novaTarefa.appendChild(botaoEditar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("adicionarTarefa");
    botaoExcluir.textContent = "Excluir";
    novaTarefa.appendChild(botaoExcluir);

    if (tarefaObj.concluido) {
        secaoConcluido.appendChild(novaTarefa);
        botaoConcluir.remove();
    } else {
        secaoPendente.appendChild(novaTarefa);
    }

    botaoConcluir.addEventListener("click", (event) => {
        event.preventDefault();
        secaoConcluido.appendChild(novaTarefa);
        botaoConcluir.remove();

        tarefaObj.concluido = true;
        salvarNoLocalStorage();
    });

    botaoEditar.addEventListener("click", (event) => {
        event.preventDefault();

        const inputDesc = document.createElement("input");
        inputDesc.type = "text";
        inputDesc.value = tarefaObj.descricao;
        descP.replaceWith(inputDesc);

        const selectCat = document.createElement("select");
        ['Estudos', 'Trabalho', 'Tarefa de casa'].forEach(texto => {
            const opcao = document.createElement("option");
            opcao.value = texto.toLowerCase();
            opcao.textContent = texto;
            if (texto === tarefaObj.categoria) opcao.selected = true;
            selectCat.appendChild(opcao);
        });
        catP.replaceWith(selectCat);

        const selectPri = document.createElement("select");
        ['Baixa', 'Média', 'Alta'].forEach(texto => {
            const opcao = document.createElement("option");
            opcao.value = texto.toLowerCase();
            opcao.textContent = texto;
            if (texto === tarefaObj.prioridade) opcao.selected = true;
            selectPri.appendChild(opcao);
        });
        priP.replaceWith(selectPri);

        botaoEditar.textContent = "Salvar";

        botaoEditar.onclick = (e) => {
            e.preventDefault();

            tarefaObj.descricao = inputDesc.value;
            tarefaObj.categoria = selectCat.options[selectCat.selectedIndex].text;
            tarefaObj.prioridade = selectPri.options[selectPri.selectedIndex].text;

            descP.textContent = tarefaObj.descricao;
            catP.textContent = tarefaObj.categoria;
            priP.textContent = tarefaObj.prioridade;

            inputDesc.replaceWith(descP);
            selectCat.replaceWith(catP);
            selectPri.replaceWith(priP);

            botaoEditar.textContent = "Editar";
            salvarNoLocalStorage();

            const novoBotaoEditar = botaoEditar.cloneNode(true);
            botaoEditar.replaceWith(novoBotaoEditar);
            window.location.reload();
        };
    });

    botaoExcluir.addEventListener("click", (event) => {
        event.preventDefault();
        
        const index = tarefas.indexOf(tarefaObj);
        if (index > -1) {
            tarefas.splice(index, 1);
        }
        
        salvarNoLocalStorage();
        novaTarefa.remove();
    });
}

function adicionarTarefa() {
    const novaTarefa = document.createElement("p");
    novaTarefa.classList.add("tarefa");

    const label1 = document.createElement("label");
    label1.textContent = "Descrição: ";
    novaTarefa.appendChild(label1);

    const descricaoTarefa = document.createElement("input");
    descricaoTarefa.type = 'text';
    novaTarefa.appendChild(descricaoTarefa);

    const label2 = document.createElement("label");
    label2.textContent = "Categoria: ";
    novaTarefa.appendChild(label2);

    const categoriaTarefa = document.createElement("select");
    novaTarefa.appendChild(categoriaTarefa);
    
    ['Estudos', 'Trabalho', 'Tarefa de casa'].forEach(texto => {
        const opcao = document.createElement("option");
        opcao.value = texto.toLowerCase();
        opcao.textContent = texto;
        categoriaTarefa.appendChild(opcao);
    });

    const label3 = document.createElement("label");
    label3.textContent = "Prioridade: ";
    novaTarefa.appendChild(label3);

    const prioridadeTarefa = document.createElement("select");
    novaTarefa.appendChild(prioridadeTarefa);
    
    ['Baixa', 'Média', 'Alta'].forEach(texto => {
        const opcao = document.createElement("option");
        opcao.value = texto.toLowerCase();
        opcao.textContent = texto;
        prioridadeTarefa.appendChild(opcao);
    });

    secaoPendente.appendChild(novaTarefa);

    const botao = document.createElement("button");
    botao.classList.add("adicionarTarefa");
    botao.textContent = "Adicionar Tarefa";
    novaTarefa.appendChild(botao);

    botao.addEventListener("click", (event) => {
        event.preventDefault();

        const tarefaObj = {
            descricao: descricaoTarefa.value,
            categoria: categoriaTarefa.options[categoriaTarefa.selectedIndex].text,
            prioridade: prioridadeTarefa.options[prioridadeTarefa.selectedIndex].text,
            concluido: false
        };

        tarefas.push(tarefaObj);
        salvarNoLocalStorage();

        novaTarefa.remove();
        renderizarTarefa(tarefaObj);
    });
}

botaoCriarTarefa.addEventListener("click", (event) => {
    event.preventDefault();
    padrao.style.display = 'none';
    adicionarTarefa();
});
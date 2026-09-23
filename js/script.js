const secaoPendente = document.getElementById("pendente");
const botaoCriarTarefa = document.getElementById("criarTarefa");

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


function adicionarTarefa() {
    const novaTarefa = document.createElement("p");
    novaTarefa.classList.add("tarefa");

    const label1 = document.createElement("label");
    label1.textContent = "Descrição: "
    novaTarefa.appendChild(label1);

    const descricaoTarefa = document.createElement("input");
    descricaoTarefa.type = 'text';
    novaTarefa.appendChild(descricaoTarefa);

    const label2 = document.createElement("label");
    label2.textContent = "Categoria: "
    novaTarefa.appendChild(label2);

    const categoriaTarefa = document.createElement("select");
    novaTarefa.appendChild(categoriaTarefa);
    const opcao1 = document.createElement("option");
    opcao1.value = "estudos";
    opcao1.textContent = "Estudos";
    const opcao2 = document.createElement("option");
    opcao2.value = "trabalho";
    opcao2.textContent = "Trabalho";
    const opcao3 = document.createElement("option");
    opcao3.value = "Tarefa de casa";
    opcao3.textContent = "Tarefa de casa";
    categoriaTarefa.appendChild(opcao1);
    categoriaTarefa.appendChild(opcao2);
    categoriaTarefa.appendChild(opcao3);

    const label3 = document.createElement("label");
    label3.textContent = "Prioridade: ";
    novaTarefa.appendChild(label3);

    const prioridadeTarefa = document.createElement("select");
    novaTarefa.appendChild(prioridadeTarefa);
    const opcao12 = document.createElement("option");
    opcao12.value = "baixa";
    opcao12.textContent = "Baixa";
    const opcao22 = document.createElement("option");
    opcao22.value = "media";
    opcao22.textContent = "Média";
    const opcao32 = document.createElement("option");
    opcao32.value = "alta";
    opcao32.textContent = "Alta";
    prioridadeTarefa.appendChild(opcao12);
    prioridadeTarefa.appendChild(opcao22);
    prioridadeTarefa.appendChild(opcao32);

    secaoPendente.appendChild(novaTarefa);

    const botao = document.createElement("button");
    botao.classList.add("adicionarTarefa");
    botao.textContent = "Adicionar Tarefa";
    novaTarefa.appendChild(botao);

    botao.addEventListener("click", (event) => {
        event.preventDefault();

        novaTarefa.removeChild(botao);

        trocarTag(descricaoTarefa, "p");
        trocarTag(categoriaTarefa, "p");
        trocarTag(prioridadeTarefa, "p");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.classList.add("adicionarTarefa");
        botaoConcluir.textContent = "Concluir tarefa";
        novaTarefa.appendChild(botaoConcluir);
    });
}

botaoCriarTarefa.addEventListener("click", (event) => {
    
    event.preventDefault();

    adicionarTarefa();
});
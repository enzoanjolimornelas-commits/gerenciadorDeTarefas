const secaoPendente = document.getElementById("pendente");
const secaoConcluido = document.getElementById("concluido");
const botaoCriarTarefa = document.getElementById("criarTarefa");
const botaoPesquisar = document.getElementById("pesquisar");
const divs = document.querySelectorAll("div");

const botaoCriarCategoria = document.querySelector(".categoriaCriar");
let categorias = [];

categorias[0] = 'Estudos';
categorias[1] = 'Trabalho';
categorias[2] = 'Tarefa de Casa';

const hoje = new Date();
const data = hoje.toLocaleDateString('pt-BR');

let tarefas = [];

function salvarNoLocalStorage() {
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
    localStorage.setItem("minhasCategorias", categorias);
}

function carregarDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem("minhasTarefas");
    const categoriasSalvas = localStorage.getItem("minhasCategorias");

    if (categoriasSalvas) {
        const particoes = categoriasSalvas.split(',');
        for(let i = 3; i < particoes.length; i++) {
            categorias[i] = particoes[i];
        }
    }
    
    if (tarefasSalvas && tarefasSalvas.length !== 0) {
        tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(tarefaObj => {
            renderizarTarefa(tarefaObj);
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    carregarDoLocalStorage();
});

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

    const label4 = document.createElement("label");
    label4.textContent = "Data: ";
    novaTarefa.appendChild(label4);

    const dataP = document.createElement("p");
    dataP.textContent = data;
    novaTarefa.appendChild(dataP);

    const botoes = document.createElement("div");
    botoes.style.display = 'flex';
    botoes.style.gap = '5px';
    novaTarefa.appendChild(botoes);

    const botaoConcluir = document.createElement("button");
    botaoConcluir.classList.add("adicionarTarefa");
    botaoConcluir.textContent = "Concluir tarefa";
    botaoConcluir.style.backgroundColor = 'green';
    botoes.appendChild(botaoConcluir);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("adicionarTarefa");
    botaoEditar.textContent = "Editar";
    botoes.appendChild(botaoEditar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("adicionarTarefa");
    botaoExcluir.style.display = 'flex';
    botaoExcluir.style.justifyContent = 'center';
    botaoExcluir.style.alignItems = 'center';

    const botaoArrumar = document.createElement("button");
    botaoArrumar.classList.add("adicionarTarefa");
    botaoArrumar.style.display = 'flex';
    botaoArrumar.style.justifyContent = 'center';
    botaoArrumar.style.alignItems = 'center';

    const deletar = document.createElement("img");
    deletar.src = 'img/icones/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
    botaoExcluir.style.backgroundColor = 'red';
    botaoExcluir.appendChild(deletar);
    botoes.appendChild(botaoExcluir);

    const arrumar = document.createElement("img");
    arrumar.src = 'img/icones/north_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';
    botaoArrumar.appendChild(arrumar);

    const feito = document.createElement("img");
    feito.src = 'img/icones/check_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png';

    if (tarefaObj.concluido) {
        descP.style.textDecoration = 'line-through';
        secaoConcluido.appendChild(novaTarefa);
        label2.style.display = 'none';
        catP.style.display = 'none';
        label3.style.display = 'none';
        priP.style.display = 'none';

        botoes.appendChild(botaoArrumar);
        novaTarefa.appendChild(feito);

        feito.style.position = 'relative';
        botaoEditar.remove();
        botaoConcluir.remove();
    } else {
        secaoPendente.appendChild(novaTarefa);
    }

    botaoConcluir.addEventListener("click", (event) => {
        event.preventDefault();
        secaoConcluido.appendChild(novaTarefa);

        novaTarefa.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        botaoConcluir.remove();

        descP.style.textDecoration = 'line-through';
        label2.style.display = 'none';
        catP.style.display = 'none';

        label3.style.display = 'none';
        priP.style.display = 'none';

        botaoEditar.remove();

        novaTarefa.appendChild(feito);
        botoes.appendChild(botaoArrumar);
        feito.style.position = 'relative';
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
        categorias.forEach(texto => {
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

    botaoArrumar.addEventListener("click", (event) => {
        event.preventDefault();

        secaoPendente.appendChild(novaTarefa);

        novaTarefa.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        descP.style.textDecoration = 'none';

        label2.style.display = 'block';
        catP.style.display = 'block';

        label3.style.display = 'block';
        priP.style.display = 'block';

        feito.remove();

        botaoArrumar.remove();
        botaoExcluir.remove();

        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoEditar);
        botoes.appendChild(botaoExcluir);
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
    
    categorias.forEach(texto => {
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

    novaTarefa.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    botao.addEventListener("click", (event) => {
        event.preventDefault();

        const tarefaObj = {
            descricao: descricaoTarefa.value,
            categoria: categoriaTarefa.options[categoriaTarefa.selectedIndex].text,
            prioridade: prioridadeTarefa.options[prioridadeTarefa.selectedIndex].text,
            data: data,
            concluido: false
        };

        tarefas.push(tarefaObj);
        salvarNoLocalStorage();

        novaTarefa.remove();
        renderizarTarefa(tarefaObj);
    });
}

function pesquisar(valor) {
    const tarefasVisiveis = document.querySelectorAll('.tarefa');
    tarefasVisiveis.forEach(elemento => elemento.remove());

    tarefas.forEach((tarefa) => {
        if (valor === "todas" || tarefa.categoria.toLowerCase() === valor) {
            renderizarTarefa(tarefa);
        }
    });
}

botaoPesquisar.addEventListener("click", (event) => {
    event.preventDefault();

    const popUp = document.createElement("div");
   
    popUp.style.position = 'fixed';
    popUp.style.top = '50%';
    popUp.style.left = '50%';
    popUp.style.transform = 'translate(-50%, -50%)';
    popUp.style.backgroundColor = 'orange';
    popUp.style.width = '400px';
    popUp.style.height = '300px';
    popUp.style.boxShadow = '10px 5px 5px black';
    popUp.style.borderRadius = '12px';
    popUp.style.display = 'flex';
    popUp.style.flexDirection = 'column';
    popUp.style.alignItems = 'center';
    popUp.style.justifyContent = 'space-evenly';

    const selecionarCategoria = document.createElement("select");
    
    const opcaoTodas = document.createElement("option");
    opcaoTodas.value = "todas";
    opcaoTodas.textContent = "Todas as categorias";
    selecionarCategoria.appendChild(opcaoTodas);

    categorias.forEach(texto => {
        const opcao = document.createElement("option");
        opcao.value = texto.toLowerCase();
        opcao.textContent = texto;
        selecionarCategoria.appendChild(opcao);
    });
    popUp.appendChild(selecionarCategoria);
    
    const botao = document.createElement("button");
    botao.classList.add("categoriaCriar");
    botao.textContent = 'Pesquisar';
    botao.style.backgroundColor = 'rgb(0, 47, 255)';
    popUp.appendChild(botao);

    botao.addEventListener("click", (event) => {
        event.preventDefault();

        pesquisar(selecionarCategoria.value);

        popUp.remove();
    });

    document.body.appendChild(popUp);
});

botaoCriarTarefa.addEventListener("click", (event) => {
    event.preventDefault();
    adicionarTarefa();
});

botaoCriarCategoria.addEventListener("click", (event) => {
    event.preventDefault();

    const popUp = document.createElement("div");
   
    popUp.style.position = 'fixed';
    popUp.style.top = '50%';
    popUp.style.left = '50%';
    popUp.style.transform = 'translate(-50%, -50%)';
    popUp.style.backgroundColor = 'orange';
    popUp.style.width = '400px';
    popUp.style.height = '300px';
    popUp.style.boxShadow = '10px 5px 5px black';
    popUp.style.borderRadius = '12px';
    popUp.style.display = 'flex';
    popUp.style.flexDirection = 'column';
    popUp.style.alignItems = 'center';
    popUp.style.justifyContent = 'space-evenly';

    const campoCategoria = document.createElement("input");
    campoCategoria.type = 'text';
    campoCategoria.style.padding = '10px';
    campoCategoria.placeholder = 'Digite sua categoria aqui...';
    popUp.appendChild(campoCategoria);

    const botaoCat = document.createElement("button");
    botaoCat.classList.add("categoriaCriar");
    botaoCat.textContent = 'Criar Categoria';
    popUp.appendChild(botaoCat);

    botaoCat.addEventListener("click", (event) => {
        event.preventDefault();

        categorias.push(campoCategoria.value);
        salvarNoLocalStorage();
        popUp.remove();
    });

    document.body.appendChild(popUp);
});
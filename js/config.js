window.onload = (() =>{criarTabela();});

const STORAGE_KEY = "all-list";
const allStorage = {
fetch(){
	const base = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    base.forEach((all, index) => {
    all.id = index;
  });
    allStorage.uid = base.length;
    return base;
},
  save(base){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
  }
};

var data = allStorage.fetch();

// Script responsável por adicionar nova tarefa.
function addTask(){
var tarefa={
	id:parseInt(document.getElementById("id").value),
	titulo:document.getElementById("titulo").value,
	status:document.getElementById("status").value
}

if(!tarefaValida(tarefa))return
if(tarefa.id !== "" && tarefa.id !== undefined && !isNaN(tarefa.id)){
	var velhaTarefa = data.find(vt => vt.id === tarefa.id);
	data[data.indexOf(velhaTarefa)] = tarefa;
	allStorage.save(data);
	data = allStorage.fetch();
 }else{
	tarefa.id = data.length + 1;
	data.push(tarefa);
	allStorage.save(data);
	data = allStorage.fetch();
    }
	criarTabela();
	limparCampos();
}

// Script responsável por criar tabela das tarefas.
function criarTabela(){
    var trs = '';
    if(data.length === 0){
        const tr = '<tr><td colspan="5" class="text-center">Sem tarefas até o momento.</td></tr>';
        document.getElementById("tabelaTarefasBody").innerHTML = tr
        return
    }
    data.forEach(task => {
        const tr = `<tr> <td class="text-center">${task.titulo}</td> <td class="text-center">${task.status}</td> <td class="text-center"><a class="btn btn-success btn-sm" onclick="editarTarefa(${task.id})"><i class="far fa-edit"></i></a> <a class="btn btn-danger btn-sm" onclick="removerTarefa(${task.id})"><i class="far fa-trash-alt"></i></a> </td> </tr>`
        trs += tr
    })
    document.getElementById("tabelaTarefasBody").innerHTML = trs
}

// Script responsável por remover tarefa.
function removerTarefa(id){
    var task = data.find(task => task.id === id);
    data.splice(data.indexOf(task), 1);
    allStorage.save(data);
    data = allStorage.fetch();
    criarTabela();
}

// Script responsável por editar tarefa.
function editarTarefa(id){
    var tarefa = data.find(tarefa => tarefa.id === id);
    document.getElementById("id").value = tarefa.id;
    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("status").value = tarefa.status;
	document.getElementById("submit").value = 'Atualizar Tarefa';
	document.getElementById("dvStatus").style.display = "block";
	document.getElementById("dvTitulo").innerHTML = 'Atualizar Título:';
}

// Script responsável por fazer limpeza de dados.
function limparCampos(){
    document.getElementById("id").value = '';
    document.getElementById("titulo").value = '';
    document.getElementById("status").value = 'Processando';
	document.getElementById("submit").value = 'Cadastrar Tarefa';
	document.getElementById("dvStatus").style.display = "none";
	document.getElementById("dvTitulo").innerHTML = 'Título:';
}

function tarefaValida(tarefa){return tarefa.titulo !== "" && tarefa.status !== "";}
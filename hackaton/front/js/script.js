document.getElementById('formularioHabito').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Pegando os valores dos campos
    const habitName = document.getElementById('nomeHabito').value;
    const habitFrequency = document.getElementById('frequenciaHabito').value;
    const habitGoal = document.getElementById('metaHabito').value;

    // Definindo habitData com os dados que serão enviados
    const habitData = {
        nome: habitName,
        frequencia: habitFrequency,
        meta: habitGoal
    };

    // Enviar para o backend
    fetch('http://localhost:9823/habitos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData)
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro na requisição: ${errorData.error || response.statusText}`);
            throw new Error(`Erro na requisição: ${errorData.error || response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            const listItem = document.createElement('li');
            listItem.textContent = `${habitName} - ${habitFrequency} - Meta: ${habitGoal}`;
            listItem.classList.add('list-group-item', 'fade-in');

            // Botões de editar e excluir
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn', 'btn-warning', 'mx-2');
            editButton.addEventListener('click', () => editarHabito(data.id, habitName, habitFrequency, habitGoal, listItem));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.addEventListener('click', () => excluirHabito(data.id, listItem));

            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);

            document.getElementById('listaHabitos').appendChild(listItem);
            document.getElementById('formularioHabito').reset();
        } else {
            alert('Erro ao adicionar hábito.');
        }
    })
    .catch(err => console.log(err));
});

// Function to edit habit
function editarHabito(id, nomeAtual, frequenciaAtual, metaAtual, habitText) {
    const novoNome = prompt('Editar nome do hábito:', nomeAtual);
    if (novoNome === null) return;

    const novaFrequencia = prompt('Editar frequência do hábito (diário/semanal):', frequenciaAtual);
    if (novaFrequencia === null) return;

    const novaMeta = prompt('Editar meta do hábito:', metaAtual);
    if (novaMeta === null) return;

    const habitData = { nome: novoNome, frequencia: novaFrequencia, meta: novaMeta };

    fetch(`http://localhost:9823/habitos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData)
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro ao editar hábito: ${errorData.error || response.statusText}`);
            throw new Error(`Erro ao editar hábito: ${errorData.error || response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            habitText.textContent = `${novoNome} - ${novaFrequencia} - Meta: ${novaMeta}`;
        } else {
            alert('Erro ao editar hábito.');
        }
    })
    .catch(err => console.log(err));
}

// Função para excluir hábito
function excluirHabito(id, listItem) {
    if (!confirm('Tem certeza que deseja excluir este hábito?')) return;

    fetch(`http://localhost:9823/habitos/${id}`, {
        method: 'DELETE'
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro ao excluir hábito: ${errorData.error || response.statusText}`);
            throw new Error(`Erro ao excluir hábito: ${errorData.error || response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            listItem.remove();
        } else {
            alert('Erro ao excluir hábito.');
        }
    })
    .catch(err => console.log(err));
}

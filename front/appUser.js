//Chamada da função createUser para associação ao evento de envio de formulário
document.getElementById("formulario-registro").addEventListener("submit", createUser);

document.addEventListener("DOMContentLoaded", getAllUsers);

document.addEventListener("DOMContentLoaded", getAllUsersTable);

document.addEventListener("DOMContentLoaded", getAllOrganizadoresTable);


function createUser(event) {
  //Previne o comportamento padrão do formulário, ou seja, impede quel seja enviado e recarregue a página
  event.preventDefault();

  //Captura os valores dos campos do formulário
  const name = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  const data_nascimento = document.getElementById("data").value;

  //Requisição HTTP para o endpoint de cadastro de usuário
  fetch("http://10.89.240.14:5000/api/v1/user", {
    //Realiza uma chamada http para o servidor (a rota definida)
    method: "POST",
    headers: {
      //A requisição será em formato json
      "Content-Type": "application/json",
    },

    //Transforma os dados do formulário em uma string json para serem enviados no corpo da requisição
    body: JSON.stringify({ name, cpf, email, password, data_nascimento }),
  })
    .then((response) => {
      //Tratamento da resposta do servidor / API
      if (response.ok) {
        //Verifica se a resposta foi bem sucedida (status 2xx)
        return response.json();
      }
      //Convertendo o erro em formato json
      return response.json().then((err) => {
        //Mensagem retornada do servidor, acessada pela chave "error"
        throw new Error(err.error);
      });
    }) //Fechamento da then(response)
    .then((data) => {
      //Executa a resposta de sucesso - retorna ao usúario final

      //Exibe um alerta para o usuário final(front) com o nome do usuário que acabou de ser cadastrado
      alert(data.message);
      console.log(data.message);

      //Reseta os campos do formulário após o sucesso do cadastro
      document.getElementById("formulario-registro").reset();
    })
    .catch((error) => {
      //Captura qualquer erro que ocorra durante o processo de requisição / resposta

      //Exibe alerta (front) com o erro processado
      alert("Erro no cadastro: " + error.message);

      console.error("Erro:", error.message);
    });
} //fechamento createUser

function getAllUsers() {
  fetch("http://10.89.240.14:5000/api/v1/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const userList = document.getElementById("user-list");
      userList.innerHTML = ""; //Limpa a tela existente

      data.users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Nome: ${user.name}, CPF: ${user.cpf}, Email: ${user.email}, Data de Nascimento: ${user.data_nascimento}`;
        userList.appendChild(listItem);
      });
    })
    .catch((error) => {
      alert("Erro ao obter os usuários" + error.message);
      console.error("Error: ", error.message);
    });
} //fechamento getAllUsers

function getAllUsersTable() {
  fetch("http://10.89.240.14:5000/api/v1/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const userList = document.getElementById("user-list-tabela");
      userList.innerHTML = ""; //Limpa a lista antes de adicionar novos itens

      //Verifica se há usuários retornados e os adiciona à tabela
      data.users.forEach((usuario) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const tdName = document.createElement("td");
        tdName.textContent = usuario.name;
        tr.appendChild(tdName);

        const tdcpf = document.createElement("td");
        tdcpf.textContent = usuario.cpf;
        tr.appendChild(tdcpf);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = usuario.email;
        tr.appendChild(tdEmail);

        const tdData_nascimento = document.createElement("td");
        tdData_nascimento.textContent = usuario.data_nascimento;
        tr.appendChild(tdData_nascimento);

        //Adiciona a linha à tabela
        userList.appendChild(tr);
      });
    }).catch((error) => {
      alert("Error ao obter usuários:" + error.message);
      console.error("Erro:", error.message);
    });
}

function getAllOrganizadoresTable() {
  fetch("http://10.89.240.14:5000/api/v1/organizador/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
         throw new Error(err.error);
      });
    })
    .then((data) => {
      const organizadorList = document.getElementById("organizador-list-tabela");
      organizadorList.innerHTML = ""; //Limpa a lista antes de adicionar novos itens

      //Verifica se há usuários retornados e os adiciona à tabela
      data.organizadores.forEach((organizador) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const tdName = document.createElement("td");
        tdName.textContent = organizador.nome;
        tr.appendChild(tdName);

        const tdTelefone = document.createElement("td");
        tdTelefone.textContent = organizador.telefone;
        tr.appendChild(tdTelefone);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = organizador.email;
        tr.appendChild(tdEmail);

        //Adiciona a linha à tabela
        organizadorList.appendChild(tr);
      });
    }).catch((error) => {
      alert("Error ao obter usuários:" + error.message);
      console.error("Erro:", error.message);
    });
}

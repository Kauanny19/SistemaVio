let organizers = [];
let nextId = 1;

module.exports = class organizerController {
  static async createOrganizer(req, res) {
    
    const { telefone, email, password, name } = req.body;

    if (!telefone || !email || !password || !name) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res.status(400).json({error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",});
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um organizador com o mesmo email
    const existingOrganizer = organizers.find((organizer) => organizer.email === email);
    if (existingOrganizer) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria e adiciona novo organizador
    const newOrganizer = { id: nextId++, telefone, email, password, name };
    organizers.push(newOrganizer);

    return res.status(201).json({ message: "Organizador criado com sucesso", organizer: newOrganizer });
  }

  static async getAllOrganizer(req, res) {
    return res.status(200).json({ message: "Obtendo todos os organizadores", organizers });
  }

  static async updateOganizer(req, res) {
    // Desestrutura e recupera os dados enviados via corpo da requisição
    const { id, telefone, email, password, name } = req.body;

    // Validar se todos os campos foram preenchidos
    if (!id || !telefone || !email || !password || !name) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    // Procurar o indice do organizador do Array 'organizers' pelo id
    const organizerIndex = organizers.findIndex(organizer => organizer.id === id);

    // Se o organizador não for encontrado userIndex equivale a -1
    if(organizerIndex === -1){
        return res.status(400).json({ error: "Organizador não encontrado" });
    }

    // Atualiza os dados do organizador no Array 'organizers'
    organizers[organizerIndex] = {id, telefone, email, password, name};

    return res.status(200).json({message: "Organizador atualizado", organizer:organizers[organizerIndex]});
  }

  static async deleteOrganizer(req, res) {
    // Obtém o parâmetro 'id' da requisição, que é o id do organizador a ser deletado
    const organizerId = parseInt(req.params.id);
    
    const organizerIndex = organizers.findIndex(organizer => organizer.id === organizerId);

    // Se o organizador não for encontrado userIndex equivale a -1
    if(organizerIndex === -1){
        return res.status(400).json({ error: "Organizador não encontrado" });
    }

    // Removendo o organizador do Array 'organizers'
    organizers.splice(organizerIndex,1);

    return res.status(200).json({message: "Organizador apagado"});
  }
};
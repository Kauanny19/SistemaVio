const connect = require("../db/connect");

module.exports = class eventoController {
  //Criação de um evento
  static async createEvento(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    //Validação genérica de todos os atributos
    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `INSERT INTO evento (nome, descricao, data_hora, local, fk_id_organizador) values (?, ?, ?, ?, ?)`;
    const values = [nome, descricao, data_hora, local, fk_id_organizador];
    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar o evento!" });
        }
        return res.status(201).json({ message: "Evento criado com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta:", err);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  } //Fim do creteEvento

  //Visualiazar todos os eventos cadastrados
  static async getAllEventos(req, res) {
    const query = `SELECT * from evento`;

    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao buscar eventos!" });
        }
        return res
          .status(200)
          .json({ message: "Eventos listados com sucesso!", events: results });
      });
    } catch (error) {
      console.log("Erro ao executar consulta:", err);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  // Update de um evento
  static async updateEvento(req, res) {
    const { id_evento, nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    //Validação genérica de todos os atributos
    if (
      !id_evento ||
      !nome ||
      !descricao ||
      !data_hora ||
      !local ||
      !fk_id_organizador
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `UPDATE evento SET nome=?,descricao=?,data_hora=?,local=?,fk_id_organizador=? WHERE id_evento=?`;
    const values = [nome,descricao,data_hora,local,fk_id_organizador,id_evento];
    try {
      connect.query(query, values, (err, results) => {
        console.log("Resultados: ", results);
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao atualizar o evento!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não encontrado :(" });
        }
        return res
          .status(200)
          .json({ message: "Evento atualizado com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta:", err);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  } //Fim do updateEvento

  //Exclusão de eventos
  static async deleteEvento(req, res) {
    const idEvento = req.params.id;
    const query = `DELETE from evento WHERE id_evento=?`;

    try {
      connect.query(query, idEvento, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao excluir evento!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não encontrado!" });
        }
        return res.status(200).json({ message: "Evento excluído com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar a consulta!", err);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  static async getEventosPorData(req, res){
    const query = `SELECT * FROM evento`;

    try{
      connect.query(query,(err, results) => {
        if(err){
          console.error(err);
          return res.status(500).json({error: "Erro ao buscar eventos"});
        }
        const dataEvento = new Date(results[0].data_hora);
        const dia = dataEvento.getDate();
        const mes = dataEvento.getMonth()+1;
        const ano = dataEvento.getFullYear();
        console.log(dia+'/'+mes+'/'+ano);
        
        const now = new Date();
        const eventosPassados = results.filter(evento => new Date(evento.data_hora)<now);
        const eventosFuturos = results.filter(evento => new Date(evento.data_hora)>=now);

        const diferencaMs = eventosFuturos[0].data_hora.getTime() - now.getTime();
        const dias = Math.floor(diferencaMs/(1000*60*60*24));
        const horas = Math.floor(diferencaMs%(1000*60*60*24)/(1000*60*60));
        console.log(diferencaMs, 'Falta: '+dias+'dias, '+horas+'horas');

        //Comparando datas
        const dataFiltro = new Date('2024-12-15').toISOString().split("T");
        const eventoDia = results.filter(evento => new Date(evento.data_hora).toISOString().split("T")[0] === dataFiltro[0]);
        console.log("Data filtro: ", dataFiltro);
        console.log("Eventos: ",eventoDia)
      
        return res.status(200).json({message: "Ok", eventosPassados, eventosFuturos})
      });
    }catch(error){
      console.error(error);
      return res.status(500).json({error: "Erro ao buscar eventos"});
    }
  }

  static async getEventosDias(req, res){
    const data = req.params.data_hora;
    const query = `SELECT * FROM evento WHERE data_hora =? BETWEEN ? and ?`;

    try{
      connect.query(query, data, (err, results) => {
        if(err){
          console.error(err);
          return res.status(500).json({error: "Erro ao buscar eventos"});
        }

        //Comparando datas
        const dataFiltro = new Date(data).toISOString().split("T")[0];
        const eventoDia = results.filter(evento => new Date(evento.data_hora).toISOString().split("T")[0] === dataFiltro[0]);
        console.log("Data filtro: ", dataFiltro);
        console.log("Eventos: ",eventoDia)
      
        return res.status(200).json({message: "Ok"});
      });
    }catch(error){
      console.error(error);
      return res.status(500).json({error: "Erro ao buscar eventos"});
    }
  }
};

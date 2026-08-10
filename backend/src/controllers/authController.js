const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../model/usuarioModel");
const { pool } = require("../config/db"); 

const JWT_SECRET = process.env.JWT_SECRET;

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (email === "" || senha === "") {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha inválidos" });
    }

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

    if (!usuario) {
      console.log("Usuário NÃO encontrado");
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      console.log("Senha inválida");
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email
      }, 
      JWT_SECRET,
      { expiresIn: "8h" }
    );


    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,

    });

  } catch (erro) {
    console.error("Erro no processo de login:", erro);
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
  
      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
      }
  
      const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);
      
      if (usuarioExistente) {
        return res.status(409).json({ erro: "Este email já está cadastrado no sistema" });
      }
  
      const saltRounds = 10;
      const senhaHash = await bcrypt.hash(senha, saltRounds);
  
      
      const novoUsuario = await usuarioModel.criarUsuario({
        nome,
        email,
        senha_hash: senhaHash
      });
  
      return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso"
      });
  
    } catch (erro) {
      console.error("Erro no processo de cadastro:", erro);
      return res.status(500).json({ erro: "Erro interno do servidor ao cadastrar usuário" });
    }
  }
module.exports = { login, cadastrar };
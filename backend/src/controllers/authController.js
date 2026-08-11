const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models/usuariosModel");

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

    const usuario = await model.buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        perfil: usuario.perfil,
      },
      JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    // Validações
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (nome.length < 3) {
      return res
        .status(400)
        .json({ erro: "Nome deve ter pelo menos 3 caracteres" });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ erro: "E-mail inválido" });
    }

    if (senha.length < 6) {
      return res
        .status(400)
        .json({ erro: "Senha deve ter pelo menos 6 caracteres" });
    }

    // Verificar se email já existe
    const usuarioExistente = await model.buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ erro: "E-mail já cadastrado" });
    }

    // Hash da senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const registrarUsuario = await model.criarUsuario({
      nome: nome,
      email: email,
      senha_hash: senhaHash,
      perfil: 'comum'
    });

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

function verificarAdmin(req, res, next) {
  if (req.usuario.perfil !== "administrador") {
    return res
      .status(403)
      .json({ erro: "Acesso negado. Permissão de administrador necessária." });
  }
  next();
}

module.exports = { login, registrar, verificarToken, verificarAdmin };

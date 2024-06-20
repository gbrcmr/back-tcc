const db = require('../../database');

class UserRepository {
    async create(userid, nome, email, telefone, senha, cpf) {
        const [row] = await db.query(`
        INSERT INTO usuario(userid, nome, email, telefone, senha, cpf)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [userid, nome, email, telefone, senha, cpf]);
        return row;
    }
    async login(email, senha) {
        const [row] = await db.query(`
        SELECT * FROM usuario WHERE email = $1 AND senha = $2
       
        `, [email, senha]);
        return row;
    }
    async createStore(userid, lojaid, nome_loja, email_loja, telefone_loja, instagram) {
        const [row] = await db.query(`
        INSERT INTO loja(userid, lojaid, nome_loja, email_loja, telefone_loja, instagram)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [userid, lojaid, nome_loja, email_loja, telefone_loja, instagram]);
        return row;
    }

    async createProduct(prodid, lojaid, descricao_prod, tamanho_prod, tipo_prod, nome_prod, foto_prod, preco_prod) {
        const [row] = await db.query(`
        INSERT INTO produto(prodid, lojaid, descricao_prod, tamanho_prod, tipo_prod, nome_prod, foto_prod, preco_prod)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `, [prodid, lojaid, descricao_prod, tamanho_prod, tipo_prod, nome_prod, foto_prod, preco_prod]);
        return row;
    }

    async createOrder(pedidoid, data_ped, valor_ped, nome_prod, userid) {
        const [row] = await db.query(`
        INSERT INTO pedidos(pedidoid, data_ped, valor_ped, nome_prod, userid)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `, [pedidoid, data_ped, valor_ped, nome_prod, userid]);
        return row;
    }

    async findUser(id) {
        const rows = await db.query('SELECT * FROM usuario WHERE userid = $1', [id]);
        return rows;
    }

    async findByProductId(prodid) {
        const rows = await db.query('SELECT * FROM produto WHERE prodid = $1', [prodid]);
        return rows;
    }

    async orderById(userid) {
        const rows = await db.query('SELECT * FROM pedidos WHERE userid = $1', [userid]);
        return rows;
    }

    async chartById(userid) {
        const rows = await db.query('SELECT carrinho FROM usuario WHERE userid = $1', [userid]);
        return rows;
    }

    async addToCart(prodid, userid) {
        const [rows] = await db.query(`
        UPDATE usuario
        SET carrinho = array_append(carrinho, $1)
        WHERE userid = $2
        RETURNING *
    `, [prodid, userid]);

        return rows;
    }

    async removeFromCart(prodid, userid) {
        const [row] = await db.query(`
        UPDATE usuario
        SET carrinho = array_remove(carrinho, $1)
        WHERE userid = $2;
    `, [prodid, userid]);
        return row;
    }
}


module.exports = new UserRepository();
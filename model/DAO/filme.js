/****************************************************
 * OBJETIVO: Arquivo responsavel pela manipulacao de dados no banco de dados MySQL, aqui realizamos o CRUD ultilizando a linguagem SQL
 * Data:01/02/2024
 * Autor: Letícia Melo
 * Versão: 1.0
 ****************************************************/
const { PrismaClient } = require('@prisma/client')//import da biblioteca do prisma/client
const prisma = new PrismaClient//instancia da classe prisma client

//*******************************************************************************FILME********************************************************************************************/
//funcao para inserir um novo filme no BD
const insertFilme = async function (dadosFilme) {
    let sql;
    try {
        if (dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined) {
            sql = `insert into tbl_filme (nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,valor_unitario) 
            values(
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`
        }
        else {
            sql = `insert into tbl_filme (nome,sinopse,duracao,data_lancamento,data_relancamento,foto_capa,valor_unitario) 
                values(
                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    null,
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}'
                )`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}
//funcao para atualizar um filme no BD
const updateFilme = async function (id, dadoAtualizado) {
    let sql;

    try {
        if (dadoAtualizado.data_relancamento != '' && dadoAtualizado.data_relancamento != null && dadoAtualizado.data_relancamento != undefined) {
            sql = `UPDATE tbl_filme
                SET
                    nome = '${dadoAtualizado.nome}',
                    sinopse='${dadoAtualizado.sinopse}',
                    duracao='${dadoAtualizado.duracao}',
                    data_lancamento='${dadoAtualizado.data_lancamento}',
                    data_relancamento='${dadoAtualizado.data_relancamento}',
                    foto_capa='${dadoAtualizado.foto_capa}',
                    valor_unitario='${dadoAtualizado.valor_unitario}'
                WHERE
                    id = ${id}`
        }
        else {
            sql = `UPDATE tbl_filme
        SET
        nome = '${dadoAtualizado.nome}',
        sinopse='${dadoAtualizado.sinopse}',
        duracao='${dadoAtualizado.duracao}',
        data_lancamento='${dadoAtualizado.data_lancamento}',
        data_relancamento=null,
        foto_capa='${dadoAtualizado.foto_capa}',
        valor_unitario='${dadoAtualizado.valor_unitario}'
        WHERE
        id = ${id}`
        }
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}
//funcao para excluir um filme do BD
const deleteFilme = async function (id) {
    try {
        let sql = `delete from tbl_filme where id = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
}
//funcao para listar todos os filmes do BD
const selectAllFilmes = async function () {
    try {
        let sql = 'select * from tbl_filme'
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        //da pra fzr desses dois tipos, de acordo c o marcel, o queryRawUnsafe é mlhr pra manutenção
        //$queryRawUnsafe(sql)
        //$queryRaw('select * from tbl_filme')
        return rsFilmes
    } catch (error) {
        return false
    }
}
const selectbyNameFilme = async function (nome) {
    try {
        let sql = `select * from tbl_filme where nome like'%${nome}%'`
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme


    } catch (error) {
        return false

    }

}
//funcao para buscar um filme do BD pelo ID
const selectByIdFilme = async function (id) {
    try {
        let sql = `select * from tbl_filme where id=${id}`
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
}
const getIDFilme = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1;`
        let rsFilme = await prisma.$queryRawUnsafe(sql_id)
        return rsFilme
    } catch (error) {
        return false
    }

}

//******************************************************************************GENERO*******************************************************************************************/
const insertGenero = async function (dadosGenero) {
    let sql;
    try {
        sql = `insert into tbl_genero(nome) 
            values(
                '${dadosGenero.nome}'
            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}
const updateGenero = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_genero
                SET
                    nome = '${dadoAtualizado.nome}'
                WHERE
                    id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}
const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero where id = ${id}`
        let rsGenero = await prisma.$executeRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}
const selectAllGeneros = async function () {
    try {
        let sql = 'select * from tbl_genero'
        let rsGeneros = await prisma.$queryRawUnsafe(sql)
        return rsGeneros
    } catch (error) {
        return false
    }
}
const getIDGenero = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_genero limit 1;`
        let rsGenero = await prisma.$queryRawUnsafe(sql_id)
        return rsGenero
    } catch (error) {
        return false
    }

}
const selectByIdGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero where id=${id}`
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}
//******************************************************************************CLASSIFICAÇÃO*******************************************************************************************/

const insertClassificacao = async function (dadosClassificacao) {
    let sql;
    try {
        sql = `insert into tbl_classificacao(classificacao, classificacao_foto) 
            values(
                '${dadosClassificacao.classificacao}',
                '${dadosClassificacao.classificacao_foto}'
            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}
const updateClassificacao = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_classificacao
                SET
                    classificacao = '${dadoAtualizado.classificacao}',
                    classificacao_foto = '${dadoAtualizado.classificacao_foto}'
                WHERE
                    id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}
const deleteClassificacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao where id = ${id}`
        let rsClassificacao = await prisma.$executeRawUnsafe(sql)
        return rsClassificacao
    } catch (error) {
        return false
    }
}
const selectAllClassificacoes = async function () {
    try {
        let sql = 'select * from tbl_classificacao'
        let rsClassificacoes = await prisma.$queryRawUnsafe(sql)
        return rsClassificacoes
    } catch (error) {
        return false
    }
}
const getIDClassificacao = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_classificacao limit 1;`
        let rsclassificacao = await prisma.$queryRawUnsafe(sql_id)
        return rsclassificacao
    } catch (error) {
        return false
    }
}
const selectByIdClassificacao = async function (id) {
    try {
        let sql = `select * from tbl_classificacao where id=${id}`
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}
//*******************************************************************************ATOR********************************************************************************************/

const insertAtor = async function (dadosAtor) {
    let sql;
    try {
        sql = `insert into tbl_ator(nome_ator, foto_ator) 
            values(
                '${dadosAtor.nome_ator}',
                '${dadosAtor.foto_ator}'
            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}
const updateAtor = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_ator
                SET
                    nome_ator = '${dadoAtualizado.nome_ator}'
                    foto_ator = '${dadoAtualizado.foto_ator}'
                WHERE
                    id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}
const deleteAtor = async function (id) {
    try {
        let sql = `delete from tbl_ator where id = ${id}`
        let rsAtor = await prisma.$executeRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }
}
const selectAllAtores = async function () {
    try {
        let sql = 'select * from tbl_ator'
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }
}
const getIDAtor = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_ator limit 1;`
        let rsAtor = await prisma.$queryRawUnsafe(sql_id)
        return rsAtor
    } catch (error) {
        return false
    }
}
const selectByIdAtor = async function (id) {
    try {
        let sql = `select * from tbl_ator where id=${id}`
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }
}
//*******************************************************************************DIRETOR********************************************************************************************/

const insertDiretor = async function (dadosDiretor) {
    let sql;
    try {
        sql = `insert into tbl_diretor(nome_diretor, foto_diretor) 
            values(
                '${dadosDiretor.nome_diretor}',
                '${dadosDiretor.foto_diretor}'
            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}
const updateDiretor = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_diretor
                SET
                    nome_diretor = '${dadoAtualizado.nome_diretor}',
                    foto_diretor = '${dadoAtualizado.foto_diretor}'
                WHERE
                    id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}
const deleteDiretor = async function (id) {
    try {
        let sql = `delete from tbl_Diretor where id = ${id}`
        let rsDiretor = await prisma.$executeRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }
}
const selectAllDiretores = async function () {
    try {
        let sql = 'select * from tbl_diretor'
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }
}
const getIDDiretor = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_diretor limit 1;`
        let rsDiretor = await prisma.$queryRawUnsafe(sql_id)
        return rsDiretor
    } catch (error) {
        return false
    }
}
const selectByIdDiretor = async function (id) {
    try {
        let sql = `select * from tbl_diretor where id=${id}`
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        return rsDiretor
    } catch (error) {
        return false
    }
}
//*******************************************************************************NACIONALIDADE********************************************************************************************/
const selectAllNacionalidades = async function () {
    try {
        let sql = 'select * from tbl_nacionalidade'
        let rsNacionalidades = await prisma.$queryRawUnsafe(sql)
        return rsNacionalidades
    } catch (error) {
        return false
    }
}
const getIDNacionalidade = async function () {
    try {
        let sql_id = `select cast(last_insert_id() as DECIMAL) as id from tbl_Nacionalidade limit 1;`
        let rsNacionalidade = await prisma.$queryRawUnsafe(sql_id)
        return rsNacionalidade
    } catch (error) {
        return false
    }
}
const selectByIdNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_nacionalidade where id=${id}`
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}
module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectbyNameFilme,
    selectByIdFilme,
    getIDFilme,
//------------------
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    getIDGenero,
    selectByIdGenero,
//------------------
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacoes,
    getIDClassificacao,
    selectByIdClassificacao,
//------------------
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    getIDAtor,
    selectByIdAtor,
    //------------------
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    getIDDiretor,
    selectByIdDiretor,
//------------------
    selectAllNacionalidades,
    getIDNacionalidade,
    selectByIdNacionalidade
}
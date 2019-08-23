const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
const bot = new Telegraf(env.token)

const tecladoOpcoes = Markup.keyboard([
  ['O que são bots?', 'O que verei no curso?'],
  ['Posso mesmo automatizar tarefas?'],
  ['Como comprar o curso?']
]).resize().extra()

const botoes = Extra.markup(Markup.inlineKeyboard([
  Markup.calbackButton('Sim', 's'),
  Markup.calbackButton('Não', 'n')
], { columns: 3 }))

const localizacao = Markup.keyboard([
  Markup.locationRequestButton('Clique aqui para enviar sua localização')
]).resize().oneTime().extra()

bot.start(async ctx => {
  const nome = ctx.update.message.from.first_name
  await ctx.replyWithMarkdown(`*Olá, ${nome}!*\nEu sou o ChatBot do curso`)
  await ctx.replyWithPhoto('http://files.cod3r.com.br/curso-bot/bot.png')
  await ctx.replyWithMarkdown(`_Posso te ajudar em algo_?`, tecladoOpcoes)
})

bot.hears('O que são bots?', ctx => {
  ctx.replyWithmarkdown('Bots são bla, bla, bla...\n_Algo mais?', tecladoOpcoes)
})

bot.hears('O que verei no curso?', async ctx => {
  await ctx.replyWithmarkdown('No *curso* também vamos criar *3 projetos:*', tecladoOpcoes)
  await ctx.reply('1. Um bot que vai gerenciar a sua lista de comrpas!')
  await ctx.reply('2. Um bot que vai permitir cadastrar seus eventos!')
  await ctx.reply('1. E voce verá como eu fui feito, isso mesmo, voce poderá fazer uma cópia de mim!')
  await ctx.replyWithMarkdown('\n\n_Algo mais?', tecladoOpcoes)
})

bot.hears('Posso mesmo automatizar tarefas?', async ctx => {
  await ctx.replyWithmarkdown('Claro que sim,', tecladoOpcoes)
}

bot.startPolling()

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
  Markup.callbackButton('Sim', 's'),
  Markup.callbackButton('Não', 'n')
], { columns: 2 }))

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
  ctx.replyWithMarkdown('Bots são blá, blá, blá...\n_Algo mais?_', tecladoOpcoes)
})

bot.hears('O que verei no curso?', async ctx => {
  await ctx.replyWithMarkdown('No *curso* também vamos criar *3 projetos*:')
  await ctx.reply('1. Um bot que vai gerenciar a sua lista de comrpas!')
  await ctx.reply('2. Um bot que vai permitir cadastrar seus eventos!')
  await ctx.reply('3. E voce verá como eu fui feito, isso mesmo, voce poderá fazer uma cópia de mim!')
  await ctx.replyWithMarkdown(`\n\nAlgo mais?`, tecladoOpcoes)
})

bot.hears('Posso mesmo automatizar tarefas?', async ctx => {
  await ctx.replyWithMarkdown(`Claro que sim, o bot servirá para isso,\nQuer uma palinha?`, botoes)
})

bot.hears('Como comprar o curso?', async ctx => {
  await ctx.replyWithMarkdown('Que bom...[link](https://www.cod3r.com.br/)', tecladoOpcoes)
})

bot.action('n', ctx => {
  ctx.reply('Ok, não precisa ser grosso :(', tecladoOpcoes)
})

bot.action('s', async ctx => {
  await ctx.reply('Que legal! tente me enviar sua localização, ou escreva uma mensagem qualquer', localizacao)
})

bot.hears(/mensagem qualquer/i, async ctx => {
  await ctx.reply('Essa piada é velha, tenta outra...', tecladoOpcoes)
})

bot.on('text', async ctx => {
  let msg = ctx.message.text
  msg = msg.split('').reverse().join('')
  await ctx.reply(`A sua mensagem, ao contrário é: ${msg}`)
  await ctx.reply('Ísso mostra que eu consigo ler o que você escreve e processar sua mensagem!')
})

bot.on('location', async ctx => {
  try {
    const url = 'https://api.openweathermap.org/data/2.5/weather'
    const { latitude: lat, longitude: lon } = ctx.message.location
    const res = await axios.get(`${url}?lat=${lat}&lon=${lon}&appid=cbdeddfc0bbb862328313894a0f15687`)
    await ctx.reply(`Hum... Você está em ${res.data.name}`)
    await ctx.reply(`A temperatura por aí está em ${res.data.main.temp}°C`, tecladoOpcoes)
  } catch (e) {
    ctx.reply(`Estou tendo problemas para pegar a tua localização, Você está no planeta terra? :P`, tecladoOpcoes)
  }
})

bot.startPolling()

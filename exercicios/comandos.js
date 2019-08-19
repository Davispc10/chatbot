const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
  const nome = ctx.update.message.first_name
  ctx.reply(`Seja bem vindo, ${nome}!|nAvise se precisa de /ajuda`)
})

bot.command('ajuda', ctx => ctx.reply('/ajuda: vou mostrar as opções' +
  '\n/ajuda2: para testar via hears' +
  '\n/op2: Opção genérica' +
  '\n/op3: Outra opção genérica qualquer'))

bot.hears('/ajuda2', ctx => ctx.reply('Eu tambem consigo capturar comandos' +
  ', mas utilize a /ajuda mesmo'))

bot.hears(/\/op(2|3)/i, ctx => ctx.reply('Reposta padrão para comandos genéricos'))

bot.startPolling()

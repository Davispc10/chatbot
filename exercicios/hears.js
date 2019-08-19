const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)
const moment = require('moment')

bot.hears('pizza', ctx => ctx.reply('Quero'))
bot.hears(['figado', 'chuchu'], ctx => ctx.reply('Passo!'))
bot.hears('🐷', ctx => ctx.reply('Bacon 🗯'))
bot.hears(/burguer/i, ctx => ctx.reply('Quero'))
bot.hears(/brocolis/i, /salada/i, ctx => ctx.reply('Quero'))
bot.hears(/(\d{2}\/\d{2}\/\d{4})/, ctx => {
  moment.locale = moment('pt-BR')
  const data = moment(ctx.match[1], 'DD/MM/YYYY')
  ctx.reply(`${ctx.match[1]} cai em ${data.format('dddd')}`)
})

bot.startPolling()

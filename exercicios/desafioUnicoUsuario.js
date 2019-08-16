const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
  const from = ctx.update.message.from
  console.log(from)

  if (from.id.toString() === env.id) {
    ctx.reply(`Olá Mestre!!!`)
  } else {
    ctx.reply(`Só falo com meu mestre, Doidão!`)
  }
})

bot.startPolling()

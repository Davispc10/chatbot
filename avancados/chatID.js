const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
  console.log(ctx.update.message.from.id)
})

bot.startPolling()

const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)
const axios = require('axios')

bot.on('voice', async ctx => {
  const id = ctx.update.message.voice.file_id
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
  ctx.replyWithVoice({ url: `${env.apiFileUrl}/${res.data.result.file_path}` })
})

bot.on('photo', async ctx => {
  const id = ctx.update.message.photo[0].file_id
  const res = await axios.get(`${env.apiUrl}/getFile?file_id=${id}`)
  ctx.replyWithPhoto({ url: `${env.apiFileUrl}/${res.data.result.file_path}` })
})

bot.startPolling()

const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
  const from = ctx.update.message.from.first_name
  ctx.reply(`Seja bem vindo, ${from}!`)
})

bot.on('text', ctx =>
  ctx.reply(`Texto '${ctx.update.message.text}' recebido com sucesso!`)
)

bot.on('location', ctx => {
  const l = ctx.update.message.location
  console.log(l)
  ctx.reply(`Entendido, você em 
    Lat: ${l.latitude}, 
    Lon: ${l.longitude}!`)
})

bot.on('contact', ctx => {
  const contato = ctx.update.message.contact
  console.log(contato)
  ctx.reply(`Vou lembrar do(a)
    ${contato.first_name} (${contato.phone_number})`)
})

bot.on('voice', ctx => {
  const voice = ctx.update.message.voice
  console.log(voice)
  ctx.reply(`Audio recebido, ele possui ${voice.duration} segundos`)
})

bot.on('photo', ctx => {
  const photo = ctx.update.message.photo
  console.log(photo)
  photo.forEach((ph, i) => {
    ctx.reply(`Photo ${i} tem resolução de ${ph.width}x${ph.height}`)
  })
})

bot.on('sticker', ctx => {
  const sticker = ctx.update.message.sticker
  console.log(sticker)
  ctx.reply(`Estou vem que você enviou 
    o ${sticker.emoji} do conjunto ${sticker.set_name}`)
})

bot.startPolling()

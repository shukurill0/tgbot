require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

bot.on([':media', '::url'], async(ctx) => {
    await ctx.reply('Получили ссылку');
});

// bot.on('msg').filter((ctx) => {
//     return ctx.from.id === 7171646329
// }, async(ctx) => {
//     await ctx.reply('Привет,админ!')
// });

bot.api.setMyCommands([{
        command: 'start',
        description: 'Запуск бота',
    },
    {
        command: 'hello',
        description: 'Получили приветствие',
    },
    {
        command: 'say_hello',
        description: 'Получать приветствие',
    }
]);


// bot.command(['say_hello', 'hello', 'say_hi'], async(ctx) => {
//     await ctx.reply('Hello!')
// });

// bot.on('msg', async(ctx) => {
//     console.log(ctx.msg);
// });

bot.command('start', async(ctx) => {
    await ctx.react('👍');
    await ctx.reply('Привет\\! Я \\- бот \\.Тг канал: [shukurillo](https://t.me/shukurilloraxmatullayev)', {
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: false
    });
});

bot.command('mood', async(ctx) => {
    //const moodKeyboard = new Keyboard().text('Хорошо').row().text('Норм').row().text('Ужас').resized()
    const moodLabels = ['Хорошо', 'Норм', 'Ужас'];
    const rows = moodLabels.map((label) => {
        return [
            Keyboard.text(label)
        ]
    })
    const moodKeyboard2 = Keyboard.from(rows).resized()

    await ctx.reply('Как настроение?', {
        reply_markup: moodKeyboard2
    })
})

bot.command('share', async(ctx) => {
    const shareKeyboard = new Keyboard().requestLocation('Геолокатсия').requestContact('Контакт').requestPoll('Опрос').resized()

    await ctx.reply('Чем хочешь поделиться?', {
        reply_markup: shareKeyboard
    })
})


// bot.command('mood', async(ctx) => {
//     const moodKeyboard = new Keyboard().text('Хорошо').row().text('Норм').row().text('Ужас').resized().oneTime()
//     await ctx.reply('Как настроение?', {
//         reply_markup: moodKeyboard
//     })
// })

bot.hears('Хорошо', async(ctx) => {
    await ctx.reply('Класс!', {
        reply_markup: { remove_keyboard: true }
    })
})

// bot.command('start', async(ctx) => {
//     await ctx.reply('Привет! Я - бот .Тг канал: <span class="tg-spoiler">Shukurillo</span>', {
//         parse_mode: 'HTML'
//     })
// });
// bot.command('start', async(ctx) => {
//     await ctx.reply('Привет! Я - бот', {
//         reply_parameters: { message_id: ctx.msg.message_id }
//     })
// });



bot.hears('ID', async(ctx) => {
    await ctx.reply(`Ваш ID: ${ctx.from.id}`)
});

bot.hears(/пинг/, async(ctx) => {
    await ctx.reply('понг')
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram", e);
    } else {
        console.error("Unknown error", e);
    }
});

bot.start();
module.exports = {
    HTML:function(style, title, body, control)
    {
        return `
        <!doctype html>
        <html>
        <head>
          <title>CHAT!</title>
          <meta charset="utf-8">
          ${style}
    
        </head>
        <body>
          <h1><a href="/">🎾 게시판 - ${title} 🎾</a></h1>
          <form action='/contents' method='get'>
            <button>create contents</button>
          </form>
          <form action='/' method='get'>
            <button>get</button>
          </form>
          <form action='/' method='put'>
            <button>put</button>
          </form>
          <form action='/' method='delete'>
            <button>delete</button>
          </form>
          ${body}
          ${control}
          <ul id='post_list'>
          </ul>
        </body>
        </html>
        `;
    }
}
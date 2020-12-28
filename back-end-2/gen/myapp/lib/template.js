module.exports = {
  HTML:function(style, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>CHAT!</title>
      <meta charset="utf-8">
      ${style}

    </head>
    <body>
      <h1><a href="/">🎾 시작 🎾</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}

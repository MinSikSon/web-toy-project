module.exports = {
    log: '',
    log_count: 0,
    HTML: function(body){
        // var hidden = `answer: ${answer} <br>`;
        var hidden = ``;
        var main = `
        <html>
            <head>
                <title>🚀⌚️야구게임을 시작하자</title>
                <meta charset="utf-8">
            </head>
            <body>
            <h1>야구게임</h1>
                ${hidden}
                ${body}
                ${this.log}
            </body>
        </html>
        `;
        return main;
    },
    CLEAR: function(){
        this.log = '';
        this.log_count = 0;
    }
}
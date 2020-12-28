rebuild_list();

$('#user').val('');
$('#pw').val('');

var selected_id = null;
var hellodata = {
    title : 'title',
    content: 'content'
};

function get_json_form()
{
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://www.example.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
        },
        body: JSON.stringify(hellodata),
    };
}

function set_json_userInfo(user, pw, warn)
{
    var ret = false;
    if (user != undefined && user.length === 0)
    {
        if (warn === true) alert("user 란 비었음.");
        ret = false;
    }
    else if(pw != undefined && pw.length === 0)
    {
        if (warn === true) alert("pw 란 비었음.");
        ret = false;
    }
    else
    {
        if (user === undefined)
        {
            hellodata.user = '';
        }
        else
        {
            hellodata.user = user;
        }
        if (pw === undefined)
        {
            hellodata.pw = '';
        }
        else
        {
            hellodata.pw = pw;
        }
        console.log('this: ' + hellodata);
        ret = true;
    }

    return ret;
}

function init_json_userInfo()
{
    hellodata.user = '';
    hellodata.pw = '';
}

function set_json_content(title, content)
{
    if (title != null)
    {
        hellodata.title = title;
    }
    if (content != null)
    {
        hellodata.content = content;
    }

    console.log(hellodata);
}


function init_html_userInfo()
{
    $('#user').val('');
    $('#pw').val('');
}

function set_html_userInfo(user, pw)
{
    $('#user').val(user);
    $('#pw').val(pw);
}

function set_html_content(title, content)
{
    $('#title').val(title);
    $('#content').val(content);
}

function init_html_content()
{
    $('#title').val('');
    $('#content').val('');
}


// 새 page 게시
$('#post_content').click(function(e){
    e.preventDefault();

    var ret = set_json_userInfo($('#user').val(), $('#pw').val(), true);

    if (ret === true)
    {
        set_json_content($('#title').val(), $('#content').val());

        $.ajax({
            url : "http://localhost:3000/content",
            type: "POST",
            data : get_json_form(),
            success: function(data, textStatus, jqXHR)
            {
                console.log(data);
                rebuild_list();
                init_html_userInfo();
                init_html_content();
                //console.log(data);
                //data - response from server
                //$('#content_list').append("<li>" + data.content + "</li>")
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                console.log("post fail");
            }
        });
    }
});  

function rebuild_list()
{
    console.log(arguments.callee.name);

    $.ajax({
        url : "http://localhost:3000/content",
        type: "GET",
        success: function(data, textStatus, jqXHR)
        {
            // console.log("get");
            // console.log(data.body);
            var json = JSON.parse(data.body);
            // console.log(json);
            $('#content_list').empty();
            for (var i = 0; i < json.length; i++)
            {
                $('#content_list').append(`<tr class='content_title' id=${json[i].id}><td>${json[i].title}</td><td>${json[i].user}</td><td>${json[i].date}</td></tr>`);
            }
            //data - response from server

            build_lookup_table();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log("get fail");
        }
    });
}
// page 처음 시작 시 로딩
$('#get_content').click(function(e){
    e.preventDefault();
    rebuild_list();
});


function build_lookup_table()
{
    console.log(arguments.callee.name);

    // 게시글 조회
    $('.content_title').click(function(e){
        e.preventDefault();

        selected_id = $(this).attr('id');
        console.log('id: ' + selected_id);
        $.ajax({
            url : `http://localhost:3000/content/${selected_id}`,
            type: "GET",
            success: function(data, textStatus, jqXHR)
            {
                console.log("get");
                console.log(data);
                var json = JSON.parse(data);
                console.log('user: ' + json.user);
                set_json_userInfo(json.user, '', false);
                set_html_userInfo(json.user, '');
                set_html_content(json.title, json.content);
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                console.log("get fail");
            }
        });
    });
}
    

// page 갱신
$('#put_content').click(function(e){
    e.preventDefault();

    set_json_userInfo($('#user').val(), $('#pw').val(), true);
    set_json_content($('#title').val(), $('#content').val());
    $.ajax({
        url : `http://localhost:3000/content/${selected_id}`,
        type: "PUT",
        data : get_json_form(),
        success: function(data, textStatus, jqXHR)
        {
            console.log("put");
            console.log(data);
            rebuild_list();
            init_json_userInfo();
            //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log("put fail");
        }
    });
});

// page 삭제
$('#delete_content').click(function(e){
    e.preventDefault();

    set_json_userInfo($('#user').val(), $('#pw').val(), false);
    $.ajax({
        url : `http://localhost:3000/content/${selected_id}`,
        type: "DELETE",
        data : get_json_form(),
        success: function(data, textStatus, jqXHR)
        {
            console.log("delete");
            console.log(data);
            rebuild_list();
            init_html_userInfo();
            init_json_userInfo();
            init_html_content();
            //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log("delete fail");
        }
    });
});
var partialLoadLock = false;
var search_keyword = "";

rebuild_list();

$('#user').val('');
$('#pw').val('');

var selectedId = null;
var hellodata = {
    title : 'title',
    content: 'content',
    // user: 'user',
    // pw: 'pw'
};

var listLength = 0;

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

function set_json_userInfo(user, pw)
{
    // console.log(arguments.callee.name)
    // console.log('user: ' + user + ', pw: ' + pw);
    hellodata.user = user;
    hellodata.pw = pw;
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

    // console.log(hellodata);
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

    set_json_userInfo($('#user').val(), $('#pw').val());
    set_json_content($('#title').val(), $('#content').val());

    $.ajax({
        url : "http://localhost:3000/content",
        type: "POST",
        data : get_json_form(),
        success: function(data, textStatus, jqXHR)
        {
            // console.log(data);
            rebuild_list();
            init_html_userInfo();
            init_html_content();
            //data - response from server
            //$('#content_list').append("<li>" + data.content + "</li>")
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            identifyAlert(jqXHR.status);
        }
    });
});  

function rebuild_list()
{
    console.log(arguments.callee.name);

    $.ajax({
        url : "http://localhost:3000/content",
        type: "GET",
        success: function(data, textStatus, jqXHR)
        {
            console.log(data);
            $('#content_list').empty();
            for (let d of data)
            {
                $('#content_list').append(`<tr class='content_title' id=${d.id}><td>${d.title}</td><td>${d.user}</td><td>${d.date}</td></tr>`);
            }
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
    $('.content_title').click(function (e) {
        e.preventDefault();
        selectedId = $(this).attr('id');
        $.ajax({
            url : `http://localhost:3000/content/${selectedId}`,
            type: "GET",
            success: function(data, textStatus, jqXHR)
            {
                set_json_userInfo(data.user, '');
                set_html_userInfo(data.user, '');
                set_html_content(data.title, data.content);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                identifyAlert(jqXHR.status);
            }
        });
    });
}

// content 갱신
$('#put_content').click(function(e){
    e.preventDefault();
    console.log("content 갱신");
    set_json_userInfo($('#user').val(), $('#pw').val());
    set_json_content($('#title').val(), $('#content').val());
    $.ajax({
        url : `http://localhost:3000/content/${selectedId}`,
        type: "PUT",
        data : get_json_form(),
        success: function(data, textStatus, jqXHR)
        {
            // rebuild_list();
            init_json_userInfo();
            identifyAlert(jqXHR.status, '수정 ');
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            identifyAlert(jqXHR.status);
        }
    });
});

// page 삭제
$('#delete_content').click(function(e){
    e.preventDefault();

    set_json_userInfo($('#user').val(), $('#pw').val());
    $.ajax({
        url : `http://localhost:3000/content/${selectedId}`,
        type: "DELETE",
        data : get_json_form(),
        success: function(data, textStatus, jqXHR)
        {
            // console.log(data);
            rebuild_list();
            init_html_userInfo();
            init_json_userInfo();
            init_html_content();
            //data - response from server
            identifyAlert(jqXHR.status, '삭제 ');
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            identifyAlert(jqXHR.status);
        }
    });
});

function identifyAlert(statusCode, msg)
{
    if (statusCode === 200)
    {
        alert(msg + '성공');
    }
    if (statusCode === 404)
    {
        alert('id 를 확인하세요.');
    }
    if (statusCode === 403)
    {
        // alert('password 를 확인하세요.');
        console.log('마지막 data');
    }
    if (statusCode === 500)
    {
        console.log('???');
    }
}

// scroll event
$(document).ready(function(){
    $(document).scroll(function(){
        var height = $(document).height(); // 고정값
        var scrollTop = $(window).scrollTop();
        // var scrollBottom = $(window).scrollBottom();
        var reload = scrollTop + 706;
        console.log('height: ' + height + ', reload: ' + reload);
        // console.log('scrollTop: ' + scrollTop);
        // console.log('scrollTop: ' + scrollTop + ', scrollBottom: ' + scrollBottom);
        if (partialLoadLock === false && height <= reload)
        {
            partialLoadLock = false;
            rebuild_paritalContents();
        }
    })
})


// scroll 움직이는 시점에 call
function rebuild_paritalContents()
{
    console.log(arguments.callee.name);

    var nLoadedContents = $('.content_title').length;
    console.log("search_keyword: " + search_keyword + ", nLoadedContents: " + nLoadedContents);
    if (search_keyword == "")
    {
        $.ajax({
            url : `http://localhost:3000/content/loadpartialcontent/${nLoadedContents}`,
            type: "GET",
            success: function(data, textStatus, jqXHR)
            {
                var json = JSON.parse(data.body);
                // console.log("get");
                // console.log(json);
                for(var i = 0; i < json.length; i++)
                {
                    // console.log(json[i]);
                    $('#content_list').append(`<tr class='content_title' id=${json[i].id}><td>${json[i].title}</td><td>${json[i].user}</td><td>${json[i].date}</td></tr>`);
                }
                build_lookup_table();
    
                partialLoadLock = false;
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                // identifyAlert(jqXHR.status);
            }
        });
    }
    else
    {
        $.ajax({
            url : `http://localhost:3000/content/loadpartialcontent/${nLoadedContents}/keyword/${search_keyword}`,
            type: "GET",
            success: function(data, textStatus, jqXHR)
            {
                var json = JSON.parse(data.body);
                // console.log("get");
                console.log(json);
                for(var i = 0; i < json.length; i++)
                {
                    // console.log(json[i]);
                    $('#content_list').append(`<tr class='content_title' id=${json[i].id}><td>${json[i].title}</td><td>${json[i].user}</td><td>${json[i].date}</td></tr>`);
                }
    
                build_lookup_table();
    
                partialLoadLock = false;
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                // identifyAlert(jqXHR.status);
            }
        });
    }
    
}


$('#search_btn').click(function(e){
    search_keyword = $('#search').val();
    console.log("search_keyword: " + search_keyword);
    if (search_keyword == "")
    {
        rebuild_list();
    }
    else
    {
        $.ajax({
            url:`http://localhost:3000/content/search/${search_keyword}`,
            type:"GET",
            success: function(data, textStatus, jqXHR)
            {
                // console.log("data: " + data);
                // var json = JSON.parse(data.body);
                // console.log("json: " + json);
                // console.log(json.length);
    
                $('#content_list').empty();
                // for (var i = json.length - 1; i >= 0 ; i--)
                for (let d of data)
                {
                    $('#content_list').append(`<tr class='content_title' id=${d.id}><td>${d.title}</td><td>${d.user}</td><td>${d.date}</td></tr>`);
                }

                build_lookup_table();
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // console.log(jqXHR.status);
                identifyAlert(jqXHR.status);
            }
    
    
        });
    }
})


class Content{

}
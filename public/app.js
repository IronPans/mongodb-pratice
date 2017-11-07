var content = document.getElementById('content');
var table = content.querySelector('table');
var search = document.getElementById('search');
var save = document.getElementById('save');
var searchID = document.getElementById('article-id');
var saveTitle = document.getElementById('title');
var saveCon = document.getElementById('con');
var updateID = document.getElementById('u-id');
var updateTitle = document.getElementById('u-title');
var updateContent = document.getElementById('u-con');
var update = document.getElementById('update');
var result = document.querySelector('.result');
var datas = [];

search.addEventListener('click', function() {
    var id = searchID.value;
    if (!id) {
        alert('查询条件不能为空!');
        return;
    }
    ajax('/api/article/find?id=' + id, {}, function(res) {
        res = JSON.parse(res);
        table.querySelector('tbody').innerHTML = '';
        for (var i = 0; i < res['data'].length; i++) {
            addList(res['data'][i]);
        }
    })
});

save.addEventListener('click', function() {
    var title = saveTitle.value;
    var content = saveCon.value;
    if (!title) {
        alert('标题不能为空!');
        return;
    }
    if (!content) {
        alert('内容不能为空!');
        return;
    }

    ajax('/api/article/add', {
        data: {title: title, content: content},
        method: 'post'
    }, function(res) {
        res = JSON.parse(res);
        addList(res.data[0]);
        datas.push(res.data[0]);
    });
});

update.addEventListener('click', function() {
    var id = updateID.value;
    var title = updateTitle.value;
    var content = updateContent.value;
    var data = {id: id};
    if (title) {
        data['title']  = title;
    }
    if (content) {
        data['content'] = content;
    }
    ajax('/api/article/update', {
        method: 'PUT',
        data: data
    }, function(res) {
        var data = JSON.parse(res)['data'][0];
        result.innerHTML = `title: ${data['title']}; content: ${data['content']}`;
    })
})

function addList(data) {
    var tr = document.createElement('tr');
    var html = `
    <td>${data['_id']}</td><td>${data['title']}</td>
    <td>${data['content']}</td><td>${data['by']}</td>
    <td>${data['modifyOn']}</td>
    `;
    tr.innerHTML = html;
    var button = document.createElement('button');
    button.className = 'delete';
    button.innerHTML = 'Delete';
    button.setAttribute('data-id', data['_id']);
    button.addEventListener('click', function() {
        var tr = this.parentNode.parentNode;
        ajax('/api/article/remove?id=' + this.getAttribute('data-id'), {method: 'DELETE'}, function(res) {
            res = JSON.parse(res);
            if (res['status']) {
                alert('删除成功');
                table.querySelector('tbody').removeChild(tr);
            }
        })
    })
    var td = document.createElement('td');
    td.appendChild(button);
    tr.appendChild(td);
    table.querySelector('tbody').appendChild(tr);
}

function ajax(url, params, success, fail) {
    var xhr = new XMLHttpRequest();
    var data = params.data || null;
    params.method = params.method || 'GET';
    params.method = params.method.toUpperCase();
    xhr.open(params.method, url);
    if (params['method'] !== 'GET' && params['method'] !== 'DELETE') {
        xhr.setRequestHeader("Content-type","application/json");
    }
    xhr.onreadystatechange = function (res) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            success && success(xhr.response);
        } else {
            fail && fail();
        }
    };
    if (data) {
        data = JSON.stringify(data);
    }
    xhr.send(data)
}
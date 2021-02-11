// let mysql_async = require('mysql');

// let mysql = require('sync-mysql');
// let db = new mysql({
//   host: 'localhost',
//   user: 'nodejs',
//   password: '111111',
//   database: 'opentutorials'
// });

class ContentRepo
{
  // static db_async = mysql_async.createConnection({
  //   host: 'localhost',
  //   user: 'nodejs',
  //   password: '111111', database: 'opentutorials'
  // });

  query_get()
  {
    return `SELECT * FROM topic ORDER BY id DESC LIMIT 0, 5`;
  }
  query_get_partial(numOfLoadedContents)
  {
    return `SELECT * FROM topic ORDER BY id DESC LIMIT ${numOfLoadedContents},5`;
  }

  // NOTE: 뭔가 오류가 있음. 수정 필요.
  query_get_by_search(nKeyWord)
  {
    return `SELECT * FROM topic WHERE (title LIKE '%${nKeyWord}%' OR description LIKE '%${nKeyWord}%') ORDER BY id DESC`;
  }

  query_get_partial_by_search(nKeyWord, nLoadedContents)
  {
    return `SELECT * from topic WHERE (title LIKE %``${nKeyWord}``% OR description LIKE %``${nKeyWord}``% LIMIT ${nLoadedContents},5') ORDER BY id DESC`;
  }

  query_post(title, desc, user)
  {
    return `INSERT INTO topic (title, description, created, author_id) VALUES("${title}", "${desc}", NOW(), ${user})`;
  }
  
  contentForm(id, title, desc, user, date)
  {
    return {
      'id': id,
      'title': title,
      'content': desc,
      'user': user,
      'date': date
    };
  }
}

module.exports = ContentRepo;
import {cache} from 'react';
import {unstable_cache as nextCache} from 'next/cache';
import sql from 'better-sqlite3'; // does not need promises!

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// cache from react is for not duplicating the same calls
// cache from next/cache is for making this function data available in nextjs data cache. It is a promise.
export const getMessages = nextCache(cache(function getMessages() {
  console.log('Fetching messages from db');
  return db.prepare('SELECT * FROM messages').all();
}), ['messages'], {
  // revalidate: 5, // displays the function data after 5 seconds.
  tags: ['msg'] // displays any tagged data marked by revalidateTag['msg']
});

import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';
// import {unstable_noStore} from 'next/cache'; // or 'noStore'in newer versions of Next.

// export const revalidate = 5; // must be named exactly so.
// export const dynamic = 'force-dynamic'; // always refetches all data, no cache is stored. === 'no-store'. Compare to 'force-static' that never fetches data more than once.

export default async function MessagesPage() {
  // unstable_noStore(); // makes sure no data is cached.
  // const response = await fetch('http://localhost:8080/messages', {
    // cache: 'force-cache', // default NextJs 14 is 'force-cache', and 15 is 'no-store'.
    // next: {
    //   tags: ['msg']
    //   revalidate: 5 // number of seconds data will be chached before removing
    // },
    // headers: {
    //   'X-ID': 'page',
    // },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}

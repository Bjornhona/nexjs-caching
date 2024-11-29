import { redirect } from 'next/navigation';
import { revalidatePatch, revalidateTag } from 'next/cache';
import { addMessage } from '@/lib/messages';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    // revalidatePatch('/', 'layout'); // 'layout' revalidates all nested routes of '/' the root route, while the default 'page' only a specific page route '/messages'.
    // revalidatePatch('/messages', 'page'); // same as revalidatePatch('/messages');
    // revalidatePath('/messages');
    revalidateTag('msg');
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}

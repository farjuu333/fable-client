// import { metadata } from '@/app/layout'
// import { subscription } from '@/lib/action/payment'
// import { stripe } from '@/lib/stripe'
// import { redirect } from 'next/navigation'



// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams

//   if (!session_id)
//     throw new Error('Please provide a valid session_id (`cs_test_...`)')

//   const {
//     status,
//     customer_details: { email: customerEmail }
//   } = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   })

//   if (status === 'open') {
//     return redirect('/')
//   }

//   if (status === 'complete') {
//      await subscription({...metadata, sessionId: session_id})
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{' '}
//           {customerEmail}. If you have any questions, please email{' '}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }
// }

import { subscription } from '@/lib/action/payment';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // 🟢 ১. স্ট্রাইপ থেকে পুরো সেশন অবজেক্টটি তুলে আনুন (এতেই মেটাডাটা থাকে)
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === 'open') {
    return redirect('/');
  }

  if (session.status === 'complete') {
    // 🟢 ২. স্ট্রাইপ সেশনের নিজস্ব মেটাডাটা থেকে userId এবং priceId বের করুন
    const stripeMetadata = session.metadata; 

    // এক্সপ্রেস ব্যাকএন্ডে পাঠানোর জন্য নিখুঁত অবজেক্ট তৈরি
    const paymentData = {
      sessionId: session.id,
      userId: stripeMetadata?.userId,   // Next.js API থেকে পাঠানো আসল ইউজার আইডি
      priceId: stripeMetadata?.priceId, // আসল প্রাইস আইডি
    };

    // 🟢 ৩. এবার সঠিক ডাটা এক্সপ্রেস সার্ভারে পাস করুন
    await subscription(paymentData);

    return (
      <section id="success" className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Payment Successful!</h1>
        <p className="text-gray-600">
          We appreciate your business! A confirmation email will be sent to{' '}
          <strong>{session.customer_details?.email}</strong>.
        </p>
      </section>
    );
  }
}